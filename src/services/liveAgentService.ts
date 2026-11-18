import type { IAgentService } from './agentService';
import { MockAgentService } from './mockAgentService';
import type { SafetyStatus, QueueSummary } from '../types/wizard';
import type { PreFlightChat, DebtComment } from '../types/seeder';
import type { ReciprocitySummary, ParticipantRow } from '../types/reciprocity';
import type { ChatRoiItem, RadarMessage } from '../types/radar';
import type { AiCommandResponse } from '../types/agent';

export class LiveAgentService implements IAgentService {
  private fallback = new MockAgentService();
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async fetchApi<T>(endpoint: string, options?: RequestInit, fallbackFn?: () => Promise<T>): Promise<T> {
    try {
      const resp = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: { 'Content-Type': 'application/json' },
        ...options,
      });
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      return await resp.json();
    } catch {
      if (fallbackFn) return fallbackFn();
      throw new Error(`Live API unavailable at ${this.baseUrl}`);
    }
  }

  async checkHealth(): Promise<boolean> {
    try {
      const res = await fetch(`${this.baseUrl}/health`, { method: 'GET', signal: AbortSignal.timeout(3000) });
      return res.ok;
    } catch {
      return false;
    }
  }

  getSafetyStatus(): Promise<SafetyStatus> {
    return this.fetchApi('/safety-status', {}, () => this.fallback.getSafetyStatus());
  }

  getQueueSummary(): Promise<QueueSummary> {
    return this.fetchApi('/queue-summary', {}, () => this.fallback.getQueueSummary());
  }

  fetchPosts24h(): Promise<QueueSummary> {
    return this.fetchApi('/queue/fetch-24h', { method: 'POST' }, () => this.fallback.fetchPosts24h());
  }

  clearOldQueue(): Promise<QueueSummary> {
    return this.fetchApi('/queue/clear-old', { method: 'POST' }, () => this.fallback.clearOldQueue());
  }

  getPreFlightChats(): Promise<PreFlightChat[]> {
    return this.fetchApi('/seeder/pre-flight', {}, () => this.fallback.getPreFlightChats());
  }

  getDebtComment(): Promise<DebtComment> {
    return this.fetchApi('/seeder/debt-comments', {}, () => this.fallback.getDebtComment());
  }

  applyDebtComments(commentId: string): Promise<boolean> {
    return this.fetchApi('/seeder/apply-debt', { method: 'POST', body: JSON.stringify({ commentId }) }, () =>
      this.fallback.applyDebtComments(commentId)
    );
  }

  planSeeding(scheduleId: string): Promise<{ success: boolean; scheduledTime: string }> {
    return this.fetchApi('/seeder/plan', { method: 'POST', body: JSON.stringify({ scheduleId }) }, () =>
      this.fallback.planSeeding(scheduleId)
    );
  }

  getReciprocitySummary(): Promise<ReciprocitySummary> {
    return this.fetchApi('/reciprocity/summary', {}, () => this.fallback.getReciprocitySummary());
  }

  getParticipants(): Promise<ParticipantRow[]> {
    return this.fetchApi('/reciprocity/participants', {}, () => this.fallback.getParticipants());
  }

  toggleSilentLeech(hide: boolean): Promise<ParticipantRow[]> {
    return this.fallback.toggleSilentLeech(hide);
  }

  getChatRoiItems(): Promise<ChatRoiItem[]> {
    return this.fetchApi('/chats/roi', {}, () => this.fallback.getChatRoiItems());
  }

  switchChatToLight(chatId: string): Promise<ChatRoiItem> {
    return this.fetchApi(`/chats/${chatId}/switch-light`, { method: 'POST' }, () =>
      this.fallback.switchChatToLight(chatId)
    );
  }

  archiveChat(chatId: string): Promise<ChatRoiItem> {
    return this.fetchApi(`/chats/${chatId}/archive`, { method: 'POST' }, () => this.fallback.archiveChat(chatId));
  }

  getRadarMessages(): Promise<RadarMessage[]> {
    return this.fetchApi('/radar/messages', {}, () => this.fallback.getRadarMessages());
  }

  markRadarRead(messageId: string): Promise<boolean> {
    return this.fetchApi(`/radar/messages/${messageId}/read`, { method: 'POST' }, () =>
      this.fallback.markRadarRead(messageId)
    );
  }

  askAgent(prompt: string): Promise<AiCommandResponse> {
    return this.fetchApi('/agent/ask', { method: 'POST', body: JSON.stringify({ prompt }) }, () =>
      this.fallback.askAgent(prompt)
    );
  }
}
