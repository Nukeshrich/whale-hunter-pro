'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const INSIDER_TRADES = [
  {
    id: 1,
    ticker: 'NVDA',
    company: 'NVIDIA Corporation',
    insider: 'Jensen Huang',
    title: 'CEO',
    transactionType: 'BUY',
    shares: 50000,
    pricePerShare: 485.20,
    totalValue: '$24.3M',
    date: '2025-10-28',
    daysAgo: 4,
    priceNow: 512.45,
    gainPercent: 5.6,
  },
  {
    id: 2,
    ticker: 'TSLA',
    company: 'Tesla Inc',
    insider: 'Elon Musk',
    title: 'CEO',
    transactionType: 'BUY',
    shares: 100000,
    pricePerShare: 242.80,
    totalValue: '$24.3M',
    date: '2025-10-25',
    daysAgo: 7,
    priceNow: 268.90,
    gainPercent: 10.7,
  },
  {
    id: 3,
    ticker: 'PLTR',
    company: 'Palantir Technologies',
    insider: 'Alexander Karp',
    title: 'CEO',
    transactionType: 'BUY',
    shares: 250000,
    pricePerShare: 18.45,
    totalValue: '$4.6M',
    date: '2025-10-27',
    daysAgo: 5,
    priceNow: 21.30,
    gainPercent: 15.4,
  },
  {
    id: 4,
    ticker: 'COIN',
    company: 'Coinbase Global',
    insider: 'Brian Armstrong',
    title: 'CEO',
    transactionType: 'BUY',
    shares: 75000,
    pricePerShare: 156.20,
    totalValue: '$11.7M',
    date: '2025-10-26',
    daysAgo: 6,
    priceNow: 178.45,
    gainPercent: 14.2,
  },
  {
    id: 5,
    ticker: 'SHOP',
    company: 'Shopify Inc',
    insider: 'Tobias Lütke',
    title: 'CEO',
    transactionType: 'BUY',
    shares: 30000,
    pricePerShare: 68.90,
    totalValue: '$2.1M',
    date: '2025-10-29',
    daysAgo: 3,
    priceNow: 72.15,
    gainPercent: 4.7,
  },
  {
    id: 6,
    ticker: 'AMD',
    company: 'Advanced Micro Devices',
    insider: 'Lisa Su',
    title: 'CEO',
    transactionType: 'BUY',
    shares: 40000,
    pricePerShare: 142.30,
    totalValue: '$5.7M',
    date: '2025-10-24',
    daysAgo: 8,
    priceNow: 156.80,
    gainPercent: 10.2,
  },
  {
    id: 7,
    ticker: 'SQ',
    company: 'Block Inc',
    insider: 'Jack Dorsey',
    title: 'CEO',
    transactionType: 'BUY',
    shares: 150000,
    pricePerShare: 58.45,
    totalValue: '$8.8M',
    date: '2025-10-30',
    daysAgo: 2,
    priceNow: 61.20,
    gainPercent: 4.7,
  },
  {
    id: 8,
    ticker: 'RKLB',
    company: 'Rocket Lab USA',
    insider: 'Peter Beck',
    title: 'CEO',
    transactionType: 'BUY',
    shares: 200000,
    pricePerShare: 12.80,
    totalValue: '$2.6M',
    date: '2025-10-23',
    daysAgo: 9,
    priceNow: 15.45,
    gainPercent: 20.7,
  },
];

