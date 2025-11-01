'use client';

import { useState } from 'react';
import Link from 'next/link';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const plans = [
  {
    id: 'basic',
    name: 'Sacred27 Basic',
    price: 27,
    description: 'Perfect for retail traders and beginners',
    features: [
      'Full Sacred27 levels',
      'Explosion scores for any stock',
      'Track all 8 legendary whales',
      'FDA catalyst calendar',
      'Insider buying tracker',
      '50 stock analyses per day',
    ],
  },
  {
    id: 'pro',
    name: 'Sacred27 Pro',
    price: 108,
    description: 'Best for serious traders',
    popular: true,
    features: [
      'Everything in Basic',
      'Real-time whale alerts (SMS/email)',
      'Research report generation',
      'Hidden gems discovery',
      'Priority support',
      'Unlimited stock analyses',
    ],
  },
  {
    id: 'elite',
    name: 'Sacred27 Elite',
    price: 270,
    description: 'For professional traders',
    features: [
      'Everything in Pro',
      '1-on-1 Sacred27 training call (monthly)',
      'Private Discord channel',
      'Early access to new features',
      'API access for algo traders',
    ],
  },
];

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubscribe = async (planId: string) => {
    setLoading(planId);

    try {
      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: planId }),
      });

      const { url } = await response.json();

      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(null);
    }
  };

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
              <Link href="/guide" className="text-white/80 hover:text-white transition-colors">Guide</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4">Choose Your Plan</h2>
          <p className="text-xl text-purple-200 mb-2">Unlock the power of Sacred27 analysis</p>
          <p className="text-purple-300">Cancel anytime • 7-day money-back guarantee</p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border ${
                plan.popular
                  ? 'border-pink-400 shadow-2xl shadow-pink-500/20 scale-105'
                  : 'border-white/20'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-1 rounded-full text-sm font-semibold">
                  MOST POPULAR
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-purple-200 text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-5xl font-bold text-white">${plan.price}</span>
                  <span className="text-purple-300">/month</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-purple-100">
                    <span className="text-green-400 mt-1">✓</span>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSubscribe(plan.id)}
                disabled={loading === plan.id}
                className={`w-full py-3 rounded-lg font-semibold transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90'
                    : 'bg-white/20 text-white hover:bg-white/30'
                } ${loading === plan.id ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading === plan.id ? 'Processing...' : 'Subscribe Now'}
              </button>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h3 className="text-3xl font-bold text-white text-center mb-8">Frequently Asked Questions</h3>
          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <h4 className="text-lg font-bold text-white mb-2">Can I cancel anytime?</h4>
              <p className="text-purple-200">Yes! Cancel your subscription anytime from your account dashboard. No questions asked.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <h4 className="text-lg font-bold text-white mb-2">What payment methods do you accept?</h4>
              <p className="text-purple-200">We accept all major credit cards (Visa, Mastercard, Amex) through our secure Stripe payment processor.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <h4 className="text-lg font-bold text-white mb-2">Is there a free trial?</h4>
              <p className="text-purple-200">We offer a 7-day money-back guarantee. If you're not satisfied, we'll refund your first payment in full.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <h4 className="text-lg font-bold text-white mb-2">What is the Sacred27 framework?</h4>
              <p className="text-purple-200">Sacred27 is a proprietary mathematical framework based on the number 27 (3³) that identifies precise support and resistance levels in stock charts. Check out our Guide page for more details.</p>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 text-center">
          <div className="flex items-center justify-center gap-8 text-purple-300">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔒</span>
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span>7-Day Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🚀</span>
              <span>Instant Access</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
