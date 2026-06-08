'use client';
import type { PriceData, WsState } from '@/types/market';
import { fmtUsd, fmtPct } from '@/lib/formatters';

interface Props {
  price: PriceData | null;
  ws: WsState;
  onRefresh: () => void;
}

export default function PriceBar({ price, ws, onRefresh }: Props) {
  const displayPrice = ws.markPrice ?? price?.price;
  const change = price?.change24h ?? 0;
  const isUp = change >= 0;

  return (
    <div className="price-bar">
      <div className="price-main">
        {displayPrice ? fmtUsd(displayPrice) : '—'}
      </div>
      <div className={`price-change ${isUp ? 'up' : 'down'}`}>
        {price ? fmtPct(change) : '—'}
      </div>
      {price && (
        <div className="price-hl">
          H: {fmtUsd(price.high24h)} · L: {fmtUsd(price.low24h)}
        </div>
      )}
      <div className="price-bar-right">
        <span className="ts-label">
          <span className={`ws-dot ${ws.connected ? 'on' : 'off'}`} />
          {ws.connected && ws.fundingRate !== null
            ? `Fund: ${(ws.fundingRate * 100).toFixed(4)}%`
            : ws.connected ? 'WS live' : 'WS offline'}
        </span>
        <button className="refresh-btn" onClick={onRefresh}>↻ Refresh</button>
      </div>
    </div>
  );
}
