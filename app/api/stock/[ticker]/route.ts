import { NextRequest, NextResponse } from 'next/server';
import { fetchYahooQuote } from '@/lib/yahooFinance';

// This API route fetches real-time stock data from Yahoo Finance

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ ticker: string }> }
) {
  try {
    const { ticker } = await params;
    
    // Try to fetch real data from Yahoo Finance
    const yahooQuote = await fetchYahooQuote(ticker.toUpperCase());
    
    if (yahooQuote) {
      // Return real Yahoo Finance data
      return NextResponse.json({
        symbol: yahooQuote.symbol,
        price: yahooQuote.regularMarketPrice,
        change: yahooQuote.regularMarketChange,
        changePercent: yahooQuote.regularMarketChangePercent,
        high: yahooQuote.regularMarketDayHigh,
        low: yahooQuote.regularMarketDayLow,
        open: yahooQuote.regularMarketOpen,
        volume: yahooQuote.regularMarketVolume,
        marketCap: yahooQuote.marketCap,
        companyName: yahooQuote.longName || yahooQuote.shortName,
        timestamp: new Date().toISOString(),
        lastUpdate: new Date().toLocaleTimeString(),
        source: 'Yahoo Finance (Live)',
      });
    }
    
    // Fallback to mock data if Yahoo Finance fails
    const mockData: Record<string, any> = {
      AAPL: {
        symbol: 'AAPL',
        price: 175.50 + (Math.random() * 4 - 2), // Simulate price movement
        change: 2.35 + (Math.random() * 0.5 - 0.25),
        changePercent: 1.36 + (Math.random() * 0.2 - 0.1),
        high: 177.20,
        low: 173.80,
        open: 174.10,
        volume: 52340000,
        marketCap: 2750000000000,
        companyName: 'Apple Inc.',
      },
      TSLA: {
        symbol: 'TSLA',
        price: 242.80 + (Math.random() * 6 - 3),
        change: -3.45 + (Math.random() * 0.8 - 0.4),
        changePercent: -1.40 + (Math.random() * 0.3 - 0.15),
        high: 248.50,
        low: 241.20,
        open: 246.30,
        volume: 98750000,
        marketCap: 770000000000,
        companyName: 'Tesla, Inc.',
      },
      NVDA: {
        symbol: 'NVDA',
        price: 495.20 + (Math.random() * 10 - 5),
        change: 12.80 + (Math.random() * 1.5 - 0.75),
        changePercent: 2.65 + (Math.random() * 0.4 - 0.2),
        high: 498.90,
        low: 488.50,
        open: 490.30,
        volume: 45230000,
        marketCap: 1220000000000,
        companyName: 'NVIDIA Corporation',
      },
      MSFT: {
        symbol: 'MSFT',
        price: 378.50 + (Math.random() * 5 - 2.5),
        change: 4.20 + (Math.random() * 0.6 - 0.3),
        changePercent: 1.12 + (Math.random() * 0.15 - 0.075),
        high: 380.20,
        low: 376.80,
        open: 377.30,
        volume: 28450000,
        marketCap: 2810000000000,
        companyName: 'Microsoft Corporation',
      },
    };

    const data = mockData[ticker.toUpperCase()] || {
      symbol: ticker.toUpperCase(),
      price: 100 + (Math.random() * 50),
      change: Math.random() * 4 - 2,
      changePercent: Math.random() * 2 - 1,
      high: 105,
      low: 95,
      open: 100,
      volume: 1000000,
      marketCap: 10000000000,
      companyName: `${ticker.toUpperCase()} Inc.`,
    };

    // Add timestamp for freshness
    return NextResponse.json({
      ...data,
      timestamp: new Date().toISOString(),
      lastUpdate: new Date().toLocaleTimeString(),
      source: 'Mock Data (Demo)',
    });

  } catch (error) {
    console.error('Error fetching stock data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stock data' },
      { status: 500 }
    );
  }
}
