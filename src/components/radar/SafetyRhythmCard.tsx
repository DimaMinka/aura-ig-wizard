import type { SafetyStatus } from '../../types/wizard';

interface SafetyRhythmCardProps {
  status: SafetyStatus;
}

export function SafetyRhythmCard({ status }: SafetyRhythmCardProps) {
  const percent1h = Math.round((status.total1h / status.limit1h) * 100);
  const percent24h = Math.round((status.total24h / status.limit24h) * 100);

  return (
    <section className="rounded-2xl glass-surface border border-outline-variant p-4 shadow-sm mb-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-headline-sm text-sm font-semibold text-on-surface">
          Ритм аккаунта и лимиты
        </h3>
        <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200 uppercase">
          🟢 {status.statusLabel}
        </span>
      </div>

      <div className="space-y-2.5 mb-3">
        {/* 1 hour progress */}
        <div>
          <div className="flex justify-between text-[11px] mb-1 text-on-surface-variant">
            <span>За 1 час: {status.total1h} / {status.limit1h} действий</span>
            <span className="font-bold text-primary">{percent1h}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-surface-container overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all"
              style={{ width: `${percent1h}%` }}
            />
          </div>
        </div>

        {/* 24 hours progress */}
        <div>
          <div className="flex justify-between text-[11px] mb-1 text-on-surface-variant">
            <span>За 24 часа: {status.total24h} / {status.limit24h} действий</span>
            <span className="font-bold text-primary">{percent24h}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-surface-container overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all"
              style={{ width: `${percent24h}%` }}
            />
          </div>
        </div>
      </div>

      {/* Strategy Pill */}
      <div className="p-2 rounded-xl bg-primary-fixed/30 border border-primary/20 text-[11px] text-primary flex items-center justify-between font-title-md">
        <span>{status.strategy}</span>
        <span className="font-bold text-[10px] uppercase">HITL ✓</span>
      </div>
    </section>
  );
}
