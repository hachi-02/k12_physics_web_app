'use client';

import React, { useState } from 'react';
import { Lightbulb, ChevronDown, ChevronUp, AlertCircle, Sparkles } from 'lucide-react';
import type { QuestionHint } from '@/types/database';
import KaTeXRenderer from '@/components/KaTeXRenderer';

interface HintAccordionProps {
  hints?: QuestionHint[];
  onHintOpened?: (level: number) => void;
}

/**
 * Helper to render text containing possible $...$ LaTeX formulas
 */
function renderMathText(text: string) {
  if (!text.includes('$')) {
    return <span>{text}</span>;
  }

  const parts = text.split(/(\$[^$]+\$)/g);
  return (
    <span>
      {parts.map((part, index) => {
        if (part.startsWith('$') && part.endsWith('$') && part.length > 2) {
          const formula = part.slice(1, -1);
          return <KaTeXRenderer key={index} math={formula} className="mx-1 font-serif text-teal-800" />;
        }
        return <span key={index}>{part}</span>;
      })}
    </span>
  );
}

export function HintAccordion({ hints, onHintOpened }: HintAccordionProps) {
  const [openedLevels, setOpenedLevels] = useState<number[]>([]);

  if (!hints || hints.length === 0) {
    return null;
  }

  const toggleLevel = (level: number) => {
    if (openedLevels.includes(level)) {
      setOpenedLevels(openedLevels.filter((l) => l !== level));
    } else {
      const nextLevels = [...openedLevels, level];
      setOpenedLevels(nextLevels);
      if (onHintOpened) {
        onHintOpened(Math.max(...nextLevels));
      }
    }
  };

  const getLevelMeta = (level: number) => {
    switch (level) {
      case 1:
        return {
          title: 'Cấp 1: Hiện tượng & Khái niệm then chốt',
          badge: 'Gợi ý mở đầu',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        };
      case 2:
        return {
          title: 'Cấp 2: Định luật & Công thức liên quan',
          badge: 'Công thức toán',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
        };
      case 3:
      default:
        return {
          title: 'Cấp 3: Hướng dẫn giải chi tiết từng bước',
          badge: 'Bước giải cuối',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
        };
    }
  };

  return (
    <div className="bg-amber-50/40 rounded-2xl border border-amber-200/80 p-4 space-y-3 text-sm">
      <div className="flex items-center justify-between text-xs font-bold text-amber-900 border-b border-amber-200/60 pb-2">
        <span className="flex items-center gap-1.5">
          <Lightbulb className="w-4 h-4 text-amber-600 fill-amber-400" />
          Hệ thống gợi ý tư duy nhiều tầng (Hint System)
        </span>
        <span className="text-amber-700 font-medium text-[11px]">
          {openedLevels.length} / {hints.length} gợi ý đã mở
        </span>
      </div>

      <div className="space-y-2">
        {hints.map((item) => {
          const isOpened = openedLevels.includes(item.level);
          const meta = getLevelMeta(item.level);

          return (
            <div
              key={item.level}
              className="bg-white rounded-xl border border-amber-200/70 overflow-hidden shadow-2xs transition"
            >
              <button
                type="button"
                onClick={() => toggleLevel(item.level)}
                className="w-full p-3 text-left flex items-center justify-between gap-2 hover:bg-amber-50/50 transition cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded text-[11px] font-bold border ${meta.badgeColor}`}
                  >
                    {meta.badge}
                  </span>
                  <span className="font-semibold text-slate-800 text-xs sm:text-sm">
                    {meta.title}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400 shrink-0">
                  {item.penalty_stars ? (
                    <span className="text-amber-600 text-[11px] font-medium hidden sm:inline">
                      -{item.penalty_stars} ⭐
                    </span>
                  ) : null}
                  {isOpened ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {isOpened && (
                <div className="p-3.5 bg-amber-50/30 border-t border-amber-100 text-xs sm:text-sm text-slate-800 leading-relaxed space-y-2 animate-fade-in">
                  <div>{renderMathText(item.hint)}</div>
                  {item.penalty_stars ? (
                    <div className="text-[11px] text-amber-700 flex items-center gap-1 font-medium">
                      <Sparkles className="w-3.5 h-3.5" />
                      Mở gợi ý này trừ {item.penalty_stars} sao thưởng khi hoàn thành.
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HintAccordion;
