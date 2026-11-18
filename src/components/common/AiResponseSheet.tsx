import { useRef, useEffect } from 'react';
import { useAgent } from '../../services/AgentContext';

export function AiResponseSheet() {
  const { aiResponse, setAiResponse } = useAgent();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (aiResponse && !dialog.open) {
      dialog.showModal();
    } else if (!aiResponse && dialog.open) {
      dialog.close();
    }
  }, [aiResponse]);

  const handleClose = () => setAiResponse(null);

  if (!aiResponse) return null;

  return (
    <dialog
      ref={dialogRef}
      onClose={handleClose}
      aria-labelledby="ai-resp-title"
      className="m-auto rounded-3xl p-5 glass-surface border border-outline-variant shadow-2xl max-w-[390px] w-[92%] text-on-surface backdrop:bg-black/45 backdrop:backdrop-blur-sm"
    >
      <div className="flex items-center justify-between pb-2.5 border-b border-outline-variant/40 mb-3">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary text-[20px]">auto_awesome</span>
          <h2 id="ai-resp-title" className="font-headline-sm text-headline-sm text-on-surface">
            {aiResponse.title}
          </h2>
        </div>
        <button
          type="button"
          onClick={handleClose}
          className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface text-xs"
          aria-label="Закрыть ответ"
        >
          ✕
        </button>
      </div>

      {aiResponse.badge && (
        <span className="inline-block px-2.5 py-0.5 rounded-full bg-primary-fixed text-primary text-[10px] font-bold uppercase tracking-wider mb-2">
          {aiResponse.badge}
        </span>
      )}

      <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
        {aiResponse.summary}
      </p>

      {/* Thinking Steps */}
      <div className="rounded-xl bg-surface-container/70 p-3 space-y-2 mb-4 border border-outline-variant/30">
        <span className="text-[10px] uppercase font-bold tracking-wider text-on-surface-variant/80 block mb-1">
          Шаги мышления агента
        </span>
        {aiResponse.steps.map((step) => (
          <div key={step.id} className="flex items-center gap-2 text-[11px] text-on-surface">
            <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px] shrink-0 font-bold">
              ✓
            </span>
            <span className="flex-1">{step.text}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center pt-2 border-t border-outline-variant/30">
        <span className="text-[10px] text-on-surface-variant">{aiResponse.timestamp}</span>
        <button
          type="button"
          onClick={handleClose}
          className="px-4 py-1.5 rounded-xl bg-primary text-white text-xs font-title-md shadow-sm active:scale-95 transition"
        >
          Понятно
        </button>
      </div>
    </dialog>
  );
}
