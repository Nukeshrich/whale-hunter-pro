import { NextRequest, NextResponse } from 'next/server';

// Legendary whale investors to track
const LEGENDARY_WHALES = [
  { name: 'Warren Buffett', company: 'Berkshire Hathaway', emoji: '🐘', keywords: ['BERKSHIRE HATHAWAY', 'BUFFETT'] },
  { name: 'Cathie Wood', company: 'ARK Invest', emoji: '🚀', keywords: ['ARK INVESTMENT', 'ARK INVEST', 'CATHIE WOOD'] },
  { name: 'Michael Burry', company: 'Scion Asset Management', emoji: '🧠', keywords: ['SCION ASSET', 'SCION CAPITAL', 'BURRY'] },
  { name: 'Bill Ackman', company: 'Pershing Square', emoji: '💼', keywords: ['PERSHING SQUARE', 'ACKMAN'] },
  { name: 'Ray Dalio', company: 'Bridgewater Associates', emoji: '🌊', keywords: ['BRIDGEWATER', 'DALIO'] },
  { name: 'Carl Icahn', company: 'Icahn Enterprises', emoji: '🦅', keywords: ['ICAHN', 'IEP'] },
  { name: 'David Tepper', company: 'Appaloosa Management', emoji: '🐎', keywords: ['APPALOOSA', 'TEPPER'] },
  { name: 'Stanley Druckenmiller', company: 'Duquesne Family Office', emoji: '💎', keywords: ['DUQUESNE', 'DRUCKENMILLER'] },
];

// Known whale holdings (based on public 13F filings)
const KNOWN_WHALE_HOLDINGS: Record<string, Array<{whale: string, shares: string, value: string, percent: number}>> = {
  // Warren Buffett's major holdings
  'AAPL': [{ whale: 'Warren Buffett', shares: '915M', value: '$160.6B', percent: 5.8 }],
  'BAC': [{ whale: 'Warren Buffett', shares: '1.03B', value: '$28.5B', percent: 12.8 }],
  'KO': [{ whale: 'Warren Buffett', shares: '400M', value: '$24.1B', percent: 9.2 }],
  'AXP': [{ whale: 'Warren Buffett', shares: '151.6M', value: '$22.8B', percent: 20.1 }],
  'CVX': [{ whale: 'Warren Buffett', shares: '123.1M', value: '$17.5B', percent: 6.2 }],
  'OXY': [{ whale: 'Warren Buffett', shares: '224.1M', value: '$13.3B', percent: 23.6 }],
  
  // Cathie Wood's ARK holdings
  'TSLA': [{ whale: 'Cathie Wood', shares: '3.8M', value: '$1.7B', percent: 0.12 }],
  'COIN': [{ whale: 'Cathie Wood', shares: '9.5M', value: '$2.1B', percent: 4.2 }],
  'ROKU': [{ whale: 'Cathie Wood', shares: '14.2M', value: '$1.1B', percent: 10.8 }],
  'SHOP': [{ whale: 'Cathie Wood', shares: '6.8M', value: '$890M', percent: 0.7 }],
  'SQ': [{ whale: 'Cathie Wood', shares: '8.2M', value: '$670M', percent: 1.4 }],
  'TDOC': [{ whale: 'Cathie Wood', shares: '18.5M', value: '$450M', percent: 12.3 }],
  
  // Michael Burry's positions
  'BABA': [{ whale: 'Michael Burry', shares: '200K', value: '$18.5M', percent: 0.008 }],
  'JD': [{ whale: 'Michael Burry', shares: '500K', value: '$15.2M', percent: 0.03 }],
};

