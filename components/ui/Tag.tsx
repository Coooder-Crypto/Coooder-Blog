import Link from 'next/link';
import { slug } from 'github-slugger';

interface Props {
  text: string;
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="mb-1.5 mr-1.5 inline-flex items-center border border-[var(--edge)] bg-[var(--surface-subtle)] px-2 py-0.5 font-mono text-[11px] text-[var(--ink-secondary)] transition-colors hover:border-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)]"
    >
      #{text.split(' ').join('-')}
    </Link>
  );
};

export default Tag;
