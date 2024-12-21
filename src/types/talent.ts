export interface SocialMedia {
  platform: 'instagram' | 'tiktok' | 'facebook' | 'twitter' | 'youtube' | 'spotify';
  url: string;
  username: string;
}

export interface VoiceRecord {
  id: string;
  title: string;
  url: string;
  duration: string;
  createdAt: string;
}

export interface Talent {
  id: string;
  firstName: string;
  lastName: string;
  industry: string;
  subIndustry: string[];
  age: number;
  email: string;
  createdAt: string;
  updatedAt: string;
  reportsCount: number;
  status: 'active' | 'inactive';
  avatarUrl?: string;
  photos: string[];
  voiceRecords: VoiceRecord[];
  socialMedia: SocialMedia[];
} 