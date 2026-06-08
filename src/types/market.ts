export interface PriceData {
  price: number;
  change24h: number;
  high24h: number;
  low24h: number;
  volume24h: number;
}

export interface SentimentData {
  fgi: number;
  label: string;
}

export interface OnChainData {
  hashRate: string;
  hashSignal: string;
  mempoolTx: number;
  mempoolSignal: string;
  fastFee: number;
  feeSignal: string;
}

export interface MacroData {
  dxy: { last: number; change: number } | null;
  dxySignal: string;
  spx: { last: number; change: number } | null;
  spxSignal: string;
}

export type CommandType = 'LONG' | 'SHORT' | 'WAIT';
export type UrgencyType = 'NOW' | 'LIMIT';

export interface TradingCommand {
  command: CommandType;
  urgency: UrgencyType;
  confidence: number;
  entry?: number;
  stop_loss?: number;
  take_profit_1?: number;
  take_profit_2?: number;
  take_profit_3?: number;
  rr?: string;
  reasons: string[];
  invalidation?: string;
  timestamp: number;
}

export interface WsState {
  connected: boolean;
  markPrice: number | null;
  fundingRate: number | null;
}
