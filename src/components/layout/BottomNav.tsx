import { useAgent, type ActiveTab } from '../../services/AgentContext';

interface TabItem {
  id: ActiveTab;
  label: string;
  icon: string;
}

const TABS: TabItem[] = [
  { id: 'wizard', label: 'Визард', icon: 'auto_awesome' },
  { id: 'seeder', label: 'Посев & ИИ', icon: 'rocket_launch' },
  { id: 'reciprocity', label: 'Взаимность', icon: 'favorite' },
  { id: 'radar', label: 'Чаты & Радар', icon: 'diamond' },
];

export function BottomNav() {
  const { activeTab, setActiveTab } = useAgent();

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-40 bg-surface/90 backdrop-blur-xl border-t border-outline-variant/60 shadow-[0_-4px_24px_rgba(140,78,53,0.06)]"
      aria-label="Основная навигация приложения"
    >
      <div className="max-w-[430px] mx-auto h-16 px-2 flex items-center justify-around">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center py-1 relative transition-colors ${
                isActive ? 'text-primary font-semibold' : 'text-on-surface-variant/70 hover:text-on-surface'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <div
                className={`flex items-center justify-center w-10 h-7 rounded-full transition-all ${
                  isActive ? 'bg-primary-fixed/80 scale-105 shadow-sm' : ''
                }`}
              >
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {tab.icon}
                </span>
              </div>
              <span className="text-[11px] font-title-md tracking-tight mt-0.5 whitespace-nowrap">
                {tab.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-primary absolute bottom-0.5 shadow-sm" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
