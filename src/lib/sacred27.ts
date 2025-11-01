/**
 * Sacred27 Mathematical Framework
 * 
 * The Sacred27 system is based on the mathematical principle that price levels
 * at multiples of 27 act as magnetic attractors in financial markets.
 * 
 * Key Concepts:
 * - Price levels: Multiples of 27 (27, 54, 81, 108, 135, 162, 189, 216, 243, 270, 297, 324, etc.)
 * - Phase tracking: 0°-360° market cycle (Accumulation → Markup → Distribution → Markdown)
 * - Whale activity: Institutional orders at Sacred27 levels
 */

export interface Sacred27Level {
  price: number;
  multiple: number;
  strength: 'strong' | 'medium' | 'weak';
}

export interface PhaseInfo {
  phase: number; // 0-360 degrees
  phaseName: string;
  phaseDescription: string;
  signal: 'BUY' | 'SELL' | 'HOLD';
}

/**
 * Calculate Sacred27 levels for a given price range
 */
export function calculateSacred27Levels(
  minPrice: number,
  maxPrice: number
): Sacred27Level[] {
  const levels: Sacred27Level[] = [];
  const base = 27;
  
  // Find the first multiple of 27 above minPrice
  const startMultiple = Math.floor(minPrice / base);
  const endMultiple = Math.ceil(maxPrice / base);
  
  for (let i = startMultiple; i <= endMultiple; i++) {
    const price = i * base;
    if (price >= minPrice && price <= maxPrice) {
      // Determine strength based on multiple
      let strength: 'strong' | 'medium' | 'weak' = 'weak';
      if (i % 10 === 0) strength = 'strong';
      else if (i % 5 === 0) strength = 'medium';
      
      levels.push({
        price,
        multiple: i,
        strength
      });
    }
  }
  
  return levels;
}

/**
 * Calculate the current phase (0-360 degrees) based on price position
 * relative to Sacred27 levels
 */
export function calculatePhase(
  currentPrice: number,
  sacred27Levels: Sacred27Level[]
): PhaseInfo {
  if (sacred27Levels.length < 2) {
    return {
      phase: 0,
      phaseName: 'Unknown',
      phaseDescription: 'Insufficient data',
      signal: 'HOLD'
    };
  }
  
  // Find the two Sacred27 levels surrounding the current price
  let lowerLevel: Sacred27Level | null = null;
  let upperLevel: Sacred27Level | null = null;
  
  for (let i = 0; i < sacred27Levels.length - 1; i++) {
    if (sacred27Levels[i].price <= currentPrice && sacred27Levels[i + 1].price >= currentPrice) {
      lowerLevel = sacred27Levels[i];
      upperLevel = sacred27Levels[i + 1];
      break;
    }
  }
  
  if (!lowerLevel || !upperLevel) {
    // Price is outside the range
    if (currentPrice < sacred27Levels[0].price) {
      lowerLevel = sacred27Levels[0];
      upperLevel = sacred27Levels[1];
    } else {
      lowerLevel = sacred27Levels[sacred27Levels.length - 2];
      upperLevel = sacred27Levels[sacred27Levels.length - 1];
    }
  }
  
  // Calculate phase (0-360) based on position between levels
  const range = upperLevel.price - lowerLevel.price;
  const position = currentPrice - lowerLevel.price;
  const ratio = position / range;
  const phase = Math.round(ratio * 360);
  
  // Determine phase name and signal
  let phaseName: string;
  let phaseDescription: string;
  let signal: 'BUY' | 'SELL' | 'HOLD';
  
  if (phase >= 0 && phase < 90) {
    phaseName = 'Accumulation';
    phaseDescription = 'Smart money accumulating positions';
    signal = 'BUY';
  } else if (phase >= 90 && phase < 180) {
    phaseName = 'Markup';
    phaseDescription = 'Price rising, momentum building';
    signal = 'BUY';
  } else if (phase >= 180 && phase < 270) {
    phaseName = 'Distribution';
    phaseDescription = 'Smart money distributing positions';
    signal = 'SELL';
  } else {
    phaseName = 'Markdown';
    phaseDescription = 'Price declining, momentum fading';
    signal = 'SELL';
  }
  
  return {
    phase,
    phaseName,
    phaseDescription,
    signal
  };
}

/**
 * Find the nearest Sacred27 level to a given price
 */
export function findNearestSacred27Level(price: number): number {
  const base = 27;
  const multiple = Math.round(price / base);
  return multiple * base;
}

/**
 * Check if a price is near a Sacred27 level (within threshold)
 */
export function isNearSacred27Level(
  price: number,
  threshold: number = 2
): boolean {
  const nearest = findNearestSacred27Level(price);
  return Math.abs(price - nearest) <= threshold;
}
