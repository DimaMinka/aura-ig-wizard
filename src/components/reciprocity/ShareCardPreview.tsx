import { useState } from 'react';
import type { ShareCardTheme } from '../../types/reciprocity';

interface ShareCardPreviewProps {
  onToggleSilent: (hide: boolean) => Promise<void>;
}

export function ShareCardPreview({ onToggleSilent }: ShareCardPreviewProps) {
  const [theme, setTheme] = useState<ShareCardTheme>('girls');
  const [isHiding, setIsHiding] = useState(false);
  const [isSilentHidden, setIsSilentHidden] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleToggle = async () => {
    setIsHiding(true);
    try {
      const next = !isSilentHidden;
      await onToggleSilent(next);
      setIsSilentHidden(next);
    } finally {
      setIsHiding(false);
    }
  };

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      alert('Открытка 1170×1460px (Retina) сгенерирована и сохранена!');
    }, 600);
  };

  return (
    <section className="space-y-3 mb-6">
      <div className="flex items-center justify-between">
        <h3 className="font-headline-sm text-sm font-semibold text-on-surface">
          Шеринг-открытка отчёта
        </h3>
        {/* Theme tabs */}
        <div className="flex rounded-lg bg-surface-container p-0.5 text-[10px] font-title-md">
          <button
            type="button"
            onClick={() => setTheme('girls')}
            className={`px-2 py-1 rounded-md transition ${
              theme === 'girls' ? 'bg-primary text-white shadow-xs' : 'text-on-surface-variant'
            }`}
          >
            🌸 Нежная
          </button>
          <button
            type="button"
            onClick={() => setTheme('dark')}
            className={`px-2 py-1 rounded-md transition ${
              theme === 'dark' ? 'bg-on-surface text-white shadow-xs' : 'text-on-surface-variant'
            }`}
          >
            🌙 Тёмная
          </button>
        </div>
      </div>

      {/* 4:5 Card Preview in Russian */}
      <div
        className={`p-4 rounded-2xl border transition-colors shadow-md relative overflow-hidden ${
          theme === 'girls'
            ? 'bg-gradient-to-b from-[#fff8f8] to-[#f5eced] border-[#d8c2ba] text-[#1e1b1c]'
            : 'bg-gradient-to-b from-[#1c191a] to-[#2d2628] border-outline-variant/30 text-white'
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold tracking-widest uppercase opacity-75">
            ИТОГИ НЕДЕЛИ • АУДИТ
          </span>
          <span className="text-[11px] font-bold text-secondary">Aura IG ✨</span>
        </div>

        <h4 className="font-headline-md text-base leading-tight mb-1">
          Сводка «Бьюти Круг»
        </h4>
        <div className="flex items-baseline gap-2 mb-2">
          <span className="font-display-lg text-2xl font-bold text-primary">88%</span>
          <span className="text-xs font-semibold opacity-90">Взаимность актива</span>
        </div>

        <p className="text-[10px] opacity-80 mb-3">
          22 из 25 авторов вернули активность: ТГ + Direct + Комментарии.
        </p>

        {/* Top reciprocal authors mini avatars */}
        <div className="flex items-center gap-1.5 pt-2 border-t border-current/15">
          <span className="text-[10px] font-semibold opacity-70">Топ взаимных:</span>
          <div className="flex -space-x-1.5">
            {['mila', 'kate', 'lina'].map((n) => (
              <img
                key={n}
                src={`./assets/avatar_${n}.svg`}
                alt={n}
                className="w-5 h-5 rounded-full border border-white"
              />
            ))}
          </div>
          <span className="text-[9px] font-bold text-primary ml-auto">Verified ✓</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2 pt-1">
        <button
          type="button"
          onClick={handleDownload}
          disabled={isDownloading}
          className="w-full py-2.5 px-4 rounded-xl bg-primary text-white text-xs font-title-md shadow-sm hover:opacity-90 active:scale-98 transition flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-[16px]">download</span>
          <span>{isDownloading ? 'Формирование PNG...' : 'Скачать PNG открытку (1170px) 🎀'}</span>
        </button>

        <button
          type="button"
          onClick={handleToggle}
          disabled={isHiding}
          className="w-full py-2 px-4 rounded-xl bg-white border border-outline-variant text-on-surface-variant text-[11px] font-title-md hover:bg-surface-container active:scale-98 transition"
        >
          {isSilentHidden ? 'Показать всех участников ✓' : 'Скрыть молчунов в лайк-чатах (Silent Leech)'}
        </button>
      </div>
    </section>
  );
}