interface WhaleHolder {
  name: string;
  company: string;
  emoji: string;
  shares: number;
  sharesFormatted: string;
  value: number;
  valueFormatted: string;
  percentHeld: number;
  dateReported: string;
  isLegendary: boolean;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ ticker: string }> }
) {
  try {
    const { ticker } = await params;
    
    // TODO: Replace with actual Yahoo Finance API call
    // For now, using mock data structure that matches real API response
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check if this stock has known whale holdings
    const knownWhales = KNOWN_WHALE_HOLDINGS[ticker.toUpperCase()] || [];
    
    // Build mock institutional holders list
    const mockHolders = [
      // Always include top institutional holders
      {
        organization: 'Vanguard Group Inc',
        shares: { raw: 1234567890, fmt: '1.23B' },
        dateReported: { raw: 1704067200, fmt: '2024-01-01' },
        pctHeld: { raw: 0.078, fmt: '7.80%' },
        value: { raw: 216500000000, fmt: '$216.5B' }
      },
      {
        organization: 'BlackRock Inc.',
        shares: { raw: 1123456789, fmt: '1.12B' },
        dateReported: { raw: 1704067200, fmt: '2024-01-01' },
        pctHeld: { raw: 0.071, fmt: '7.10%' },
        value: { raw: 197200000000, fmt: '$197.2B' }
      },
      {
        organization: 'State Street Corp',
        shares: { raw: 634567890, fmt: '634.6M' },
        dateReported: { raw: 1704067200, fmt: '2024-01-01' },
        pctHeld: { raw: 0.040, fmt: '4.00%' },
        value: { raw: 111400000000, fmt: '$111.4B' }
      },
      {
        organization: 'Geode Capital Management LLC',
        shares: { raw: 234567890, fmt: '234.6M' },
        dateReported: { raw: 1704067200, fmt: '2024-01-01' },
        pctHeld: { raw: 0.015, fmt: '1.50%' },
        value: { raw: 41200000000, fmt: '$41.2B' }
      },
    ];
    
    // Add known whale holdings to the list
    knownWhales.forEach(whaleHolding => {
      const whale = LEGENDARY_WHALES.find(w => w.name === whaleHolding.whale);
      if (whale) {
        // Parse shares string (e.g., "915M" -> 915000000)
        const sharesRaw = parseFloat(whaleHolding.shares) * 
          (whaleHolding.shares.includes('B') ? 1e9 : 
           whaleHolding.shares.includes('M') ? 1e6 : 
           whaleHolding.shares.includes('K') ? 1e3 : 1);
        
        // Parse value string (e.g., "$160.6B" -> 160600000000)
        const valueStr = whaleHolding.value.replace('$', '');
        const valueRaw = parseFloat(valueStr) * 
          (valueStr.includes('B') ? 1e9 : 
           valueStr.includes('M') ? 1e6 : 
           valueStr.includes('K') ? 1e3 : 1);
        
        mockHolders.push({
          organization: whale.company,
          shares: { raw: sharesRaw, fmt: whaleHolding.shares },
          dateReported: { raw: 1704067200, fmt: '2024-01-01' },
          pctHeld: { raw: whaleHolding.percent / 100, fmt: `${whaleHolding.percent.toFixed(2)}%` },
          value: { raw: valueRaw, fmt: whaleHolding.value }
        });
      }
    });

    // Process holders and identify legendary whales
    const whaleHolders: WhaleHolder[] = mockHolders.map(holder => {
      const orgName = holder.organization.toUpperCase();
      
      // Check if this is a legendary whale
      const legendaryWhale = LEGENDARY_WHALES.find(whale => 
        whale.keywords.some(keyword => orgName.includes(keyword))
      );

      if (legendaryWhale) {
        return {
          name: legendaryWhale.name,
          company: legendaryWhale.company,
          emoji: legendaryWhale.emoji,
          shares: holder.shares.raw,
          sharesFormatted: holder.shares.fmt,
          value: holder.value.raw,
          valueFormatted: holder.value.fmt,
          percentHeld: holder.pctHeld.raw * 100,
          dateReported: holder.dateReported.fmt,
          isLegendary: true,
        };
      }

      // Regular institutional holder
      return {
        name: holder.organization,
        company: holder.organization,
        emoji: '🏢',
        shares: holder.shares.raw,
        sharesFormatted: holder.shares.fmt,
        value: holder.value.raw,
        valueFormatted: holder.value.fmt,
        percentHeld: holder.pctHeld.raw * 100,
        dateReported: holder.dateReported.fmt,
        isLegendary: false,
      };
    });

    // Sort: legendary whales first, then by value
    whaleHolders.sort((a, b) => {
      if (a.isLegendary && !b.isLegendary) return -1;
      if (!a.isLegendary && b.isLegendary) return 1;
      return b.value - a.value;
    });

    return NextResponse.json({
      ticker: ticker.toUpperCase(),
      whales: whaleHolders.slice(0, 10), // Top 10 holders
      legendaryCount: whaleHolders.filter(w => w.isLegendary).length,
      totalInstitutionalHolders: mockHolders.length,
      lastUpdate: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Error fetching whale data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch whale data' },
      { status: 500 }
    );
  }
}
