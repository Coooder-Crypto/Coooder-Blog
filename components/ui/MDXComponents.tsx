import TOCInline from 'pliny/ui/TOCInline';
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm';
import type { MDXComponents } from 'mdx/types';

import { Link, TableWrapper } from '@/components/ui';
import CodePre from '@/components/ui/CodePre';
import { ArticleImage, ArticleRawImage } from '@/components/ui/ArticleImage';
import { ArticleH2, ArticleH3 } from '@/components/ui/ArticleHeading';

const components: MDXComponents = {
  Image: ArticleImage,
  img: ArticleRawImage,
  h2: ArticleH2,
  h3: ArticleH3,
  TOCInline,
  a: Link,
  pre: CodePre,
  table: TableWrapper,
  BlogNewsletterForm,
};

export default components;
