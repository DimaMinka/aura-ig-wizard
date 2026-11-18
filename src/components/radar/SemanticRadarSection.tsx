import { useState } from 'react';
import type { RadarCategory, RadarMessage } from '../../types/radar';

interface SemanticRadarSectionProps {
  categories: RadarCategory[];
  messages: RadarMessage[];
  onMarkRead: (messageId: string) => Promise<void>;
}

export function SemanticRadarSection({ categories, messages, onMarkRead }: SemanticRadarSectionProps) {
  const [activeCat, setActiveCat] = useState('personal');

  const filtered = messages.filter((m) => m.categoryId === activeCat || activeCat === 'all');

  return (
    <section className="space-y-3 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
          <h3 className="font-headline-sm text-sm font-semibold text-on-surface">
            Семантический радар болталок
          </h3>
        </div>
        <span className="text-[10px] text-primary font-bold uppercase tracking-wider">Live</span>
      </div>

      {/* Categories chips */}
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCat(cat.id)}
            className={`shrink-0 px-2.5 py-1 rounded-full text-[11px] font-title-md border transition ${
              activeCat === cat.id
                ? 'bg-primary text-white border-primary shadow-xs'
                : 'bg-white/80 text-on-surface-variant border-outline-variant/60 hover:bg-white'
            }`}
          >
            {cat.label} ({cat.count})
          </button>
        ))}
      </div>

      {/* Messages cards */}
      <div className="space-y-2">
        {filtered.map((msg) => (
          <div
            key={msg.id}
            className={`p-3 rounded-xl glass-surface border shadow-xs transition ${
              msg.isRead ? 'opacity-65 border-outline-variant/40' : 'border-outline-variant/80'
            }`}
          >
            <div className="flex items-center justify-between gap-1 mb-1.5">
              <span className="text-[10px] font-bold text-primary uppercase font-mono">
                {msg.scoreLabel}
              </span>
              <span className="text-[10px] text-on-surface-variant">{msg.time}</span>
            </div>

            <p className="text-xs text-on-surface leading-snug mb-2 font-body-md">
              <strong className="text-primary">{msg.author}:</strong> {msg.body}
            </p>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => onMarkRead(msg.id)}
                disabled={msg.isRead}
                className={`text-[10px] font-title-md px-2 py-0.5 rounded-md transition ${
                  msg.isRead
                    ? 'text-emerald-800 bg-emerald-50 cursor-default'
                    : 'text-primary bg-primary-fixed hover:bg-primary-fixed/80'
                }`}
              >
                {msg.isRead ? 'Прочитано ✓' : 'Пометить прочитанным ✓'}
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="p-4 text-center text-xs text-on-surface-variant glass-surface rounded-xl border border-outline-variant/40">
            Нет новых сообщений в этой категории
          </div>
        )}
      </div>
    </section>
  );
}
