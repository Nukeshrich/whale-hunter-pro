'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-12 border border-white/20 max-w-2xl text-center">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-4xl font-bold text-white mb-4">Welcome to Whale Hunter Pro!</h1>
        <p className="text-xl text-purple-200 mb-8">
          Your subscription is now active. You have full access to all features.
        </p>

        <div className="bg-green-500/20 border border-green-400/30 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-2">✓ Payment Successful</h2>
          <p className="text-purple-100 text-sm">
            {sessionId && `Session ID: ${sessionId.slice(0, 20)}...`}
          </p>
          <p className="text-purple-100 text-sm mt-2">
            A confirmation email has been sent to your inbox.
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <h3 className="text-xl font-bold text-white">What's Next?</h3>
          <ul className="text-left text-purple-100 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-green-400">→</span>
              <span>Start analyzing stocks with Sacred27 levels</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400">→</span>
              <span>Track what legendary investors are buying</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400">→</span>
              <span>Set up whale alerts for real-time notifications</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400">→</span>
              <span>Explore FDA catalysts and insider buying</span>
            </li>
          </ul>
        </div>

        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Start Hunting 🐋
          </Link>
          <Link
            href="/guide"
            className="bg-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors"
          >
            Read Guide
          </Link>
        </div>

        <p className="text-purple-300 text-sm mt-8">
          Questions? Contact support or check out our comprehensive guide.
        </p>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900" />}>
      <SuccessContent />
    </Suspense>
  );
}
