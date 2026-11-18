import type { ReciprocitySummary, ParticipantRow } from '../types/reciprocity';

export const initialReciprocitySummary: ReciprocitySummary = {
  percentage: 88,
  reciprocalCount: 22,
  totalCount: 25,
  chatName: 'Бьюти Круг',
  windowHours: 48,
  verifiedMinutesAgo: 10,
  channels: [
    { channel: 'tg', count: 25, icon: 'favorite', label: 'В Telegram ❤️' },
    { channel: 'direct', count: 21, icon: 'send', label: 'Direct ✈️' },
    { channel: 'ig', count: 22, icon: 'chat', label: 'Лайк + Коммент 💬' },
  ],
};

export const initialParticipants: ParticipantRow[] = [
  {
    id: 'p-mila',
    handle: '@mila_glow',
    archetype: 'FULL_RECIPROCAL',
    archetypeLabel: 'Полный актив 💖',
    badgeVariant: 'rose',
    channels: 'ТГ + Direct + IG (100% возврат)',
    avatarSvg: './assets/avatar_mila.svg',
  },
  {
    id: 'p-kate',
    handle: '@kate_studio',
    archetype: 'DONOR_ALIAS',
    archetypeLabel: 'С донора @lina_care 🌸',
    badgeVariant: 'lavender',
    donorHandle: '@lina_care',
    channels: 'Связка Primary ↔ Donor распознана',
    avatarSvg: './assets/avatar_kate.svg',
  },
  {
    id: 'p-alex',
    handle: '@alex_motion',
    archetype: 'NO_REPOST',
    archetypeLabel: 'Забыла самолётик ✈️',
    badgeVariant: 'gold',
    channels: 'ТГ + IG выполнены, Direct пропущен',
    avatarSvg: './assets/avatar_alex.svg',
  },
  {
    id: 'p-vika',
    handle: '@vika_trend',
    archetype: 'GHOST_PARASITE',
    archetypeLabel: 'Отметилась в ТГ, ждём в IG ✨',
    badgeVariant: 'muted',
    channels: 'Лимит ожидания 4ч перед алертом',
    avatarSvg: './assets/avatar_vika.svg',
  },
];
