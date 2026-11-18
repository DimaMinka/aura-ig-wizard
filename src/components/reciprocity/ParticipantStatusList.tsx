import type { ParticipantRow } from '../../types/reciprocity';

interface ParticipantStatusListProps {
  participants: ParticipantRow[];
}

const BADGE_STYLES = {
  rose: 'bg-primary-fixed text-primary border-primary/30',
  lavender: 'bg-tertiary-fixed text-tertiary border-tertiary/30',
  gold: 'bg-secondary-fixed text-secondary border-secondary/30',
  muted: 'bg-surface-container text-on-surface-variant border-outline-variant/60',
};

export function ParticipantStatusList({ participants }: ParticipantStatusListProps) {
  const visible = participants.filter((p) => !p.hidden);

  return (
    <section className="space-y-2 mb-4">
      <div className="flex items-center justify-between">
        <h3 className="font-headline-sm text-sm font-semibold text-on-surface">
          Верифицированные статусы участниц
        </h3>
        <span className="text-[11px] text-on-surface-variant font-medium">
          {visible.length} в списке
        </span>
      </div>

      <div className="space-y-2">
        {visible.map((p) => (
          <div
            key={p.id}
            className="flex items-center gap-3 p-2.5 rounded-xl glass-surface border border-outline-variant/60 shadow-xs"
          >
            {/* Avatar */}
            <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 border border-outline-variant/60">
              <img src={p.avatarSvg} alt={p.handle} className="w-full h-full object-cover" />
            </div>

            {/* Handle & Channel Subtext */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <span className="font-title-md text-xs text-on-surface font-bold truncate">
                  {p.handle}
                </span>
                <span
                  className={`text-[9px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${
                    BADGE_STYLES[p.badgeVariant]
                  }`}
                >
                  {p.archetypeLabel}
                </span>
              </div>
              <p className="font-body-sm text-[10px] text-on-surface-variant truncate mt-0.5">
                {p.channels}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
