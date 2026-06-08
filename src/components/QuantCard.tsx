'use client';

interface Props {
  longScore: number;
  shortScore: number;
  regime?: string;
  locked?: boolean;
}

export default function QuantCard({ longScore, shortScore, regime, locked = false }: Props) {
  const total = longScore + shortScore || 100;
  const longPct = (longScore / total) * 100;
  const shortPct = (shortScore / total) * 100;

  return (
    <div className="quant-card" style={{ position: 'relative' }}>
      {locked && (
        <div className="pro-lock-overlay">
          <span className="pro-lock-badge">PRO</span>
          <span className="pro-lock-text">AI Quant Scoring</span>
        </div>
      )}
      <div className="quant-header">
        <span className="quant-title">Quant Scoring</span>
        {regime && <span className="quant-volt-badge">{regime}</span>}
      </div>
      <div className="quant-bar-row">
        <span className="quant-bar-pct long">{longPct.toFixed(1)}% L</span>
        <div className="quant-bar-track">
          <div className="quant-bar-fill-l" style={{ width: longPct + '%' }} />
          <div className="quant-bar-fill-s" style={{ width: shortPct + '%' }} />
        </div>
        <span className="quant-bar-pct short">{shortPct.toFixed(1)}% S</span>
      </div>
      <div className="quant-meta">
        <div className="quant-meta-item">Long score: <span>{longScore}</span></div>
        <div className="quant-meta-item">Short score: <span>{shortScore}</span></div>
      </div>
    </div>
  );
}
