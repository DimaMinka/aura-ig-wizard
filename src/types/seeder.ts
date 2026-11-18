export type TemplateMode = 'FULL_REEL' | 'CAROUSEL' | 'LIGHT_LIKE';

export interface ReelsPostInput {
  shortcode: string;
  author: string;
  duration: string;
  title: string;
  coverSvg: string;
}

export type PreFlightStatusKey = 'READY' | 'DELAYED' | 'NEEDS_COMMENTS';

export interface PreFlightChat {
  id: string;
  name: string;
  status: PreFlightStatusKey;
  statusLabel: string;
  badgeVariant: 'emerald' | 'amber' | 'rose';
  quotaText: string;
  debtCount: number;
  template: string;
  autoTime?: string;
}

export interface DebtCommentOption {
  id: string;
  text: string;
  selected: boolean;
}

export interface DebtComment {
  id: string;
  chatId: string;
  postAuthor: string;
  postTitle: string;
  options: DebtCommentOption[];
  validationBadge: string;
  isApplied: boolean;
}

export interface ScheduleOption {
  id: string;
  label: string;
  isRecommended: boolean;
  subtitle?: string;
}
