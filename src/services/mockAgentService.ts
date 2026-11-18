import type { IAgentService } from './agentService';
import type { SafetyStatus, QueueSummary } from '../types/wizard';
import type { PreFlightChat, DebtComment } from '../types/seeder';
import type { ReciprocitySummary, ParticipantRow } from '../types/reciprocity';
import type { ChatRoiItem, RadarMessage } from '../types/radar';
import type { AiCommandResponse } from '../types/agent';
import { initialSafetyStatus, initialQueueSummary } from '../mocks/wizard.mock';
import { initialPreFlightChats, initialDebtComment } from '../mocks/seeder.mock';
import { initialReciprocitySummary, initialParticipants } from '../mocks/reciprocity.mock';
import { initialChatRoiItems, initialRadarMessages } from '../mocks/radar.mock';
import { mockAiResponses } from '../mocks/aiResponses.mock';

export class MockAgentService implements IAgentService {
  private queue = { ...initialQueueSummary };
  private chats = initialPreFlightChats.map((c) => ({ ...c }));
  private debt = { ...initialDebtComment };
  private participants = initialParticipants.map((p) => ({ ...p }));
  private roiItems = initialChatRoiItems.map((r) => ({ ...r }));
  private messages = initialRadarMessages.map((m) => ({ ...m }));

  async getSafetyStatus(): Promise<SafetyStatus> {
    return { ...initialSafetyStatus };
  }

  async getQueueSummary(): Promise<QueueSummary> {
    return { ...this.queue };
  }

  async fetchPosts24h(): Promise<QueueSummary> {
    this.queue = { totalPosts: 24, heavyCount: 15, lightCount: 9, overdueCount: 0, syncedMinutesAgo: 0 };
    return { ...this.queue };
  }

  async clearOldQueue(): Promise<QueueSummary> {
    this.queue = { totalPosts: 12, heavyCount: 8, lightCount: 4, overdueCount: 0, syncedMinutesAgo: 0 };
    return { ...this.queue };
  }

  async getPreFlightChats(): Promise<PreFlightChat[]> {
    return this.chats.map((c) => ({ ...c }));
  }

  async getDebtComment(): Promise<DebtComment> {
    return { ...this.debt };
  }

  async applyDebtComments(_commentId: string): Promise<boolean> {
    this.debt.isApplied = true;
    this.chats = this.chats.map((c) =>
      c.id === 'silk-style'
        ? { ...c, status: 'READY', statusLabel: 'Готов ✅', badgeVariant: 'emerald', debtCount: 0, quotaText: 'Квота 0/1 • Долгов: 0' }
        : c
    );
    return true;
  }

  async planSeeding(scheduleId: string): Promise<{ success: boolean; scheduledTime: string }> {
    const times: Record<string, string> = { now: 'Прямо сейчас', morning: 'Завтра в 08:30', plus2h: 'Через 2 часа', smart: 'Умно: слот 14:20 ✨' };
    return { success: true, scheduledTime: times[scheduleId] || 'По расписанию' };
  }

  async getReciprocitySummary(): Promise<ReciprocitySummary> {
    return { ...initialReciprocitySummary };
  }

  async getParticipants(): Promise<ParticipantRow[]> {
    return this.participants.map((p) => ({ ...p }));
  }

  async toggleSilentLeech(hide: boolean): Promise<ParticipantRow[]> {
    this.participants = this.participants.map((p) =>
      p.archetype === 'GHOST_PARASITE' || p.archetype === 'SILENT_LEECH' ? { ...p, hidden: hide } : p
    );
    return this.participants.map((p) => ({ ...p }));
  }

  async getChatRoiItems(): Promise<ChatRoiItem[]> {
    return this.roiItems.map((r) => ({ ...r }));
  }

  async switchChatToLight(chatId: string): Promise<ChatRoiItem> {
    this.roiItems = this.roiItems.map((r) =>
      r.id === chatId ? { ...r, verdict: 'SWITCH_TO_LIGHT', verdictLabel: 'ЛАЙТ-РЕЖИМ ✅', badgeVariant: 'emerald', lightMode: true } : r
    );
    return this.roiItems.find((r) => r.id === chatId)!;
  }

  async archiveChat(chatId: string): Promise<ChatRoiItem> {
    this.roiItems = this.roiItems.map((r) =>
      r.id === chatId ? { ...r, verdictLabel: 'В АРХИВЕ 📦', archived: true } : r
    );
    return this.roiItems.find((r) => r.id === chatId)!;
  }

  async getRadarMessages(): Promise<RadarMessage[]> {
    return this.messages.map((m) => ({ ...m }));
  }

  async markRadarRead(messageId: string): Promise<boolean> {
    this.messages = this.messages.map((m) => (m.id === messageId ? { ...m, isRead: true } : m));
    return true;
  }

  async askAgent(prompt: string): Promise<AiCommandResponse> {
    const lower = prompt.toLowerCase();
    if (lower.includes('коммент')) return mockAiResponses.comments;
    if (lower.includes('долж') || lower.includes('лайк')) return mockAiResponses.debtors;
    return { ...mockAiResponses.default, query: prompt };
  }

  async checkHealth(): Promise<boolean> {
    return true;
  }
}
