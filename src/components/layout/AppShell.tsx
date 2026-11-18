import type { ReactNode } from 'react';
import { TopSafetyBar } from './TopSafetyBar';
import { BottomNav } from './BottomNav';
import { AgentModeSheet } from './AgentModeSheet';
import { AiPromptBar } from '../common/AiPromptBar';
import { AiResponseSheet } from '../common/AiResponseSheet';

interface AppShellProps {
  children: ReactNode;
  promptPlaceholder?: string;
  chips?: string[];
}

export function AppShell({ children, promptPlaceholder, chips }: AppShellProps) {
  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col antialiased selection:bg-secondary-fixed">
      {/* Sticky Top Bar */}
      <TopSafetyBar />

      {/* Main Content Area: mobile-first max-w-[430px] */}
      <main className="flex-1 w-full max-w-[430px] mx-auto px-4 pt-20 pb-36">
        {children}
      </main>

      {/* Floating Prompt Bar above Bottom Nav */}
      <AiPromptBar placeholder={promptPlaceholder} chips={chips} />

      {/* Sticky Bottom Navigation */}
      <BottomNav />

      {/* Modals & Drawers */}
      <AgentModeSheet />
      <AiResponseSheet />
    </div>
  );
}
