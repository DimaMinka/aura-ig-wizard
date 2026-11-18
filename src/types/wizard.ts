export type TemperatureStatus = 'GREEN' | 'YELLOW' | 'RED';

export interface SafetyStatus {
  temperature: TemperatureStatus;
  statusLabel: string;
  total1h: number;
  limit1h: number;
  total24h: number;
  limit24h: number;
  batchLimit: number;
  strategy: string;
}

export interface QueueSummary {
  totalPosts: number;
  heavyCount: number;
  lightCount: number;
  overdueCount: number;
  syncedMinutesAgo: number;
}

export type ScenarioBadgeVariant = 'gold' | 'lavender' | 'rose' | 'emerald' | 'amber';

export interface ScenarioItem {
  id: string;
  title: string;
  command: string;
  subtitle: string;
  badge: string;
  badgeVariant: ScenarioBadgeVariant;
  icon: string;
  targetTab?: 'wizard' | 'seeder' | 'reciprocity' | 'radar';
}
