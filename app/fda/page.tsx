'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const FDA_CATALYSTS_BASE = [
  {
    id: 1,
    ticker: 'SAVA',
    company: 'Cassava Sciences',
    drug: 'Simufilam',
    indication: 'Alzheimer\'s Disease',
    phase: 'Phase 3',
    eventType: 'FDA Decision',
    date: '2025-12-15',
    probability: 68,
    marketCap: '$1.2B',
    potentialImpact: 'Very High',
  },
  {
    id: 2,
    ticker: 'VKTX',
    company: 'Viking Therapeutics',
    drug: 'VK2809',
    indication: 'NASH (Liver Disease)',
    phase: 'Phase 2b Results',
    eventType: 'Clinical Data',
    date: '2025-11-20',
    probability: 75,
    marketCap: '$4.8B',
    potentialImpact: 'High',
  },
  {
    id: 3,
    ticker: 'AVXL',
    company: 'Anavex Life Sciences',
    drug: 'Blarcamesine',
    indication: 'Rett Syndrome',
    phase: 'Phase 3',
    eventType: 'Top-line Data',
    date: '2025-11-08',
    probability: 82,
    marketCap: '$890M',
    potentialImpact: 'Very High',
  },
  {
    id: 4,
    ticker: 'SRRK',
    company: 'Scholar Rock',
    drug: 'Apitegromab',
    indication: 'Spinal Muscular Atrophy',
    phase: 'Phase 3',
    eventType: 'FDA Review',
    date: '2026-01-30',
    probability: 71,
    marketCap: '$2.1B',
    potentialImpact: 'High',
  },
  {
    id: 5,
    ticker: 'KPTI',
    company: 'Karyopharm Therapeutics',
    drug: 'Selinexor',
    indication: 'Endometrial Cancer',
    phase: 'sNDA Review',
    eventType: 'FDA Decision',
    date: '2025-12-01',
    probability: 79,
    marketCap: '$650M',
    potentialImpact: 'Medium',
  },
  {
    id: 6,
    ticker: 'MDGL',
    company: 'Madrigal Pharmaceuticals',
    drug: 'Resmetirom',
    indication: 'NASH',
    phase: 'NDA Filed',
    eventType: 'FDA Approval',
    date: '2025-11-15',
    probability: 88,
    marketCap: '$8.2B',
    potentialImpact: 'Very High',
  },
];

