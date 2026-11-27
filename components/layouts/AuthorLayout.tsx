import type { Authors } from 'contentlayer/generated';
import AboutIntro from '@/components/about/AboutIntro';
import AboutSidebar from '@/components/about/AboutSidebar';
import OperatingPrinciples from '@/components/about/OperatingPrinciples';
import CareerTimeline from '@/components/about/CareerTimeline';
import ResearchSection from '@/components/about/ResearchSection';
import CommunitySection from '@/components/about/CommunitySection';
import UsesSection from '@/components/about/UsesSection';
import ConnectSection from '@/components/about/ConnectSection';
import AboutHeader from '@/components/about/AboutHeader';
import PlayerProfile from '@/components/gaming/PlayerProfile';

interface Props {
  children: React.ReactNode;
  content: Omit<Authors, '_id' | '_raw' | 'body'>;
}

export default function AuthorLayout({ children, content }: Props) {
  const { name, avatar, email, twitter, github } = content;
  return (
    <div className="about">
      <AboutHeader />
      <div className="pixel-divider" aria-hidden="true" />
      <div className="about-layout">
        <AboutSidebar name={name} avatar={avatar} email={email} twitter={twitter} github={github} />
        <div className="about-content prose max-w-none">
          <div id="intro" className="about-intro-anchor">
            <AboutIntro />
            {children}
          </div>
          <OperatingPrinciples />
          <CareerTimeline />
          <ResearchSection />
          <CommunitySection />
          <UsesSection />
          <ConnectSection />
        </div>
      </div>
      <PlayerProfile />
    </div>
  );
}
