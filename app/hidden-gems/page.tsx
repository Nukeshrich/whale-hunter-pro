'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const HIDDEN_GEMS = [
  {
    id: 1,
    ticker: 'IONQ',
    company: 'IonQ Inc',
    price: 8.45,
    marketCap: '1.8B',
    sector: 'Quantum Computing',
    hiddenGemScore: 92,
    explosionPotential: '50-100x',
    whaleActivity: 'High',
    insiderBuying: 'Strong',
    volumeSpike: '8.2x',
    sacred27Level: 'Near Support ($8.10)',
    riskLevel: 'Very High',
    whyThisStock: 'Quantum computing leader with major partnerships (Amazon, Microsoft). Insiders buying heavily. Breaking out from Sacred27 support.',
  },
  {
    id: 2,
    ticker: 'SAVA',
    company: 'Cassava Sciences',
    price: 12.30,
    marketCap: '1.2B',
    sector: 'Biotech',
    hiddenGemScore: 88,
    explosionPotential: '100x+',
    whaleActivity: 'Medium',
    insiderBuying: 'Very Strong',
    volumeSpike: '12.5x',
    sacred27Level: 'At Support ($13.50)',
    riskLevel: 'Extreme',
    whyThisStock: 'Alzheimer\'s drug in Phase 3. FDA decision in 44 days. Insiders buying at current levels. High risk, massive reward potential.',
  },
  {
    id: 3,
    ticker: 'VKTX',
    company: 'Viking Therapeutics',
    price: 45.20,
    marketCap: '4.8B',
    sector: 'Biotech',
    hiddenGemScore: 85,
    explosionPotential: '10-20x',
    whaleActivity: 'Very High',
    insiderBuying: 'Strong',
    volumeSpike: '5.3x',
    sacred27Level: 'Near Resistance ($54)',
    riskLevel: 'High',
    whyThisStock: 'NASH treatment showing exceptional results. Cathie Wood buying. Clinical data in 19 days. Whales accumulating.',
  },
  {
    id: 4,
    ticker: 'PLTR',
    company: 'Palantir Technologies',
    price: 18.75,
    marketCap: '38B',
    sector: 'AI/Data Analytics',
    hiddenGemScore: 82,
    explosionPotential: '5-10x',
    whaleActivity: 'Very High',
    insiderBuying: 'Medium',
    volumeSpike: '3.8x',
    sacred27Level: 'Breaking Resistance ($27)',
    riskLevel: 'Medium',
    whyThisStock: 'AI contracts exploding. Government + commercial growth. Whales loading up. Sacred27 breakout imminent.',
  },
  {
    id: 5,
    ticker: 'RXRX',
    company: 'Recursion Pharmaceuticals',
    price: 7.85,
    marketCap: '2.1B',
    sector: 'AI Biotech',
    hiddenGemScore: 79,
    explosionPotential: '20-50x',
    whaleActivity: 'High',
    insiderBuying: 'Strong',
    volumeSpike: '6.7x',
    sacred27Level: 'At Support ($6.75)',
    riskLevel: 'Very High',
    whyThisStock: 'AI drug discovery platform. Partnerships with Bayer, Roche. Insiders buying. Undervalued AI play.',
  },
  {
    id: 6,
    ticker: 'RKLB',
    company: 'Rocket Lab USA',
    price: 5.20,
    marketCap: '2.5B',
    sector: 'Space/Aerospace',
    hiddenGemScore: 76,
    explosionPotential: '10-30x',
    whaleActivity: 'Medium',
    insiderBuying: 'Strong',
    volumeSpike: '4.2x',
    sacred27Level: 'Near Support ($5.40)',
    riskLevel: 'High',
    whyThisStock: 'SpaceX competitor. Successful launches increasing. Cathie Wood position. Space economy growth play.',
  },
];

