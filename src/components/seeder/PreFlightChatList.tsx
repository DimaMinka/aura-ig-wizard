import type { PreFlightChat } from '../../types/seeder';

interface PreFlightChatListProps {
  chats: PreFlightChat[];
}

const BADGE_MAP = {
  emerald: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  amber: 'bg-amber-50 text-amber-800 border-amber-200',
  rose: 'bg-primary-fixed text-primary border-primary/30',
};

export function PreFlightChatList({ chats }: PreFlightChatListProps) {
  return (
    <section className="space-y-2 mb-4">
      <div className="flex items-center justify-between">
        <h3 className="font-headline-sm text-sm font-semibold text-on-surface">
          Статус квот и готовность чатов
        </h3>
        <span className="text-[11px] text-on-surface-variant font-medium">4 активных чата</span>
      </div>

      <div className="space-y-2">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className="flex flex-col p-3 rounded-xl glass-surface border border-outline-variant/60 shadow-xs gap-1.5"
          >
            {/* Top row: Chat Name & Status Badge */}
            <div className="flex items-center justify-between gap-2">
              <span className="font-title-md text-xs text-on-surface font-semibold truncate">
                {chat.name}
              </span>
              <span
                className={`shrink-0 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                  BADGE_MAP[chat.badgeVariant]
                }`}
              >
                {chat.statusLabel}
              </span>
            </div>

            {/* Bottom row: Quota & Meta Text */}
            <div className="flex items-center justify-between text-[11px] text-on-surface-variant">
              <span className="truncate">{chat.quotaText}</span>
              <span className="shrink-0 text-[10px] font-mono opacity-80">{chat.template}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
