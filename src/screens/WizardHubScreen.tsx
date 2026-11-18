import { SectionHeader } from '../components/common/SectionHeader';
import { QueueMasterCard } from '../components/wizard/QueueMasterCard';
import { ScenarioGridCard } from '../components/wizard/ScenarioGridCard';

export function WizardHubScreen() {
  return (
    <div className="flex flex-col w-full pb-4">
      <SectionHeader
        badge="Синтетический интеллект v4.2"
        title="Привет! Что запускаем сегодня?"
        subtitle="ИИ-помощник активностей IG и взаимных чатов готов к работе"
      />
      <QueueMasterCard />
      <ScenarioGridCard />
    </div>
  );
}
