'use client';

import Link from 'next/link';

export default function GuidePage() {
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
            <nav className="flex gap-6">
              <Link href="/whales" className="text-white/80 hover:text-white transition-colors">Whales</Link>
              <Link href="/fda" className="text-white/80 hover:text-white transition-colors">FDA</Link>
              <Link href="/insiders" className="text-white/80 hover:text-white transition-colors">Insiders</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-6">📚 User Guide</h2>
          
          {/* Quick Start */}
          <section className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">🚀 Quick Start</h3>
            <div className="text-purple-100 space-y-3">
              <p>Welcome to Whale Hunter Pro! This platform helps you track legendary investors, identify explosive stock opportunities, and use the Sacred27 framework for precise entry and exit points.</p>
              <p>Start by searching for any stock ticker on the homepage, or explore the Whales, FDA, and Insiders pages to discover opportunities.</p>
            </div>
          </section>

          {/* Features Overview */}
          <section className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">✨ Key Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-purple-500/20 rounded-lg p-4 border border-purple-400/30">
                <h4 className="text-lg font-bold text-white mb-2">🔍 Stock Analysis</h4>
                <p className="text-purple-100 text-sm">Search any ticker to see Sacred27 levels, Explosion Score, whale activity, and insider buying.</p>
              </div>
              <div className="bg-blue-500/20 rounded-lg p-4 border border-blue-400/30">
                <h4 className="text-lg font-bold text-white mb-2">🐋 Whale Tracking</h4>
                <p className="text-purple-100 text-sm">Follow 8 legendary investors including Warren Buffett, Cathie Wood, and Michael Burry.</p>
              </div>
              <div className="bg-pink-500/20 rounded-lg p-4 border border-pink-400/30">
                <h4 className="text-lg font-bold text-white mb-2">💊 FDA Calendar</h4>
                <p className="text-purple-100 text-sm">Track upcoming biotech catalysts with success probabilities and impact ratings.</p>
              </div>
              <div className="bg-green-500/20 rounded-lg p-4 border border-green-400/30">
                <h4 className="text-lg font-bold text-white mb-2">👔 Insider Buying</h4>
                <p className="text-purple-100 text-sm">See recent CEO purchases and track their performance since the buy.</p>
              </div>
            </div>
          </section>

          {/* Understanding Sacred27 */}
          <section className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">🔢 Understanding Sacred27</h3>
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-6 border border-purple-400/30">
              <p className="text-purple-100 mb-4">Sacred27 is a proprietary mathematical framework based on the number 27 (3³). It identifies precise price levels where stocks tend to reverse or break out.</p>
              <div className="space-y-2 text-purple-100">
                <p><strong className="text-white">Resistance Levels:</strong> Price points above current price where selling pressure may emerge</p>
                <p><strong className="text-white">Support Levels:</strong> Price points below current price where buying interest typically appears</p>
                <p><strong className="text-white">Phase Analysis:</strong> 0-360° cycle showing accumulation, markup, distribution, or markdown phases</p>
              </div>
            </div>
          </section>

          {/* Explosion Score */}
          <section className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">💥 Explosion Score</h3>
            <div className="text-purple-100 space-y-3">
              <p>The Explosion Score (0-100) indicates the probability of a significant price move. It combines whale activity, insider buying, volume patterns, and Sacred27 analysis.</p>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="bg-red-500/20 rounded-lg p-3 border border-red-400/30 text-center">
                  <div className="text-2xl font-bold text-white">0-50</div>
                  <div className="text-sm text-purple-100">Low Probability</div>
                </div>
                <div className="bg-yellow-500/20 rounded-lg p-3 border border-yellow-400/30 text-center">
                  <div className="text-2xl font-bold text-white">50-70</div>
                  <div className="text-sm text-purple-100">Moderate</div>
                </div>
                <div className="bg-green-500/20 rounded-lg p-3 border border-green-400/30 text-center">
                  <div className="text-2xl font-bold text-white">70-100</div>
                  <div className="text-sm text-purple-100">High Probability</div>
                </div>
              </div>
            </div>
          </section>

          {/* Trading Strategies */}
          <section className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">📈 Trading Strategies</h3>
            <div className="space-y-4">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="text-lg font-bold text-white mb-2">Strategy 1: Follow the Whales</h4>
                <p className="text-purple-100 text-sm">When multiple legendary investors buy the same stock, use Sacred27 levels to time your entry near support and exit near resistance.</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="text-lg font-bold text-white mb-2">Strategy 2: FDA Catalyst Plays</h4>
                <p className="text-purple-100 text-sm">Enter high-probability FDA plays 2-4 weeks before the catalyst when the stock is near Sacred27 support. Exit at resistance or before the announcement.</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="text-lg font-bold text-white mb-2">Strategy 3: Insider Confirmation</h4>
                <p className="text-purple-100 text-sm">When CEOs buy with their own money AND whales are accumulating, enter near Sacred27 support with high conviction.</p>
              </div>
            </div>
          </section>

          {/* Risk Management */}
          <section className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">⚠️ Risk Management</h3>
            <div className="bg-red-500/20 rounded-lg p-6 border border-red-400/30">
              <ul className="space-y-2 text-purple-100">
                <li>• Never risk more than 2-5% of your capital on a single trade</li>
                <li>• Always use stop losses below Sacred27 support levels</li>
                <li>• Diversify across different stocks and strategies</li>
                <li>• Consider paper trading first if you're new to these strategies</li>
              </ul>
            </div>
          </section>

          {/* Quick Reference */}
          <section className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">🎯 Quick Reference</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-white font-bold mb-2">Key Metrics</h4>
                <ul className="text-purple-100 text-sm space-y-1">
                  <li>• Explosion Score &gt;70: Bullish</li>
                  <li>• Explosion Score &gt;85: Very Bullish</li>
                  <li>• Phase 0-180°: Bullish trend</li>
                  <li>• Phase 180-360°: Bearish trend</li>
                  <li>• FDA Probability &gt;75%: High confidence</li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-2">Color Coding</h4>
                <ul className="text-purple-100 text-sm space-y-1">
                  <li>• <span className="text-green-400">Green:</span> Bullish signals</li>
                  <li>• <span className="text-red-400">Red:</span> Bearish signals</li>
                  <li>• <span className="text-yellow-400">Yellow:</span> Caution zones</li>
                  <li>• <span className="text-blue-400">Blue:</span> Neutral/holding</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Support */}
          <section>
            <h3 className="text-2xl font-bold text-white mb-4">📞 Support</h3>
            <div className="bg-purple-500/20 rounded-lg p-6 border border-purple-400/30">
              <p className="text-purple-100">For questions or feedback, contact Luke directly. Your input helps shape the platform's development!</p>
            </div>
          </section>

          {/* Back Button */}
          <div className="mt-8 text-center">
            <Link 
              href="/"
              className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
