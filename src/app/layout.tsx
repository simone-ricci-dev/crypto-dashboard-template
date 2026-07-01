import type { Metadata } from 'next';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000');

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Crypto Trading Dashboard — Live Demo',
  description: 'Real-time BTC/USDT trading dashboard built with Next.js, TypeScript and Tailwind — live Binance WebSocket, Fear & Greed index, on-chain signals.',
  openGraph: {
    title: 'Crypto Trading Dashboard — Next.js Demo',
    description: 'Real-time BTC/USDT dashboard: live Binance WebSocket, Fear & Greed, on-chain signals, professional trading UI.',
    images: ['/og-preview.svg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crypto Trading Dashboard — Next.js Demo',
    description: 'Real-time BTC/USDT dashboard with live Binance WebSocket and a professional trading UI.',
    images: ['/og-preview.svg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
