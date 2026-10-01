interface Props {
  artwork: 'workshop' | 'health' | 'map' | 'notes';
  alt: string;
  priority?: boolean;
  sizes: string;
}

// Static export has no image server: provide real pre-generated width candidates.
export default function StudioImage({ artwork, alt, priority = false, sizes }: Props) {
  const base = `/static/images/studio/responsive/${artwork}`;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${base}-768.webp`}
      srcSet={[480, 768, 1200].map((width) => `${base}-${width}.webp ${width}w`).join(', ')}
      sizes={sizes}
      alt={alt}
      width={1200}
      height={artwork === 'workshop' ? 1200 : 800}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
    />
  );
}
