/**
 * Volume Profile Analysis Library
 * 
 * Calculates volume distribution across price levels to identify:
 * - POC (Point of Control): Price level with highest volume
 * - Value Area: Price range containing 70% of total volume
 * - Volume Delta: Difference between buying and selling volume
 */

import { Sacred27Level, calculatePhase, calculateSacred27Levels } from './sacred27';

export interface Candle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface VolumeLevel {
  price: number;
  volume: number;
  buyVolume: number;
  sellVolume: number;
  delta: number;
}

export interface VolumeProfileResult {
  levels: VolumeLevel[];
  poc: number; // Point of Control
  valueAreaHigh: number;
  valueAreaLow: number;
  totalVolume: number;
  sacred27Levels: Sacred27Level[];
  phase: number;
  signal: string;
  confidence: number;
}

/**
 * Calculate volume profile from candle data
 */
export function calculateVolumeProfile(
  candles: Candle[],
  numLevels: number = 50
): VolumeProfileResult {
  if (candles.length === 0) {
    return {
      levels: [],
      poc: 0,
      valueAreaHigh: 0,
      valueAreaLow: 0,
      totalVolume: 0,
      sacred27Levels: [],
      phase: 0,
      signal: 'HOLD',
      confidence: 0
    };
  }

  // Find price range
  const prices = candles.flatMap(c => [c.high, c.low]);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const priceRange = maxPrice - minPrice;
  const levelSize = priceRange / numLevels;

  // Initialize volume levels
  const volumeLevels: VolumeLevel[] = [];
  for (let i = 0; i < numLevels; i++) {
    const price = minPrice + (i * levelSize) + (levelSize / 2);
    volumeLevels.push({
      price,
      volume: 0,
      buyVolume: 0,
      sellVolume: 0,
      delta: 0
    });
  }

  // Distribute volume across price levels
  let totalVolume = 0;
  candles.forEach(candle => {
    const candleRange = candle.high - candle.low;
    if (candleRange === 0) return;

    const volumePerPrice = candle.volume / candleRange;
    const isBullish = candle.close > candle.open;

    // Distribute volume to levels within candle range
    volumeLevels.forEach(level => {
      if (level.price >= candle.low && level.price <= candle.high) {
        const volumeAtLevel = volumePerPrice * levelSize;
        level.volume += volumeAtLevel;
        
        if (isBullish) {
          level.buyVolume += volumeAtLevel;
        } else {
          level.sellVolume += volumeAtLevel;
        }
        
        level.delta = level.buyVolume - level.sellVolume;
        totalVolume += volumeAtLevel;
      }
    });
  });

  // Find POC (Point of Control) - level with highest volume
  const poc = volumeLevels.reduce((max, level) => 
    level.volume > max.volume ? level : max
  , volumeLevels[0] || { price: 0, volume: 0, buyVolume: 0, sellVolume: 0, delta: 0 });

  // Calculate Value Area (70% of volume)
  const sortedByVolume = [...volumeLevels].sort((a, b) => b.volume - a.volume);
  const targetVolume = totalVolume * 0.7;
  let accumulatedVolume = 0;
  const valueAreaLevels: VolumeLevel[] = [];

  for (const level of sortedByVolume) {
    if (accumulatedVolume >= targetVolume) break;
    valueAreaLevels.push(level);
    accumulatedVolume += level.volume;
  }

  const valueAreaPrices = valueAreaLevels.map(l => l.price);
  const valueAreaHigh = Math.max(...valueAreaPrices, 0);
  const valueAreaLow = Math.min(...valueAreaPrices, Infinity);

  // Calculate Sacred27 levels
  const sacred27Levels = calculateSacred27Levels(minPrice, maxPrice);

  // Calculate phase
  const currentPrice = candles[candles.length - 1]?.close || 0;
  const phaseInfo = calculatePhase(currentPrice, sacred27Levels);

  // Generate trading signal
  const { signal, confidence } = generateSignal(
    currentPrice,
    poc.price,
    valueAreaHigh,
    valueAreaLow,
    phaseInfo.phase,
    volumeLevels
  );

  return {
    levels: volumeLevels,
    poc: poc.price,
    valueAreaHigh,
    valueAreaLow,
    totalVolume,
    sacred27Levels,
    phase: phaseInfo.phase,
    signal,
    confidence
  };
}

/**
 * Generate trading signal based on volume profile analysis
 */
function generateSignal(
  currentPrice: number,
  poc: number,
  valueAreaHigh: number,
  valueAreaLow: number,
  phase: number,
  levels: VolumeLevel[]
): { signal: string; confidence: number } {
  const signals: string[] = [];
  let confidence = 0;

  // Price position relative to POC
  if (currentPrice < poc) {
    signals.push('Price below Point of Control (POC)');
    confidence += 20;
  } else if (currentPrice > poc) {
    signals.push('Price above Point of Control (POC)');
    confidence += 20;
  } else {
    signals.push('Price at Point of Control (POC)');
  }

  // Price position relative to Value Area
  if (currentPrice < valueAreaLow) {
    signals.push('Price below Value Area - potential BUY zone');
    confidence += 30;
  } else if (currentPrice > valueAreaHigh) {
    signals.push('Price above Value Area - potential SELL zone');
    confidence += 30;
  } else {
    signals.push('Price within Value Area - HOLD');
  }

  // Phase analysis
  if (phase >= 0 && phase < 90) {
    signals.push('Accumulation phase (0°-90°) - BUY signal');
    confidence += 25;
  } else if (phase >= 90 && phase < 180) {
    signals.push('Markup phase (90°-180°) - HOLD/BUY signal');
    confidence += 15;
  } else if (phase >= 180 && phase < 270) {
    signals.push('Distribution phase (180°-270°) - SELL signal');
    confidence += 25;
  } else {
    signals.push('Markdown phase (270°-360°) - SELL signal');
    confidence += 25;
  }

  // Volume delta analysis
  const totalDelta = levels.reduce((sum, level) => sum + level.delta, 0);
  if (totalDelta > 0) {
    signals.push('Positive volume delta - buying pressure');
    confidence += 25;
  } else {
    signals.push('Negative volume delta - selling pressure');
    confidence += 25;
  }

  // Determine overall signal
  let signal = 'HOLD';
  if (currentPrice < valueAreaLow && phase < 180) {
    signal = 'BUY';
  } else if (currentPrice > valueAreaHigh && phase >= 180) {
    signal = 'SELL';
  }

  return {
    signal: signals.join(' • '),
    confidence: Math.min(confidence, 100)
  };
}
