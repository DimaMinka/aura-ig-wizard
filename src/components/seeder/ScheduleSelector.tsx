import { useState } from 'react';
import type { ScheduleOption } from '../../types/seeder';

interface ScheduleSelectorProps {
  options: ScheduleOption[];
  onConfirm: (scheduleId: string) => Promise<void>;
}

export function ScheduleSelector({ options, onConfirm }: ScheduleSelectorProps) {
  const [selectedId, setSelectedId] = useState(
    options.find((o) => o.isRecommended)?.id || options[0]?.id
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedTime, setConfirmedTime] = useState<string | null>(null);

  const handleConfirm = async () => {
    setIsSubmitting(true);
    try {
      await onConfirm(selectedId);
      const opt = options.find((o) => o.id === selectedId);
      setConfirmedTime(opt ? opt.label : 'Запланировано');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="space-y-3 mb-6">
      <div className="flex items-center justify-between">
        <h4 className="font-headline-sm text-sm font-semibold text-on-surface">
          Время публикации в чаты
        </h4>
        <span className="text-[11px] text-on-surface-variant font-medium">Умный тайминг</span>
      </div>

      {/* Chips */}
      <div className="grid grid-cols-2 gap-2">
        {options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => setSelectedId(opt.id)}
            className={`py-2 px-3 rounded-xl text-xs font-title-md border transition text-center ${
              selectedId === opt.id
                ? 'bg-secondary-fixed text-secondary border-secondary/40 shadow-xs font-bold'
                : 'bg-white/80 text-on-surface-variant border-outline-variant/60 hover:bg-white'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Primary CTA */}
      <div className="pt-2">
        <button
          type="button"
          onClick={handleConfirm}
          disabled={isSubmitting || !!confirmedTime}
          className="w-full py-3 px-4 rounded-xl bg-primary text-white font-title-md text-sm shadow-md hover:opacity-90 active:scale-98 transition flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-[18px]">send</span>
          <span>
            {confirmedTime ? `Посев запланирован: ${confirmedTime} ✅` : isSubmitting ? 'Планируем...' : 'Утвердить комменты и запланировать посев ✨'}
          </span>
        </button>
        <p className="text-[10px] text-center text-on-surface-variant mt-1.5 font-light">
          Автоматически отправит в чаты по расписанию с паузами безопасности (3–7 мин).
        </p>
      </div>
    </section>
  );
}
