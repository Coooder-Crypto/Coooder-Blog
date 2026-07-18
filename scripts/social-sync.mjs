import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const siteMetadata = require('../data/siteMetadata.js');

const ENV_PATH = path.resolve(process.cwd(), '.env');
const OUTPUT_PATH = path.resolve(process.cwd(), 'data/socialActivity.ts');
const AUTHOR_PATH = path.resolve(process.cwd(), 'data/authors/default.mdx');
const USER_AGENT = 'coooder-blog-social-sync';
const X_API_BASE_URLS = ['https://api.x.com/2', 'https://api.twitter.com/2'];

const toPositiveInt = (value, fallback) => {
  const parsed = Number.parseInt(value || '', 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

async function loadLocalEnv() {
  try {
    const file = await readFile(ENV_PATH, 'utf8');

    for (const rawLine of file.split('\n')) {
      const line = rawLine.trim();

      if (!line || line.startsWith('#')) continue;

      const separatorIndex = line.indexOf('=');
      if (separatorIndex === -1) continue;

      const key = line.slice(0, separatorIndex).trim();
      const rawValue = line.slice(separatorIndex + 1).trim();

      if (!key || process.env[key] !== undefined) continue;

      process.env[key] = rawValue.replace(/^['"]|['"]$/g, '');
    }
  } catch {
    // CI usually provides env vars directly; a local .env file is optional.
  }
}

function usernameFromUrl(url) {
  if (!url) return '';

  try {
    const parsed = new URL(url);
    return parsed.pathname.split('/').filter(Boolean).at(-1)?.replace(/^@/, '') || '';
  } catch {
    return '';
  }
}

async function readAuthorAccounts() {
  try {
    const file = await readFile(AUTHOR_PATH, 'utf8');
    const frontmatter = file.match(/^---\n([\s\S]*?)\n---/)?.[1] || '';

    return {
      github: usernameFromUrl(readFrontmatterValue(frontmatter, 'github')),
      x: usernameFromUrl(readFrontmatterValue(frontmatter, 'twitter')),
    };
  } catch {
    return {
      github: '',
      x: '',
    };
  }
}

function readFrontmatterValue(frontmatter, key) {
  return frontmatter
    .split('\n')
    .find((line) => line.trim().startsWith(`${key}:`))
    ?.replace(`${key}:`, '')
    .trim();
}

function getConfig(authorAccounts) {
  return {
    github: {
      username:
        process.env.GITHUB_USERNAME ||
        authorAccounts.github ||
        siteMetadata.socialAccounts?.github ||
        usernameFromUrl(siteMetadata.github),
      token: process.env.GITHUB_TOKEN || '',
      repoLimit: Math.min(toPositiveInt(process.env.GITHUB_REPO_LIMIT, 12), 24),
      eventLimit: Math.min(toPositiveInt(process.env.GITHUB_EVENT_LIMIT, 12), 24),
    },
    x: {
      username:
        process.env.X_USERNAME ||
        process.env.TWITTER_USERNAME ||
        authorAccounts.x ||
        siteMetadata.socialAccounts?.twitter ||
        usernameFromUrl(siteMetadata.twitter),
      bearerToken: process.env.X_BEARER_TOKEN || process.env.TWITTER_BEARER_TOKEN || '',
      postLimit: Math.min(toPositiveInt(process.env.X_POST_LIMIT || process.env.TWITTER_POST_LIMIT, 10), 20),
    },
  };
}

async function fetchJson(url, headers) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);

  const response = await fetch(url, { headers, signal: controller.signal }).finally(() => {
    clearTimeout(timeout);
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`${response.status} ${response.statusText}: ${body.slice(0, 240)}`);
  }

  return response.json();
}

function githubHeaders(token) {
  return {
    Accept: 'application/vnd.github+json',
    'User-Agent': USER_AGENT,
    'X-GitHub-Api-Version': '2022-11-28',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

function xHeaders(token) {
  return {
    Authorization: `Bearer ${token}`,
    'User-Agent': USER_AGENT,
  };
}

async function collectGitHubActivity({ username, token, repoLimit, eventLimit }) {
  if (!username) {
    return skippedGitHub('GITHUB_USERNAME is not configured.');
  }

  const headers = githubHeaders(token);
  const profileUrl = `https://github.com/${username}`;

  try {
    const repoUrl = new URL(`https://api.github.com/users/${username}/repos`);
    repoUrl.searchParams.set('sort', 'updated');
    repoUrl.searchParams.set('direction', 'desc');
    repoUrl.searchParams.set('per_page', String(Math.max(repoLimit * 2, 10)));

    const eventsUrl = new URL(`https://api.github.com/users/${username}/events/public`);
    eventsUrl.searchParams.set('per_page', String(Math.max(eventLimit * 2, 10)));

    const [reposPayload, eventsPayload] = await Promise.all([
      fetchJson(repoUrl, headers),
      fetchJson(eventsUrl, headers),
    ]);

    const repos = reposPayload
      .filter((repo) => !repo.archived && !repo.disabled && !repo.fork)
      .slice(0, repoLimit)
      .map((repo) => ({
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description,
        url: repo.html_url,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        isFork: repo.fork,
        updatedAt: repo.updated_at,
        pushedAt: repo.pushed_at,
      }));

    const events = eventsPayload
      .map(normalizeGitHubEvent)
      .filter(Boolean)
      .slice(0, eventLimit);

    return {
      status: 'ok',
      username,
      profileUrl,
      repos,
      events,
      error: null,
    };
  } catch (error) {
    return {
      ...skippedGitHub(error.message),
      status: 'error',
      username,
      profileUrl,
    };
  }
}

function normalizeGitHubEvent(event) {
  const repoName = event.repo?.name || '';
  const repoUrl = repoName ? `https://github.com/${repoName}` : null;
  const createdAt = event.created_at;

  if (event.type === 'PushEvent') {
    const commitCount = event.payload?.commits?.length || 0;
    const firstCommit = event.payload?.commits?.[0];

    return {
      type: 'push',
      title: `Pushed ${commitCount || 1} commit${commitCount === 1 ? '' : 's'}`,
      repo: repoName,
      url: firstCommit?.sha && repoName ? `${repoUrl}/commit/${firstCommit.sha}` : repoUrl,
      createdAt,
    };
  }

  if (event.type === 'CreateEvent') {
    const refType = event.payload?.ref_type || 'resource';

    return {
      type: 'create',
      title: `Created ${refType}`,
      repo: repoName,
      url: repoUrl,
      createdAt,
    };
  }

  if (event.type === 'ReleaseEvent') {
    return {
      type: 'release',
      title: `Published ${event.payload?.release?.tag_name || 'a release'}`,
      repo: repoName,
      url: event.payload?.release?.html_url || repoUrl,
      createdAt,
    };
  }

  if (event.type === 'PullRequestEvent') {
    return {
      type: 'pull_request',
      title: `${capitalize(event.payload?.action)} pull request`,
      repo: repoName,
      url: event.payload?.pull_request?.html_url || repoUrl,
      createdAt,
    };
  }

  if (event.type === 'IssuesEvent') {
    return {
      type: 'issue',
      title: `${capitalize(event.payload?.action)} issue`,
      repo: repoName,
      url: event.payload?.issue?.html_url || repoUrl,
      createdAt,
    };
  }

  if (event.type === 'ForkEvent') {
    return {
      type: 'fork',
      title: 'Forked repository',
      repo: repoName,
      url: event.payload?.forkee?.html_url || repoUrl,
      createdAt,
    };
  }

  if (event.type === 'WatchEvent') {
    return {
      type: 'star',
      title: 'Starred repository',
      repo: repoName,
      url: repoUrl,
      createdAt,
    };
  }

  return repoName
    ? {
        type: event.type,
        title: event.type.replace(/Event$/, ''),
        repo: repoName,
        url: repoUrl,
        createdAt,
      }
    : null;
}

function capitalize(value) {
  if (!value) return 'Updated';
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function skippedGitHub(error) {
  return {
    status: 'skipped',
    username: null,
    profileUrl: null,
    repos: [],
    events: [],
    error,
  };
}

async function collectXActivity({ username, bearerToken, postLimit }) {
  if (!username) {
    return skippedX('X_USERNAME is not configured.');
  }

  const profileUrl = `https://x.com/${username}`;

  if (!bearerToken) {
    return {
      ...skippedX('X_BEARER_TOKEN is not configured.'),
      username,
      profileUrl,
    };
  }

  const headers = xHeaders(bearerToken);
  let lastError = null;

  for (const apiBaseUrl of X_API_BASE_URLS) {
    try {
      const userUrl = new URL(`${apiBaseUrl}/users/by/username/${username}`);
      userUrl.searchParams.set('user.fields', 'profile_image_url,public_metrics,verified');

      const userPayload = await fetchJson(userUrl, headers);
      const userId = userPayload.data?.id;

      if (!userId) {
        throw new Error(`X user "${username}" was not found.`);
      }

      const postsUrl = new URL(`${apiBaseUrl}/users/${userId}/tweets`);
      postsUrl.searchParams.set('max_results', String(Math.max(postLimit, 5)));
      postsUrl.searchParams.set('exclude', 'retweets,replies');
      postsUrl.searchParams.set('tweet.fields', 'created_at,entities,public_metrics,referenced_tweets');

      const postsPayload = await fetchJson(postsUrl, headers);
      const posts = (postsPayload.data || []).slice(0, postLimit).map((post) => ({
        id: post.id,
        text: post.text,
        url: `https://x.com/${username}/status/${post.id}`,
        createdAt: post.created_at,
        metrics: {
          likes: post.public_metrics?.like_count || 0,
          reposts: post.public_metrics?.retweet_count || 0,
          replies: post.public_metrics?.reply_count || 0,
          quotes: post.public_metrics?.quote_count || 0,
        },
      }));

      return {
        status: 'ok',
        username,
        profileUrl,
        posts,
        error: null,
      };
    } catch (error) {
      lastError = error;
    }
  }

  return {
    ...skippedX(lastError?.message || 'X API request failed.'),
    status: 'error',
    username,
    profileUrl,
  };
}

function skippedX(error) {
  return {
    status: 'skipped',
    username: null,
    profileUrl: null,
    posts: [],
    error,
  };
}

async function main() {
  await loadLocalEnv();
  const config = getConfig(await readAuthorAccounts());
  const [github, x] = await Promise.all([collectGitHubActivity(config.github), collectXActivity(config.x)]);

  const payload = {
    generatedAt: new Date().toISOString(),
    github,
    x,
  };

  await mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await writeFile(OUTPUT_PATH, toTypeScriptModule(payload), 'utf8');

  console.log(`Social activity synced to ${path.relative(process.cwd(), OUTPUT_PATH)}`);
  console.log(`GitHub: ${github.status}${github.error ? ` (${github.error})` : ''}`);
  console.log(`X: ${x.status}${x.error ? ` (${x.error})` : ''}`);
}

function toTypeScriptModule(payload) {
  return `const socialActivity = ${JSON.stringify(payload, null, 2)} as const;\n\nexport default socialActivity;\n`;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
