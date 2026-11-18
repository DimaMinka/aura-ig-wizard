import type { ReciprocitySummary } from '../../types/reciprocity';

interface ConversionHeroCardProps {
  summary: ReciprocitySummary;
}

export function ConversionHeroCard({ summary }: ConversionHeroCardProps) {
  return (
    <section className="relative overflow-hidden rounded-2xl glass-surface border border-outline-variant p-4 shadow-sm mb-4">
      <div className="absolute -left-10 -top-10 w-32 h-32 rounded-full bg-primary-fixed/40 blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col space-y-3">
        {/* Main Big Metric */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display-lg text-[44px] text-primary font-bold leading-none tracking-tight">
                {summary.percentage}%
              </span>
              <span className="font-title-md text-sm text-on-surface font-semibold">
                Взаимности 💖
              </span>
            </div>
            <p className="font-body-sm text-xs text-on-surface-variant mt-1">
              {summary.reciprocalCount} из {summary.totalCount} участниц вернули актив за {summary.windowHours}ч
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-secondary-fixed text-secondary text-[10px] font-bold uppercase tracking-wider">
            High Aura ✨
          </span>
        </div>

        {/* 3 Channels Verification Grid */}
        <div className="grid grid-cols-3 gap-2 pt-1 border-t border-outline-variant/40">
          {summary.channels.map((ch) => (
            <div
              key={ch.channel}
              className="flex flex-col items-center justify-center p-2 rounded-xl bg-surface-container/60 border border-outline-variant/30 text-center"
            >
              <span className="font-title-md text-xs text-primary font-bold">{ch.label}</span>
              <span className="font-display-lg text-sm text-on-surface font-semibold">{ch.count}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
