export type AgentMode = 'mock' | 'live';

export interface AgentConfig {
  mode: AgentMode;
  apiBaseUrl: string;
  isConnected: boolean;
  lastCheckedAt?: string;
}

export interface AiThinkingStep {
  id: string;
  text: string;
  status: 'done' | 'active' | 'pending';
}

export interface AiCommandResponse {
  id: string;
  query: string;
  title: string;
  summary: string;
  steps: AiThinkingStep[];
  timestamp: string;
  badge?: string;
}
