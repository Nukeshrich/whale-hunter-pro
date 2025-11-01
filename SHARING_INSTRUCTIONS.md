# 🐋 Whale Hunter Pro - Sharing Instructions

## 📍 Live URL

**https://3000-im0em7x21n9c3ogousaea-1bb3e663.manus.computer**

## 🔐 Password Protection

The platform is password-protected. Share this password with your friend:

**Password:** `whale27`

## 🚀 What's Built

### Core Features

1. **Homepage** (`/`)
   - Stock search functionality
   - Featured whales showcase
   - Sacred27 branding
   - Navigation to all sections

2. **Stock Analysis** (`/stock/[TICKER]`)
   - Sacred27 support/resistance levels
   - Explosion score (0-100 probability)
   - Whale activity tracking
   - Phase analysis (0-360°)
   - Example: Try `/stock/AAPL` or `/stock/TSLA`

3. **Whales Directory** (`/whales`)
   - 8 legendary investors tracked:
     - Warren Buffett (Berkshire Hathaway)
     - Cathie Wood (ARK Invest)
     - Michael Burry (Scion)
     - Ray Dalio (Bridgewater)
     - Bill Ackman (Pershing Square)
     - David Tepper (Appaloosa)
     - Stanley Druckenmiller
     - Carl Icahn
   - Top holdings for each whale
   - Recent activity summaries
   - Win rates and AUM stats

4. **FDA Catalyst Calendar** (`/fda`)
   - 6 upcoming biotech catalysts
   - FDA approval dates
   - Clinical trial results
   - Success probabilities
   - Market cap and impact ratings
   - Filters: All, Next 30 Days, High Probability

5. **Insider Buying Tracker** (`/insiders`)
   - 8 recent CEO purchases
   - Real-time performance tracking
   - Transaction details (shares, price, value)
   - Current gains since purchase
   - Sort by: Recent, Highest Gain, Largest Trades

## 🎨 Design

- **Theme:** Dark gradient (indigo → purple → pink)
- **Style:** Modern, glassmorphic cards with backdrop blur
- **Branding:** Whale emoji (🐋) + "Powered by Sacred27"
- **Responsive:** Works on desktop and mobile

## 🔢 Sacred27 Framework

The platform uses the proprietary Sacred27 mathematical framework:

- **Support/Resistance Levels:** Based on Sacred27 number sequence (27, 54, 81, 108, 135, 162, 189, 216, 243, 270...)
- **Phase Analysis:** 0-360° cycle for timing entries
- **Explosion Score:** 0-100% probability algorithm
- **Multi-factor Analysis:** Combines whale activity + insiders + catalysts

**Note:** The core Sacred27 formula and calculations remain SECRET. Only the results are displayed.

## 📱 How to Share

1. **Send the URL:**
   ```
   https://3000-im0em7x21n9c3ogousaea-1bb3e663.manus.computer
   ```

2. **Provide the password:**
   ```
   whale27
   ```

3. **Explain the features:**
   - Search any stock ticker (AAPL, TSLA, NVDA, etc.)
   - Check whale holdings and recent moves
   - Track FDA biotech catalysts
   - Monitor insider buying activity

## ⚠️ Important Notes

### Current Status
- **Demo Data:** Currently using sample data for demonstration
- **Real-time Updates:** Not yet connected to live APIs
- **Password:** Simple password protection (not production-grade security)

### Server Status
- The Manus server may go to sleep after inactivity
- If the site doesn't load, it may need to be woken up
- Contact Luke if the server is down

### Future Enhancements (Not Yet Built)
- Real-time data integration (Yahoo Finance, SEC EDGAR)
- User accounts and personalization
- Alert system for whale trades
- Research report generation
- Hidden gems discovery
- Market newsstand
- Payment/subscription system

## 🎯 Use Cases

### For Traders
- Find stocks before they explode
- Follow legendary investors' moves
- Track biotech catalysts for swing trades
- Monitor insider buying signals

### For Investors
- Long-term whale tracking (Buffett, Dalio)
- FDA approval plays
- Value investing with insider confirmation
- Sacred27 support/resistance for entries

## 💡 Demo Flow

**Recommended demo path for your friend:**

1. **Login** → Enter password `whale27`
2. **Homepage** → Search for "TSLA" or "NVDA"
3. **Stock Page** → See Sacred27 levels and explosion score
4. **Whales** → Click to see Warren Buffett's holdings
5. **FDA** → Check upcoming biotech catalysts
6. **Insiders** → See recent CEO purchases and gains

## 📞 Contact

For questions, access issues, or feedback:
- Contact Luke directly
- This is a private demo version
- Not yet publicly available

---

## 🔧 Technical Details (For Luke)

### Project Structure
```
/home/ubuntu/whale_hunter_sacred27/
├── app/
│   ├── page.tsx              # Homepage
│   ├── login/page.tsx        # Login page
│   ├── stock/[ticker]/page.tsx  # Stock analysis
│   ├── whales/page.tsx       # Whales directory
│   ├── fda/page.tsx          # FDA calendar
│   ├── insiders/page.tsx     # Insider tracker
│   └── api/auth/route.ts     # Password validation
├── middleware.ts             # Password protection
└── SHARING_INSTRUCTIONS.md   # This file
```

### Password Change
To change the password, edit:
1. `/home/ubuntu/whale_hunter_sacred27/middleware.ts` (line 6)
2. `/home/ubuntu/whale_hunter_sacred27/app/api/auth/route.ts` (line 4)

### Server Management
```bash
# Check if running
ps aux | grep "next dev"

# Start server
cd /home/ubuntu/whale_hunter_sacred27
npm run dev

# Stop server
pkill -f "next dev"
```

### Deployment
- Currently running on Manus sandbox
- URL: https://3000-im0em7x21n9c3ogousaea-1bb3e663.manus.computer
- For production: Deploy to Vercel or similar platform

---

**Built with:** Next.js 16 + React 19 + TypeScript + Tailwind CSS
**Created:** November 1, 2025
**Status:** Demo Version - Password Protected
