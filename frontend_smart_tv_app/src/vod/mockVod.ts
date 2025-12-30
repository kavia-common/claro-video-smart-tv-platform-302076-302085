export type VodItem = {
  id: string;
  title: string;
  year: number;
  rating: string;
  durationMinutes: number;
  /** 0..100 */
  match: number;
  /** Hex color used for placeholder poster background. */
  posterColor: string;
};

export type VodSection = {
  id: string;
  title: string;
  items: VodItem[];
};

/**
 * A lightweight mock VOD catalog.
 * We deliberately avoid remote poster images to keep the template dependency-free.
 */
export const MOCK_VOD_SECTIONS: VodSection[] = [
  {
    id: 'featured',
    title: 'Featured',
    items: [
      {
        id: 'm1',
        title: 'City Lights',
        year: 1931,
        rating: 'PG',
        durationMinutes: 87,
        match: 97,
        posterColor: '#3b82f6',
      },
      {
        id: 'm2',
        title: 'The Long Night',
        year: 2021,
        rating: '16+',
        durationMinutes: 112,
        match: 92,
        posterColor: '#06b6d4',
      },
      {
        id: 'm3',
        title: 'Orbit Drift',
        year: 2018,
        rating: '13+',
        durationMinutes: 104,
        match: 89,
        posterColor: '#64748b',
      },
      {
        id: 'm4',
        title: 'Golden Hour',
        year: 2020,
        rating: 'PG-13',
        durationMinutes: 98,
        match: 86,
        posterColor: '#0ea5e9',
      },
      {
        id: 'm5',
        title: 'Hidden Rivers',
        year: 2019,
        rating: 'PG',
        durationMinutes: 101,
        match: 84,
        posterColor: '#22c55e',
      },
      {
        id: 'm6',
        title: 'Neon District',
        year: 2022,
        rating: '18+',
        durationMinutes: 122,
        match: 88,
        posterColor: '#a855f7',
      },
      {
        id: 'm7',
        title: 'Retro Arcade',
        year: 2017,
        rating: 'PG',
        durationMinutes: 95,
        match: 81,
        posterColor: '#f97316',
      },
      {
        id: 'm8',
        title: 'Beyond the Shore',
        year: 2023,
        rating: '13+',
        durationMinutes: 110,
        match: 90,
        posterColor: '#ef4444',
      },
    ],
  },
  {
    id: 'because-you-watched',
    title: 'Because you watched Sci‑Fi',
    items: [
      {
        id: 's1',
        title: 'Star Relay',
        year: 2016,
        rating: '13+',
        durationMinutes: 107,
        match: 91,
        posterColor: '#1d4ed8',
      },
      {
        id: 's2',
        title: 'Moon Signal',
        year: 2015,
        rating: 'PG-13',
        durationMinutes: 109,
        match: 87,
        posterColor: '#0f766e',
      },
      {
        id: 's3',
        title: 'Cold Vacuum',
        year: 2019,
        rating: '16+',
        durationMinutes: 114,
        match: 85,
        posterColor: '#334155',
      },
      {
        id: 's4',
        title: 'Deep Array',
        year: 2020,
        rating: 'PG-13',
        durationMinutes: 103,
        match: 83,
        posterColor: '#0891b2',
      },
      {
        id: 's5',
        title: 'Dawn Protocol',
        year: 2021,
        rating: '13+',
        durationMinutes: 100,
        match: 82,
        posterColor: '#2563eb',
      },
      {
        id: 's6',
        title: 'Spectrum Run',
        year: 2018,
        rating: 'PG',
        durationMinutes: 96,
        match: 80,
        posterColor: '#7c3aed',
      },
    ],
  },
];
