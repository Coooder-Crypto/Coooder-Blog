import type { ViewCounterProps } from '@/types/components';

const ViewCounter = ({ className }: ViewCounterProps) => {
  // Static view counter with placeholder value
  return <span className={className}>--- views</span>;
};

export default ViewCounter;
