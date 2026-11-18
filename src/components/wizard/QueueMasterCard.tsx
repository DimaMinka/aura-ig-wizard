import { useState, useEffect } from 'react';
import { useAgent } from '../../services/AgentContext';
import type { QueueSummary } from '../../types/wizard';

export function QueueMasterCard() {
  const { service } = useAgent();
  const [queue, setQueue] = useState<QueueSummary | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    service.getQueueSummary().then(setQueue);
  }, [service]);

  const handleFetch24h = async () => {
    setIsLoading(true);
    try {
      const updated = await service.fetchPosts24h();
      setQueue(updated);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearOld = async () => {
    setIsLoading(true);
    try {
      const updated = await service.clearOldQueue();
      setQueue(updated);
    } finally {
      setIsLoading(false);
    }
  };

  if (!queue) return null;

  return (
    <section className="relative overflow-hidden rounded-2xl glass-surface border border-outline-variant p-4 shadow-sm mb-4">
      <div className="absolute -right-10 -top-10 w-36 h-36 rounded-full bg-secondary-fixed/30 blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col space-y-3">
        {/* Top Metric Bar */}
        <div className="flex items-baseline gap-3">
          <span className="font-display-lg text-display-lg text-primary leading-none tracking-tight">
            {queue.totalPosts}
          </span>
          <div className="flex flex-col">
            <span className="font-title-md text-title-md text-on-surface leading-tight">
              В очереди: {queue.totalPosts} постов
            </span>
            <span className="font-body-sm text-[11px] text-on-surface-variant">
              Синхронизировано {queue.syncedMinutesAgo} мин назад
            </span>
          </div>
        </div>

        {/* Badges / Counters (wrap properly without clipping) */}
        <div className="flex flex-wrap gap-1.5">
          <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-primary text-[11px] font-title-md">
            {queue.heavyCount} Heavy 💬 (коммент 4–5 слов)
          </span>
          <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-[11px] font-title-md border border-outline-variant/40">
            {queue.lightCount} Light ❤️
          </span>
          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-title-md border border-emerald-200">
            Просрочено: {queue.overdueCount} ✅
          </span>
        </div>

        {/* Quick Action Buttons (Full width, no clipping) */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            onClick={handleFetch24h}
            disabled={isLoading}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-primary text-white text-xs font-title-md shadow-sm active:scale-95 transition"
          >
            <span className="material-symbols-outlined text-[15px]">sync</span>
            <span>Собрать за 24ч</span>
          </button>
          <button
            type="button"
            onClick={handleClearOld}
            disabled={isLoading}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white border border-outline-variant text-on-surface text-xs font-title-md shadow-xs active:scale-95 hover:bg-surface-container transition"
          >
            <span className="material-symbols-outlined text-[15px]">cleaning_services</span>
            <span>Очистить хвосты</span>
          </button>
        </div>
      </div>
    </section>
  );
}
