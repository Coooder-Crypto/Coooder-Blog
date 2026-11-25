'use client';

import { isValidElement, useRef, useState, type ComponentPropsWithoutRef, type ReactElement } from 'react';
import { Check, Copy } from 'lucide-react';

function extractLanguage(children: React.ReactNode): string {
  if (isValidElement(children)) {
    const el = children as ReactElement<{ className?: string }>;
    const cls = el.props?.className || '';
    const match = cls.match(/language-([a-zA-Z0-9#+-]+)/);
    if (match) return match[1].toUpperCase();
  }
  return 'CODE';
}

export default function CodePre({ children, className = '', ...rest }: ComponentPropsWithoutRef<'pre'>) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);
  const lang = extractLanguage(children);

  const handleCopy = () => {
    const text = preRef.current?.innerText || '';
    if (!text) return;
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="code-block-shell">
      <div className="code-block-bar">
        <span className="code-block-lang">{lang}</span>
        <button type="button" onClick={handleCopy} className="code-copy-btn" aria-label="Copy code">
          {copied ? <Check size={13} aria-hidden="true" /> : <Copy size={13} aria-hidden="true" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <pre ref={preRef} className={`code-block-pre ${className}`.trim()} {...rest}>
        {children}
      </pre>
    </div>
  );
}
