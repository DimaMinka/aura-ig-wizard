import type { SafetyStatus, QueueSummary } from '../types/wizard';
import type { PreFlightChat, DebtComment } from '../types/seeder';
import type { ReciprocitySummary, ParticipantRow } from '../types/reciprocity';
import type { ChatRoiItem, RadarMessage } from '../types/radar';
import type { AiCommandResponse } from '../types/agent';

export interface IAgentService {
  getSafetyStatus(): Promise<SafetyStatus>;
  getQueueSummary(): Promise<QueueSummary>;
  fetchPosts24h(): Promise<QueueSummary>;
  clearOldQueue(): Promise<QueueSummary>;
  getPreFlightChats(): Promise<PreFlightChat[]>;
  getDebtComment(): Promise<DebtComment>;
  applyDebtComments(commentId: string): Promise<boolean>;
  planSeeding(scheduleId: string): Promise<{ success: boolean; scheduledTime: string }>;
  getReciprocitySummary(): Promise<ReciprocitySummary>;
  getParticipants(): Promise<ParticipantRow[]>;
  toggleSilentLeech(hide: boolean): Promise<ParticipantRow[]>;
  getChatRoiItems(): Promise<ChatRoiItem[]>;
  switchChatToLight(chatId: string): Promise<ChatRoiItem>;
  archiveChat(chatId: string): Promise<ChatRoiItem>;
  getRadarMessages(): Promise<RadarMessage[]>;
  markRadarRead(messageId: string): Promise<boolean>;
  askAgent(prompt: string): Promise<AiCommandResponse>;
  checkHealth(): Promise<boolean>;
}