export default function HiddenGemsPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<'all' | 'biotech' | 'tech' | 'high-score'>('all');

  const filteredGems = HIDDEN_GEMS.filter((gem) => {
    if (filter === 'biotech') return gem.sector.includes('Biotech');
    if (filter === 'tech') return gem.sector.includes('AI') || gem.sector.includes('Quantum') || gem.sector.includes('Data');
    if (filter === 'high-score') return gem.hiddenGemScore >= 85;
    return true;
  }).sort((a, b) => b.hiddenGemScore - a.hiddenGemScore);

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-400';
    if (score >= 75) return 'text-yellow-400';
    return 'text-orange-400';
  };

  const getRiskColor = (risk: string) => {
    if (risk === 'Extreme') return 'text-red-400 bg-red-500/20 border-red-400/30';
    if (risk === 'Very High') return 'text-orange-400 bg-orange-500/20 border-orange-400/30';
    if (risk === 'High') return 'text-yellow-400 bg-yellow-500/20 border-yellow-400/30';
    return 'text-green-400 bg-green-500/20 border-green-400/30';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => router.push('/')}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <span className="text-4xl">🐋</span>
              <div>
                <h1 className="text-2xl font-bold text-white">Whale Hunter Pro</h1>
                <p className="text-sm text-purple-300">Powered by Sacred27</p>
              </div>
            </button>
            <nav className="flex gap-6">
              <button onClick={() => router.push('/')} className="text-white/80 hover:text-white transition-colors">Home</button>
              <button onClick={() => router.push('/whales')} className="text-white/80 hover:text-white transition-colors">Whales</button>
              <button onClick={() => router.push('/fda')} className="text-white/80 hover:text-white transition-colors">FDA</button>
              <button onClick={() => router.push('/hidden-gems')} className="text-white font-semibold">Hidden Gems</button>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-white mb-4">💎 Hidden Gems</h2>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto">
            Discover undervalued stocks with 10-100x explosion potential. Combining whale activity, insider buying, and Sacred27 analysis.
          </p>
        </div>

        {/* Warning Banner */}
        <div className="max-w-4xl mx-auto mb-8 bg-red-500/20 border border-red-400/30 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <span className="text-3xl">⚠️</span>
            <div>
              <h3 className="text-xl font-bold text-red-300 mb-2">EXTREME RISK WARNING</h3>
              <p className="text-red-100">
                Hidden gems are HIGH RISK, HIGH REWARD plays. These stocks can 10x or go to zero. 
                Only invest what you can afford to lose. Do your own research. Not financial advice.
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              filter === 'all'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'bg-white/10 text-white/80 hover:bg-white/20'
            }`}
          >
            All Gems ({HIDDEN_GEMS.length})
          </button>
          <button
            onClick={() => setFilter('biotech')}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              filter === 'biotech'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'bg-white/10 text-white/80 hover:bg-white/20'
            }`}
          >
            💊 Biotech
          </button>
          <button
            onClick={() => setFilter('tech')}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              filter === 'tech'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'bg-white/10 text-white/80 hover:bg-white/20'
            }`}
          >
            🤖 AI/Tech
          </button>
          <button
            onClick={() => setFilter('high-score')}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              filter === 'high-score'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'bg-white/10 text-white/80 hover:bg-white/20'
            }`}
          >
            🔥 Top Scores (85+)
          </button>
        </div>

        {/* Gems Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredGems.map((gem) => (
            <div
              key={gem.id}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all cursor-pointer"
              onClick={() => router.push(`/stock/${gem.ticker}`)}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-4 py-2 bg-purple-500/30 rounded-lg text-white font-mono font-bold text-xl">
                      ${gem.ticker}
                    </span>
                    <span className={`text-4xl font-bold ${getScoreColor(gem.hiddenGemScore)}`}>
                      {gem.hiddenGemScore}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{gem.company}</h3>
                  <p className="text-purple-200 text-sm">{gem.sector}</p>
                </div>
                <span className={`px-3 py-1 border rounded-lg text-sm font-semibold ${getRiskColor(gem.riskLevel)}`}>
                  {gem.riskLevel} Risk
                </span>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-xs text-purple-300 mb-1">Current Price</div>
                  <div className="text-lg font-bold text-white">${gem.price}</div>
                </div>
                <div>
                  <div className="text-xs text-purple-300 mb-1">Market Cap</div>
                  <div className="text-lg font-bold text-white">{gem.marketCap}</div>
                </div>
                <div>
                  <div className="text-xs text-purple-300 mb-1">Explosion Potential</div>
                  <div className="text-lg font-bold text-green-400">{gem.explosionPotential}</div>
                </div>
                <div>
                  <div className="text-xs text-purple-300 mb-1">Volume Spike</div>
                  <div className="text-lg font-bold text-blue-400">{gem.volumeSpike}</div>
                </div>
              </div>

              {/* Activity Indicators */}
              <div className="flex gap-2 mb-4 flex-wrap">
                <span className="px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-lg text-blue-300 text-xs">
                  🐋 Whale: {gem.whaleActivity}
                </span>
                <span className="px-3 py-1 bg-green-500/20 border border-green-400/30 rounded-lg text-green-300 text-xs">
                  📈 Insider: {gem.insiderBuying}
                </span>
                <span className="px-3 py-1 bg-purple-500/20 border border-purple-400/30 rounded-lg text-purple-300 text-xs">
                  🎯 {gem.sacred27Level}
                </span>
              </div>

              {/* Why This Stock */}
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-4 border border-purple-400/30">
                <div className="text-xs text-purple-300 font-semibold mb-1">Why This Stock?</div>
                <p className="text-sm text-white">{gem.whyThisStock}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Strategy Guide */}
        <div className="max-w-4xl mx-auto mt-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-8 border border-purple-400/30">
          <h3 className="text-2xl font-bold text-white mb-4">💡 Hidden Gems Strategy</h3>
          <div className="space-y-3 text-purple-100">
            <p>
              <strong className="text-white">Entry Timing:</strong> Wait for Sacred27 support levels. Buy when whales are accumulating.
            </p>
            <p>
              <strong className="text-white">Position Sizing:</strong> Never risk more than 1-2% of portfolio on a single hidden gem.
            </p>
            <p>
              <strong className="text-white">Exit Strategy:</strong> Take profits at Sacred27 resistance levels. Use trailing stops.
            </p>
            <p>
              <strong className="text-white">Catalysts:</strong> FDA approvals, earnings beats, whale buying can trigger 50-100% moves.
            </p>
            <p className="text-yellow-300 font-semibold">
              🎯 Pro Tip: Combine Hidden Gems score + Sacred27 levels + Whale activity for highest probability plays.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
