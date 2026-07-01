import { NextResponse } from 'next/server';

export const revalidate = 0;
export const preferredRegion = 'fra1';

export async function GET() {
  try {
    // Public Binance market-data cluster — not IP/geo-restricted like api.binance.com.
    const ticker = await fetch(
      'https://data-api.binance.vision/api/v3/ticker/24hr?symbol=BTCUSDT',
      { cache: 'no-store' },
    );

    if (!ticker.ok) throw new Error('Binance ticker error');
    const t = await ticker.json();

    const price = parseFloat(t.lastPrice);
    const change24h = parseFloat(t.priceChangePercent);
    const high24h = parseFloat(t.highPrice);
    const low24h = parseFloat(t.lowPrice);
    const volume24h = parseFloat(t.quoteVolume);

    return NextResponse.json({ price, change24h, high24h, low24h, volume24h });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch price' }, { status: 500 });
  }
}
