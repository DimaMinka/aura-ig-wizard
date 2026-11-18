import { useAgent } from '../../services/AgentContext';

interface TopSafetyBarProps {
  onOpenModeSheet?: () => void;
}

export function TopSafetyBar({ onOpenModeSheet }: TopSafetyBarProps) {
  const { config, setIsModeSheetOpen } = useAgent();

  const handleModeClick = () => {
    if (onOpenModeSheet) onOpenModeSheet();
    else setIsModeSheetOpen(true);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-surface/85 backdrop-blur-xl shadow-[0_4px_24px_rgba(140,78,53,0.05)] border-b border-outline-variant/40">
      <div className="max-w-[430px] mx-auto h-16 px-4 flex items-center justify-between gap-2">
        {/* Brand & Logo */}
        <div className="flex items-center gap-1.5 min-w-0 flex-1">
          <span className="font-headline-md text-[17px] tracking-tight text-on-surface truncate">
            Aura IG <span className="text-outline-variant font-light">•</span> AI Agent
          </span>
          <span className="text-[13px] text-secondary select-none shrink-0">✨</span>
        </div>

        {/* Safety Pill & Mode Trigger */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleModeClick}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full glass-pill text-left transition active:scale-95 hover:border-primary/40 shadow-sm"
            title="Нажмите для переключения режима Мок / Live"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="font-label-sm text-[10px] uppercase tracking-wider text-on-surface-variant font-medium">
              14/20 ч <span className="text-outline-variant">•</span> 92/150
            </span>
            <span className="ml-0.5 px-1.5 py-0.2 rounded-md bg-primary-fixed text-primary font-bold text-[9px] uppercase">
              {config.mode === 'mock' ? 'Мок' : 'Live'}
            </span>
          </button>

          {/* User profile avatar */}
          <button
            type="button"
            onClick={handleModeClick}
            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 shadow-[0_2px_8px_rgba(140,78,53,0.25)] transition active:scale-95"
            aria-label="Профиль и настройки режима агента"
          >
            <img src="./assets/avatar_admin.svg" alt="Admin" className="w-full h-full rounded-full object-cover" />
          </button>
        </div>
      </div>
    </header>
  );
}
