'use client';

import { useRouter } from 'next/navigation';

const LEGENDARY_WHALES = [
  {
    id: 1,
    name: 'Warren Buffett',
    company: 'Berkshire Hathaway',
    icon: '🐘',
    aum: '$364B',
    style: 'Value Investing',
    topHoldings: ['AAPL', 'BAC', 'CVX', 'KO', 'AXP'],
    recentActivity: 'Buying energy stocks, reducing tech exposure',
    winRate: '94%',
  },
  {
    id: 2,
    name: 'Cathie Wood',
    company: 'ARK Invest',
    icon: '🚀',
    aum: '$25B',
    style: 'Disruptive Innovation',
    topHoldings: ['TSLA', 'COIN', 'ROKU', 'SQ', 'SHOP'],
    recentActivity: 'Heavy buying in AI and crypto stocks',
    winRate: '78%',
  },
  {
    id: 3,
    name: 'Michael Burry',
    company: 'Scion Asset Management',
    icon: '🎯',
    aum: '$200M',
    style: 'Contrarian Value',
    topHoldings: ['GEO', 'CXW', 'BABA', 'JD', 'BIDU'],
    recentActivity: 'Betting against tech, buying Chinese stocks',
    winRate: '82%',
  },
  {
    id: 4,
    name: 'Ray Dalio',
    company: 'Bridgewater Associates',
    icon: '🌊',
    aum: '$124B',
    style: 'All Weather',
    topHoldings: ['SPY', 'VWO', 'EEM', 'GLD', 'TLT'],
    recentActivity: 'Increasing emerging market exposure',
    winRate: '88%',
  },
  {
    id: 5,
    name: 'Bill Ackman',
    company: 'Pershing Square',
    icon: '💼',
    aum: '$16B',
    style: 'Activist Value',
    topHoldings: ['CMG', 'HLT', 'LOW', 'UMG', 'QSR'],
    recentActivity: 'Building position in consumer brands',
    winRate: '76%',
  },
  {
    id: 6,
    name: 'David Tepper',
    company: 'Appaloosa Management',
    icon: '🦅',
    aum: '$13B',
    style: 'Distressed/Special Situations',
    topHoldings: ['AMZN', 'BABA', 'MSFT', 'FB', 'GOOGL'],
    recentActivity: 'Rotating into mega-cap tech',
    winRate: '85%',
  },
  {
    id: 7,
    name: 'Stanley Druckenmiller',
    company: 'Duquesne Family Office',
    icon: '🦁',
    aum: '$6B',
    style: 'Macro Trading',
    topHoldings: ['MSFT', 'AMZN', 'NVDA', 'GOOGL', 'AAPL'],
    recentActivity: 'Bullish on AI infrastructure',
    winRate: '91%',
  },
  {
    id: 8,
    name: 'Carl Icahn',
    company: 'Icahn Enterprises',
    icon: '🔥',
    aum: '$24B',
    style: 'Activist',
    topHoldings: ['IEP', 'CVR', 'SWX', 'NEOG', 'DAN'],
    recentActivity: 'Pushing for corporate changes',
    winRate: '73%',
  },
];

export default function WhalesPage() {
  const router = useRouter();

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
              <button onClick={() => router.push('/whales')} className="text-white font-semibold">Whales</button>
              <button onClick={() => router.push('/fda')} className="text-white/80 hover:text-white transition-colors">FDA</button>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-white mb-4">🐋 Legendary Whales</h2>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto">
            Track the world's most successful investors. See what they're buying, selling, and where they're placing their bets.
          </p>
        </div>

        {/* Whales Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
          {LEGENDARY_WHALES.map((whale) => (
            <div
              key={whale.id}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all"
            >
              {/* Whale Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="text-6xl">{whale.icon}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{whale.name}</h3>
                    <p className="text-purple-200">{whale.company}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-purple-300">Win Rate</div>
                  <div className="text-2xl font-bold text-green-400">{whale.winRate}</div>
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-black/20 rounded-lg p-4">
                  <div className="text-sm text-purple-300 mb-1">Assets Under Management</div>
                  <div className="text-xl font-bold text-white">{whale.aum}</div>
                </div>
                <div className="bg-black/20 rounded-lg p-4">
                  <div className="text-sm text-purple-300 mb-1">Investment Style</div>
                  <div className="text-xl font-bold text-white">{whale.style}</div>
                </div>
              </div>

              {/* Top Holdings */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-3">Top Holdings</h4>
                <div className="flex flex-wrap gap-2">
                  {whale.topHoldings.map((ticker) => (
                    <button
                      key={ticker}
                      onClick={() => router.push(`/stock/${ticker}`)}
                      className="px-4 py-2 bg-purple-500/30 hover:bg-purple-500/50 rounded-lg text-white font-mono font-semibold transition-colors"
                    >
                      ${ticker}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-4 border border-purple-400/30">
                <div className="text-sm text-purple-300 mb-2">Recent Activity</div>
                <div className="text-white">{whale.recentActivity}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="max-w-4xl mx-auto mt-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-8 border border-purple-400/30 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Get Alerts When Whales Move</h3>
          <p className="text-purple-200 mb-6">
            Never miss a whale trade. Get instant notifications when legendary investors make moves.
          </p>
          <button className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg">
            Enable Whale Alerts
          </button>
        </div>
      </div>
    </div>
  );
}
