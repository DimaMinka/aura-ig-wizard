import type { SafetyStatus, QueueSummary, ScenarioItem } from '../types/wizard';

export const initialSafetyStatus: SafetyStatus = {
  temperature: 'GREEN',
  statusLabel: 'ХОЛОДНЫЙ РЕЖИМ',
  total1h: 14,
  limit1h: 20,
  total24h: 92,
  limit24h: 150,
  batchLimit: 20,
  strategy: 'Порция 15 (Admin → VIP → Member) + кофе-брейк 80с ☕',
};

export const initialQueueSummary: QueueSummary = {
  totalPosts: 18,
  heavyCount: 11,
  lightCount: 7,
  overdueCount: 0,
  syncedMinutesAgo: 2,
};

export const initialScenarios: ScenarioItem[] = [
  {
    id: 'seed-reels',
    title: 'Посев Reels',
    command: 'post-seed',
    subtitle: 'Квоты и расписание чатов',
    badge: '4 чата готовы',
    badgeVariant: 'gold',
    icon: 'rocket_launch',
    targetTab: 'seeder',
  },
  {
    id: 'set-comments',
    title: 'Живые комменты',
    command: 'set-comments',
    subtitle: '11 постов ждут текст',
    badge: 'Без клише',
    badgeVariant: 'lavender',
    icon: 'chat_bubble',
    targetTab: 'seeder',
  },
  {
    id: 'ghost-auditor',
    title: 'Аудит взаимности',
    command: 'post-seed --status',
    subtitle: '88% возврат за 48ч',
    badge: 'Открытка PNG',
    badgeVariant: 'rose',
    icon: 'favorite',
    targetTab: 'reciprocity',
  },
  {
    id: 'stories-walk',
    title: 'Обход Stories',
    command: 'stories-walk',
    subtitle: 'Приоритет Admin → VIP',
    badge: 'Безопасно',
    badgeVariant: 'emerald',
    icon: 'history_toggle_off',
    targetTab: 'radar',
  },
  {
    id: 'chat-roi',
    title: 'Рейтинг чатов ROI',
    command: 'chat-roi',
    subtitle: '1 чат просит Лайт-режим',
    badge: 'Аналитика',
    badgeVariant: 'amber',
    icon: 'diamond',
    targetTab: 'radar',
  },
  {
    id: 'chat-mentions',
    title: 'Радар болталок',
    command: 'chat-mentions',
    subtitle: '3 новых упоминания',
    badge: '3 новых!',
    badgeVariant: 'rose',
    icon: 'notifications_active',
    targetTab: 'radar',
  },
];
