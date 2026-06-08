'use client';
import type { TradingCommand } from '@/types/market';
import { fmtUsd } from '@/lib/formatters';

interface Props {
  command: TradingCommand | null;
  locked?: boolean;
}

export default function VerdictBanner({ command, locked = false }: Props) {
  if (!command) return null;
  const cmd = command.command;
  const isLong = cmd === 'LONG';
  const isShort = cmd === 'SHORT';
  const isWait = !isLong && !isShort;
  const verdictClass = isLong ? 'open-long' : isShort ? 'open-short' : 'wait';

  return (
    <div className={`verdict ${verdictClass}`} style={{ position: 'relative' }}>
      {locked && (
        <div className="pro-lock-overlay" style={{ borderRadius: '14px' }}>
          <span className="pro-lock-badge">PRO</span>
          <span className="pro-lock-text">AI Verdict</span>
        </div>
      )}
      <div className="verdict-row">
        <div className="verdict-main">
          {isLong && (locked ? 'OPEN LONG ▲' : (command.urgency === 'NOW' ? 'ENTER NOW ▲ LONG' : 'LIMIT ORDER ▲ LONG'))}
          {isShort && (locked ? 'OPEN SHORT ▼' : (command.urgency === 'NOW' ? 'ENTER NOW ▼ SHORT' : 'LIMIT ORDER ▼ SHORT'))}
          {isWait && <span>⏸ WAIT <span className="verdict-dir">— stay out</span></span>}
        </div>
        {!isWait && !locked && command.entry && (
          <div className="verdict-levels">
            <span>Entry<b>{fmtUsd(command.entry)}</b></span>
            {command.stop_loss && <span>SL<b>{fmtUsd(command.stop_loss)}</b></span>}
            {command.take_profit_1 && <span>TP1<b>{fmtUsd(command.take_profit_1)}</b></span>}
          </div>
        )}
      </div>
      <div className="verdict-sub">
        {isWait
          ? 'No clear directional edge. Stay out of the market — patience is the trade.'
          : locked
            ? 'Full entry levels, stop loss, and take profit targets available in PRO version.'
            : command.urgency === 'NOW'
              ? `Enter at market. Conviction ${command.confidence}%.`
              : `Place limit order at ${command.entry ? fmtUsd(command.entry) : '—'} and wait for execution. Conviction ${command.confidence}%.`}
      </div>
    </div>
  );
}
