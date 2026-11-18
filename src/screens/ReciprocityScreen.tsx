import { useState, useEffect } from 'react';
import { useAgent } from '../services/AgentContext';
import { SectionHeader } from '../components/common/SectionHeader';
import { ConversionHeroCard } from '../components/reciprocity/ConversionHeroCard';
import { ParticipantStatusList } from '../components/reciprocity/ParticipantStatusList';
import { ShareCardPreview } from '../components/reciprocity/ShareCardPreview';
import type { ReciprocitySummary, ParticipantRow } from '../types/reciprocity';

export function ReciprocityScreen() {
  const { service } = useAgent();
  const [summary, setSummary] = useState<ReciprocitySummary | null>(null);
  const [participants, setParticipants] = useState<ParticipantRow[]>([]);

  useEffect(() => {
    service.getReciprocitySummary().then(setSummary);
    service.getParticipants().then(setParticipants);
  }, [service]);

  const handleToggleSilent = async (hide: boolean) => {
    const updated = await service.toggleSilentLeech(hide);
    setParticipants(updated);
  };

  return (
    <div className="flex flex-col w-full pb-4">
      <SectionHeader
        badge="GHOST AUDITOR • ПОСТ ЗА 48 ЧАСОВ"
        title="Отчёт взаимности"
        subtitle="Чат «Бьюти Круг» • Аудит завершён 10 мин назад ✅"
      />
      {summary && <ConversionHeroCard summary={summary} />}
      <ParticipantStatusList participants={participants} />
      <ShareCardPreview onToggleSilent={handleToggleSilent} />
    </div>
  );
}
