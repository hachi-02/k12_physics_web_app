'use client';

import React, { useState, useEffect } from 'react';
import KaTeXRenderer from '@/components/KaTeXRenderer';

interface LiveLaTeXPreviewProps {
  content: string;
  className?: string;
  emptyPlaceholder?: string;
}

export function LiveLaTeXPreview({
  content,
  className = '',
  emptyPlaceholder = 'Nội dung xem trước sẽ hiển thị tại đây...',
}: LiveLaTeXPreviewProps) {
  const [debouncedContent, setDebouncedContent] = useState(content);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedContent(content);
    }, 120); // 120ms debounce for silky-smooth typing responsiveness
    return () => clearTimeout(handler);
  }, [content]);

  if (!debouncedContent || debouncedContent.trim().length === 0) {
    return (
      <div className={`text-slate-400 italic text-xs p-3 bg-slate-50 rounded-xl border border-dashed border-slate-200 ${className}`}>
        {emptyPlaceholder}
      </div>
    );
  }

  // Tokenize text into plain text, block LaTeX ($$...$$), and inline LaTeX ($...$)
  const parts = debouncedContent.split(/(\$\$[\s\S]+?\$\$|\$[^$]+?\$)/g);

  return (
    <div className={`p-3.5 bg-indigo-50/40 rounded-xl border border-indigo-100 text-slate-800 text-sm leading-relaxed ${className}`}>
      {parts.map((part, index) => {
        if (part.startsWith('$$') && part.endsWith('$$') && part.length > 4) {
          const formula = part.slice(2, -2).trim();
          return (
            <div key={index} className="my-2 text-center overflow-x-auto py-1">
              <KaTeXRenderer math={formula} block={true} className="text-indigo-950 font-serif" />
            </div>
          );
        }
        if (part.startsWith('$') && part.endsWith('$') && part.length > 2) {
          const formula = part.slice(1, -1).trim();
          return (
            <KaTeXRenderer
              key={index}
              math={formula}
              block={false}
              className="mx-1 text-indigo-900 font-serif inline-block font-semibold"
            />
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </div>
  );
}

export default LiveLaTeXPreview;
