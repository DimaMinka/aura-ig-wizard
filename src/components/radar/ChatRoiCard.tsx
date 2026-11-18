import type { ChatRoiItem } from '../../types/radar';

interface ChatRoiCardProps {
  items: ChatRoiItem[];
  onSwitchLight: (chatId: string) => Promise<void>;
  onArchive: (chatId: string) => Promise<void>;
  onPitch: (chatId: string) => void;
}

const BADGE_MAP = {
  emerald: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  amber: 'bg-amber-50 text-amber-800 border-amber-200',
  rose: 'bg-primary-fixed text-primary border-primary/30',
};

export function ChatRoiCard({ items, onSwitchLight, onArchive, onPitch }: ChatRoiCardProps) {
  return (
    <section className="space-y-2 mb-4">
      <div className="flex items-center justify-between">
        <h3 className="font-headline-sm text-sm font-semibold text-on-surface">
          Рейтинг эффективности чатов (ROI)
        </h3>
        <span className="text-[11px] text-on-surface-variant font-medium">3 чата</span>
      </div>

      <div className="space-y-2.5">
        {items.map((item) => (
          <div
            key={item.id}
            className={`p-3.5 rounded-2xl glass-surface border shadow-xs transition ${
              item.archived ? 'opacity-60 border-outline-variant/30' : 'border-outline-variant/70'
            }`}
          >
            {/* Header: Name, Score & Verdict */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="font-title-md text-xs font-bold text-on-surface truncate">
                  {item.name}
                </span>
                <span className="font-display-lg text-xs font-bold text-primary">
                  {item.score}/100
                </span>
              </div>
              <span
                className={`text-[9px] font-bold px-2 py-0.5 rounded-full border shrink-0 uppercase ${
                  BADGE_MAP[item.badgeVariant]
                }`}
              >
                {item.verdictLabel}
              </span>
            </div>

            {/* 4 Mini metrics */}
            <div className="grid grid-cols-4 gap-1 p-1.5 rounded-xl bg-surface-container/50 text-[10px] text-center mb-2 font-mono">
              <div><span className="block opacity-60">Акт</span>{item.metrics.vitality}</div>
              <div><span className="block opacity-60">Отд</span>{item.metrics.reciprocity}</div>
              <div><span className="block opacity-60">Лёг</span>{item.metrics.cost}</div>
              <div><span className="block opacity-60">Чис</span>{item.metrics.hygiene}</div>
            </div>

            {/* Rules chips */}
            <div className="flex flex-wrap gap-1 mb-2">
              {item.rules.map((r) => (
                <span key={r.label} className="text-[9px] px-1.5 py-0.5 rounded-md bg-white border border-outline-variant/40 text-on-surface-variant">
                  {r.label}
                </span>
              ))}
            </div>

            {/* AI Hint & Interactive Actions */}
            {item.hint && !item.lightMode && (
              <div className="p-2 rounded-xl bg-secondary-fixed/30 border border-secondary/20 text-[11px] text-secondary mb-2 flex items-center justify-between gap-2">
                <span className="leading-snug">{item.hint}</span>
                <button
                  type="button"
                  onClick={() => onSwitchLight(item.id)}
                  className="px-2.5 py-1 rounded-lg bg-primary text-white text-[10px] font-bold shrink-0 shadow-xs hover:opacity-90"
                >
                  В Light
                </button>
              </div>
            )}

            {item.verdict === 'RETIRE' && !item.archived && (
              <div className="flex gap-2 pt-1 border-t border-outline-variant/30">
                <button
                  type="button"
                  onClick={() => onArchive(item.id)}
                  className="flex-1 py-1.5 rounded-lg bg-white border border-outline-variant text-[10px] text-on-surface font-title-md hover:bg-surface-container"
                >
                  В архив ({item.mutualCount} авторов)
                </button>
                <button
                  type="button"
                  onClick={() => onPitch(item.id)}
                  className="px-2.5 py-1.5 rounded-lg bg-primary-fixed text-primary text-[10px] font-title-md hover:opacity-80"
                >
                  Питч 💌
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
