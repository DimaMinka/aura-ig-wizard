export type ArchetypeKey =
  | 'FULL_RECIPROCAL'
  | 'DONOR_ALIAS'
  | 'NO_REPOST'
  | 'GHOST_PARASITE'
  | 'SILENT_LEECH';

export interface ChannelMetric {
  channel: string;
  count: number;
  icon: string;
  label: string;
}

export interface ReciprocitySummary {
  percentage: number;
  reciprocalCount: number;
  totalCount: number;
  chatName: string;
  windowHours: number;
  verifiedMinutesAgo: number;
  channels: ChannelMetric[];
}

export interface ParticipantRow {
  id: string;
  handle: string;
  archetype: ArchetypeKey;
  archetypeLabel: string;
  badgeVariant: 'rose' | 'lavender' | 'gold' | 'muted';
  donorHandle?: string;
  channels: string;
  avatarSvg: string;
  hidden?: boolean;
}

export type ShareCardTheme = 'girls' | 'dark';
