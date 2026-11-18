import { useRef, useEffect, useState } from 'react';
import { useAgent } from '../../services/AgentContext';

export function AgentModeSheet() {
  const { config, setMode, setApiBaseUrl, service, isModeSheetOpen, setIsModeSheetOpen, resetAllDemoState } = useAgent();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [urlInput, setUrlInput] = useState(config.apiBaseUrl);
  const [healthStatus, setHealthStatus] = useState<string | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isModeSheetOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isModeSheetOpen && dialog.open) {
      dialog.close();
    }
  }, [isModeSheetOpen]);

  const handleClose = () => setIsModeSheetOpen(false);

  const testConnection = async () => {
    setHealthStatus('Проверка...');
    const ok = await service.checkHealth();
    setHealthStatus(ok ? '🟢 Подключено к агенту' : '🔴 Сервер недоступен (fallback на моки)');
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={handleClose}
      aria-labelledby="agent-mode-title"
      className="m-auto rounded-3xl p-6 glass-surface border border-outline-variant shadow-2xl max-w-[380px] w-[90%] text-on-surface backdrop:bg-black/40 backdrop:backdrop-blur-sm"
    >
      <div className="flex items-center justify-between pb-3 border-b border-outline-variant/40 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-primary text-[20px] font-bold">⚡</span>
          <h2 id="agent-mode-title" className="font-headline-sm text-headline-sm text-on-surface">
            Режим подключения
          </h2>
        </div>
        <button
          type="button"
          onClick={handleClose}
          className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
          aria-label="Закрыть"
        >
          ✕
        </button>
      </div>

      {/* Mode Toggle Buttons */}
      <div className="flex rounded-xl bg-surface-container p-1 gap-1 mb-4">
        <button
          type="button"
          onClick={() => setMode('mock')}
          className={`flex-1 py-2 text-xs font-title-md rounded-lg transition ${
            config.mode === 'mock' ? 'bg-primary text-white shadow-sm' : 'text-on-surface-variant'
          }`}
        >
          🧪 Демо-моки
        </button>
        <button
          type="button"
          onClick={() => setMode('live')}
          className={`flex-1 py-2 text-xs font-title-md rounded-lg transition ${
            config.mode === 'live' ? 'bg-primary text-white shadow-sm' : 'text-on-surface-variant'
          }`}
        >
          ⚡ Live Агент (API)
        </button>
      </div>

      {/* Live API URL input */}
      <div className="space-y-2 mb-4">
        <label htmlFor="agent-url" className="text-xs text-on-surface-variant font-medium block">
          URL локального/облачного агента
        </label>
        <input
          id="agent-url"
          type="url"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          onBlur={() => setApiBaseUrl(urlInput)}
          placeholder="http://127.0.0.1:8787/api"
          className="w-full text-xs px-3 py-2 rounded-xl bg-white border border-outline-variant focus:outline-primary font-mono text-on-surface"
        />
        <div className="flex items-center justify-between pt-1">
          <button
            type="button"
            onClick={testConnection}
            className="text-[11px] text-primary font-title-md underline hover:opacity-80"
          >
            Проверить связь
          </button>
          {healthStatus && <span className="text-[11px] font-medium">{healthStatus}</span>}
        </div>
      </div>

      {/* Reset demo state button */}
      <div className="pt-3 border-t border-outline-variant/40 flex justify-between items-center">
        <button
          type="button"
          onClick={() => {
            resetAllDemoState();
            handleClose();
          }}
          className="text-xs text-on-surface-variant hover:text-primary font-title-md"
        >
          🔄 Сбросить демо-данные
        </button>
        <button
          type="button"
          onClick={handleClose}
          className="px-4 py-1.5 rounded-xl bg-primary text-white text-xs font-title-md shadow-sm"
        >
          Готово
        </button>
      </div>
    </dialog>
  );
}
