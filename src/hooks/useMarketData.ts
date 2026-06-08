'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import type { PriceData, SentimentData, OnChainData, WsState } from '@/types/market';

export function useMarketData() {
  const [price, setPrice] = useState<PriceData | null>(null);
  const [sentiment, setSentiment] = useState<SentimentData | null>(null);
  const [onchain, setOnchain] = useState<OnChainData | null>(null);
  const [ws, setWs] = useState<WsState>({ connected: false, markPrice: null, fundingRate: null });
  const wsRef = useRef<WebSocket | null>(null);

  const fetchPrice = useCallback(async () => {
    try {
      const r = await fetch('/api/price');
      if (r.ok) setPrice(await r.json());
    } catch {}
  }, []);

  const fetchSentiment = useCallback(async () => {
    try {
      const r = await fetch('/api/sentiment');
      if (r.ok) setSentiment(await r.json());
    } catch {}
  }, []);

  const fetchOnchain = useCallback(async () => {
    try {
      const r = await fetch('/api/onchain');
      if (r.ok) setOnchain(await r.json());
    } catch {}
  }, []);

  const connectWs = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return;

    const streams = 'btcusdt@markPrice@1s';
    const socket = new WebSocket(`wss://fstream.binance.com/ws/${streams}`);
    wsRef.current = socket;

    socket.onopen = () => setWs(p => ({ ...p, connected: true }));
    socket.onclose = () => {
      setWs(p => ({ ...p, connected: false }));
      setTimeout(connectWs, 3000);
    };
    socket.onerror = () => socket.close();
    socket.onmessage = (e) => {
      try {
        const d = JSON.parse(e.data);
        setWs({
          connected: true,
          markPrice: d.p ? parseFloat(d.p) : null,
          fundingRate: d.r ? parseFloat(d.r) : null,
        });
      } catch {}
    };
  }, []);

  useEffect(() => {
    fetchPrice();
    fetchSentiment();
    fetchOnchain();
    connectWs();

    const intervals = [
      setInterval(fetchPrice, 60_000),
      setInterval(fetchSentiment, 10 * 60_000),
      setInterval(fetchOnchain, 10 * 60_000),
    ];

    return () => {
      intervals.forEach(clearInterval);
      wsRef.current?.close();
    };
  }, [fetchPrice, fetchSentiment, fetchOnchain, connectWs]);

  return { price, sentiment, onchain, ws, refetch: fetchPrice };
}
