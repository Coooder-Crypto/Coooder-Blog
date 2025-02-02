import clsx from 'clsx';

const Greeting = () => {
  const className = clsx(
    'bg-gradient-to-r from-gray-500 to-slate-400 dark:bg-gradient-to-l dark:from-blue-800 dark:to-primary-600',
    'mb-8 bg-clip-text text-xl font-extrabold leading-[60px] tracking-tight text-transparent md:text-4xl md:leading-[86px]'
  );

  return (
    <div className={className}>
      The greatest danger in times of turbulence is not the turbulence; it is to act with your yesterday's logic.
    </div>
  );
};

export default Greeting;
