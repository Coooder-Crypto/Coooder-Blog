'use client';

import { useEffect, useRef } from 'react';
import { genPageMetadata } from 'app/seo';

import projectsData from '@/data/projectsData';
import { Link } from '@/components/ui';

export default function Projects() {
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const projects = projectsRef.current;

    if (!projects) return;

    const handleScroll = () => {
      const scrolled = window.pageYOffset;

      // Project cards stagger effect
      const projectCards = projects.querySelectorAll('.project-card');
      projectCards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

        if (isVisible) {
          const cardElement = card as HTMLElement;
          const offset = (scrolled - cardElement.offsetTop) * (0.1 + index * 0.02);
          cardElement.style.transform = `translateY(${offset}px)`;
        }
      });
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const optimizedScroll = () => {
      if (!ticking) {
        requestAnimationFrame(handleScroll);
        ticking = true;
        setTimeout(() => {
          ticking = false;
        }, 16);
      }
    };

    window.addEventListener('scroll', optimizedScroll);
    return () => window.removeEventListener('scroll', optimizedScroll);
  }, []);

  const workProjects = projectsData.filter(({ type }) => type === 'work');
  const sideProjects = projectsData.filter(({ type }) => type === 'self');

  return (
    <div className="projects-container">
      {/* Simple Header like Blog Page */}
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Projects
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            A curated collection of my work and creative endeavors, from professional solutions to experimental side
            projects
          </p>
        </div>
      </div>

      {/* Projects Grid with Parallax Cards */}
      <div ref={projectsRef} className="relative">
        {/* Work Projects */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-gray-100">Professional Work</h2>
              <div className="mx-auto h-1 w-24 rounded bg-gradient-to-r from-blue-500 to-purple-500"></div>
            </div>

            <div className="grid gap-12 md:gap-24">
              {workProjects.map((project, index) => (
                <ParallaxProjectCard key={project.title} project={project} index={index} reverse={index % 2 !== 0} />
              ))}
            </div>
          </div>
        </section>

        {/* Side Projects */}
        <section className="bg-gray-50 py-24 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-gray-100">Side Projects</h2>
              <div className="mx-auto h-1 w-24 rounded bg-gradient-to-r from-green-500 to-blue-500"></div>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {sideProjects.map((project, index) => (
                <CompactProjectCard key={project.title} project={project} index={index} />
              ))}
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
}

function ParallaxProjectCard({ project, index, reverse = false }: { project: any; index: number; reverse?: boolean }) {
  const { title, description, imgSrc, url, repo, builtWith } = project;
  const href = repo ? `https://github.com/${repo}` : url;

  return (
    <div
      className={`project-card flex flex-col items-center gap-12 md:flex-row ${reverse ? 'md:flex-row-reverse' : ''}`}
    >
      {/* Project Image */}
      <div className="md:w-1/2">
        <div className="group relative overflow-hidden rounded-2xl shadow-2xl">
          <img
            src={imgSrc}
            alt={title}
            className="h-80 w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
        </div>
      </div>

      {/* Project Info */}
      <div className="md:w-1/2">
        <div className="space-y-6">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{title}</h3>

          <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">{description}</p>

          {builtWith && (
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-700 dark:text-gray-300">Built with:</h4>
              <div className="flex flex-wrap gap-2">
                {builtWith.map((tech, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {href && (
            <div className="pt-4">
              <Link
                href={href}
                className="inline-flex items-center space-x-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 font-semibold text-white transition-all hover:from-blue-600 hover:to-purple-700 hover:shadow-lg"
              >
                <span>{repo ? 'View Code' : 'Visit Project'}</span>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CompactProjectCard({ project, index }: { project: any; index: number }) {
  const { title, description, imgSrc, url, repo, builtWith } = project;
  const href = repo ? `https://github.com/${repo}` : url;

  return (
    <div
      className="project-card group cursor-pointer rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:bg-gray-700"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {imgSrc && (
        <div className="mb-6 overflow-hidden rounded-xl">
          <img
            src={imgSrc}
            alt={title}
            className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{title}</h3>

        {description && <p className="line-clamp-3 text-gray-600 dark:text-gray-300">{description}</p>}

        {builtWith && (
          <div className="flex flex-wrap gap-1">
            {builtWith.slice(0, 3).map((tech, i) => (
              <span
                key={i}
                className="rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 dark:bg-gray-600 dark:text-gray-300"
              >
                {tech}
              </span>
            ))}
            {builtWith.length > 3 && <span className="text-xs text-gray-500">+{builtWith.length - 3} more</span>}
          </div>
        )}

        {href && (
          <div className="pt-2">
            <Link
              href={href}
              className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <span className="text-sm font-medium">{repo ? 'View Code' : 'Learn More'}</span>
              <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
