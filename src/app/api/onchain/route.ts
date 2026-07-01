import { NextResponse } from 'next/server';

export const revalidate = 0;
export const preferredRegion = 'fra1';

export async function GET() {
  try {
    const [hashRes, mempoolRes, feesRes] = await Promise.allSettled([
      fetch('https://blockchain.info/q/hashrate', { cache: 'no-store' }),
      fetch('https://mempool.space/api/mempool', { cache: 'no-store' }),
      fetch('https://mempool.space/api/v1/fees/recommended', { cache: 'no-store' }),
    ]);

    const hashRaw = hashRes.status === 'fulfilled' && hashRes.value.ok
      ? parseFloat(await hashRes.value.text()) : null;
    const mempool = mempoolRes.status === 'fulfilled' && mempoolRes.value.ok
      ? await mempoolRes.value.json() : null;
    const fees = feesRes.status === 'fulfilled' && feesRes.value.ok
      ? await feesRes.value.json() : null;

    // blockchain.info/q/hashrate returns GH/s → EH/s = value / 1e9
    const hashEH = hashRaw ? (hashRaw / 1e9).toFixed(0) + ' EH/s' : '—';
    const hashSignal = hashRaw
      ? (hashRaw > 6e11 ? 'HIGH' : hashRaw > 4e11 ? 'NORMAL' : 'LOW') : 'UNKNOWN';

    const mempoolTx = mempool?.count ?? 0;
    const mempoolSignal = mempoolTx > 50000 ? 'HIGH_DEMAND' : mempoolTx > 20000 ? 'NORMAL' : 'LOW_DEMAND';

    const fastFee = fees?.fastestFee ?? 0;
    const feeSignal = fastFee > 50 ? 'HIGH' : fastFee > 20 ? 'NORMAL' : 'LOW';

    return NextResponse.json({ hashRate: hashEH, hashSignal, mempoolTx, mempoolSignal, fastFee, feeSignal });
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
