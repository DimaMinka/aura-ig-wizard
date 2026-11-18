import { AgentProvider, useAgent } from './services/AgentContext';
import { AppShell } from './components/layout/AppShell';
import { WizardHubScreen } from './screens/WizardHubScreen';
import { PostSeedScreen } from './screens/PostSeedScreen';
import { ReciprocityScreen } from './screens/ReciprocityScreen';
import { ChatsRadarScreen } from './screens/ChatsRadarScreen';

function AppContent() {
  const { activeTab } = useAgent();

  const getPlaceholder = () => {
    switch (activeTab) {
      case 'seeder':
        return 'Спроси: «Проверь квоту в Бьюти Круг»...';
      case 'reciprocity':
        return 'Спроси: «Отправь открытку в чат Бьюти Круг»...';
      case 'radar':
        return 'Спроси: «Отключи неэффективные чаты и обнови радар»...';
      default:
        return 'Спроси визарда о посеве, очереди или чатах...';
    }
  };

  const getChips = () => {
    switch (activeTab) {
      case 'seeder':
        return ['✨ Закрой долги в Шёлк и Стиль', '⏱️ Выбери слот по квотам'];
      case 'reciprocity':
        return ['💖 Скачай открытку 88%', '🔍 Проверь молчунов Silent Leech'];
      case 'radar':
        return ['🟡 Переведи Шёлк в Light', '💌 Сгенерируй lead-pitch'];
      default:
        return ['✨ Подготовь комменты для очереди', '🔍 Проверь должников по лайкам'];
    }
  };

  return (
    <AppShell promptPlaceholder={getPlaceholder()} chips={getChips()}>
      {activeTab === 'wizard' && <WizardHubScreen />}
      {activeTab === 'seeder' && <PostSeedScreen />}
      {activeTab === 'reciprocity' && <ReciprocityScreen />}
      {activeTab === 'radar' && <ChatsRadarScreen />}
    </AppShell>
  );
}

export function App() {
  return (
    <AgentProvider>
      <AppContent />
    </AgentProvider>
  );
}

export default App;
