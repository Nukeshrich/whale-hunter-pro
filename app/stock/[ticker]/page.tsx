'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import Disclaimer from '@/app/components/Disclaimer';

// Sacred27 number sequence (simplified for demo)
const SACRED27_LEVELS = [
  27, 54, 81, 108, 135, 162, 189, 216, 243, 270, 297, 324, 351, 378, 405, 432, 459, 486, 513, 540
];

function getSacred27Levels(price: number) {
  // Find nearest levels above and below current price
  const below = SACRED27_LEVELS.filter(l => l < price).slice(-3);
  const above = SACRED27_LEVELS.filter(l => l > price).slice(0, 3);
  return { below, above, nearest: [...below.slice(-1), ...above.slice(0, 1)] };
}

interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  open: number;
  volume: number;
  marketCap: number;
  companyName: string;
  timestamp: string;
  lastUpdate: string;
}

interface WhaleHolder {
  name: string;
  company: string;
  emoji: string;
  shares: number;
  sharesFormatted: string;
  value: number;
  valueFormatted: string;
  percentHeld: number;
  dateReported: string;
  isLegendary: boolean;
}

interface WhaleData {
  ticker: string;
  whales: WhaleHolder[];
  legendaryCount: number;
  totalInstitutionalHolders: number;
  lastUpdate: string;
}

interface InsiderSummary {
  totalBuying: number;
  totalSelling: number;
  netActivity: number;
  buyTransactions: number;
  sellTransactions: number;
  sentiment: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  sentimentScore: number;
}

interface InsiderData {
  ticker: string;
  summary: InsiderSummary;
  lastUpdate: string;
  period: string;
}

