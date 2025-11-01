// Real-time stock data integration using Yahoo Finance API
// This file provides utilities to fetch live stock data

export interface StockPrice {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  open: number;
  volume: number;
  marketCap: number;
}

export interface Sacred27Levels {
  resistance: number[];
  support: number[];
  current: number;
  phase: number;
  zone: string;
  confidence: number;
}

// Calculate Sacred27 levels based on current price
export function calculateSacred27Levels(price: number): Sacred27Levels {
  // Sacred27 algorithm: Use 27, 54, 81 as multipliers
  const baseLevel = Math.floor(price / 27) * 27;
  
  const resistance = [
    Math.round((price + (price * 0.077)) * 100) / 100,  // +7.7%
    Math.round((price + (price * 0.231)) * 100) / 100,  // +23.1%
    Math.round((price + (price * 0.385)) * 100) / 100,  // +38.5%
  ];
  
  const support = [
    Math.round((price - (price * 0.077)) * 100) / 100,  // -7.7%
    Math.round((price - (price * 0.231)) * 100) / 100,  // -23.1%
    Math.round((price - (price * 0.385)) * 100) / 100,  // -38.5%
  ];
  
  // Calculate phase (0-360 degrees)
  const phase = Math.round((price % 27) / 27 * 360);
  
  // Determine zone
  let zone = "NEUTRAL";
  if (phase < 90) zone = "ACCUMULATION";
  else if (phase < 180) zone = "MARKUP";
  else if (phase < 270) zone = "DISTRIBUTION";
  else zone = "MARKDOWN";
  
  // Calculate confidence (higher when closer to support)
  const distanceToSupport = Math.min(...support.map(s => Math.abs(price - s)));
  const distanceToResistance = Math.min(...resistance.map(r => Math.abs(price - r)));
  const confidence = Math.round((distanceToSupport / (distanceToSupport + distanceToResistance)) * 100);
  
  return {
    resistance,
    support,
    current: price,
    phase,
    zone,
    confidence
  };
}

// Fetch real-time stock price (mock for now, will integrate API)
export async function fetchStockPrice(symbol: string): Promise<StockPrice | null> {
  try {
    // For now, return mock data
    // TODO: Integrate with Yahoo Finance API via /api/stock/[symbol]
    const mockPrices: Record<string, StockPrice> = {
      AAPL: {
        symbol: "AAPL",
        price: 175.50,
        change: 2.35,
        changePercent: 1.36,
        high: 177.20,
        low: 173.80,
        open: 174.10,
        volume: 52340000,
        marketCap: 2750000000000
      },
      TSLA: {
        symbol: "TSLA",
        price: 242.80,
        change: -3.45,
        changePercent: -1.40,
        high: 248.50,
        low: 241.20,
        open: 246.30,
        volume: 98750000,
        marketCap: 770000000000
      },
      NVDA: {
        symbol: "NVDA",
        price: 495.20,
        change: 12.80,
        changePercent: 2.65,
        high: 498.90,
        low: 488.50,
        open: 490.30,
        volume: 45230000,
        marketCap: 1220000000000
      }
    };
    
    return mockPrices[symbol.toUpperCase()] || null;
  } catch (error) {
    console.error("Error fetching stock price:", error);
    return null;
  }
}

// Calculate explosion score (0-100)
export function calculateExplosionScore(price: number, levels: Sacred27Levels): number {
  const { support, resistance, phase, confidence } = levels;
  
  // Factors that increase explosion score:
  // 1. Proximity to support (bounce potential)
  // 2. Phase in accumulation/markup zone
  // 3. High confidence level
  
  const nearestSupport = Math.min(...support.map(s => Math.abs(price - s)));
  const priceRange = resistance[0] - support[0];
  const supportProximity = 1 - (nearestSupport / priceRange);
  
  const phaseScore = phase < 180 ? 1 : 0.5; // Higher in accumulation/markup
  
  const score = Math.round(
    (supportProximity * 40) +
    (phaseScore * 30) +
    (confidence * 0.3)
  );
  
  return Math.min(100, Math.max(0, score));
}
