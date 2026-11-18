import type {
  ReelsPostInput,
  PreFlightChat,
  DebtComment,
  ScheduleOption,
} from '../types/seeder';

export const initialReelsInput: ReelsPostInput = {
  shortcode: 'DfNU6kWBEDw',
  author: '@aura_atelier',
  duration: '0:28 мин',
  title: 'Эстетика тихого утра в Париже',
  coverSvg: './assets/reels_thumb.svg',
};

export const initialPreFlightChats: PreFlightChat[] = [
  {
    id: 'beauty-circle',
    name: '🎀 Бьюти Круг',
    status: 'READY',
    statusLabel: 'Готов ✅',
    badgeVariant: 'emerald',
    quotaText: 'Квота 0/1 • Долгов: 0',
    debtCount: 0,
    template: 'FULL_REEL',
  },
  {
    id: 'reels-sphere',
    name: '💎 Reels Сфера',
    status: 'DELAYED',
    statusLabel: 'Слот в 14:20 ⏰',
    badgeVariant: 'amber',
    quotaText: 'Квота 1/1 занята • Авто-перенос',
    debtCount: 0,
    template: 'FULL_REEL',
    autoTime: '14:20',
  },
  {
    id: 'silk-style',
    name: '🌸 Шёлк и Стиль',
    status: 'NEEDS_COMMENTS',
    statusLabel: 'Нужно 2 коммента 💬',
    badgeVariant: 'rose',
    quotaText: 'Долг в чате: 2 поста в очереди',
    debtCount: 2,
    template: 'FULL_REEL',
  },
  {
    id: 'like-aura',
    name: '❤️ Лайк-Аура',
    status: 'READY',
    statusLabel: 'Готов ✅',
    badgeVariant: 'emerald',
    quotaText: 'Квота 2/5 • Шаблон: LIGHT_LIKE',
    debtCount: 0,
    template: 'LIGHT_LIKE',
  },
];

export const initialDebtComment: DebtComment = {
  id: 'debt-silk-01',
  chatId: 'silk-style',
  postAuthor: '@valerie_couture',
  postTitle: 'Образ недели: шёлк и терракота',
  options: [
    {
      id: 'opt-1',
      text: 'Безупречный ритм в кадре, свет невероятный! ✨',
      selected: true,
    },
    {
      id: 'opt-2',
      text: 'Какая фактура и подача, пересматриваю уже третий раз! 🤍',
      selected: false,
    },
  ],
  validationBadge: '✓ 6–8 слов • Без клише • 0 дублей в базе',
  isApplied: false,
};

export const initialScheduleOptions: ScheduleOption[] = [
  { id: 'now', label: 'Сейчас', isRecommended: false },
  { id: 'morning', label: 'Утро 08:30', isRecommended: false },
  { id: 'plus2h', label: '+2 часа', isRecommended: false },
  { id: 'smart', label: 'Умно по квотам ✨', isRecommended: true, subtitle: 'Рекомендуется' },
];
