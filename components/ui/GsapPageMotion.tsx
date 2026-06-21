'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const REVEAL_OFFSETS: Record<string, { x: number; y: number }> = {
  down: { x: 0, y: -18 },
  left: { x: -36, y: 0 },
  right: { x: 36, y: 0 },
  up: { x: 0, y: 28 },
};

export default function GsapPageMotion() {
  const pathname = usePathname();

  useEffect(() => {
    let disposed = false;
    let media: { add: (...args: unknown[]) => void; revert: () => void } | undefined;

    async function mountAnimations() {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')]);

      if (disposed) return;

      gsap.registerPlugin(ScrollTrigger);

      media = gsap.matchMedia();
      media.add(
        {
          reduceMotion: '(prefers-reduced-motion: reduce)',
          isDesktop: '(min-width: 768px)',
          finePointer: '(pointer: fine)',
        },
        (context) => {
          const { reduceMotion, isDesktop, finePointer } = context.conditions as {
            reduceMotion: boolean;
            isDesktop: boolean;
            finePointer: boolean;
          };

          const cleanup: Array<() => void> = [];

          if (reduceMotion) {
            gsap.set('[data-gsap-reveal], [data-gsap-stagger] > *', {
              autoAlpha: 1,
              clearProps: 'transform,opacity,visibility',
            });
            return () => cleanup.forEach((fn) => fn());
          }

          gsap.utils.toArray<HTMLElement>('[data-gsap-reveal]').forEach((element) => {
            const direction = element.dataset.gsapReveal || 'up';
            const offset = REVEAL_OFFSETS[direction] ?? REVEAL_OFFSETS.up;

            gsap.fromTo(
              element,
              {
                autoAlpha: 0,
                scale: 0.98,
                x: offset.x,
                y: offset.y,
              },
              {
                autoAlpha: 1,
                scale: 1,
                x: 0,
                y: 0,
                clearProps: 'transform,opacity,visibility',
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: element,
                  start: 'top 88%',
                  once: true,
                },
              }
            );
          });

          gsap.utils.toArray<HTMLElement>('[data-gsap-stagger]').forEach((group) => {
            const children = Array.from(group.children).filter(
              (child): child is HTMLElement => child instanceof HTMLElement
            );

            if (!children.length) return;

            gsap.fromTo(
              children,
              {
                autoAlpha: 0,
                scale: 0.98,
                y: isDesktop ? 24 : 16,
              },
              {
                autoAlpha: 1,
                scale: 1,
                y: 0,
                clearProps: 'transform,opacity,visibility',
                duration: 0.72,
                ease: 'power3.out',
                stagger: {
                  each: 0.07,
                  from: 'start',
                },
                scrollTrigger: {
                  trigger: group,
                  start: 'top 86%',
                  once: true,
                },
              }
            );
          });

          gsap.utils.toArray<HTMLElement>('[data-gsap-parallax]').forEach((element) => {
            gsap.fromTo(
              element,
              {
                scale: 1.08,
                yPercent: -5,
              },
              {
                scale: 1.08,
                yPercent: 5,
                ease: 'none',
                scrollTrigger: {
                  trigger: element,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: true,
                },
              }
            );
          });

          if (finePointer) {
            gsap.utils.toArray<HTMLElement>('[data-gsap-magnetic]').forEach((element) => {
              const xTo = gsap.quickTo(element, 'x', { duration: 0.35, ease: 'power3.out' });
              const yTo = gsap.quickTo(element, 'y', { duration: 0.35, ease: 'power3.out' });

              const onMove = (event: PointerEvent) => {
                const rect = element.getBoundingClientRect();
                const x = (event.clientX - rect.left - rect.width / 2) * 0.22;
                const y = (event.clientY - rect.top - rect.height / 2) * 0.28;

                xTo(x);
                yTo(y);
              };

              const onLeave = () => {
                xTo(0);
                yTo(0);
              };

              element.addEventListener('pointermove', onMove);
              element.addEventListener('pointerleave', onLeave);
              cleanup.push(() => {
                element.removeEventListener('pointermove', onMove);
                element.removeEventListener('pointerleave', onLeave);
              });
            });
          }

          ScrollTrigger.refresh();

          return () => cleanup.forEach((fn) => fn());
        }
      );
    }

    mountAnimations();

    return () => {
      disposed = true;
      media?.revert();
    };
  }, [pathname]);

  return null;
}