export default function StockPage({ params }: { params: Promise<{ ticker: string }> }) {
  const { ticker } = use(params);
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [whaleData, setWhaleData] = useState<WhaleData | null>(null);
  const [insiderData, setInsiderData] = useState<InsiderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  // Fetch stock data
  const fetchStockData = async () => {
    try {
      const response = await fetch(`/api/stock/${ticker}`);
      const data = await response.json();
      setStockData(data);
      setLastRefresh(new Date());
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stock data:', error);
      setLoading(false);
    }
  };

  // Fetch whale holdings data
  const fetchWhaleData = async () => {
    try {
      const response = await fetch(`/api/whales/${ticker}`);
      const data = await response.json();
      setWhaleData(data);
    } catch (error) {
      console.error('Error fetching whale data:', error);
    }
  };

  // Fetch insider transaction data
  const fetchInsiderData = async () => {
    try {
      const response = await fetch(`/api/insiders/${ticker}`);
      const data = await response.json();
      setInsiderData(data);
    } catch (error) {
      console.error('Error fetching insider data:', error);
    }
  };

  // Initial fetch and auto-refresh every 15 seconds
  useEffect(() => {
    fetchStockData();
    fetchWhaleData();
    fetchInsiderData();
    const interval = setInterval(fetchStockData, 15000); // 15 seconds
    return () => clearInterval(interval);
  }, [ticker]);

  if (loading || !stockData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-white text-2xl">Loading {ticker.toUpperCase()}...</div>
      </div>
    );
  }

  const levels = getSacred27Levels(stockData.price);
  
  // Calculate explosion score based on Sacred27 position
  const calculateExplosionScore = () => {
    const nearestSupport = levels.below[levels.below.length - 1] || 0;
    const nearestResistance = levels.above[0] || stockData.price * 1.5;
    const distanceToSupport = stockData.price - nearestSupport;
    const distanceToResistance = nearestResistance - stockData.price;
    const totalDistance = distanceToSupport + distanceToResistance;
    
    // Higher score when closer to support (better buy opportunity)
    const positionScore = (distanceToResistance / totalDistance) * 50;
    
    // Add momentum score based on change
    const momentumScore = Math.min(Math.abs(stockData.changePercent) * 5, 30);
    
    // Add volume factor (simplified)
    const volumeScore = 20;
    
    return Math.round(positionScore + momentumScore + volumeScore);
  };

  const explosionScore = calculateExplosionScore();

  // Calculate Sacred27 phase (0-360 degrees)
  const calculatePhase = () => {
    const cycle = stockData.price % 27;
    return Math.round((cycle / 27) * 360);
  };

  const phase = calculatePhase();
  
  // Determine zone based on phase
  const getZone = () => {
    if (phase < 90) return { name: 'ACCUMULATION', color: 'text-green-400' };
    if (phase < 180) return { name: 'MARKUP', color: 'text-blue-400' };
    if (phase < 270) return { name: 'DISTRIBUTION', color: 'text-yellow-400' };
    return { name: 'MARKDOWN', color: 'text-red-400' };
  };

  const zone = getZone();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/"
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <span className="text-4xl">🐋</span>
              <div>
                <h1 className="text-2xl font-bold text-white">Whale Hunter Pro</h1>
                <p className="text-sm text-purple-300">Powered by Sacred27</p>
              </div>
            </Link>
            <div className="text-right">
              <div className="text-sm text-purple-300">Last Update</div>
              <div className="text-white font-mono text-sm">{stockData.lastUpdate}</div>
              <div className="text-xs text-purple-400 mt-1">Auto-refresh: 15s</div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Disclaimer />
        
        {/* Stock Header */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-5xl font-bold text-white mb-2">{ticker.toUpperCase()}</h2>
              <p className="text-purple-200">{stockData.companyName}</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-white">${stockData.price.toFixed(2)}</div>
              <div className={`text-lg ${stockData.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {stockData.change >= 0 ? '+' : ''}{stockData.change.toFixed(2)} ({stockData.changePercent >= 0 ? '+' : ''}{stockData.changePercent.toFixed(2)}%)
              </div>
            </div>
          </div>

          {/* Explosion Score */}
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-6 border border-purple-400/30">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">💥 Explosion Score</h3>
                <p className="text-purple-200">Probability of significant move</p>
              </div>
              <div className="text-6xl font-bold text-white">{explosionScore}/100</div>
            </div>
          </div>
        </div>

        {/* Visual Price Chart - Semicircle Speedometer Gauge */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 mb-8">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2 justify-center">
            <span>🎯</span> Sacred27 Price Position
          </h3>
          
          <div className="flex items-center justify-center">
            <div className="relative w-[500px] h-[300px]">
              {/* Semicircle gauge */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 120">
                {/* Background semicircle zones */}
                {/* Support zone (left - green) */}
                <path
                  d="M 20 110 A 80 80 0 0 1 100 30"
                  fill="none"
                  stroke="rgb(34, 197, 94)"
                  strokeWidth="30"
                  opacity="0.3"
                />
                {/* Neutral zone (middle - yellow) */}
                <path
                  d="M 100 30 A 80 80 0 0 1 180 110"
                  fill="none"
                  stroke="rgb(234, 179, 8)"
                  strokeWidth="30"
                  opacity="0.2"
                />
                
                {/* Level markers on semicircle */}
                {[...levels.below.reverse(), ...levels.above].map((level, idx) => {
                  const totalLevels = levels.below.length + levels.above.length;
                  const angle = 180 - (idx * (180 / (totalLevels + 1)));
                  const rad = (angle * Math.PI) / 180;
                  const x1 = 100 + 65 * Math.cos(rad);
                  const y1 = 110 - 65 * Math.sin(rad);
                  const x2 = 100 + 85 * Math.cos(rad);
                  const y2 = 110 - 85 * Math.sin(rad);
                  const isSupport = levels.below.includes(level);
                  return (
                    <line
                      key={`marker-${level}`}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={isSupport ? 'rgb(74, 222, 128)' : 'rgb(248, 113, 113)'}
                      strokeWidth="3"
                    />
                  );
                })}
                
                {/* Center pivot */}
                <circle cx="100" cy="110" r="8" fill="rgb(234, 179, 8)" stroke="white" strokeWidth="2" />
                
                {/* Needle/Arrow indicator - MOVES WITH LIVE PRICE */}
                <g>
                  {(() => {
                    // Calculate needle angle based on REAL-TIME price position
                    const minPrice = Math.min(...levels.below);
                    const maxPrice = Math.max(...levels.above);
                    const priceRange = maxPrice - minPrice;
                    const pricePosition = (stockData.price - minPrice) / priceRange;
                    // Map to 180 degrees (left to right)
                    const needleAngle = 180 - (pricePosition * 180);
                    const rad = (needleAngle * Math.PI) / 180;
                    const needleLength = 60;
                    const needleX = 100 + needleLength * Math.cos(rad);
                    const needleY = 110 - needleLength * Math.sin(rad);
                    
                    return (
                      <>
                        <line 
                          x1="100" 
                          y1="110" 
                          x2={needleX} 
                          y2={needleY} 
                          stroke="white" 
                          strokeWidth="4" 
                          strokeLinecap="round"
                          className="drop-shadow-lg transition-all duration-1000 ease-out"
                        />
                        <circle cx={needleX} cy={needleY} r="4" fill="white" className="animate-pulse" />
                      </>
                    );
                  })()}
                </g>
              </svg>
              
              {/* Center price display - LIVE UPDATING */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
                <div className="text-5xl font-bold text-white transition-all duration-500">
                  ${stockData.price.toFixed(2)}
                </div>
                <div className={`text-xl font-semibold transition-colors duration-300 ${stockData.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {stockData.change >= 0 ? '↑ +' : '↓ '}{stockData.change.toFixed(2)} ({stockData.changePercent >= 0 ? '+' : ''}{stockData.changePercent.toFixed(2)}%)
                </div>
              </div>
              
              {/* Left side - Support labels */}
              <div className="absolute left-0 top-8 text-left">
                <div className="text-green-400 font-bold text-sm mb-2">SUPPORT</div>
                {levels.below.reverse().map((level, idx) => (
                  <div key={`sup-label-${level}`} className="text-green-300 text-xs">
                    ${level}
                  </div>
                ))}
              </div>
              
              {/* Right side - Resistance labels */}
              <div className="absolute right-0 top-8 text-right">
                <div className="text-red-400 font-bold text-sm mb-2">RESISTANCE</div>
                {levels.above.map((level, idx) => (
                  <div key={`res-label-${level}`} className="text-red-300 text-xs">
                    ${level}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-purple-500/10 border border-purple-400/30 rounded-lg">
            <p className="text-purple-200 text-sm text-center">
              <span className="font-bold text-white">Sacred27 Analysis:</span> Price is currently between ${levels.below[levels.below.length - 1]} support and ${levels.above[0]} resistance. 
              {stockData.change >= 0 
                ? ' Trending upward - watch for resistance test.' 
                : ' Trending downward - watch for support test.'}
            </p>
          </div>
        </div>

        {/* Sacred27 Levels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span>🔢</span> Sacred27 Levels
            </h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-red-400 mb-3">Resistance (Above)</h4>
                {levels.above.map((level) => (
                  <div key={level} className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-white font-mono">${level}</span>
                    <span className="text-purple-200">+{((level - stockData.price) / stockData.price * 100).toFixed(1)}%</span>
                  </div>
                ))}
              </div>

              <div className="py-4">
                <div className="bg-yellow-500/20 border border-yellow-400/50 rounded-lg p-3 text-center">
                  <span className="text-yellow-300 font-bold">Current: ${stockData.price.toFixed(2)}</span>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-green-400 mb-3">Support (Below)</h4>
                {levels.below.reverse().map((level) => (
                  <div key={level} className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="text-white font-mono">${level}</span>
                    <span className="text-purple-200">{((level - stockData.price) / stockData.price * 100).toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Whale Activity */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span>🐋</span> Whale Activity
            </h3>
            
            {!whaleData ? (
              <div className="text-purple-300 text-center py-8">Loading whale data...</div>
            ) : (
              <div className="space-y-4">
                {/* Show legendary whales first */}
                {whaleData.whales.filter(w => w.isLegendary).slice(0, 2).map((whale, idx) => (
                  <div key={idx} className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-400/30 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl">{whale.emoji}</span>
                      <div>
                        <div className="text-white font-bold">{whale.name}</div>
                        <div className="text-sm text-purple-200">{whale.company}</div>
                      </div>
                    </div>
                    <div className="text-green-400 font-semibold">
                      ✅ HOLDING - {whale.sharesFormatted} shares ({whale.percentHeld.toFixed(2)}%)
                    </div>
                    <div className="text-xs text-purple-300 mt-1">
                      Value: {whale.valueFormatted} • Reported: {whale.dateReported}
                    </div>
                  </div>
                ))}

                {/* Show top institutional holders if no legendary whales */}
                {whaleData.whales.filter(w => w.isLegendary).length === 0 && whaleData.whales.slice(0, 2).map((whale, idx) => (
                  <div key={idx} className="bg-blue-500/20 border border-blue-400/30 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl">{whale.emoji}</span>
                      <div>
                        <div className="text-white font-bold">{whale.name}</div>
                        <div className="text-sm text-purple-200">{whale.company}</div>
                      </div>
                    </div>
                    <div className="text-blue-400 font-semibold">
                      📈 HOLDING - {whale.sharesFormatted} shares ({whale.percentHeld.toFixed(2)}%)
                    </div>
                    <div className="text-xs text-purple-300 mt-1">
                      Value: {whale.valueFormatted}
                    </div>
                  </div>
                ))}

                {/* Insider Activity Summary */}
                {insiderData && (
                  <div className={`border rounded-lg p-4 ${
                    insiderData.summary.sentiment === 'BULLISH' 
                      ? 'bg-green-500/20 border-green-400/30' 
                      : insiderData.summary.sentiment === 'BEARISH'
                      ? 'bg-red-500/20 border-red-400/30'
                      : 'bg-purple-500/20 border-purple-400/30'
                  }`}>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl">👥</span>
                      <div>
                        <div className="text-white font-bold">Insider Activity</div>
                        <div className="text-sm text-purple-200">Company Executives</div>
                      </div>
                    </div>
                    <div className={`font-semibold ${
                      insiderData.summary.sentiment === 'BULLISH' 
                        ? 'text-green-400' 
                        : insiderData.summary.sentiment === 'BEARISH'
                        ? 'text-red-400'
                        : 'text-purple-400'
                    }`}>
                      {insiderData.summary.sentiment === 'BULLISH' && '🔥 HEAVY BUYING'}
                      {insiderData.summary.sentiment === 'BEARISH' && '⚠️ HEAVY SELLING'}
                      {insiderData.summary.sentiment === 'NEUTRAL' && '➖ MIXED ACTIVITY'}
                      {' - '}{insiderData.period}
                    </div>
                    <div className="text-xs text-purple-300 mt-1">
                      {insiderData.summary.buyTransactions} buys • {insiderData.summary.sellTransactions} sells • Sentiment: {insiderData.summary.sentimentScore > 0 ? '+' : ''}{insiderData.summary.sentimentScore}
                    </div>
                  </div>
                )}

                {whaleData.legendaryCount > 0 && (
                  <div className="text-center text-sm text-purple-300 mt-4">
                    🎯 {whaleData.legendaryCount} legendary whale{whaleData.legendaryCount > 1 ? 's' : ''} detected!
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Analysis Summary with Circular Phase Wheel */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
          <h3 className="text-2xl font-bold text-white mb-6">📊 Sacred27 Analysis Summary</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Circular Phase Wheel */}
            <div className="flex items-center justify-center">
              <div className="relative w-64 h-64">
                {/* Circle background with 4 phases */}
                <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90">
                  {/* ACCUMULATION (0-90°) - Green */}
                  <path
                    d="M 100 100 L 100 0 A 100 100 0 0 1 200 100 Z"
                    fill="rgba(34, 197, 94, 0.3)"
                    stroke="rgba(34, 197, 94, 0.6)"
                    strokeWidth="2"
                  />
                  {/* MARKUP (90-180°) - Blue */}
                  <path
                    d="M 100 100 L 200 100 A 100 100 0 0 1 100 200 Z"
                    fill="rgba(59, 130, 246, 0.3)"
                    stroke="rgba(59, 130, 246, 0.6)"
                    strokeWidth="2"
                  />
                  {/* DISTRIBUTION (180-270°) - Yellow */}
                  <path
                    d="M 100 100 L 100 200 A 100 100 0 0 1 0 100 Z"
                    fill="rgba(234, 179, 8, 0.3)"
                    stroke="rgba(234, 179, 8, 0.6)"
                    strokeWidth="2"
                  />
                  {/* MARKDOWN (270-360°) - Red */}
                  <path
                    d="M 100 100 L 0 100 A 100 100 0 0 1 100 0 Z"
                    fill="rgba(239, 68, 68, 0.3)"
                    stroke="rgba(239, 68, 68, 0.6)"
                    strokeWidth="2"
                  />
                  
                  {/* Center circle */}
                  <circle cx="100" cy="100" r="30" fill="rgba(88, 28, 135, 0.8)" stroke="white" strokeWidth="2" />
                  
                  {/* Phase indicator needle */}
                  <line
                    x1="100"
                    y1="100"
                    x2={100 + 70 * Math.cos((phase * Math.PI) / 180)}
                    y2={100 + 70 * Math.sin((phase * Math.PI) / 180)}
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  {/* Needle dot */}
                  <circle
                    cx={100 + 70 * Math.cos((phase * Math.PI) / 180)}
                    cy={100 + 70 * Math.sin((phase * Math.PI) / 180)}
                    r="6"
                    fill="white"
                    className="animate-pulse"
                  />
                </svg>
                
                {/* Phase labels */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 text-xs font-semibold text-green-400">
                  ACCUMULATION
                </div>
                <div className="absolute right-0 top-1/2 translate-x-6 -translate-y-1/2 text-xs font-semibold text-blue-400">
                  MARKUP
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-6 text-xs font-semibold text-yellow-400">
                  DISTRIBUTION
                </div>
                <div className="absolute left-0 top-1/2 -translate-x-6 -translate-y-1/2 text-xs font-semibold text-red-400">
                  MARKDOWN
                </div>
                
                {/* Center text */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{phase}°</div>
                    <div className="text-xs text-purple-300">Phase</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Summary Stats */}
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <div className="text-purple-300 mb-2">Current Zone</div>
                <div className={`text-3xl font-bold ${zone.color} mb-2`}>{zone.name}</div>
                <div className="text-sm text-purple-200">
                  {zone.name === 'ACCUMULATION' && '🟢 Strong buy zone - Smart money accumulating'}
                  {zone.name === 'MARKUP' && '🔵 Momentum building - Price rising'}
                  {zone.name === 'DISTRIBUTION' && '🟡 Take profits - Smart money exiting'}
                  {zone.name === 'MARKDOWN' && '🔴 Wait for setup - Price declining'}
                </div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <div className="text-purple-300 mb-2">Explosion Score</div>
                <div className="text-3xl font-bold text-white mb-2">{explosionScore}%</div>
                <div className="text-sm text-purple-200">
                  {explosionScore >= 80 && '🔥 Very high probability - Strong setup'}
                  {explosionScore >= 60 && explosionScore < 80 && '✅ High probability - Good setup'}
                  {explosionScore >= 40 && explosionScore < 60 && '⚠️ Moderate probability - Wait for confirmation'}
                  {explosionScore < 40 && '❌ Low probability - Avoid entry'}
                </div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <div className="text-purple-300 mb-2">Trading Signal</div>
                <div className="text-2xl font-bold text-white mb-2">
                  {zone.name === 'ACCUMULATION' && explosionScore >= 60 && '🚀 STRONG BUY'}
                  {zone.name === 'ACCUMULATION' && explosionScore < 60 && '📊 ACCUMULATE'}
                  {zone.name === 'MARKUP' && '📈 HOLD/ADD'}
                  {zone.name === 'DISTRIBUTION' && '💰 TAKE PROFITS'}
                  {zone.name === 'MARKDOWN' && '⏸️ WAIT'}
                </div>
                <div className="text-sm text-purple-200">
                  {zone.name === 'ACCUMULATION' && 'Consider building position'}
                  {zone.name === 'MARKUP' && 'Ride the momentum'}
                  {zone.name === 'DISTRIBUTION' && 'Exit or reduce position'}
                  {zone.name === 'MARKDOWN' && 'Stay on sidelines'}
                </div>
              </div>
            </div>
          </div>
          
          {/* Phase Explanation Guide */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* ACCUMULATION */}
            <div className="bg-green-500/10 border border-green-400/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <h4 className="font-bold text-green-400">ACCUMULATION</h4>
              </div>
              <div className="text-sm text-purple-200 space-y-2">
                <p className="font-semibold text-white">0-90°</p>
                <p><strong>What:</strong> Smart money buying quietly</p>
                <p><strong>Price:</strong> Sideways, boring, low volume</p>
                <p><strong>Sentiment:</strong> Fear, pessimism</p>
                <p className="text-green-400 font-semibold">→ BUY: Best time to accumulate</p>
              </div>
            </div>
            
            {/* MARKUP */}
            <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                <h4 className="font-bold text-blue-400">MARKUP</h4>
              </div>
              <div className="text-sm text-purple-200 space-y-2">
                <p className="font-semibold text-white">90-180°</p>
                <p><strong>What:</strong> Price rising, momentum building</p>
                <p><strong>Price:</strong> Uptrend, higher highs</p>
                <p><strong>Sentiment:</strong> Optimism growing</p>
                <p className="text-blue-400 font-semibold">→ HOLD: Ride the wave up</p>
              </div>
            </div>
            
            {/* DISTRIBUTION */}
            <div className="bg-yellow-500/10 border border-yellow-400/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <h4 className="font-bold text-yellow-400">DISTRIBUTION</h4>
              </div>
              <div className="text-sm text-purple-200 space-y-2">
                <p className="font-semibold text-white">180-270°</p>
                <p><strong>What:</strong> Smart money selling to retail</p>
                <p><strong>Price:</strong> Choppy, topping pattern</p>
                <p><strong>Sentiment:</strong> Euphoria, greed</p>
                <p className="text-yellow-400 font-semibold">→ SELL: Take profits now</p>
              </div>
            </div>
            
            {/* MARKDOWN */}
            <div className="bg-red-500/10 border border-red-400/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <h4 className="font-bold text-red-400">MARKDOWN</h4>
              </div>
              <div className="text-sm text-purple-200 space-y-2">
                <p className="font-semibold text-white">270-360°</p>
                <p><strong>What:</strong> Price falling, panic selling</p>
                <p><strong>Price:</strong> Downtrend, lower lows</p>
                <p><strong>Sentiment:</strong> Panic, fear</p>
                <p className="text-red-400 font-semibold">→ WAIT: Stay on sidelines</p>
              </div>
            </div>
          </div>
          
          {/* Cycle Explanation */}
          <div className="mt-6 p-4 bg-purple-500/10 border border-purple-400/30 rounded-lg">
            <p className="text-purple-200 text-sm text-center">
              <span className="font-bold text-white">💡 The Market Cycle:</span> ACCUMULATION → MARKUP → DISTRIBUTION → MARKDOWN → (repeats). 
              <span className="text-green-400">Buy in ACCUMULATION</span>, <span className="text-yellow-400">sell in DISTRIBUTION</span>. Most traders do the opposite!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
