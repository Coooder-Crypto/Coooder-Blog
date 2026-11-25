'use client';

import type { ImgHTMLAttributes } from 'react';
import Zoom from 'react-medium-image-zoom';
import Image, { type ImageProps } from '@/components/ui/Image';

export function ArticleImage(props: ImageProps) {
  const { alt = '', className, ...rest } = props;
  return (
    <span className="article-zoom-wrap">
      <Zoom zoomMargin={24} a11yNameButtonZoom={alt ? `放大图片 — ${alt}` : '放大图片'}>
        <Image alt={alt} className={className} {...rest} />
      </Zoom>
    </span>
  );
}

export function ArticleRawImage(props: ImgHTMLAttributes<HTMLImageElement>) {
  const { alt = '', className, ...rest } = props;
  return (
    <span className="article-zoom-wrap">
      <Zoom zoomMargin={24} a11yNameButtonZoom={alt ? `放大图片 — ${alt}` : '放大图片'}>
        <img alt={alt} loading="lazy" className={className} {...rest} />
      </Zoom>
    </span>
  );
}
