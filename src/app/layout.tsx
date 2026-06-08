import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Crypto Trading Dashboard',
  description: 'Real-time BTC/USDT trading dashboard — Next.js template with WebSocket, Fear & Greed, on-chain data.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
