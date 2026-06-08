'use client';
import type { TradingCommand } from '@/types/market';
import { fmtUsd, fmtDateTime } from '@/lib/formatters';

interface Props {
  command: TradingCommand | null;
  locked?: boolean;
}

const ICON_MAP: [string[], string][] = [
  [['trend', 'regime', 'structure', 'markup', 'uptrend', 'downtrend'], '📈'],
  [['funding', 'oi', 'open interest', 'taker', 'liquidat'], '⚡'],
  [['retail', 'long ratio', 'short ratio', 'l/s'], '🐋'],
  [['fear', 'greed', 'panic', 'euphoria'], '🧠'],
  [['dxy', 'spx', 'macro', 'dollar'], '🌍'],
  [['pattern', 'confluenc', 'backtest', 'setup'], '🎯'],
  [['mempool', 'hash', 'on-chain', 'onchain'], '⛓'],
  [['cvd', 'volume', 'delta', 'orderbook'], '📊'],
];

function iconFor(reason: string) {
  const lo = reason.toLowerCase();
  for (const [kw, ic] of ICON_MAP) {
    if (kw.some(k => lo.includes(k))) return ic;
  }
  return '•';
}

export default function CommandCard({ command, locked = false }: Props) {
  const cmd = command?.command ?? 'WAIT';
  const stateClass = cmd === 'LONG' ? 'state-bull' : cmd === 'SHORT' ? 'state-bear' : 'state-wait';
  const urgency = command?.urgency ?? 'LIMIT';
  const conf = command?.confidence ?? 0;

  return (
    <div className={`command-card ${stateClass}`} style={{ position: 'relative' }}>
      {locked && (
        <div className="pro-lock-overlay">
          <span className="pro-lock-badge">PRO</span>
          <span className="pro-lock-text">AI Trading Command</span>
          <a href="#pro" className="pro-lock-cta">Unlock — €59</a>
        </div>
      )}

      <div className="cmd-top">
        <div className="cmd-dir-block">
          <div className="cmd-dir">
            {cmd === 'LONG' ? '▲ LONG' : cmd === 'SHORT' ? '▼ SHORT' : '⏸ WAIT'}
          </div>
          {cmd !== 'WAIT' && (
            <span className={`cmd-urgency ${urgency === 'NOW' ? (cmd === 'SHORT' ? 'cmd-urgency-now bear' : 'cmd-urgency-now') : 'cmd-urgency-limit'}`}>
              {urgency === 'NOW' ? 'ENTER NOW' : 'LIMIT ORDER'}
            </span>
          )}
        </div>
        <div className="cmd-conf-block">
          <div className="cmd-conf-label">Confidence</div>
          <div className="cmd-conf-val">{conf}%</div>
          <div className="cmd-conf-bar">
            <div className="cmd-conf-fill" style={{
              width: conf + '%',
              background: cmd === 'LONG' ? 'var(--green)' : cmd === 'SHORT' ? 'var(--red)' : 'var(--amber)',
            }} />
          </div>
        </div>
      </div>

      {cmd !== 'WAIT' && command && (
        <>
          <div className="cmd-levels">
            {command.entry && <div className="cmd-level entry"><div className="cmd-lbl">Entry</div><div className="cmd-val">{fmtUsd(command.entry)}</div></div>}
            {command.stop_loss && <div className="cmd-level sl"><div className="cmd-lbl">Stop Loss</div><div className="cmd-val">{fmtUsd(command.stop_loss)}</div></div>}
            {command.take_profit_1 && <div className="cmd-level tp"><div className="cmd-lbl">TP1</div><div className="cmd-val">{fmtUsd(command.take_profit_1)}</div></div>}
            {command.rr && <div className="cmd-level rr"><div className="cmd-lbl">R:R</div><div className="cmd-val">{command.rr}</div></div>}
          </div>
          <div className="cmd-tp-row">
            {command.take_profit_2 && <span className="cmd-tp-chip">TP2 {fmtUsd(command.take_profit_2)}</span>}
            {command.take_profit_3 && <span className="cmd-tp-chip">TP3 {fmtUsd(command.take_profit_3)}</span>}
          </div>
        </>
      )}

      <div className="cmd-reasons">
        {command?.reasons?.length ? command.reasons.map((r, i) => (
          <div key={i} className="cmd-reason">
            <span className="cmd-reason-icon">{iconFor(r)}</span>
            <span>{r}</span>
          </div>
        )) : (
          <div className="cmd-reason-placeholder">
            {locked ? 'AI analysis available in PRO version.' : 'No analysis yet. Click Analyze.'}
          </div>
        )}
      </div>

      {command?.invalidation && (
        <div className="cmd-info-row">
          <div className="cmd-invalidation">
            <span className="cmd-inv-label">Invalidate if: </span>
            {command.invalidation}
          </div>
        </div>
      )}

      <div className="cmd-footer">
        <div className="cmd-ts">
          {command?.timestamp ? 'Last analysis: ' + fmtDateTime(command.timestamp) : ''}
        </div>
      </div>
    </div>
  );
}