export default function FDAPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'high-probability'>('all');
  const [catalysts, setCatalysts] = useState(FDA_CATALYSTS_BASE.map(c => ({ ...c, daysUntil: 0 })));

  // Calculate days until for each catalyst
  useEffect(() => {
    const calculateDaysUntil = () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const updated = FDA_CATALYSTS_BASE.map(catalyst => {
        const eventDate = new Date(catalyst.date);
        eventDate.setHours(0, 0, 0, 0);
        const diffTime = eventDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        return {
          ...catalyst,
          daysUntil: diffDays
        };
      });
      
      setCatalysts(updated);
    };
    
    calculateDaysUntil();
    // Update daily
    const interval = setInterval(calculateDaysUntil, 1000 * 60 * 60 * 24);
    return () => clearInterval(interval);
  }, []);

  const filteredCatalysts = catalysts.filter((catalyst) => {
    if (filter === 'upcoming') return catalyst.daysUntil <= 30;
    if (filter === 'high-probability') return catalyst.probability >= 75;
    return true;
  }).sort((a, b) => a.daysUntil - b.daysUntil);

  const getImpactColor = (impact: string) => {
    if (impact === 'Very High') return 'text-red-400 bg-red-500/20 border-red-400/30';
    if (impact === 'High') return 'text-orange-400 bg-orange-500/20 border-orange-400/30';
    return 'text-yellow-400 bg-yellow-500/20 border-yellow-400/30';
  };

  const getProbabilityColor = (prob: number) => {
    if (prob >= 80) return 'text-green-400';
    if (prob >= 70) return 'text-yellow-400';
    return 'text-orange-400';
  };

  const getDaysUntilColor = (days: number) => {
    if (days <= 7) return 'text-red-400 font-bold';
    if (days <= 30) return 'text-yellow-400 font-semibold';
    return 'text-purple-200';
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
              <button onClick={() => router.push('/fda')} className="text-white font-semibold">FDA</button>
              <button onClick={() => router.push('/hidden-gems')} className="text-white/80 hover:text-white transition-colors">Hidden Gems</button>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-white mb-4">💊 FDA Catalyst Calendar</h2>
          <p className="text-xl text-purple-200 max-w-2xl mx-auto">
            Track upcoming FDA approvals, clinical trial results, and regulatory decisions that move biotech stocks.
          </p>
        </div>

        {/* Filters */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              filter === 'all'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'bg-white/10 text-white/80 hover:bg-white/20'
            }`}
          >
            All Catalysts
          </button>
          <button
            onClick={() => setFilter('upcoming')}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              filter === 'upcoming'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'bg-white/10 text-white/80 hover:bg-white/20'
            }`}
          >
            Next 30 Days
          </button>
          <button
            onClick={() => setFilter('high-probability')}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              filter === 'high-probability'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'bg-white/10 text-white/80 hover:bg-white/20'
            }`}
          >
            High Probability (75%+)
          </button>
        </div>

        {/* Catalysts List */}
        <div className="max-w-6xl mx-auto space-y-6">
          {filteredCatalysts.map((catalyst) => (
            <div
              key={catalyst.id}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                {/* Left: Company & Drug Info */}
                <div className="flex-1">
                  <div className="flex items-start gap-4 mb-4">
                    <button
                      onClick={() => router.push(`/stock/${catalyst.ticker}`)}
                      className="px-4 py-2 bg-purple-500/30 hover:bg-purple-500/50 rounded-lg text-white font-mono font-bold text-lg transition-colors"
                    >
                      ${catalyst.ticker}
                    </button>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{catalyst.company}</h3>
                      <p className="text-purple-200">{catalyst.drug} • {catalyst.indication}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <span className="px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-lg text-blue-300 text-sm">
                      {catalyst.phase}
                    </span>
                    <span className="px-3 py-1 bg-green-500/20 border border-green-400/30 rounded-lg text-green-300 text-sm">
                      {catalyst.eventType}
                    </span>
                    <span className={`px-3 py-1 border rounded-lg text-sm ${getImpactColor(catalyst.potentialImpact)}`}>
                      {catalyst.potentialImpact} Impact
                    </span>
                  </div>
                </div>

                {/* Right: Date & Probability */}
                <div className="lg:text-right space-y-3">
                  <div>
                    <div className="text-sm text-purple-300 mb-1">Event Date</div>
                    <div className="text-xl font-bold text-white">{catalyst.date}</div>
                    <div className={`text-lg ${getDaysUntilColor(catalyst.daysUntil)}`}>
                      {catalyst.daysUntil > 0 
                        ? `${catalyst.daysUntil} days left ⏰` 
                        : catalyst.daysUntil === 0 
                        ? 'TODAY! 🔥' 
                        : `${Math.abs(catalyst.daysUntil)} days ago`}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-purple-300 mb-1">Success Probability</div>
                    <div className={`text-3xl font-bold ${getProbabilityColor(catalyst.probability)}`}>
                      {catalyst.probability}%
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-purple-300 mb-1">Market Cap</div>
                    <div className="text-lg font-semibold text-white">{catalyst.marketCap}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Info */}
        <div className="max-w-4xl mx-auto mt-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-8 border border-purple-400/30">
          <h3 className="text-2xl font-bold text-white mb-4">⚠️ FDA Catalyst Trading Strategy</h3>
          <div className="space-y-3 text-purple-100">
            <p>
              <strong className="text-white">Before the Event:</strong> Biotech stocks often run up 2-4 weeks before major catalysts as traders position for positive outcomes.
            </p>
            <p>
              <strong className="text-white">On Approval:</strong> Stocks can surge 50-200% on positive FDA decisions or clinical trial success.
            </p>
            <p>
              <strong className="text-white">On Rejection:</strong> Stocks typically crash 40-80% on FDA rejections or trial failures.
            </p>
            <p className="text-yellow-300 font-semibold">
              💡 Pro Tip: Use Sacred27 levels to identify optimal entry and exit points around catalyst events.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
