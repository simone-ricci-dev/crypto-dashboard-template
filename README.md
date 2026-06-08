# Crypto Trading Dashboard — Next.js Template

Real-time BTC/USDT trading dashboard built with Next.js 15, TypeScript, and Tailwind CSS.
Dark terminal aesthetic, live Binance WebSocket, Fear & Greed index, on-chain data.

**Free tier** ships fully working out of the box — no API keys needed.
**PRO tier** adds AI Trading Commands (LONG/SHORT/WAIT with entry, SL, 3 TP levels), Quant Scoring, and the Verdict Banner.

---

## Quick start

```bash
npm install
npm run dev
# → http://localhost:3000
```

No `.env` needed for the free tier. All free data sources are public APIs.

---

## Free tier — what works with zero config

| Feature | Source | Notes |
|---|---|---|
| Live BTC price (WebSocket) | Binance Futures | `wss://fstream.binance.com/ws/btcusdt@markPrice@1s` |
| 24h change, High/Low, Volume | Binance REST | `/api/v3/ticker/24hr` |
| Fear & Greed Index | Alternative.me | Public, no key |
| Mempool congestion | mempool.space | Public, no key |
| Hashrate | blockchain.info | Public, no key |
| Network fees | mempool.space | Public, no key |

---

## PRO tier — unlock AI commands

The PRO section (blurred in the free demo) requires an AI provider.

### 1. Create `.env.local`

```bash
cp .env.example .env.local
```

### 2. Add your AI key

```env
# Pick one
ANTHROPIC_API_KEY=sk-ant-...
# or
OPENAI_API_KEY=sk-...
```

### 3. Create the `/api/command` route

The template ships with the UI and types for `TradingCommand` — wire up your own analysis logic in `src/app/api/command/route.ts`. A minimal implementation:

```typescript
import Anthropic from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { price, fgi, hashRate } = await req.json();
  const client = new Anthropic();
  // ... call Claude, parse JSON, return TradingCommand
  return NextResponse.json(command);
}
```

The `TradingCommand` type is in `src/types/market.ts`.

---

## Project structure

```
src/
├── app/
│   ├── api/
│   │   ├── price/route.ts       # Binance 24hr ticker
│   │   ├── sentiment/route.ts   # Fear & Greed index
│   │   └── onchain/route.ts     # Hashrate + mempool + fees
│   ├── globals.css              # Full dark design system
│   ├── layout.tsx
│   └── page.tsx                 # Dashboard assembly
├── components/
│   ├── PriceBar.tsx             # Live price + WS indicator
│   ├── SentimentCard.tsx        # Fear & Greed mini card
│   ├── OnChainPanel.tsx         # Hashrate / mempool / fees
│   ├── QuantCard.tsx            # Long/Short scoring bar [PRO]
│   ├── CommandCard.tsx          # Full AI command card [PRO]
│   └── VerdictBanner.tsx        # Enter/Wait verdict [PRO]
├── hooks/
│   └── useMarketData.ts         # WebSocket + polling hook
├── lib/
│   └── formatters.ts            # fmtUsd, fmtPct, fmtTime
└── types/
    └── market.ts                # All shared TypeScript types
```

---

## Deploy on Vercel

```bash
npx vercel
```

Add environment variables in Vercel dashboard → Settings → Environment Variables.

---

## License

MIT — use it, sell it, modify it. No attribution required.

---

## PRO version

Full PRO source with AI command integration: [gumroad.com/l/crypto-dashboard-pro](https://simonericci.gumroad.com/l/crypto-dashboard-pro) — €59 one-time.
