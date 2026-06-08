'use client';
import type { OnChainData } from '@/types/market';

interface Props { data: OnChainData | null }

const sigCls = (s: string) => {
  if (!s) return 'neutral';
  if (s === 'HIGH' || s === 'HIGH_DEMAND' || s === 'URGENT') return 'bull';
  if (s === 'LOW' || s === 'LOW_DEMAND') return 'bear';
  return 'neutral';
};

const sigLabel = (s: string) => s.replace(/_/g, ' ');

export default function OnChainPanel({ data }: Props) {
  if (!data) return <div className="loading-text">Loading on-chain data...</div>;

  return (
    <>
      <div className="onchain-grid">
        <div className="oc-item">
          <div className="oc-lbl">Hashrate</div>
          <div className="oc-val">{data.hashRate}</div>
          <span className={`oc-sig ${sigCls(data.hashSignal)}`}>{sigLabel(data.hashSignal)}</span>
        </div>
        <div className="oc-item">
          <div className="oc-lbl">Mempool</div>
          <div className="oc-val">{data.mempoolTx.toLocaleString()}</div>
          <span className={`oc-sig ${sigCls(data.mempoolSignal)}`}>{sigLabel(data.mempoolSignal)}</span>
        </div>
        <div className="oc-item">
          <div className="oc-lbl">Fast Fee</div>
          <div className="oc-val">{data.fastFee} sat/vB</div>
          <span className={`oc-sig ${sigCls(data.feeSignal)}`}>{sigLabel(data.feeSignal)}</span>
        </div>
      </div>
      <div style={{ fontSize: '9px', color: 'var(--muted)', marginTop: '5px' }}>
        blockchain.info · mempool.space
      </div>
    </>
  );
}
