# Crypto Trading Dashboard — Live Demo

A real-time BTC/USDT trading dashboard built with **Next.js, TypeScript and Tailwind CSS**.
Dark terminal aesthetic, live Binance WebSocket, Fear & Greed index, and on-chain signals.

This is a **portfolio / demonstration project** — a showcase of building a professional,
real-time crypto trading interface. It runs fully on **public APIs, with no API keys required**.

> **Live demo:** [crypto-dashboard-template.vercel.app](https://crypto-dashboard-template.vercel.app)

---

## What it demonstrates

- **Real-time data over WebSocket** — live BTC mark price streamed from Binance Futures, with auto-reconnect.
- **Clean async data layer** — REST polling for 24h stats, sentiment and on-chain metrics via typed API routes.
- **Professional trading UI** — price bar with live indicator, sentiment gauge, on-chain panel, signal cards, verdict banner.
- **Fully typed** — shared TypeScript types across hooks, components and API routes.
- **Zero-config** — no keys, no database; everything is driven by public endpoints.

---

## Quick start

```bash
npm install
npm run dev
# → http://localhost:3000
```

No `.env` required. All data sources are public APIs.

---

## Data sources (all public, no key)

| Feature | Source | Endpoint |
|---|---|---|
| Live BTC price (WebSocket) | Binance Futures | `wss://fstream.binance.com/ws/btcusdt@markPrice@1s` |
| 24h change, High/Low, Volume | Binance REST | `/api/v3/ticker/24hr` |
| Fear & Greed Index | Alternative.me | `api.alternative.me/fng` |
| Mempool congestion | mempool.space | `/api/mempool` |
| Network fees | mempool.space | `/api/v1/fees/recommended` |
| Hashrate | blockchain.info | `/q/hashrate` |

---

## A note on the "Advanced signal panel"

The dashboard includes an **advanced signal panel** (Quant Scoring, trading command, verdict banner)
rendered with **illustrative sample data**, purely to demonstrate the interface and component design.

**No live trading logic or strategy is included in this repository** — the advanced panel is a UI
demonstration only. Nothing here is financial advice.

---

## Project structure

```
src/
├── app/
│   ├── api/
│   │   ├── price/route.ts       # Binance 24hr ticker
│   │   ├── sentiment/route.ts   # Fear & Greed index
│   │   └── onchain/route.ts     # Hashrate + mempool + fees
│   ├── globals.css              # Dark design system
│   ├── layout.tsx
│   └── page.tsx                 # Dashboard assembly
├── components/
│   ├── PriceBar.tsx             # Live price + WS indicator
│   ├── SentimentCard.tsx        # Fear & Greed mini card
│   ├── OnChainPanel.tsx         # Hashrate / mempool / fees
│   ├── QuantCard.tsx            # Long/Short scoring bar
│   ├── CommandCard.tsx          # Signal command card
│   └── VerdictBanner.tsx        # Enter/Wait verdict
├── hooks/
│   └── useMarketData.ts         # WebSocket + polling hook
├── lib/
│   └── formatters.ts            # fmtUsd, fmtPct, fmtTime
└── types/
    └── market.ts                # Shared TypeScript types
```

---

## Tech stack

Next.js (App Router) · React · TypeScript · Tailwind CSS · native WebSocket · deployed on Vercel.

---

## License

MIT.
