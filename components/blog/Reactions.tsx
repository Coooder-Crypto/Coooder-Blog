import clsx from 'clsx';
import { Twemoji } from '@/components/ui';

interface ReactionsProps {
  className?: string;
}

const REACTIONS = [
  { emoji: 'sparkling-heart', key: 'loves' },
  { emoji: 'clapping-hands', key: 'applauses' },
  { emoji: 'bullseye', key: 'bullseye' },
  { emoji: 'light-bulb', key: 'ideas' },
];

const StaticReaction = ({ emoji }: { emoji: string }) => {
  return (
    <div className="relative flex flex-col items-center justify-center gap-1.5">
      <Twemoji emoji={emoji} size="2x" />
      <span className="relative h-6 w-8 overflow-hidden">
        <span className="absolute inset-0 font-semibold text-gray-600 dark:text-gray-300">0</span>
      </span>
    </div>
  );
};

const Reactions = ({ className }: ReactionsProps) => {
  return (
    <div className={clsx('flex items-center gap-6', className)}>
      {REACTIONS.map(({ key, emoji }) => (
        <StaticReaction key={key} emoji={emoji} />
      ))}
    </div>
  );
};

export default Reactions;
