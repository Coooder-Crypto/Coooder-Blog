import type { SVGProps } from 'react';

export interface PixelIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

function PixelSvg({ size = 16, children, ...props }: PixelIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      shapeRendering="crispEdges"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function PixelSearch(props: PixelIconProps) {
  return (
    <PixelSvg {...props}>
      <path d="M5 2h4v1H5V2zm-2 1h2v1H3V3zm6 0h2v1H9V3zM2 4h1v5H2V4zm9 0h1v5h-1V4zM3 9h2v1H3V9zm6 0h2v1H9V9zm-4 1h4v1H5v-1zm5 0h1v1h-1v-1zm1 1h1v1h-1v-1zm1 1h1v1h-1v-1zm1 1h1v1h-1v-1z" />
    </PixelSvg>
  );
}

export function PixelSun(props: PixelIconProps) {
  return (
    <PixelSvg {...props}>
      <path d="M7 1h2v2H7V1zm0 12h2v2H7v-2zM1 7h2v2H1V7zm12 0h2v2h-2V7zM3 3h2v2H3V3zm8 0h2v2h-2V3zM3 11h2v2H3v-2zm8 0h2v2h-2v-2zM6 5h4v1H6V5zm-1 1h6v4H5V6zm1 4h4v1H6v-1z" />
    </PixelSvg>
  );
}

export function PixelMoon(props: PixelIconProps) {
  return (
    <PixelSvg {...props}>
      <path d="M7 2h2v1H7V2zM5 3h2v1H5V3zm-1 1h1v2H4V4zM3 6h1v4H3V6zm1 4h1v2H4v-2zm1 2h2v1H5v-1zm2 1h4v1H7v-1zm4-1h2v1h-2v-1zm2-2h1v2h-1v-2zM8 3h1v2H8V3zM7 5h1v3H7V5zm1 3h2v1H8V8zm2 1h3v1h-3V9z" />
    </PixelSvg>
  );
}

export function PixelArrowUpRight(props: PixelIconProps) {
  return (
    <PixelSvg {...props}>
      <path d="M5 3h8v8h-1.5V5.5h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1H4v-1.5h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1H5V3z" />
    </PixelSvg>
  );
}

export function PixelArrowRight(props: PixelIconProps) {
  return (
    <PixelSvg {...props}>
      <path d="M2 7h9v2H2V7zm7-3h2v1H9V4zm1 1h2v1h-2V5zm1 1h2v1h-2V6zm1 1h2v2h-2V7zm-1 2h2v1h-2V9zm-1 1h2v1h-2v-1zm-1 1h2v1H9v-1z" />
    </PixelSvg>
  );
}

export function PixelChevronDown(props: PixelIconProps) {
  return (
    <PixelSvg {...props}>
      <path d="M3 5h2v2H3V5zm2 2h2v2H5V7zm2 2h2v2H7V9zm2-2h2v2H9V7zm2-2h2v2h-2V5z" />
    </PixelSvg>
  );
}

export function PixelVerified(props: PixelIconProps) {
  return (
    <PixelSvg {...props}>
      <path d="M6 1h4v1h2v1h1v1h1v2h1v4h-1v2h-1v1h-1v1h-2v1H6v-1H4v-1H3v-1H2v-2H1V6h1V4h1V3h1V2h2V1zm5 4h-1v1H9v1H8v1H7v1H6V8H5V7H4v2h1v1h1v1h2v-1h1V9h1V8h1V7h1V5h-1z" />
    </PixelSvg>
  );
}

export function PixelPin(props: PixelIconProps) {
  return (
    <PixelSvg {...props}>
      <path d="M5 2h6v1H5V2zM4 3h1v1H4V3zm7 0h1v1h-1V3zM3 4h1v4H3V4zm9 0h1v4h-1V4zM4 8h1v2H4V8zm7 0h1v2h-1V8zm-6 2h1v2H5v-2zm5 0h1v2h-1v-2zm-4 2h1v1H6v-1zm3 0h1v1H9v-1zm-2 1h2v1H7v-1zM7 5h2v2H7V5z" />
    </PixelSvg>
  );
}

export function PixelMail(props: PixelIconProps) {
  return (
    <PixelSvg {...props}>
      <path d="M2 3h12v1H2V3zM1 4h1v8H1V4zm13 0h1v8h-1V4zM2 12h12v1H2v-1zM3 5h2v1H3V5zm8 0h2v1h-2V5zM5 6h2v1H5V6zm4 0h2v1H9V6zM7 7h2v1H7V7z" />
    </PixelSvg>
  );
}

export function PixelGlobe(props: PixelIconProps) {
  return (
    <PixelSvg {...props}>
      <path d="M5 2h6v1H5V2zM3 3h2v1H3V3zm8 0h2v1h-2V3zM2 4h1v8H2V4zm11 0h1v8h-1V4zM3 12h2v1H3v-1zm8 0h2v1h-2v-1zm-6 1h6v1H5v-1zM3 7h10v1H3V7zm4-4h2v10H7V3z" />
    </PixelSvg>
  );
}

export function PixelTerminal(props: PixelIconProps) {
  return (
    <PixelSvg {...props}>
      <path d="M2 2h12v1H2V2zM1 3h1v10H1V3zm13 0h1v10h-1V3zM2 13h12v1H2v-1zM4 5h1v1H4V5zm1 1h1v1H5V6zm1 1h1v1H6V7zM5 8h1v1H5V8zM4 9h1v1H4V9zm4 0h4v1H8V9z" />
    </PixelSvg>
  );
}

export function PixelGithub(props: PixelIconProps) {
  return (
    <PixelSvg {...props}>
      <path d="M5 2h6v1H5V2zM3 3h2v1H3V3zm8 0h2v1h-2V3zM2 4h2v5H2V4zm10 0h2v5h-2V4zM4 4h2v1H4V4zm6 0h2v1h-2V4zM4 5h8v4H4V5zm-1 4h2v2H3V9zm8 0h2v2h-2V9zm-6 1h6v1H5v-1zm-2 1h2v1H3v-1zm3 0h4v3H6v-3zm5 0h2v1h-2v-1zm-7 1h2v1H4v-1zm6 0h2v1h-2v-1z" />
    </PixelSvg>
  );
}

export function PixelX(props: PixelIconProps) {
  return (
    <PixelSvg {...props}>
      <path d="M2 2h3v1H2V2zm1 1h2v1H3V3zm1 1h2v1H4V4zm1 1h2v1H5V5zm1 1h2v1H6V6zm1 1h2v2H7V7zm2 2h2v1H9V9zm1 1h2v1h-2v-1zm1 1h2v1h-2v-1zm1 1h2v2h-2v-2zM11 2h3v1h-3V2zm-1 1h2v1h-2V3zM9 4h2v1H9V4zM8 5h2v1H8V5zM5 9h2v1H5V9zm-1 1h2v1H4v-1zm-1 1h2v1H3v-1zm-1 1h3v2H2v-2z" />
    </PixelSvg>
  );
}

export function PixelClock(props: PixelIconProps) {
  return (
    <PixelSvg {...props}>
      <path d="M5 2h6v1H5V2zM3 3h2v1H3V3zm8 0h2v1h-2V3zM2 4h1v8H2V4zm11 0h1v8h-1V4zM3 12h2v1H3v-1zm8 0h2v1h-2v-1zm-6 1h6v1H5v-1zM7 4h1v5H7V4zm1 4h3v1H8V8z" />
    </PixelSvg>
  );
}

export function PixelCopy(props: PixelIconProps) {
  return (
    <PixelSvg {...props}>
      <path d="M5 2h8v1H5V2zM4 3h1v7H4V3zm9 0h1v7h-1V3zM5 10h8v1H5v-1zM2 5h1v8H2V5zm1 8h8v1H3v-1zm8-2h1v2h-1v-2z" />
    </PixelSvg>
  );
}

export function PixelCheck(props: PixelIconProps) {
  return (
    <PixelSvg {...props}>
      <path d="M12 4h2v2h-2V4zm-2 2h2v2h-2V6zM8 8h2v2H8V8zm-2 2h2v2H6v-2zM4 8h2v2H4V8zM2 6h2v2H2V6z" />
    </PixelSvg>
  );
}

export function PixelMenu(props: PixelIconProps) {
  return (
    <PixelSvg {...props}>
      <path d="M2 3h12v2H2V3zm0 4h12v2H2V7zm0 4h12v2H2v-2z" />
    </PixelSvg>
  );
}

export function PixelClose(props: PixelIconProps) {
  return (
    <PixelSvg {...props}>
      <path d="M3 3h2v2H3V3zm8 0h2v2h-2V3zM5 5h2v2H5V5zm4 0h2v2H9V5zM7 7h2v2H7V7zM5 9h2v2H5V9zm4 0h2v2H9V9zM3 11h2v2H3v-2zm8 0h2v2h-2v-2z" />
    </PixelSvg>
  );
}

export function PixelHeart(props: PixelIconProps) {
  return (
    <PixelSvg {...props}>
      <path d="M3 3h3v1H3V3zm7 0h3v1h-3V3zM2 4h5v1H2V4zm7 0h5v1H9V4zM2 5h12v3H2V5zm1 3h10v2H3V8zm2 2h6v2H5v-2zm2 2h2v2H7v-2z" />
    </PixelSvg>
  );
}

export function PixelDatabase(props: PixelIconProps) {
  return (
    <PixelSvg {...props}>
      <path d="M4 2h8v1H4V2zM2 3h2v1H2V3zm10 0h2v1h-2V3zM2 4h12v2H2V4zm0 3h12v2H2V7zm0 3h12v2H2v-2zm0 2h2v1H2v-1zm10 0h2v1h-2v-1zm-8 1h8v1H4v-1z" />
    </PixelSvg>
  );
}

export function PixelGraph(props: PixelIconProps) {
  return (
    <PixelSvg {...props}>
      <path d="M2 2h4v4H2V2zm8 1h4v4h-4V3zM3 10h4v4H3v-4zm3-6h4v1H6V4zM4 6h1v4H4V6zm6 1h1v2h-1V7zM9 9h1v1H9V9zm-2 1h2v1H7v-1z" />
    </PixelSvg>
  );
}

export function PixelCpu(props: PixelIconProps) {
  return (
    <PixelSvg {...props}>
      <path d="M5 1h1v2H5V1zm5 0h1v2h-1V1zM5 13h1v2H5v-2zm5 0h1v2h-1v-2zM1 5h2v1H1V5zm0 5h2v1H1v-1zm12-5h2v1h-2V5zm0 5h2v1h-2v-1zM3 3h10v10H3V3zm2 2v6h6V5H5zm2 2h2v2H7V7z" />
    </PixelSvg>
  );
}

export function PixelSpark(props: PixelIconProps) {
  return (
    <PixelSvg {...props}>
      <path d="M7 1h2v4H7V1zm0 10h2v4H7v-4zM1 7h4v2H1V7zm10 0h4v2h-4V7zM5 5h6v6H5V5z" />
    </PixelSvg>
  );
}

export function PixelShip(props: PixelIconProps) {
  return (
    <PixelSvg {...props}>
      <path d="M7 1h2v2H7V1zM6 3h4v2H6V3zM5 5h6v3H5V5zM3 8h10v2H3V8zM1 10h14v2H1v-2zm2 2h3v1H3v-1zm7 0h3v1h-3v-1zm-4 1h4v1H6v-1zM7 6h2v2H7V6z" />
    </PixelSvg>
  );
}

export function PixelInvader(props: PixelIconProps) {
  return (
    <PixelSvg {...props}>
      <path d="M4 2h1v1H4V2zm7 0h1v1h-1V2zM5 3h1v1H5V3zm5 0h1v1h-1V3zM4 4h8v1H4V4zM3 5h2v1H3V5zm3 0h4v1H6V5zm5 0h2v1h-2V5zM2 6h12v2H2V6zm0 2h1v3H2V8zm2 0h8v2H4V8zm9 0h1v3h-1V8zM4 10h1v1H4v-1zm7 0h1v1h-1v-1zm-6 1h2v1H5v-1zm4 0h2v1H9v-1z" />
    </PixelSvg>
  );
}
