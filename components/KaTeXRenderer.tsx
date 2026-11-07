'use client';

import React, { useMemo } from 'react';
import katex from 'katex';

interface KaTeXRendererProps {
  math: string;
  block?: boolean;
  className?: string;
}

export function KaTeXRenderer({ math, block = false, className = '' }: KaTeXRendererProps) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: block,
        throwOnError: false,
      });
    } catch (err) {
      console.warn('KaTeX render error:', err);
      return `<span class="katex-error text-red-500 font-mono text-xs">${math}</span>`;
    }
  }, [math, block]);

  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default KaTeXRenderer;
