'use client';

import { type ReactNode, useSyncExternalStore } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring } from 'framer-motion';

const ARCHITECTURAL_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 32, restDelta: 0.001 });
  const reduced = useReducedMotion();

  if (reduced) return null;

  return <motion.div className="scroll-progress-bar" style={{ scaleX }} aria-hidden="true" />;
}

export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  if (reduced) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 'some' }}
      transition={{ duration: 0.65, delay, ease: ARCHITECTURAL_EASE }}
    >
      {children}
    </motion.div>
  );
}

export function ParallaxPlate({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 140, damping: 24 });
  const smoothY = useSpring(y, { stiffness: 140, damping: 24 });

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      className={className}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const nx = (event.clientX - rect.left) / rect.width - 0.5;
        const ny = (event.clientY - rect.top) / rect.height - 0.5;
        x.set(nx * -10);
        y.set(ny * -8);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <motion.div className="parallax-plate-inner" style={{ x: smoothX, y: smoothY }}>
        {children}
      </motion.div>
    </div>
  );
}

let cachedTime = '';
function getBeijingTimeString() {
  const formatted = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Shanghai',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(new Date());
  cachedTime = `${formatted} CST`;
  return cachedTime;
}

function subscribeClock(callback: () => void) {
  const id = window.setInterval(() => {
    getBeijingTimeString();
    callback();
  }, 1000);
  return () => window.clearInterval(id);
}

function getClockSnapshot() {
  return cachedTime || getBeijingTimeString();
}

function getClockServerSnapshot() {
  return 'BEIJING · UTC+8';
}

export function BeijingClock() {
  const time = useSyncExternalStore(subscribeClock, getClockSnapshot, getClockServerSnapshot);
  return <span>{time}</span>;
}

const tickerItems = [
  'AGENT HARNESS',
  'CONTEXT · EXECUTION · VERIFICATION',
  'LOCAL-FIRST SYSTEMS',
  'JARVIS + SECOND BRAIN',
  'DELEGATE · REVIEW · OWN',
  'EMPIRICAL MEASUREMENTS',
  'AI-NATIVE ENGINEERING',
];

export function KineticTicker() {
  return (
    <div className="kinetic-ticker" aria-hidden="true">
      <div className="kinetic-ticker-track">
        {[0, 1].map((dup) => (
          <div className="kinetic-ticker-group" key={dup}>
            {tickerItems.map((item) => (
              <span key={`${dup}-${item}`} className="kinetic-ticker-item">
                {item}
                <i className="ticker-diamond" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
