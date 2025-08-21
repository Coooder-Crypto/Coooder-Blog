import BuildWith from '@/components/footer/BuildWith';

export default function Footer() {
  return (
    <footer>
      <div className="mb-8 mt-16 items-center justify-between space-y-4 md:mb-10 md:flex md:space-y-0">
        <BuildWith />

        <div className="my-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>Copyright © 2025</div>
          <span>{` • `}</span>
          <span>Coooder's Blog - Coding Adventure</span>
        </div>
      </div>
    </footer>
  );
}
