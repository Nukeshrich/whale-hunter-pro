import { NextRequest, NextResponse } from 'next/server';

// Helper to call Manus Data API from server-side
async function fetchYahooInsiders(symbol: string) {
  try {
    // Note: This would need to be implemented with proper API client
    // For now, we'll use mock data structure
    return null;
  } catch (error) {
    console.error('Error fetching Yahoo insiders:', error);
    return null;
  }
}

interface InsiderTransaction {
  name: string;
  position: string;
  transactionType: 'BUY' | 'SELL' | 'OPTION_EXERCISE' | 'GIFT';
  shares: number;
  sharesFormatted: string;
  pricePerShare: number;
  totalValue: number;
  totalValueFormatted: string;
  date: string;
  daysAgo: number;
}

interface InsiderSummary {
  totalBuying: number;
  totalSelling: number;
  netActivity: number;
  buyTransactions: number;
  sellTransactions: number;
  sentiment: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  sentimentScore: number; // -100 to +100
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ ticker: string }> }
) {
  try {
    const { ticker } = await params;
    
    // Try to fetch real insider data
    const realInsiders = await fetchYahooInsiders(ticker.toUpperCase());
    
    // For now, using enhanced mock data that's more realistic
    // In production, this would parse real SEC Form 4 filings
    
    // Mock insider transactions (last 90 days)
    const mockTransactions: InsiderTransaction[] = [
      {
        name: 'John Smith',
        position: 'CEO',
        transactionType: 'BUY',
        shares: 50000,
        sharesFormatted: '50,000',
        pricePerShare: 175.50,
        totalValue: 8775000,
        totalValueFormatted: '$8.78M',
        date: '2024-10-15',
        daysAgo: 17,
      },
      {
        name: 'Sarah Johnson',
        position: 'CFO',
        transactionType: 'BUY',
        shares: 25000,
        sharesFormatted: '25,000',
        pricePerShare: 173.20,
        totalValue: 4330000,
        totalValueFormatted: '$4.33M',
        date: '2024-10-10',
        daysAgo: 22,
      },
      {
        name: 'Michael Chen',
        position: 'Director',
        transactionType: 'BUY',
        shares: 15000,
        sharesFormatted: '15,000',
        pricePerShare: 171.80,
        totalValue: 2577000,
        totalValueFormatted: '$2.58M',
        date: '2024-10-05',
        daysAgo: 27,
      },
      {
        name: 'Emily Davis',
        position: 'VP Operations',
        transactionType: 'SELL',
        shares: 10000,
        sharesFormatted: '10,000',
        pricePerShare: 176.50,
        totalValue: 1765000,
        totalValueFormatted: '$1.77M',
        date: '2024-09-28',
        daysAgo: 34,
      },
      {
        name: 'Robert Wilson',
        position: 'CTO',
        transactionType: 'OPTION_EXERCISE',
        shares: 30000,
        sharesFormatted: '30,000',
        pricePerShare: 150.00,
        totalValue: 4500000,
        totalValueFormatted: '$4.50M',
        date: '2024-09-20',
        daysAgo: 42,
      },
    ];

    // Calculate insider sentiment
    const buyTransactions = mockTransactions.filter(t => t.transactionType === 'BUY');
    const sellTransactions = mockTransactions.filter(t => t.transactionType === 'SELL');
    
    const totalBuying = buyTransactions.reduce((sum, t) => sum + t.totalValue, 0);
    const totalSelling = sellTransactions.reduce((sum, t) => sum + t.totalValue, 0);
    const netActivity = totalBuying - totalSelling;
    
    // Calculate sentiment score (-100 to +100)
    const totalActivity = totalBuying + totalSelling;
    const sentimentScore = totalActivity > 0 
      ? Math.round((netActivity / totalActivity) * 100)
      : 0;
    
    let sentiment: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
    if (sentimentScore > 30) sentiment = 'BULLISH';
    else if (sentimentScore < -30) sentiment = 'BEARISH';
    else sentiment = 'NEUTRAL';

    const summary: InsiderSummary = {
      totalBuying,
      totalSelling,
      netActivity,
      buyTransactions: buyTransactions.length,
      sellTransactions: sellTransactions.length,
      sentiment,
      sentimentScore,
    };

    return NextResponse.json({
      ticker: ticker.toUpperCase(),
      transactions: mockTransactions,
      summary,
      lastUpdate: new Date().toISOString(),
      period: 'Last 90 days',
    });

  } catch (error) {
    console.error('Error fetching insider data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch insider data' },
      { status: 500 }
    );
  }
}
