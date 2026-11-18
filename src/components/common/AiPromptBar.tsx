import { useState } from 'react';
import { useAgent } from '../../services/AgentContext';

interface AiPromptBarProps {
  placeholder?: string;
  chips?: string[];
}

const DEFAULT_CHIPS = ['✨ Подготовь комменты для очереди', '🔍 Проверь должников по лайкам'];

export function AiPromptBar({
  placeholder = 'Спроси визарда о посеве, очереди или чатах...',
  chips = DEFAULT_CHIPS,
}: AiPromptBarProps) {
  const { sendAiPrompt, isAiThinking } = useAgent();
  const [input, setInput] = useState('');

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isAiThinking) return;
    sendAiPrompt(input);
    setInput('');
  };

  const handleChipClick = (chipText: string) => {
    // Strip leading emoji for clean prompt
    const cleaned = chipText.replace(/^[^\wа-яА-ЯёЁ]+/, '').trim();
    sendAiPrompt(cleaned);
  };

  return (
    <div className="fixed bottom-16 inset-x-0 z-30 pointer-events-none">
      <div className="max-w-[430px] mx-auto px-4 pb-2 flex flex-col gap-1.5 pointer-events-auto">
        {/* Quick Chips */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {chips.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => handleChipClick(chip)}
              disabled={isAiThinking}
              className="shrink-0 px-2.5 py-1 rounded-full text-[11px] font-title-md bg-white/80 backdrop-blur-md border border-outline-variant/60 text-primary shadow-xs hover:bg-white active:scale-95 transition"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-xl border border-outline-variant shadow-lg"
        >
          <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 select-none">
            auto_awesome
          </span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isAiThinking}
            placeholder={isAiThinking ? 'Агент размышляет...' : placeholder}
            className="flex-1 text-xs bg-transparent text-on-surface placeholder:text-on-surface-variant/60 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!input.trim() || isAiThinking}
            className={`w-7 h-7 rounded-full flex items-center justify-center text-white shrink-0 shadow-sm transition active:scale-95 ${
              input.trim() && !isAiThinking ? 'bg-primary hover:opacity-90' : 'bg-outline-variant/60 cursor-not-allowed'
            }`}
            aria-label="Отправить запрос агенту"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
          </button>
        </form>
      </div>
    </div>
  );
}
