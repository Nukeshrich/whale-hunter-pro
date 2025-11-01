// Yahoo Finance API integration utility
// This file provides functions to fetch real market data

const YAHOO_FINANCE_BASE = 'https://query1.finance.yahoo.com/v8/finance';
const YAHOO_CHART_BASE = 'https://query1.finance.yahoo.com/v8/finance/chart';

export interface YahooQuote {
  symbol: string;
  regularMarketPrice: number;
  regularMarketChange: number;
  regularMarketChangePercent: number;
  regularMarketDayHigh: number;
  regularMarketDayLow: number;
  regularMarketOpen: number;
  regularMarketVolume: number;
  marketCap: number;
  shortName: string;
  longName: string;
}

export interface YahooInstitutionalHolder {
  organization: string;
  shares: { raw: number; fmt: string };
  dateReported: { raw: number; fmt: string };
  pctHeld: { raw: number; fmt: string };
  value: { raw: number; fmt: string };
}

export interface YahooInsiderHolder {
  name: string;
  relation: string;
  positionDirect: { raw: number; fmt: string };
  latestTransDate: { raw: number; fmt: string };
  transactionDescription: string;
}

/**
 * Fetch real-time stock quote from Yahoo Finance
 */
export async function fetchYahooQuote(symbol: string): Promise<YahooQuote | null> {
  try {
    const url = `${YAHOO_CHART_BASE}/${symbol}?interval=1d&range=1d`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (!response.ok) {
      console.error(`Yahoo Finance API error: ${response.status}`);
      return null;
    }

    const data = await response.json();
    const result = data?.chart?.result?.[0];
    
    if (!result) {
      console.error('No data returned from Yahoo Finance');
      return null;
    }

    const meta = result.meta;
    const quote: YahooQuote = {
      symbol: meta.symbol,
      regularMarketPrice: meta.regularMarketPrice || 0,
      regularMarketChange: meta.regularMarketPrice - meta.previousClose || 0,
      regularMarketChangePercent: ((meta.regularMarketPrice - meta.previousClose) / meta.previousClose * 100) || 0,
      regularMarketDayHigh: meta.regularMarketDayHigh || 0,
      regularMarketDayLow: meta.regularMarketDayLow || 0,
      regularMarketOpen: meta.regularMarketOpen || 0,
      regularMarketVolume: meta.regularMarketVolume || 0,
      marketCap: meta.marketCap || 0,
      shortName: meta.symbol,
      longName: meta.longName || meta.symbol,
    };

    return quote;
  } catch (error) {
    console.error('Error fetching Yahoo quote:', error);
    return null;
  }
}

/**
 * Fetch institutional holders from Yahoo Finance
 */
export async function fetchYahooInstitutionalHolders(symbol: string): Promise<YahooInstitutionalHolder[]> {
  try {
    // Yahoo Finance doesn't have a direct public API for holders
    // We'll use a workaround or return mock data for now
    // In production, you'd use a paid API like Alpha Vantage or Polygon
    
    console.log(`Fetching institutional holders for ${symbol}...`);
    
    // For now, return empty array - will be populated with mock data
    // TODO: Integrate with paid API service for real institutional data
    return [];
  } catch (error) {
    console.error('Error fetching institutional holders:', error);
    return [];
  }
}

/**
 * Fetch insider holders from Yahoo Finance
 */
export async function fetchYahooInsiderHolders(symbol: string): Promise<YahooInsiderHolder[]> {
  try {
    // Yahoo Finance doesn't have a direct public API for insider transactions
    // We'll use SEC EDGAR API or return mock data for now
    
    console.log(`Fetching insider holders for ${symbol}...`);
    
    // For now, return empty array - will be populated with mock data
    // TODO: Integrate with SEC EDGAR API for real insider data
    return [];
  } catch (error) {
    console.error('Error fetching insider holders:', error);
    return [];
  }
}

/**
 * Format large numbers (e.g., 1234567890 -> "1.23B")
 */
export function formatLargeNumber(num: number): string {
  if (num >= 1e12) return `${(num / 1e12).toFixed(2)}T`;
  if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
  if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`;
  return num.toFixed(2);
}

/**
 * Format currency (e.g., 1234567890 -> "$1.23B")
 */
export function formatCurrency(num: number): string {
  return `$${formatLargeNumber(num)}`;
}
