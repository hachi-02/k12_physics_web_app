'use client';

import React from 'react';
import KaTeXRenderer from '@/components/KaTeXRenderer';

interface TextbookMarkdownRendererProps {
  content: string;
  className?: string;
}

/**
 * Splits text into inline tokens: math ($...$), bold (**...**), code (`...`), and plain text.
 */
function renderInline(text: string): React.ReactNode[] {
  // Regex matches $...$, **...**, or `...`
  const tokenRegex = /(\$[^$]+\$|\*\*[^*]+\*\*|`[^`]+`)/g;
  const parts = text.split(tokenRegex);

  return parts.map((part, index) => {
    if (!part) return null;

    // Inline math $...$
    if (part.startsWith('$') && part.endsWith('$') && part.length > 2) {
      const math = part.slice(1, -1);
      return (
        <span key={index} className="inline-block mx-0.5 align-middle">
          <KaTeXRenderer math={math} className="font-serif text-teal-900" />
        </span>
      );
    }

    // Bold **...**
    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      const boldText = part.slice(2, -2);
      return (
        <strong key={index} className="font-bold text-slate-900">
          {renderInline(boldText)}
        </strong>
      );
    }

    // Inline code `...`
    if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
      return (
        <code
          key={index}
          className="px-1.5 py-0.5 rounded bg-slate-100 text-teal-800 font-mono text-xs border border-slate-200"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
}

/**
 * Renders structured markdown content with KaTeX support, tables, callout blocks, and lists.
 */
export default function TextbookMarkdownRenderer({
  content,
  className = '',
}: TextbookMarkdownRendererProps) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let tableBuffer: string[] = [];
  let listBuffer: { type: 'ul' | 'ol'; items: string[] } | null = null;
  let quoteBuffer: string[] = [];

  function flushTable(key: number) {
    if (tableBuffer.length === 0) return;
    const rows = tableBuffer
      .map((l) =>
        l
          .split('|')
          .map((c) => c.trim())
          .filter((_, idx, arr) => idx > 0 && idx < arr.length - 1)
      )
      .filter((cols) => cols.length > 0);

    // Skip separator row (e.g. |---|---|)
    const headerRow = rows[0];
    const dataRows = rows.slice(1).filter((r) => !r.every((c) => /^[-:]+$/.test(c)));

    elements.push(
      <div key={`table-${key}`} className="my-4 overflow-x-auto rounded-xl border border-slate-200 shadow-2xs">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          {headerRow && (
            <thead className="bg-teal-50">
              <tr>
                {headerRow.map((cell, cIdx) => (
                  <th
                    key={cIdx}
                    className="px-4 py-2.5 text-left font-bold text-teal-900"
                  >
                    {renderInline(cell)}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody className="divide-y divide-slate-100 bg-white">
            {dataRows.map((row, rIdx) => (
              <tr key={rIdx} className={rIdx % 2 === 1 ? 'bg-slate-50/60' : 'bg-white'}>
                {row.map((cell, cIdx) => (
                  <td key={cIdx} className="px-4 py-2 text-slate-700">
                    {renderInline(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
    tableBuffer = [];
  }

  function flushList(key: number) {
    if (!listBuffer) return;
    if (listBuffer.type === 'ul') {
      elements.push(
        <ul key={`ul-${key}`} className="my-2 ml-5 space-y-1.5 list-disc text-slate-700">
          {listBuffer.items.map((item, idx) => (
            <li key={idx} className="leading-relaxed">
              {renderInline(item)}
            </li>
          ))}
        </ul>
      );
    } else {
      elements.push(
        <ol key={`ol-${key}`} className="my-2 ml-5 space-y-1.5 list-decimal text-slate-700">
          {listBuffer.items.map((item, idx) => (
            <li key={idx} className="leading-relaxed font-medium">
              {renderInline(item)}
            </li>
          ))}
        </ol>
      );
    }
    listBuffer = null;
  }

  function flushQuote(key: number) {
    if (quoteBuffer.length === 0) return;
    const text = quoteBuffer.join(' ');
    elements.push(
      <div
        key={`quote-${key}`}
        className="my-3 pl-4 py-2 border-l-4 border-teal-500 bg-teal-50/50 rounded-r-xl text-slate-800 text-sm leading-relaxed"
      >
        {renderInline(text)}
      </div>
    );
    quoteBuffer = [];
  }

  lines.forEach((line, idx) => {
    const trimmed = line.trim();

    // Table rows
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      if (listBuffer) flushList(idx);
      if (quoteBuffer.length) flushQuote(idx);
      tableBuffer.push(trimmed);
      return;
    } else if (tableBuffer.length > 0) {
      flushTable(idx);
    }

    // Blockquote
    if (trimmed.startsWith('>')) {
      if (listBuffer) flushList(idx);
      quoteBuffer.push(trimmed.replace(/^>\s?/, ''));
      return;
    } else if (quoteBuffer.length > 0) {
      flushQuote(idx);
    }

    // Unordered list
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      if (listBuffer && listBuffer.type !== 'ul') flushList(idx);
      if (!listBuffer) listBuffer = { type: 'ul', items: [] };
      listBuffer.items.push(trimmed.slice(2));
      return;
    }

    // Ordered list
    if (/^\d+\.\s/.test(trimmed)) {
      if (listBuffer && listBuffer.type !== 'ol') flushList(idx);
      if (!listBuffer) listBuffer = { type: 'ol', items: [] };
      listBuffer.items.push(trimmed.replace(/^\d+\.\s/, ''));
      return;
    }

    // If we reach regular line, flush lists
    if (listBuffer) flushList(idx);

    // Empty lines
    if (trimmed.length === 0) {
      elements.push(<div key={`blank-${idx}`} className="h-1" />);
      return;
    }

    // Display Math $$...$$
    if (trimmed.startsWith('$$') && trimmed.endsWith('$$') && trimmed.length > 4) {
      const formula = trimmed.slice(2, -2).trim();
      elements.push(
        <div
          key={`math-block-${idx}`}
          className="my-3 p-4 bg-teal-50/40 border border-teal-100 rounded-2xl text-center overflow-x-auto shadow-2xs"
        >
          <KaTeXRenderer math={formula} block className="text-lg text-teal-950 font-serif" />
        </div>
      );
      return;
    }

    // Heading 1 (#)
    if (trimmed.startsWith('# ')) {
      elements.push(
        <h1
          key={`h1-${idx}`}
          className="text-2xl sm:text-3xl font-black text-slate-900 pt-5 pb-2 border-b-2 border-teal-200"
        >
          {trimmed.slice(2)}
        </h1>
      );
      return;
    }

    // Heading 2 (## I. / ## II.)
    if (trimmed.startsWith('## ')) {
      elements.push(
        <div key={`h2-${idx}`} className="pt-6 pb-2">
          <h2 className="text-xl sm:text-2xl font-black text-teal-900 inline-flex items-center gap-2">
            <span className="w-2.5 h-6 rounded-full bg-teal-600 inline-block" />
            {trimmed.slice(3)}
          </h2>
        </div>
      );
      return;
    }

    // Heading 3 (### 1. / ### 2.)
    if (trimmed.startsWith('### ')) {
      elements.push(
        <h3 key={`h3-${idx}`} className="text-base sm:text-lg font-bold text-slate-900 pt-3 pb-1">
          {trimmed.slice(4)}
        </h3>
      );
      return;
    }

    // Standard paragraph
    elements.push(
      <p key={`p-${idx}`} className="text-slate-800 leading-relaxed text-sm sm:text-base">
        {renderInline(line)}
      </p>
    );
  });

  // Flush remaining buffers
  if (tableBuffer.length > 0) flushTable(lines.length);
  if (quoteBuffer.length > 0) flushQuote(lines.length);
  if (listBuffer) flushList(lines.length);

  return <div className={`space-y-3 ${className}`}>{elements}</div>;
}
