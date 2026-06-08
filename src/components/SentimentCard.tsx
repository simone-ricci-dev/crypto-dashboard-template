'use client';
import type { SentimentData } from '@/types/market';

interface Props { sentiment: SentimentData | null }

export default function SentimentCard({ sentiment }: Props) {
  const fgi = sentiment?.fgi ?? null;
  const color = fgi == null ? 'var(--muted)' : fgi > 60 ? 'var(--green)' : fgi < 40 ? 'var(--red)' : 'var(--amber)';

  return (
    <div className="mini-card">
      <div className="mini-card-title">Fear &amp; Greed</div>
      <div className="mini-val" style={{ color }}>{fgi ?? '—'}</div>
      <div className="mini-sub">{sentiment?.label ?? 'Loading...'}</div>
      <div className="sent-bar">
        <div className="sent-fill" style={{ width: `${fgi ?? 0}%`, background: color }} />
      </div>
    </div>
  );
}
