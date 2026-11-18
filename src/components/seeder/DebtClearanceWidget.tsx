import { useState } from 'react';
import type { DebtComment } from '../../types/seeder';

interface DebtClearanceWidgetProps {
  debt: DebtComment;
  onApply: (commentId: string) => Promise<void>;
}

export function DebtClearanceWidget({ debt, onApply }: DebtClearanceWidgetProps) {
  const [selectedOptId, setSelectedOptId] = useState(debt.options[0]?.id);
  const [isApplying, setIsApplying] = useState(false);

  const handleApply = async () => {
    setIsApplying(true);
    try {
      await onApply(debt.id);
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <section className="rounded-2xl bg-surface-container/60 border border-secondary/30 p-3.5 mb-4 shadow-xs">
      {/* Header & AI hint */}
      <div className="flex items-start gap-2 mb-2.5">
        <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">
          error_outline
        </span>
        <div className="flex-1">
          <h4 className="font-title-md text-xs text-primary font-bold leading-tight">
            Закрыть 2 долга перед посевом
          </h4>
          <p className="text-[11px] text-on-surface-variant">
            Для посева в «Шёлк и Стиль» требуется закрыть 2 долга по комментариям
          </p>
        </div>
      </div>

      {/* Target post preview */}
      <div className="p-2.5 rounded-xl bg-white/80 border border-outline-variant/40 mb-2.5">
        <span className="text-[10px] text-on-surface-variant font-mono block mb-1">
          {debt.postAuthor} • {debt.postTitle}
        </span>

        {/* Comment Options Radio */}
        <div className="space-y-1.5">
          {debt.options.map((opt) => (
            <label
              key={opt.id}
              className={`flex items-start gap-2 p-2 rounded-lg border text-xs cursor-pointer transition ${
                selectedOptId === opt.id
                  ? 'bg-primary-fixed/40 border-primary text-on-surface'
                  : 'bg-surface-container/30 border-outline-variant/30 text-on-surface-variant'
              }`}
            >
              <input
                type="radio"
                name="debt-comment"
                checked={selectedOptId === opt.id}
                onChange={() => setSelectedOptId(opt.id)}
                className="mt-0.5 text-primary focus:ring-primary"
              />
              <span className="flex-1 leading-snug">{opt.text}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Validation badge & Action */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 font-medium">
          {debt.validationBadge}
        </span>
        <button
          type="button"
          onClick={handleApply}
          disabled={debt.isApplied || isApplying}
          className={`px-3 py-1.5 rounded-xl text-xs font-title-md transition shadow-xs ${
            debt.isApplied
              ? 'bg-emerald-100 text-emerald-800 cursor-default'
              : 'bg-primary text-white hover:opacity-90 active:scale-95'
          }`}
        >
          {debt.isApplied ? 'Долг погашен ✅' : isApplying ? 'Применяем...' : 'Применить в очередь ✓'}
        </button>
      </div>
    </section>
  );
}