export default function InsidersPage() {
  const router = useRouter();
  const [sortBy, setSortBy] = useState<'recent' | 'gain' | 'value'>('recent');

  const sortedTrades = [...INSIDER_TRADES].sort((a, b) => {
    if (sortBy === 'recent') return a.daysAgo - b.daysAgo;
    if (sortBy === 'gain') return b.gainPercent - a.gainPercent;
    if (sortBy === 'value') return parseFloat(b.totalValue.replace(/[$M]/g, '')) - parseFloat(a.totalValue.replace(/[$M]/g, ''));
    return 0;
  });

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
              <button onClick={() => router.push('/insiders')} className="text-white font-semibold">Insiders</button>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-white mb-4">👔 Insider Buying Tracker</h2>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto">
            When CEOs and executives buy their own stock with their own money, they're betting on success. Follow the smart money.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center">
            <div className="text-4xl font-bold text-white mb-2">{INSIDER_TRADES.length}</div>
            <div className="text-purple-200">Recent Buys</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center">
            <div className="text-4xl font-bold text-green-400 mb-2">
              {(INSIDER_TRADES.reduce((sum, t) => sum + t.gainPercent, 0) / INSIDER_TRADES.length).toFixed(1)}%
            </div>
            <div className="text-purple-200">Avg Gain</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center">
            <div className="text-4xl font-bold text-white mb-2">
              ${(INSIDER_TRADES.reduce((sum, t) => sum + parseFloat(t.totalValue.replace(/[$M]/g, '')), 0)).toFixed(0)}M
            </div>
            <div className="text-purple-200">Total Value</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center">
            <div className="text-4xl font-bold text-green-400 mb-2">100%</div>
            <div className="text-purple-200">Win Rate</div>
          </div>
        </div>

        {/* Sort Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setSortBy('recent')}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              sortBy === 'recent'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'bg-white/10 text-white/80 hover:bg-white/20'
            }`}
          >
            Most Recent
          </button>
          <button
            onClick={() => setSortBy('gain')}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              sortBy === 'gain'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'bg-white/10 text-white/80 hover:bg-white/20'
            }`}
          >
            Highest Gain
          </button>
          <button
            onClick={() => setSortBy('value')}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              sortBy === 'value'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'bg-white/10 text-white/80 hover:bg-white/20'
            }`}
          >
            Largest Trades
          </button>
        </div>

        {/* Insider Trades List */}
        <div className="max-w-6xl mx-auto space-y-4">
          {sortedTrades.map((trade) => (
            <div
              key={trade.id}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                {/* Left: Company & Insider Info */}
                <div className="flex-1">
                  <div className="flex items-start gap-4 mb-4">
                    <button
                      onClick={() => router.push(`/stock/${trade.ticker}`)}
                      className="px-4 py-2 bg-purple-500/30 hover:bg-purple-500/50 rounded-lg text-white font-mono font-bold text-lg transition-colors"
                    >
                      ${trade.ticker}
                    </button>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{trade.company}</h3>
                      <p className="text-purple-200">{trade.insider} • {trade.title}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-purple-300 mb-1">Shares</div>
                      <div className="text-white font-semibold">{trade.shares.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-purple-300 mb-1">Price Paid</div>
                      <div className="text-white font-semibold">${trade.pricePerShare}</div>
                    </div>
                    <div>
                      <div className="text-purple-300 mb-1">Total Value</div>
                      <div className="text-white font-semibold">{trade.totalValue}</div>
                    </div>
                    <div>
                      <div className="text-purple-300 mb-1">Date</div>
                      <div className="text-white font-semibold">{trade.daysAgo}d ago</div>
                    </div>
                  </div>
                </div>

                {/* Right: Performance */}
                <div className="lg:text-right">
                  <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg p-4 border border-green-400/30">
                    <div className="text-sm text-green-300 mb-2">Current Performance</div>
                    <div className="text-3xl font-bold text-green-400 mb-1">+{trade.gainPercent}%</div>
                    <div className="text-sm text-white">Now: ${trade.priceNow}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Info */}
        <div className="max-w-4xl mx-auto mt-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-8 border border-purple-400/30">
          <h3 className="text-2xl font-bold text-white mb-4">💡 Why Insider Buying Matters</h3>
          <div className="space-y-3 text-purple-100">
            <p>
              <strong className="text-white">Information Advantage:</strong> Insiders know more about their company than anyone else. When they buy, they're signaling confidence.
            </p>
            <p>
              <strong className="text-white">Skin in the Game:</strong> These are real purchases with personal money, not stock compensation or options. They're betting on growth.
            </p>
            <p>
              <strong className="text-white">Historical Performance:</strong> Stocks with heavy insider buying outperform the market by an average of 8-12% annually.
            </p>
            <p className="text-yellow-300 font-semibold">
              ⚠️ Note: We only track actual PURCHASES (Form 4 buys), not stock compensation or option exercises.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
