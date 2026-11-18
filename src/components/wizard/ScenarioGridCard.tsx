import { useAgent } from '../../services/AgentContext';
import { initialScenarios } from '../../mocks/wizard.mock';
import type { ScenarioItem, ScenarioBadgeVariant } from '../../types/wizard';

const BADGE_STYLES: Record<ScenarioBadgeVariant, string> = {
  gold: 'bg-secondary-fixed/80 text-secondary border-secondary/20',
  lavender: 'bg-tertiary-fixed text-tertiary border-tertiary/20',
  rose: 'bg-primary-fixed text-primary border-primary/20',
  emerald: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  amber: 'bg-amber-50 text-amber-800 border-amber-200',
};

export function ScenarioGridCard() {
  const { setActiveTab, sendAiPrompt } = useAgent();

  const handleCardClick = (item: ScenarioItem) => {
    if (item.targetTab) {
      setActiveTab(item.targetTab);
    } else {
      sendAiPrompt(item.title);
    }
  };

  return (
    <section className="space-y-2 mb-6">
      <h2 className="font-headline-sm text-headline-sm text-on-surface">
        Сценарии визарда
      </h2>
      <div className="grid grid-cols-2 gap-2.5">
        {initialScenarios.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => handleCardClick(item)}
            className="flex flex-col text-left p-3.5 rounded-2xl glass-surface border border-outline-variant/70 shadow-xs hover:border-primary/40 hover:shadow-sm active:scale-97 transition relative overflow-hidden group"
          >
            <div className="flex items-start justify-between w-full mb-2">
              <span className="material-symbols-outlined text-[22px] text-primary group-hover:scale-110 transition-transform">
                {item.icon}
              </span>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                  BADGE_STYLES[item.badgeVariant]
                }`}
              >
                {item.badge}
              </span>
            </div>

            <h3 className="font-title-md text-[13px] text-on-surface leading-tight mb-1 group-hover:text-primary transition-colors">
              {item.title}
            </h3>
            <p className="font-body-sm text-[10px] text-on-surface-variant line-clamp-1">
              {item.subtitle}
            </p>
          </button>
        ))}
      </div>
    </section>
  );
}
