import { useState, useEffect } from 'react';
import { useAgent } from '../services/AgentContext';
import { SectionHeader } from '../components/common/SectionHeader';
import { SafetyRhythmCard } from '../components/radar/SafetyRhythmCard';
import { ChatRoiCard } from '../components/radar/ChatRoiCard';
import { SemanticRadarSection } from '../components/radar/SemanticRadarSection';
import { initialRadarCategories } from '../mocks/radar.mock';
import type { SafetyStatus } from '../types/wizard';
import type { ChatRoiItem, RadarMessage } from '../types/radar';

export function ChatsRadarScreen() {
  const { service, sendAiPrompt } = useAgent();
  const [safety, setSafety] = useState<SafetyStatus | null>(null);
  const [roiItems, setRoiItems] = useState<ChatRoiItem[]>([]);
  const [messages, setMessages] = useState<RadarMessage[]>([]);

  useEffect(() => {
    service.getSafetyStatus().then(setSafety);
    service.getChatRoiItems().then(setRoiItems);
    service.getRadarMessages().then(setMessages);
  }, [service]);

  const handleSwitchLight = async (chatId: string) => {
    await service.switchChatToLight(chatId);
    const updated = await service.getChatRoiItems();
    setRoiItems(updated);
  };

  const handleArchive = async (chatId: string) => {
    await service.archiveChat(chatId);
    const updated = await service.getChatRoiItems();
    setRoiItems(updated);
  };

  const handlePitch = (chatId: string) => {
    sendAiPrompt(`Сгенерируй персонализированный питч в Direct для чата ${chatId}`);
  };

  const handleMarkRead = async (messageId: string) => {
    await service.markRadarRead(messageId);
    const updated = await service.getRadarMessages();
    setMessages(updated);
  };

  return (
    <div className="flex flex-col w-full pb-4">
      <SectionHeader
        badge="AI AUDIT & RADAR"
        title="Чаты и Радар"
        subtitle="HITL-контроль лимитов, скоринг взаимности и сканер упоминаний в TG"
      />
      {safety && <SafetyRhythmCard status={safety} />}
      <ChatRoiCard
        items={roiItems}
        onSwitchLight={handleSwitchLight}
        onArchive={handleArchive}
        onPitch={handlePitch}
      />
      <SemanticRadarSection
        categories={initialRadarCategories}
        messages={messages}
        onMarkRead={handleMarkRead}
      />
    </div>
  );
}
