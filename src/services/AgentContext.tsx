import { createContext, useContext, useState, useMemo, useCallback, type ReactNode } from 'react';
import type { AgentMode, AgentConfig, AiCommandResponse } from '../types/agent';
import type { IAgentService } from './agentService';
import { MockAgentService } from './mockAgentService';
import { LiveAgentService } from './liveAgentService';

export type ActiveTab = 'wizard' | 'seeder' | 'reciprocity' | 'radar';

interface AgentContextValue {
  config: AgentConfig;
  setMode: (mode: AgentMode) => void;
  setApiBaseUrl: (url: string) => void;
  service: IAgentService;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  aiResponse: AiCommandResponse | null;
  setAiResponse: (resp: AiCommandResponse | null) => void;
  isAiThinking: boolean;
  sendAiPrompt: (prompt: string) => Promise<void>;
  isModeSheetOpen: boolean;
  setIsModeSheetOpen: (open: boolean) => void;
  resetAllDemoState: () => void;
}

const AgentContext = createContext<AgentContextValue | null>(null);

const STORAGE_MODE_KEY = 'aura_agent_mode';
const STORAGE_URL_KEY = 'aura_agent_api_url';
const DEFAULT_URL = 'http://127.0.0.1:8787/api';

export function AgentProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<AgentMode>(() =>
    (localStorage.getItem(STORAGE_MODE_KEY) as AgentMode) || 'mock'
  );
  const [apiBaseUrl, setApiBaseUrlState] = useState<string>(() =>
    localStorage.getItem(STORAGE_URL_KEY) || DEFAULT_URL
  );
  const [activeTab, setActiveTab] = useState<ActiveTab>('wizard');
  const [aiResponse, setAiResponse] = useState<AiCommandResponse | null>(null);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [isModeSheetOpen, setIsModeSheetOpen] = useState(false);
  const [mockSeed, setMockSeed] = useState(0);

  const setMode = useCallback((newMode: AgentMode) => {
    setModeState(newMode);
    localStorage.setItem(STORAGE_MODE_KEY, newMode);
  }, []);

  const setApiBaseUrl = useCallback((newUrl: string) => {
    setApiBaseUrlState(newUrl);
    localStorage.setItem(STORAGE_URL_KEY, newUrl);
  }, []);

  const service = useMemo<IAgentService>(() => {
    // mockSeed is a dependency to reset state
    if (mockSeed < 0) return new MockAgentService();
    return mode === 'live' ? new LiveAgentService(apiBaseUrl) : new MockAgentService();
  }, [mode, apiBaseUrl, mockSeed]);

  const sendAiPrompt = useCallback(
    async (prompt: string) => {
      if (!prompt.trim()) return;
      setIsAiThinking(true);
      try {
        await new Promise((r) => setTimeout(r, 650));
        const res = await service.askAgent(prompt);
        setAiResponse(res);
      } finally {
        setIsAiThinking(false);
      }
    },
    [service]
  );

  const resetAllDemoState = useCallback(() => {
    setMockSeed((s) => s + 1);
    setAiResponse(null);
  }, []);

  const value = useMemo(
    () => ({
      config: { mode, apiBaseUrl, isConnected: mode === 'mock' },
      setMode,
      setApiBaseUrl,
      service,
      activeTab,
      setActiveTab,
      aiResponse,
      setAiResponse,
      isAiThinking,
      sendAiPrompt,
      isModeSheetOpen,
      setIsModeSheetOpen,
      resetAllDemoState,
    }),
    [mode, apiBaseUrl, service, activeTab, aiResponse, isAiThinking, isModeSheetOpen, setMode, setApiBaseUrl, sendAiPrompt, resetAllDemoState]
  );

  return <AgentContext.Provider value={value}>{children}</AgentContext.Provider>;
}

export function useAgent() {
  const ctx = useContext(AgentContext);
  if (!ctx) throw new Error('useAgent must be used within AgentProvider');
  return ctx;
}
