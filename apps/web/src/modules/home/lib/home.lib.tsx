import { StatsCardProps } from '@modules/common/components/stats/stats-card';
import { HomeFeatureData } from '../types/home.types';
import QRIcon from '@modules/ui/components/icons/qr-icon';

export const HOME_FEATURES: HomeFeatureData[] = [
  {
    image: 'assets/feature-1.svg',
    title: 'Personalized Links',
    content:
      'Create unique and meaningful short URLs with Shortly. Customize your links by choosing a memorable keyword.',
    icon: (
      <svg
        className="h-5 w-5 stroke-black dark:stroke-white"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M13.58 13.79c.27 .68 .42 1.43 .42 2.21c0 1.77 -.77 3.37 -2 4.46a5.93 5.93 0 0 1 -4 1.54c-3.31 0 -6 -2.69 -6 -6c0 -2.76 1.88 -5.1 4.42 -5.79" />
        <path d="M17.58 10.21c2.54 .69 4.42 3.03 4.42 5.79c0 3.31 -2.69 6 -6 6a5.93 5.93 0 0 1 -4 -1.54" />
        <circle cx="12" cy="8" r="6" />
      </svg>
    ),
  },
  {
    image: 'assets/feature-2.svg',
    title: 'Analytics and Click Tracking',
    content:
      'Gain insights into your shortened links with Shortly detailed analytics. Track the number of clicks, geographic locations.',
    icon: (
      <svg
        className="h-5 w-5 stroke-black dark:stroke-white"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <line x1="4" y1="19" x2="20" y2="19" />
        <polyline points="4 15 8 9 12 11 16 6 20 10" />
      </svg>
    ),
  },
  {
    image: 'assets/hero-picture.svg',
    title: 'Link Password Protection',
    content:
      'Ensure control and security over your shared content with Shortly. Set expiration dates for your links and add password protection.',
    icon: (
      <svg
        className="h-5 w-5 stroke-black dark:stroke-white"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <circle cx="12" cy="12" r="9" />
        <polyline points="12 7 12 12 15 15" />
      </svg>
    ),
  },
  {
    image: 'assets/hero-picture.svg',
    title: 'QR Code Generation',
    content: 'Improve your shortened links with out qr code generation tool to unleash the full potentail!',
    icon: <QRIcon />,
  },
  {
    image: 'assets/hero-picture.svg',
    title: 'User Dashboard',
    content: 'Manage and keep track of your generated URLs in one place, the dashboard.',
    icon: (
      <svg
        className="h-5 w-5 stroke-black dark:stroke-white"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <circle cx="12" cy="13" r="2" />
        <line x1="13.45" y1="11.55" x2="15.5" y2="9.5" />
        <path d="M6.4 20a9 9 0 1 1 11.2 0z" />
      </svg>
    ),
  },
];

export const HOME_STATS: Omit<StatsCardProps, 'stat' | 'unit'>[] = [
  {
    title: 'Active Users',
    description: 'Total Users',
  },
  {
    title: 'Links Shortened',
    description: 'Total Links',
  },
  {
    title: 'Links Clicked',
    description: 'Total Clicks',
  },
  {
    title: 'Uptime Server',
    description: 'Server availability',
  },
];
