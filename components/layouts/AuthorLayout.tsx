import type { Authors } from 'contentlayer/generated';
import { Mail, Github, ArrowUpRight } from 'lucide-react';
import { Link, Image } from '@/components/ui';
import AboutIntro from '@/components/about/AboutIntro';
import CareerTimeline from '@/components/about/CareerTimeline';
import AboutHeader from '@/components/about/AboutHeader';

interface Props {
  children: React.ReactNode;
  content: Omit<Authors, '_id' | '_raw' | 'body'>;
}

export default function AuthorLayout({ children, content }: Props) {
  const { name, avatar, email, twitter, github } = content;
  return (
    <div className="about">
      <AboutHeader />
      <div className="about-layout">
        <aside className="about-profile">
          <Image src={avatar || '/static/images/avatar.png'} alt="Coooder" width={430} height={430} />
          <h3>{name}</h3>
          <p>ENGINEER / BUILDER / EXPLORER</p>
          <div className="about-socials">
            {email && (
              <Link href={`mailto:${email}`} aria-label="Email Coooder">
                <Mail size={20} />
              </Link>
            )}
            {github && (
              <Link href={github} aria-label="Coooder on GitHub">
                <Github size={20} />
              </Link>
            )}
            {twitter && (
              <Link href={twitter} aria-label="Coooder on X">
                <ArrowUpRight size={20} />
              </Link>
            )}
          </div>
        </aside>
        <div className="about-content prose max-w-none">
          <AboutIntro />
          {children}
          <CareerTimeline />
        </div>
      </div>
    </div>
  );
}
