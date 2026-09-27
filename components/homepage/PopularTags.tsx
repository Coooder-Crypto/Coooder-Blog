import { map } from 'lodash';
import { usePathname, useRouter } from 'next/navigation';

import popularTags from '@/data/popularTags';

import Link from '@/components/ui/Link';
import BrandIcon from '@/components/ui/BrandIcon';

const PopularTags = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleTagClick = (e: React.MouseEvent, href: string, isActive: boolean) => {
    e.preventDefault();

    if (isActive) {
      // If tag is already active, navigate to all blog posts
      router.push('/blog');
    } else {
      // If tag is not active, navigate to the tag page
      router.push(href);
    }
  };

  return (
    <div className="mb-4">
      <div className="flex flex-wrap gap-2">
        {map(popularTags, (popularTag) => {
          const { slug, iconType, href, title } = popularTag;

          // Check if this tag is currently selected
          const isActive = pathname === href;

          const className = `studio-tag-filter ${isActive ? 'active' : ''}`;

          return (
            <button
              key={slug}
              onClick={(e) => handleTagClick(e, href, isActive)}
              className={className}
              aria-pressed={isActive}
            >
              <BrandIcon type={iconType} className="h-4 w-4" />
              <span>{title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PopularTags;
