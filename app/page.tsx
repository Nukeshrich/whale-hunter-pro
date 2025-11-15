'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const [searchTicker, setSearchTicker] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTicker.trim()) {
      router.push(`/stock/${searchTicker.toUpperCase()}`);
    }
  };

  const featuredWhales = [
    { name: 'Warren Buffett', company: 'Berkshire Hathaway', icon: '🐘' },
    { name: 'Cathie Wood', company: 'ARK Invest', icon: '🚀' },
    { name: 'Michael Burry', company: 'Scion Asset Management', icon: '🎯' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-4xl">🐋</span>
              <div>
                <h1 className="text-2xl font-bold text-white">Whale Hunter Pro</h1>
                <p className="text-sm text-purple-300">Powered by Sacred27</p>
              </div>
            </div>
            <nav className="flex gap-6">
              <Link href="/whales" className="text-white/80 hover:text-white transition-colors">Whales</Link>
              <Link href="/fda" className="text-white/80 hover:text-white transition-colors">FDA</Link>
              <Link href="/insiders" className="text-white/80 hover:text-white transition-colors">Insiders</Link>
              <Link href="/hidden-gems" className="text-white/80 hover:text-white transition-colors">Hidden Gems</Link>
              <Link href="/guide" className="text-white/80 hover:text-white transition-colors">Guide</Link>
              <Link href="/pricing" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity">Upgrade</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Track What The
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Whales </span>
            Are Buying
          </h2>
          <p className="text-xl text-purple-200 mb-12 max-w-2xl mx-auto">
            Follow legendary investors like Warren Buffett, Cathie Wood, and Michael Burry. 
            Powered by the Sacred27 framework for precise market analysis.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
            <div className="flex gap-3">
              <input
                type="text"
                value={searchTicker}
                onChange={(e) => setSearchTicker(e.target.value)}
                placeholder="Enter stock ticker (e.g., AAPL, TSLA, NVDA)..."
                className="flex-1 px-6 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 text-lg"
              />
              <button
                type="submit"
                className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg"
              >
                Analyze
              </button>
            </div>
          </form>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="text-4xl font-bold text-white mb-2">27+</div>
              <div className="text-purple-200">Legendary Investors</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="text-4xl font-bold text-white mb-2">10K+</div>
              <div className="text-purple-200">Stocks Tracked</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="text-4xl font-bold text-white mb-2">Real-Time</div>
              <div className="text-purple-200">Market Data</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Whales */}
      <section id="whales" className="container mx-auto px-4 py-20">
        <h3 className="text-4xl font-bold text-white text-center mb-12">Featured Whales</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {featuredWhales.map((whale) => (
            <div
              key={whale.name}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all cursor-pointer transform hover:scale-105"
            >
              <div className="text-6xl mb-4">{whale.icon}</div>
              <h4 className="text-2xl font-bold text-white mb-2">{whale.name}</h4>
              <p className="text-purple-200">{whale.company}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container mx-auto px-4 py-20">
        <h3 className="text-4xl font-bold text-white text-center mb-12">Powerful Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="text-4xl mb-4">🐋</div>
            <h4 className="text-xl font-bold text-white mb-2">Whale Tracking</h4>
            <p className="text-purple-200 text-sm">Follow what legendary investors are buying and selling</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="text-4xl mb-4">🔢</div>
            <h4 className="text-xl font-bold text-white mb-2">Sacred27 Analysis</h4>
            <p className="text-purple-200 text-sm">Precise support/resistance levels using proprietary framework</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="text-4xl mb-4">💊</div>
            <h4 className="text-xl font-bold text-white mb-2">FDA Catalysts</h4>
            <p className="text-purple-200 text-sm">Track biotech approvals and clinical trial results</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="text-4xl mb-4">💎</div>
            <h4 className="text-xl font-bold text-white mb-2">Hidden Gems</h4>
            <p className="text-purple-200 text-sm">Discover undervalued stocks with explosion potential</p>
          </div>
        </div>
      </section>

      {/* About Sacred27 */}
      <section id="about" className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-6xl mb-6">✨</div>
          <h3 className="text-4xl font-bold text-white mb-6">Powered by Sacred27</h3>
          <p className="text-xl text-purple-200 mb-8">
            Sacred27 is a proprietary mathematical framework that identifies precise price levels 
            where stocks tend to reverse. Based on universal principles and proven through extensive 
            market analysis.
          </p>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <p className="text-purple-100 italic">
              "The pattern of creation expressed in numbers. From the smallest particle to the largest market move, 
              Sacred27 reveals the underlying structure of reality."
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/20 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-purple-300">
            <p className="mb-2">🐋 Whale Hunter Pro - Track Smart Money</p>
            <p className="text-sm text-purple-400">Powered by Sacred27 Framework · Built by Luke</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
