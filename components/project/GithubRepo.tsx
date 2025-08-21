import { ExternalLink, GitFork, Github, Star } from 'lucide-react';

// Static GitHub repo component
export default function GithubRepo({ repo }: { repo: string }) {
  // Extract username/repo from the repo string
  const [username, repoName] = repo.split('/');
  const repoUrl = `https://github.com/${repo}`;

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1.5">
          <span className="inline-block h-4 w-4 rounded-full" style={{ backgroundColor: '#3178c6' }} />
          <span>TypeScript</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <Star size={20} strokeWidth={1} />
          <span>--</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <GitFork size={20} strokeWidth={1} />
          <span>--</span>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <a href={repoUrl} target="_blank" rel="noreferrer" className="flex items-center space-x-1">
          <Github size={20} strokeWidth={1} />
        </a>
      </div>
    </div>
  );
}
