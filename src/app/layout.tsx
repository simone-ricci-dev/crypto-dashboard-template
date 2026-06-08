import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Crypto Trading Dashboard',
  description: 'Real-time BTC/USDT trading dashboard — Next.js template with WebSocket, Fear & Greed, on-chain data.',
  openGraph: {
    title: 'Crypto Trading Dashboard — Next.js Template',
    description: 'Live BTC/USDT WebSocket, Fear & Greed, on-chain signals. PRO: AI LONG/SHORT/WAIT commands with entry, SL, TP.',
    images: ['/og-preview.svg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crypto Trading Dashboard — Next.js Template',
    description: 'Live BTC/USDT WebSocket + AI trading commands. Free tier + PRO €59.',
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
