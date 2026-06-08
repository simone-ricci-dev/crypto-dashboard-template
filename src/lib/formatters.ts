export const fmtUsd = (n: number) =>
  '$' + n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

export const fmtPct = (n: number) =>
  (n > 0 ? '+' : '') + n.toFixed(2) + '%';

export const fmtTime = (ts: number) =>
  new Date(ts).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

export const fmtDateTime = (ts: number) =>
  new Date(ts).toLocaleString('en-US', {
    day: '2-digit', month: '2-digit',
    hour: '2-digit', minute: '2-digit',
  });
