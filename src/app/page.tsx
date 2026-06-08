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
          <span className="badge-free">FREE TIER</span>
          <a href="#pro" className="btn-pro-small">Upgrade PRO — €59</a>
        </div>
      </header>

      <main className="dash-main">
        {/* Verdict Banner — PRO locked */}
        <VerdictBanner command={DEMO_COMMAND} locked />

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

        {/* PRO section */}
        <div className="pro-section-divider">
          <span>PRO features — preview below</span>
        </div>

        <div className="dash-row-2col">
          <QuantCard longScore={62} shortScore={38} regime="TRENDING" locked />
          <CommandCard command={DEMO_COMMAND} locked />
        </div>

        {/* PRO CTA */}
        <section className="pro-cta-section" id="pro">
          <div className="pro-cta-card">
            <div className="pro-cta-badge">PRO</div>
            <h2 className="pro-cta-title">Unlock the full dashboard</h2>
            <p className="pro-cta-sub">
              One-time payment. Lifetime access. MIT license — deploy it as your own product.
            </p>
            <ul className="pro-cta-list">
              <li>AI Trading Command — LONG / SHORT / WAIT with entry, SL, and 3 TP levels</li>
              <li>Quant Scoring — multi-factor signal composite (trend, funding, macro, on-chain)</li>
              <li>Verdict Banner — instant read on whether to enter or wait</li>
              <li>Plug-in your own AI provider (Anthropic, OpenAI, Groq)</li>
              <li>Full source code, TypeScript, App Router, Tailwind</li>
            </ul>
            <a
              href="https://simonericci.gumroad.com/l/crypto-dashboard-pro"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-buy"
            >
              Buy PRO — €59
            </a>
            <p className="pro-cta-note">Instant download. No subscription.</p>
          </div>
        </section>

        <footer className="dash-footer">
          <span>Built with Next.js · Data: Binance, Alternative.me, mempool.space · Not financial advice</span>
        </footer>
      </main>
    </div>
  );
}
