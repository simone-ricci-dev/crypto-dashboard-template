import { NextResponse } from 'next/server';

export const revalidate = 0;
export const preferredRegion = 'fra1';

export async function GET() {
  try {
    const res = await fetch('https://api.alternative.me/fng/?limit=1', { cache: 'no-store' });
    if (!res.ok) throw new Error('FGI error');
    const data = await res.json();
    const d = data.data[0];
    return NextResponse.json({ fgi: parseInt(d.value), label: d.value_classification });
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
