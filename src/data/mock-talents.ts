import { Talent } from '@/types/talent';

// @ts-ignore
// @ts-ignore
const drakeMockData: Talent = {
  id: 'TAL-0001',
  firstName: 'Aubrey',
  lastName: 'Graham',
  industry: 'Music',
  subIndustry: ['Hip Hop', 'R&B', 'Pop Rap'],
  age: 37,
  email: 'drake@ovo.com',
  createdAt: '2024-01-15T00:00:00Z',
  updatedAt: '2024-03-10T00:00:00Z',
  reportsCount: 25,
  status: 'active',
  avatarUrl: '/drake-avatar.jpg',
  photos: [
    '/drake-1.jpg',
    '/drake-2.jpg',
    '/drake-3.jpg',
    '/drake-4.jpg',
    '/drake-5.jpg',
  ],
  voiceRecords: [
    {
      id: 'vr-1',
      title: 'God\'s Plan Vocals',
      url: '/voice/gods-plan.mp3',
      duration: '3:45',
      createdAt: '2024-02-01T00:00:00Z',
    },
    {
      id: 'vr-2',
      title: 'Hotline Bling Session',
      url: '/voice/hotline-bling.mp3',
      duration: '2:55',
      createdAt: '2024-02-15T00:00:00Z',
    },
  ],
  socialMedia: [
    {
      platform: 'instagram',
      url: 'https://instagram.com/champagnepapi',
      username: 'champagnepapi',
    },
    {
      platform: 'twitter',
      url: 'https://twitter.com/drake',
      username: 'drake',
    },
    {
      platform: 'spotify',
      url: 'https://open.spotify.com/artist/3TVXtAsR1Inumwj472S9r4',
      username: 'Drake',
    },
  ],
  tags: ['Hip Hop', 'R&B', 'Pop Rap', 'Songwriting', 'Production'],
};

export const mockTalents: Talent[] = Array.from({ length: 50 }, (_, i) => ({
  id: `TAL-${(i + 1).toString().padStart(4, '0')}`,
  firstName: `Talent`,
  lastName: `${i + 1}`,
  industry: ['Technology', 'Healthcare', 'Finance', 'Education', 'Marketing'][Math.floor(Math.random() * 5)],
  subIndustry: ['Software', 'Hardware', 'Cloud'][Math.floor(Math.random() * 3)].split(','),
  age: 20 + Math.floor(Math.random() * 40),
  email: `talent${i + 1}@example.com`,
  createdAt: new Date(2024 - Math.floor(Math.random() * 2), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)).toISOString(),
  updatedAt: new Date(2024, Math.floor(Math.random() * 3), Math.floor(Math.random() * 28)).toISOString(),
  reportsCount: Math.floor(Math.random() * 50),
  status: Math.random() > 0.2 ? 'active' : 'inactive',
  photos: [],
  voiceRecords: [],
  socialMedia: [],
  tags: ['Software Development', 'Cloud Computing', 'AI/ML', 'DevOps'].slice(0, 2 + Math.floor(Math.random() * 3)),
}));

// Add Drake's data to the mock talents array
mockTalents[0] = drakeMockData;
