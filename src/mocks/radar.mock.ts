import type { ChatRoiItem, RadarCategory, RadarMessage } from '../types/radar';

export const initialChatRoiItems: ChatRoiItem[] = [
  {
    id: 'roi-beauty',
    name: '🎀 Бьюти Круг',
    score: 94,
    verdict: 'KEEP',
    verdictLabel: 'СОХРАНЯТЬ',
    badgeVariant: 'emerald',
    metrics: {
      vitality: '28/30',
      reciprocity: '33/35',
      cost: '18/20',
      hygiene: '15/15',
    },
    rules: [
      { label: '💬 от 4 слов' },
      { label: '📱 Сторис обязательно' },
      { label: '⏰ Дедлайн 24ч' },
      { label: '🔗 1 пост/день' },
    ],
  },
  {
    id: 'roi-silk',
    name: '🌸 Шёлк и Стиль',
    score: 62,
    verdict: 'SWITCH_TO_LIGHT',
    verdictLabel: 'В ЛАЙТ-РЕЖИМ',
    badgeVariant: 'amber',
    metrics: {
      vitality: '20/30',
      reciprocity: '19/35',
      cost: '12/20',
      hygiene: '11/15',
    },
    rules: [
      { label: '💬 от 3 слов' },
      { label: '📱 Сторис по желанию' },
      { label: '⏰ Дедлайн 48ч' },
    ],
    hint: 'Много времени уходит на сторис, отдача 41%. Перевести в режим только лайков?',
  },
  {
    id: 'roi-silent',
    name: '🍂 Тихий Клуб',
    score: 24,
    verdict: 'RETIRE',
    verdictLabel: 'В АРХИВ',
    badgeVariant: 'rose',
    metrics: {
      vitality: '8/30',
      reciprocity: '7/35',
      cost: '5/20',
      hygiene: '4/15',
    },
    rules: [{ label: '💬 свободный формат' }, { label: '⏰ Дедлайн 72ч' }],
    ghostRate: 58,
    mutualCount: 6,
  },
];

export const initialRadarCategories: RadarCategory[] = [
  { id: 'personal', label: '🎯 Личные', count: 2 },
  { id: 'checks', label: '🔍 Проверки', count: 1 },
  { id: 'unfollow', label: '❌ Отписки', count: 1 },
  { id: 'reels', label: '📈 Reels', count: 4 },
];

export const initialRadarMessages: RadarMessage[] = [
  {
    id: 'msg-01',
    categoryId: 'personal',
    score: 100,
    scoreLabel: 'Score 100 • Личное упоминание',
    author: '@mila_glow',
    body: '@aura_atelier твой рилс просто восторг! Отметила в сторис и сохранила ❤️',
    isRead: false,
    time: '12 мин назад',
  },
  {
    id: 'msg-02',
    categoryId: 'checks',
    score: 95,
    scoreLabel: 'Score 95 • Проверка подписок админом',
    author: 'Администратор чата',
    body: 'Начинаем еженедельную сверку взаимных подписок. Проверьте актуальные долги в очереди!',
    isRead: false,
    time: '45 мин назад',
  },
];
