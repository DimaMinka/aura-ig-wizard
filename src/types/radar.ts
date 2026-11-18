export type ChatRoiVerdict = 'KEEP' | 'SWITCH_TO_LIGHT' | 'RETIRE';

export interface RoiSubMetrics {
  vitality: string;
  reciprocity: string;
  cost: string;
  hygiene: string;
}

export interface ChatRuleChip {
  label: string;
  icon?: string;
}

export interface ChatRoiItem {
  id: string;
  name: string;
  score: number;
  verdict: ChatRoiVerdict;
  verdictLabel: string;
  badgeVariant: 'emerald' | 'amber' | 'rose';
  metrics: RoiSubMetrics;
  rules: ChatRuleChip[];
  hint?: string;
  ghostRate?: number;
  mutualCount?: number;
  archived?: boolean;
  lightMode?: boolean;
}

export interface RadarCategory {
  id: string;
  label: string;
  count: number;
}

export interface RadarMessage {
  id: string;
  categoryId: string;
  score: number;
  scoreLabel: string;
  author: string;
  body: string;
  isRead: boolean;
  time: string;
}
