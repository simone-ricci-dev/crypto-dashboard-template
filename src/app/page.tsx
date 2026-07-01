'use client';
import { useMarketData } from '@/hooks/useMarketData';
import PriceBar from '@/components/PriceBar';
import SentimentCard from '@/components/SentimentCard';
import OnChainPanel from '@/components/OnChainPanel';
import QuantCard from '@/components/QuantCard';
import CommandCard from '@/components/CommandCard';
import VerdictBanner from '@/components/VerdictBanner';
import type { TradingCommand } from '@/types/market';

// Demo data shown behind the PRO blur — realistic enough to sell the feature
const DEMO_COMMAND: TradingCommand = {
  command: 'LONG',
  urgency: 'LIMIT',
  confidence: 72,
  entry: 68_400,
  stop_loss: 66_800,
  take_profit_1: 70_200,
  take_profit_2: 72_500,
  take_profit_3: 75_000,
  rr: '1:2.4',
  reasons: [
    'Bullish market structure on 4H — higher highs maintained',
    'Funding rate neutral (+0.008%) — no overheated longs',
    'Fear & Greed 42 (Fear) — historically favorable for longs',
    'On-chain: hashrate ATH signals miner confidence',
  ],
  invalidation: 'Daily close below $66,000',
  timestamp: Date.now(),
};

export default function DashboardPage() {
  const { price, sentiment, onchain, ws, refetch } = useMarketData();

  return (
    <div className="page-root">
      {/* Header */}
      <header className="dash-header">
        <div className="dash-logo">
          <span className="dash-logo-symbol">₿</span>
          <span className="dash-logo-text">BTC Dashboard</span>
        </div>
        <div className="dash-header-right">
          <span className="badge-free">LIVE DEMO</span>
        </div>
      </header>

      <main className="dash-main">
        {/* Verdict Banner — sample data */}
        <VerdictBanner command={DEMO_COMMAND} />

        {/* Price Bar — live WebSocket, always free */}
        <PriceBar price={price} ws={ws} onRefresh={refetch} />

        {/* Free data row */}
        <div className="dash-row-2col">
          <SentimentCard sentiment={sentiment} />
          <div className="mini-card">
            <div className="mini-card-title">On-Chain</div>
            <OnChainPanel data={onchain} />
          </div>
        </div>

        {/* Advanced signal panel — illustrative sample data */}
        <div className="pro-section-divider">
          <span>Advanced signal panel · sample data</span>
        </div>
        <p className="demo-note">
          The panel below is populated with illustrative sample data to demonstrate the interface
          and component design. The live analysis engine is not part of this public demo.
        </p>

        <div className="dash-row-2col">
          <QuantCard longScore={62} shortScore={38} regime="TRENDING" />
          <CommandCard command={DEMO_COMMAND} />
        </div>

        <footer className="dash-footer">
          <span>Built with Next.js · Data: Binance, Alternative.me, mempool.space · Not financial advice</span>
        </footer>
      </main>
    </div>
  );
}
