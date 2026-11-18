import { useState } from 'react';
import type { ReelsPostInput, TemplateMode } from '../../types/seeder';

interface ReelsInputCardProps {
  post: ReelsPostInput;
}

const TEMPLATES: { id: TemplateMode; label: string }[] = [
  { id: 'FULL_REEL', label: 'Полный (8 пунктов)' },
  { id: 'CAROUSEL', label: 'Карусель' },
  { id: 'LIGHT_LIKE', label: 'Только ❤️ Лайк' },
];

export function ReelsInputCard({ post }: ReelsInputCardProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateMode>('FULL_REEL');

  return (
    <section className="rounded-2xl glass-surface border border-outline-variant p-3.5 shadow-sm mb-4">
      <div className="flex gap-3 items-center mb-3">
        {/* Reels Thumbnail */}
        <div className="w-16 h-20 rounded-xl overflow-hidden bg-primary-fixed shrink-0 border border-outline-variant/60 shadow-xs">
          <img src={post.coverSvg} alt={post.title} className="w-full h-full object-cover" />
        </div>

        {/* Reels Meta */}
        <div className="flex-1 min-w-0">
          <span className="inline-block px-2 py-0.5 rounded-full bg-primary-fixed text-primary text-[10px] font-bold uppercase tracking-wider mb-1">
            Reels • Код: {post.shortcode}
          </span>
          <h2 className="font-title-md text-sm text-on-surface leading-tight truncate">
            {post.title}
          </h2>
          <p className="font-body-sm text-[11px] text-on-surface-variant">
            {post.author} • {post.duration}
          </p>
        </div>
      </div>

      {/* Segmented Control */}
      <div className="flex rounded-xl bg-surface-container p-1 gap-1">
        {TEMPLATES.map((tmpl) => (
          <button
            key={tmpl.id}
            type="button"
            onClick={() => setSelectedTemplate(tmpl.id)}
            className={`flex-1 py-1.5 px-1 rounded-lg text-[11px] font-title-md transition text-center whitespace-nowrap ${
              selectedTemplate === tmpl.id
                ? 'bg-primary text-white shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            {tmpl.label}
          </button>
        ))}
      </div>
    </section>
  );
}
