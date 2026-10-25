// PixelForge Studio - Authentic Vector Screens for 10 Google Play Template Families
// 40 Unique Coordinated Vector UI Screens (4 screens per template)
// Rendered as standalone SVG data URIs for 100% offline reliability, zero broken URLs, infinite resolution.

const createSvgDataUrl = (svgContent: string) => {
  const sanitized = svgContent
    .trim()
    .replace(/&(?!(amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/g, "&amp;");
  return `data:image/svg+xml;utf8,${encodeURIComponent(sanitized)}`;
};

export const GP_SCREENS = {
  // =========================================================================
  // 1. TEMPLATE 1: PREMIUM MINIMAL (PixelPulse Material Banking)
  // Warm cream, dark forest slate, elegant typography, editorial neobank
  // =========================================================================

  // Screen 1: Hero - Wealth Overview & Titanium Card
  bank1_hero: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1600" viewBox="0 0 800 1600">
      <defs>
        <linearGradient id="cardGrad1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#1e293b"/>
          <stop offset="100%" stop-color="#0f172a"/>
        </linearGradient>
      </defs>
      <rect width="800" height="1600" fill="#faf8f5"/>
      <!-- Status bar -->
      <text x="60" y="70" fill="#1e293b" font-size="28" font-weight="700" font-family="system-ui, sans-serif">9:41</text>
      <circle cx="730" cy="62" r="14" fill="#1e293b"/>
      <circle cx="690" cy="62" r="10" fill="#1e293b"/>

      <!-- App Header -->
      <text x="60" y="140" fill="#64748b" font-size="20" font-weight="600" letter-spacing="2">PRIVATE WEALTH CLIENT</text>
      <text x="60" y="195" fill="#0f172a" font-size="44" font-weight="800" font-family="system-ui, sans-serif">Welcome, Alexander</text>

      <!-- Net Worth Card -->
      <rect x="50" y="240" width="700" height="340" rx="32" fill="url(#cardGrad1)"/>
      <text x="90" y="300" fill="#94a3b8" font-size="22" font-weight="600">TOTAL NET WORTH</text>
      <text x="90" y="375" fill="#ffffff" font-size="64" font-weight="800" font-family="system-ui, sans-serif">$128,450.00</text>
      <rect x="90" y="405" width="160" height="42" rx="21" fill="#065f46"/>
      <text x="170" y="433" fill="#a7f3d0" font-size="20" font-weight="700" text-anchor="middle">+8.4% YTD</text>

      <text x="90" y="530" fill="#cbd5e1" font-size="20">Titanium Card •••• 8842</text>
      <text x="670" y="530" fill="#f59e0b" font-size="24" font-weight="bold" text-anchor="end">VISA INFINITE</text>

      <!-- Quick Action Pills -->
      <rect x="50" y="620" width="215" height="100" rx="24" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
      <text x="157" y="665" fill="#0f172a" font-size="28" text-anchor="middle">↗</text>
      <text x="157" y="695" fill="#334155" font-size="18" font-weight="700" text-anchor="middle">Wire Transfer</text>

      <rect x="292" y="620" width="215" height="100" rx="24" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
      <text x="400" y="665" fill="#0f172a" font-size="28" text-anchor="middle">⇄</text>
      <text x="400" y="695" fill="#334155" font-size="18" font-weight="700" text-anchor="middle">Multi-FX</text>

      <rect x="535" y="620" width="215" height="100" rx="24" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
      <text x="642" y="665" fill="#0f172a" font-size="28" text-anchor="middle">⚡</text>
      <text x="642" y="695" fill="#334155" font-size="18" font-weight="700" text-anchor="middle">Invest</text>

      <!-- Recent Transactions Section -->
      <text x="60" y="775" fill="#0f172a" font-size="28" font-weight="800">Recent Movements</text>

      <rect x="50" y="805" width="700" height="110" rx="24" fill="#ffffff" stroke="#f1f5f9" stroke-width="2"/>
      <circle cx="105" cy="860" r="30" fill="#f8fafc"/>
      <text x="105" y="868" font-size="26" text-anchor="middle">🏛</text>
      <text x="160" y="850" fill="#0f172a" font-size="24" font-weight="700">Geneva Private Bank</text>
      <text x="160" y="880" fill="#64748b" font-size="18">Incoming SWIFT Wire</text>
      <text x="710" y="865" fill="#059669" font-size="26" font-weight="800" text-anchor="end">+$45,000.00</text>

      <rect x="50" y="935" width="700" height="110" rx="24" fill="#ffffff" stroke="#f1f5f9" stroke-width="2"/>
      <circle cx="105" cy="990" r="30" fill="#f8fafc"/>
      <text x="105" y="998" font-size="26" text-anchor="middle">✈️</text>
      <text x="160" y="980" fill="#0f172a" font-size="24" font-weight="700">Swiss International Air</text>
      <text x="160" y="1010" fill="#64748b" font-size="18">Zurich - New York First Class</text>
      <text x="710" y="995" fill="#0f172a" font-size="26" font-weight="800" text-anchor="end">-$3,840.00</text>
    </svg>
  `),

  // Screen 2: Feature - Multi-Currency Interbank FX Wire
  bank1_feature: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1600" viewBox="0 0 800 1600">
      <rect width="800" height="1600" fill="#faf8f5"/>
      <text x="60" y="70" fill="#1e293b" font-size="28" font-weight="700">9:41</text>
      <text x="400" y="130" fill="#0f172a" font-size="32" font-weight="800" text-anchor="middle">Global Transfer</text>

      <!-- Pay Currency Card -->
      <rect x="50" y="180" width="700" height="200" rx="28" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
      <text x="90" y="235" fill="#64748b" font-size="20" font-weight="600">YOU SEND</text>
      <text x="90" y="310" fill="#0f172a" font-size="56" font-weight="800">€25,000</text>
      <rect x="540" y="240" width="170" height="60" rx="30" fill="#f1f5f9"/>
      <text x="605" y="278" fill="#0f172a" font-size="24" font-weight="700">🇪🇺 EUR</text>

      <!-- FX Rate Indicator -->
      <circle cx="400" cy="420" r="32" fill="#0f172a"/>
      <text x="400" y="428" fill="#ffffff" font-size="24" text-anchor="middle">↓</text>
      <text x="400" y="485" fill="#059669" font-size="22" font-weight="700" text-anchor="middle">1 EUR = 1.0940 USD • 0% Markup</text>

      <!-- Receive Currency Card -->
      <rect x="50" y="520" width="700" height="200" rx="28" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
      <text x="90" y="575" fill="#64748b" font-size="20" font-weight="600">RECIPIENT GETS</text>
      <text x="90" y="650" fill="#0f172a" font-size="56" font-weight="800">$27,350</text>
      <rect x="540" y="580" width="170" height="60" rx="30" fill="#f1f5f9"/>
      <text x="605" y="618" fill="#0f172a" font-size="24" font-weight="700">🇺🇸 USD</text>

      <!-- Wire Fee & Execution Speed Breakdown -->
      <rect x="50" y="760" width="700" height="260" rx="28" fill="#f8fafc" stroke="#e2e8f0" stroke-width="2"/>
      <text x="90" y="820" fill="#64748b" font-size="22">Transfer Fee</text>
      <text x="710" y="820" fill="#059669" font-size="22" font-weight="800" text-anchor="end">$0.00 (Free)</text>
      <line x1="90" y1="855" x2="710" y2="855" stroke="#e2e8f0" stroke-width="1.5"/>
      <text x="90" y="905" fill="#64748b" font-size="22">Estimated Arrival</text>
      <text x="710" y="905" fill="#0f172a" font-size="22" font-weight="700" text-anchor="end">Instant (FedNow)</text>
      <line x1="90" y1="940" x2="710" y2="940" stroke="#e2e8f0" stroke-width="1.5"/>
      <text x="90" y="990" fill="#64748b" font-size="22">Guaranteed FX Rate</text>
      <text x="710" y="990" fill="#0f172a" font-size="22" font-weight="700" text-anchor="end">Locked 24 Hours</text>

      <rect x="50" y="1060" width="700" height="84" rx="28" fill="#0f172a"/>
      <text x="400" y="1112" fill="#ffffff" font-size="26" font-weight="800" text-anchor="middle">Execute Transfer</text>
    </svg>
  `),

  // Screen 3: Product - Wealth Ledger & Portfolio Performance
  bank1_product: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1600" viewBox="0 0 800 1600">
      <rect width="800" height="1600" fill="#faf8f5"/>
      <text x="60" y="70" fill="#1e293b" font-size="28" font-weight="700">9:41</text>
      <text x="60" y="140" fill="#0f172a" font-size="40" font-weight="800">Portfolio Performance</text>

      <!-- Sparkline Growth Chart -->
      <rect x="50" y="180" width="700" height="340" rx="32" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
      <text x="90" y="240" fill="#64748b" font-size="22">TOTAL VALUATION</text>
      <text x="90" y="295" fill="#0f172a" font-size="52" font-weight="800">$1,482,900</text>
      <text x="420" y="295" fill="#059669" font-size="24" font-weight="700">▲ +18.4% (1Y)</text>

      <!-- Chart Path -->
      <path d="M 90 450 C 200 440, 260 410, 360 380 C 460 350, 520 370, 620 320 L 710 310" fill="none" stroke="#059669" stroke-width="5" stroke-linecap="round"/>
      <path d="M 90 450 C 200 440, 260 410, 360 380 C 460 350, 520 370, 620 320 L 710 310 L 710 480 L 90 480 Z" fill="rgba(5, 150, 105, 0.08)"/>

      <!-- Asset Allocations -->
      <text x="60" y="570" fill="#0f172a" font-size="26" font-weight="800">Asset Distribution</text>

      <rect x="50" y="605" width="700" height="96" rx="24" fill="#ffffff" stroke="#f1f5f9" stroke-width="2"/>
      <circle cx="100" cy="653" r="18" fill="#0f172a"/>
      <text x="140" y="660" fill="#0f172a" font-size="22" font-weight="700">Global Equities Index</text>
      <text x="710" y="660" fill="#0f172a" font-size="22" font-weight="800" text-anchor="end">65% ($963,885)</text>

      <rect x="50" y="720" width="700" height="96" rx="24" fill="#ffffff" stroke="#f1f5f9" stroke-width="2"/>
      <circle cx="100" cy="768" r="18" fill="#059669"/>
      <text x="140" y="775" fill="#0f172a" font-size="22" font-weight="700">Sovereign Treasury Bonds</text>
      <text x="710" y="775" fill="#0f172a" font-size="22" font-weight="800" text-anchor="end">25% ($370,725)</text>

      <rect x="50" y="835" width="700" height="96" rx="24" fill="#ffffff" stroke="#f1f5f9" stroke-width="2"/>
      <circle cx="100" cy="883" r="18" fill="#d97706"/>
      <text x="140" y="890" fill="#0f172a" font-size="22" font-weight="700">Physical Gold & Metals</text>
      <text x="710" y="890" fill="#0f172a" font-size="22" font-weight="800" text-anchor="end">10% ($148,290)</text>
    </svg>
  `),

  // Screen 4: Benefit - Security & Metal Card Privileges
  bank1_benefit: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1600" viewBox="0 0 800 1600">
      <defs>
        <linearGradient id="metalCard" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#334155"/>
          <stop offset="50%" stop-color="#1e293b"/>
          <stop offset="100%" stop-color="#0f172a"/>
        </linearGradient>
      </defs>
      <rect width="800" height="1600" fill="#faf8f5"/>
      <text x="60" y="70" fill="#1e293b" font-size="28" font-weight="700">9:41</text>

      <!-- Physical Metal Card Visual -->
      <rect x="80" y="140" width="640" height="380" rx="36" fill="url(#metalCard)"/>
      <rect x="130" y="190" width="70" height="54" rx="8" fill="#f59e0b"/>
      <circle cx="165" cy="217" r="14" fill="#d97706"/>
      <text x="660" y="220" fill="#ffffff" font-size="28" font-weight="bold" text-anchor="end">PixelPulse</text>
      <text x="130" y="380" fill="#94a3b8" font-size="24" font-family="monospace">••••  ••••  ••••  8842</text>
      <text x="130" y="460" fill="#ffffff" font-size="26" font-weight="600">ALEXANDER VANCE</text>
      <text x="660" y="460" fill="#f59e0b" font-size="26" font-weight="bold" text-anchor="end">PLATINUM</text>

      <!-- Privileges -->
      <text x="60" y="580" fill="#0f172a" font-size="32" font-weight="800">Private Privileges</text>

      <rect x="50" y="620" width="700" height="120" rx="24" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
      <text x="90" y="670" fill="#0f172a" font-size="24" font-weight="700">🛡 $5,000,000 FDIC Insurance</text>
      <text x="90" y="705" fill="#64748b" font-size="18">Multi-bank sweep network custody protection.</text>

      <rect x="50" y="760" width="700" height="120" rx="24" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
      <text x="90" y="810" fill="#0f172a" font-size="24" font-weight="700">✈️ 1,400+ Airport VIP Lounges</text>
      <text x="90" y="845" fill="#64748b" font-size="18">Unlimited Priority Pass worldwide access.</text>

      <rect x="50" y="900" width="700" height="120" rx="24" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
      <text x="90" y="950" fill="#0f172a" font-size="24" font-weight="700">🛎 24/7 Dedicated Concierge</text>
      <text x="90" y="985" fill="#64748b" font-size="18">Direct phone and signal desk access to bankers.</text>
    </svg>
  `),

  // =========================================================================
  // 2. TEMPLATE 2: BOLD TYPOGRAPHY (FitTrack Health Connect & Wear OS)
  // Athletic obsidian, neon lime, high contrast, telemetry
  // =========================================================================

  // Screen 1: Hero - Active Workout Telemetry
  fit2_hero: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1600" viewBox="0 0 800 1600">
      <rect width="800" height="1600" fill="#0b0f19"/>
      <text x="60" y="70" fill="#ffffff" font-size="28" font-weight="700">07:24</text>
      <circle cx="730" cy="62" r="14" fill="#84cc16"/>

      <!-- Workout Header -->
      <rect x="50" y="120" width="220" height="44" rx="22" fill="#1e293b"/>
      <text x="160" y="150" fill="#84cc16" font-size="18" font-weight="800" text-anchor="middle">OUTDOOR RUN</text>

      <!-- Main Metric: Heart Rate -->
      <text x="60" y="270" fill="#94a3b8" font-size="24" font-weight="700">HEART RATE</text>
      <text x="60" y="390" fill="#84cc16" font-size="110" font-weight="900">174</text>
      <text x="310" y="370" fill="#ffffff" font-size="34" font-weight="800">BPM</text>
      <rect x="420" y="325" width="160" height="48" rx="24" fill="#ef4444"/>
      <text x="500" y="357" fill="#ffffff" font-size="20" font-weight="800" text-anchor="middle">ZONE 5 MAX</text>

      <!-- Pace & Cadence Split -->
      <rect x="50" y="440" width="335" height="170" rx="28" fill="#131c2e" stroke="#1e293b" stroke-width="2"/>
      <text x="80" y="495" fill="#94a3b8" font-size="20">AVG PACE</text>
      <text x="80" y="565" fill="#ffffff" font-size="52" font-weight="900">3'58"</text>
      <text x="210" y="565" fill="#84cc16" font-size="24" font-weight="700">/KM</text>

      <rect x="415" y="440" width="335" height="170" rx="28" fill="#131c2e" stroke="#1e293b" stroke-width="2"/>
      <text x="445" y="495" fill="#94a3b8" font-size="20">CADENCE</text>
      <text x="445" y="565" fill="#ffffff" font-size="52" font-weight="900">182</text>
      <text x="560" y="565" fill="#84cc16" font-size="24" font-weight="700">SPM</text>

      <!-- Distance and Elevation -->
      <rect x="50" y="635" width="700" height="200" rx="28" fill="#131c2e" stroke="#1e293b" stroke-width="2"/>
      <text x="80" y="695" fill="#94a3b8" font-size="20">DISTANCE COMPLETED</text>
      <text x="80" y="780" fill="#ffffff" font-size="68" font-weight="900">10.42</text>
      <text x="320" y="775" fill="#84cc16" font-size="34" font-weight="800">KM</text>
      <text x="680" y="775" fill="#38bdf8" font-size="28" font-weight="700" text-anchor="end">+284m Elev</text>
    </svg>
  `),

  // Screen 2: Feature - VO2 Max & Lactate Threshold
  fit2_feature: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1600" viewBox="0 0 800 1600">
      <rect width="800" height="1600" fill="#0b0f19"/>
      <text x="60" y="70" fill="#ffffff" font-size="28" font-weight="700">07:24</text>
      <text x="60" y="140" fill="#ffffff" font-size="38" font-weight="900">VO2 Max & Aerobic Capacity</text>

      <!-- Giant Dial Metric -->
      <rect x="50" y="180" width="700" height="360" rx="32" fill="#131c2e" stroke="#1e293b" stroke-width="2"/>
      <text x="90" y="250" fill="#94a3b8" font-size="22">CARDIO FITNESS SCORE</text>
      <text x="90" y="360" fill="#84cc16" font-size="94" font-weight="900">58.4</text>
      <text x="360" y="340" fill="#ffffff" font-size="28" font-weight="800">mL/kg/min</text>
      <rect x="90" y="410" width="220" height="46" rx="23" fill="#84cc16"/>
      <text x="200" y="440" fill="#000000" font-size="20" font-weight="900" text-anchor="middle">SUPERIOR (TOP 2%)</text>

      <!-- Zones Breakdown -->
      <text x="60" y="590" fill="#ffffff" font-size="26" font-weight="800">Heart Rate Training Zones</text>

      <rect x="50" y="625" width="700" height="80" rx="20" fill="#1e293b"/>
      <rect x="50" y="625" width="560" height="80" rx="20" fill="#ef4444"/>
      <text x="80" y="675" fill="#ffffff" font-size="22" font-weight="800">Zone 5 • Neuromuscular (>172 BPM)</text>

      <rect x="50" y="720" width="700" height="80" rx="20" fill="#1e293b"/>
      <rect x="50" y="720" width="480" height="80" rx="20" fill="#f97316"/>
      <text x="80" y="770" fill="#ffffff" font-size="22" font-weight="800">Zone 4 • Threshold (155-171 BPM)</text>

      <rect x="50" y="815" width="700" height="80" rx="20" fill="#1e293b"/>
      <rect x="50" y="815" width="380" height="80" rx="20" fill="#84cc16"/>
      <text x="80" y="865" fill="#000000" font-size="22" font-weight="900">Zone 3 • Aerobic (138-154 BPM)</text>
    </svg>
  `),

  // Screen 3: Product - Wear OS Live Watch Interface
  fit2_product: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1600" viewBox="0 0 800 1600">
      <rect width="800" height="1600" fill="#0b0f19"/>
      <text x="60" y="70" fill="#ffffff" font-size="28" font-weight="700">07:24</text>
      <text x="60" y="140" fill="#ffffff" font-size="38" font-weight="900">Wear OS 5 Synchronization</text>

      <!-- Simulated Wear OS Dial Interface -->
      <circle cx="400" cy="460" r="260" fill="#131c2e" stroke="#84cc16" stroke-width="8"/>
      <circle cx="400" cy="460" r="230" fill="#090d15"/>
      <text x="400" y="370" fill="#94a3b8" font-size="24" text-anchor="middle">LIVE WORKOUT</text>
      <text x="400" y="460" fill="#84cc16" font-size="82" font-weight="900" text-anchor="middle">168</text>
      <text x="400" y="505" fill="#ffffff" font-size="24" font-weight="bold" text-anchor="middle">BPM</text>
      <text x="400" y="560" fill="#38bdf8" font-size="28" font-weight="bold" text-anchor="middle">4.82 KM • 24:12</text>

      <!-- Sync Status Card -->
      <rect x="50" y="780" width="700" height="150" rx="28" fill="#131c2e" stroke="#1e293b" stroke-width="2"/>
      <circle cx="110" cy="855" r="32" fill="#84cc16"/>
      <text x="110" y="865" fill="#000000" font-size="30" font-weight="bold" text-anchor="middle">✓</text>
      <text x="170" y="845" fill="#ffffff" font-size="24" font-weight="800">Health Connect Connected</text>
      <text x="170" y="880" fill="#94a3b8" font-size="18">Continuous biometric sync with Galaxy Watch & Pixel Watch.</text>
    </svg>
  `),

  // Screen 4: Benefit - Recovery & Readiness Score
  fit2_benefit: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1600" viewBox="0 0 800 1600">
      <rect width="800" height="1600" fill="#0b0f19"/>
      <text x="60" y="70" fill="#ffffff" font-size="28" font-weight="700">07:24</text>

      <rect x="50" y="130" width="700" height="380" rx="36" fill="#131c2e" stroke="#84cc16" stroke-width="2"/>
      <text x="90" y="200" fill="#94a3b8" font-size="22" font-weight="700">DAILY ATHLETIC READINESS</text>
      <text x="90" y="320" fill="#84cc16" font-size="100" font-weight="900">94%</text>
      <text x="90" y="380" fill="#ffffff" font-size="32" font-weight="800">Prime Condition</text>
      <text x="90" y="430" fill="#94a3b8" font-size="20">HRV Baseline: 82ms (+12ms above 30d average)</text>

      <!-- Social Proof Trophy -->
      <rect x="50" y="550" width="700" height="160" rx="28" fill="#1e293b"/>
      <text x="110" y="635" font-size="54" text-anchor="middle">🏆</text>
      <text x="170" y="615" fill="#ffffff" font-size="24" font-weight="800">Top Rated Fitness App 2026</text>
      <text x="170" y="650" fill="#84cc16" font-size="20" font-weight="700">Google Play Best for Wearables • 4.9 ★★★★★</text>
    </svg>
  `),

  // =========================================================================
  // 3. TEMPLATE 3: PHOTOGRAPHY-FIRST TRAVEL (Nomad Offline Topo GPS)
  // Alpine summit vectors, topographic contour overlays, frosted glass HUDs
  // =========================================================================

  // Backdrop 1: Alpine Sunrise Summit Photo Vector
  travel3_photo1: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1920" viewBox="0 0 1080 1920">
      <defs>
        <linearGradient id="skySunrise" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0f172a"/>
          <stop offset="30%" stop-color="#1e293b"/>
          <stop offset="60%" stop-color="#d97706"/>
          <stop offset="100%" stop-color="#fbbf24"/>
        </linearGradient>
        <linearGradient id="peakGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="40%" stop-color="#cbd5e1"/>
          <stop offset="100%" stop-color="#1e293b"/>
        </linearGradient>
      </defs>
      <rect width="1080" height="1920" fill="url(#skySunrise)"/>
      <!-- Distant peaks -->
      <polygon points="0,950 240,780 480,920 800,680 1080,880 1080,1920 0,1920" fill="#334155" opacity="0.7"/>
      <!-- Snow-capped summit foreground -->
      <polygon points="0,1100 320,720 540,1020 780,660 1080,940 1080,1920 0,1920" fill="url(#peakGrad)"/>
      <polygon points="320,720 280,820 380,840" fill="#ffffff"/>
      <polygon points="780,660 720,780 840,810" fill="#ffffff"/>
      <rect y="1300" width="1080" height="620" fill="#0f172a" opacity="0.85"/>
    </svg>
  `),

  // Screen 1: Hero Phone - Topo Trail HUD
  travel3_hero: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1600" viewBox="0 0 800 1600">
      <rect width="800" height="1600" fill="#0f1f2e"/>
      <text x="60" y="70" fill="#ffffff" font-size="28" font-weight="700">11:42</text>
      <!-- Topo map contour lines -->
      <path d="M 0 350 Q 200 280 450 420 T 800 340" fill="none" stroke="#1d456b" stroke-width="3"/>
      <path d="M 0 520 Q 300 480 520 600 T 800 520" fill="none" stroke="#1d456b" stroke-width="3"/>
      <path d="M 0 700 Q 250 640 480 780 T 800 680" fill="none" stroke="#1d456b" stroke-width="3"/>

      <!-- Glowing Trail Path -->
      <path d="M 100 820 L 260 680 L 420 740 L 580 460 L 680 340" fill="none" stroke="#38bdf8" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="680" cy="340" r="28" fill="#f43f5e"/>
      <circle cx="680" cy="340" r="12" fill="#ffffff"/>

      <!-- Waypoint Card HUD -->
      <rect x="40" y="140" width="720" height="180" rx="32" fill="rgba(15, 35, 55, 0.92)" stroke="#38bdf8" stroke-width="2"/>
      <text x="80" y="205" fill="#38bdf8" font-size="38" font-weight="900">Alpine Peak Trail</text>
      <text x="80" y="250" fill="#ffffff" font-size="24">Next: Eagle Crest Pass (3.2 km, +420m)</text>
      <text x="80" y="285" fill="#94a3b8" font-size="18">GPS Status: 18 Satellites Locked • Offline Mode</text>
    </svg>
  `),

  // Screen 2: Feature - 3D Elevation & Waypoints
  travel3_feature: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1600" viewBox="0 0 800 1600">
      <rect width="800" height="1600" fill="#0c1d2e"/>
      <text x="60" y="70" fill="#ffffff" font-size="28" font-weight="700">11:42</text>
      <text x="60" y="140" fill="#ffffff" font-size="38" font-weight="900">Elevation Profile</text>

      <!-- Profile Curve -->
      <rect x="40" y="180" width="720" height="360" rx="28" fill="#132c45" stroke="#1e4d7a" stroke-width="2"/>
      <text x="80" y="240" fill="#38bdf8" font-size="22" font-weight="bold">TOTAL ASCENT</text>
      <text x="80" y="310" fill="#ffffff" font-size="64" font-weight="900">+1,420 m</text>
      <text x="680" y="310" fill="#94a3b8" font-size="24" text-anchor="end">Peak: 3,240 m</text>

      <path d="M 80 480 Q 220 450 340 380 T 540 340 T 700 280" fill="none" stroke="#38bdf8" stroke-width="6" stroke-linecap="round"/>

      <!-- Backcountry Waypoints -->
      <text x="60" y="590" fill="#ffffff" font-size="26" font-weight="800">Shelters & Water</text>

      <rect x="40" y="625" width="720" height="110" rx="24" fill="#132c45"/>
      <circle cx="95" cy="680" r="28" fill="#38bdf8"/>
      <text x="95" y="690" font-size="26" text-anchor="middle">💧</text>
      <text x="145" y="670" fill="#ffffff" font-size="24" font-weight="700">Glacial Spring Water Source</text>
      <text x="145" y="700" fill="#94a3b8" font-size="18">Flowing fresh water • 1.4 km ahead</text>

      <rect x="40" y="755" width="720" height="110" rx="24" fill="#132c45"/>
      <circle cx="95" cy="810" r="28" fill="#f59e0b"/>
      <text x="95" y="820" font-size="26" text-anchor="middle">🛖</text>
      <text x="145" y="800" fill="#ffffff" font-size="24" font-weight="700">Monte Rosa Alpine Hut</text>
      <text x="145" y="830" fill="#94a3b8" font-size="18">Emergency wood shelter & solar beacon</text>
    </svg>
  `),

  // Screen 3: Product - Detailed Vector Topo Screen
  travel3_product: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1600" viewBox="0 0 800 1600">
      <rect width="800" height="1600" fill="#0a1926"/>
      <text x="60" y="70" fill="#ffffff" font-size="28" font-weight="700">11:42</text>

      <!-- Contour lines dense grid -->
      <path d="M 0 200 C 200 150, 400 240, 800 180" fill="none" stroke="#173854" stroke-width="2"/>
      <path d="M 0 320 C 300 260, 500 380, 800 300" fill="none" stroke="#173854" stroke-width="2"/>
      <path d="M 0 460 C 250 400, 480 520, 800 440" fill="none" stroke="#173854" stroke-width="2"/>
      <path d="M 0 600 C 200 540, 550 660, 800 580" fill="none" stroke="#173854" stroke-width="2"/>

      <!-- Summit Marker -->
      <polygon points="400,420 380,460 420,460" fill="#f43f5e"/>
      <text x="400" y="500" fill="#ffffff" font-size="22" font-weight="bold" text-anchor="middle">Pic du Midi (2,877m)</text>

      <!-- Compass Overlay -->
      <circle cx="680" cy="180" r="50" fill="rgba(19, 44, 69, 0.9)" stroke="#38bdf8" stroke-width="2"/>
      <polygon points="680,140 670,180 690,180" fill="#ef4444"/>
      <polygon points="680,220 670,180 690,180" fill="#ffffff"/>
      <text x="680" y="132" fill="#ef4444" font-size="14" font-weight="bold" text-anchor="middle">N</text>
    </svg>
  `),

  // Screen 4: Benefit - Satellite SOS Beacon
  travel3_benefit: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1600" viewBox="0 0 800 1600">
      <rect width="800" height="1600" fill="#091420"/>
      <text x="60" y="70" fill="#ffffff" font-size="28" font-weight="700">11:42</text>

      <rect x="50" y="140" width="700" height="340" rx="32" fill="#13273c" stroke="#38bdf8" stroke-width="2"/>
      <circle cx="400" cy="240" r="44" fill="#38bdf8"/>
      <text x="400" y="254" font-size="44" text-anchor="middle">🛰</text>
      <text x="400" y="335" fill="#ffffff" font-size="36" font-weight="900" text-anchor="middle">Satellite SOS Connected</text>
      <text x="400" y="380" fill="#94a3b8" font-size="20" text-anchor="middle">Direct link via Iridium & Globalstar constellations.</text>
      <text x="400" y="420" fill="#38bdf8" font-size="22" font-weight="bold" text-anchor="middle">45.8326° N, 6.8652° E • 2,740m</text>
    </svg>
  `),

  // =========================================================================
  // 4. TEMPLATE 4: FINANCE DASHBOARD (CryptoVault Web3 DEX)
  // Deep navy, emerald, gold, pro candlestick charts, swap UI
  // =========================================================================

  // Screen 1: Hero - Multi-Chain Vault Net Worth
  crypto4_hero: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1600" viewBox="0 0 800 1600">
      <rect width="800" height="1600" fill="#090b14"/>
      <text x="60" y="70" fill="#ffffff" font-size="28" font-weight="700">10:42</text>
      <text x="60" y="140" fill="#f59e0b" font-size="22" font-weight="bold">CRYPTOVAULT ANDROID DEX</text>
      <text x="60" y="220" fill="#ffffff" font-size="68" font-weight="900">$240,580.40</text>
      <text x="60" y="275" fill="#10b981" font-size="26" font-weight="bold">▲ +14.2% Today (+$29,840.10)</text>

      <!-- Asset Pills -->
      <rect x="50" y="340" width="700" height="110" rx="24" fill="#131726" stroke="#1f253d" stroke-width="2"/>
      <circle cx="105" cy="395" r="28" fill="#627eea"/>
      <text x="105" y="405" fill="#ffffff" font-size="26" font-weight="bold" text-anchor="middle">Ξ</text>
      <text x="155" y="385" fill="#ffffff" font-size="24" font-weight="700">Ethereum</text>
      <text x="155" y="415" fill="#94a3b8" font-size="18">48.2 ETH • $3,420</text>
      <text x="710" y="400" fill="#ffffff" font-size="26" font-weight="800" text-anchor="end">$164,844.00</text>

      <rect x="50" y="470" width="700" height="110" rx="24" fill="#131726" stroke="#1f253d" stroke-width="2"/>
      <circle cx="105" cy="525" r="28" fill="#14f195"/>
      <text x="105" y="535" fill="#000000" font-size="24" font-weight="bold" text-anchor="middle">◎</text>
      <text x="155" y="515" fill="#ffffff" font-size="24" font-weight="700">Solana</text>
      <text x="155" y="545" fill="#94a3b8" font-size="18">340 SOL • $178</text>
      <text x="710" y="530" fill="#ffffff" font-size="26" font-weight="800" text-anchor="end">$60,520.00</text>
    </svg>
  `),

  // Screen 2: Feature - Pro Trading Candlesticks
  crypto4_feature: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1600" viewBox="0 0 800 1600">
      <rect width="800" height="1600" fill="#090b14"/>
      <text x="60" y="70" fill="#ffffff" font-size="28" font-weight="700">10:42</text>
      <text x="60" y="140" fill="#ffffff" font-size="40" font-weight="900">ETH / USD Perpetual</text>
      <text x="60" y="190" fill="#10b981" font-size="34" font-weight="800">$3,482.40 (+4.8%)</text>

      <!-- Candlestick Graphic Box -->
      <rect x="40" y="230" width="720" height="420" rx="28" fill="#111524" stroke="#1e253d" stroke-width="2"/>
      <!-- Grid lines -->
      <line x1="40" y1="320" x2="760" y2="320" stroke="#1c2236" stroke-width="1.5"/>
      <line x1="40" y1="420" x2="760" y2="420" stroke="#1c2236" stroke-width="1.5"/>
      <line x1="40" y1="520" x2="760" y2="520" stroke="#1c2236" stroke-width="1.5"/>

      <!-- Green/Red candles -->
      <line x1="120" y1="380" x2="120" y2="500" stroke="#10b981" stroke-width="3"/>
      <rect x="105" y="400" width="30" height="70" fill="#10b981"/>

      <line x1="200" y1="340" x2="200" y2="480" stroke="#ef4444" stroke-width="3"/>
      <rect x="185" y="370" width="30" height="80" fill="#ef4444"/>

      <line x1="280" y1="300" x2="280" y2="440" stroke="#10b981" stroke-width="3"/>
      <rect x="265" y="320" width="30" height="90" fill="#10b981"/>

      <line x1="360" y1="280" x2="360" y2="400" stroke="#10b981" stroke-width="3"/>
      <rect x="345" y="290" width="30" height="80" fill="#10b981"/>

      <line x1="440" y1="260" x2="440" y2="380" stroke="#ef4444" stroke-width="3"/>
      <rect x="425" y="280" width="30" height="60" fill="#ef4444"/>

      <line x1="520" y1="240" x2="520" y2="340" stroke="#10b981" stroke-width="3"/>
      <rect x="505" y="250" width="30" height="70" fill="#10b981"/>

      <line x1="600" y1="220" x2="600" y2="320" stroke="#10b981" stroke-width="3"/>
      <rect x="585" y="230" width="30" height="70" fill="#10b981"/>

      <text x="680" y="270" fill="#10b981" font-size="20" font-weight="bold">RSI: 64.2</text>
      <text x="680" y="300" fill="#94a3b8" font-size="20">EMA 20 > 50</text>
    </svg>
  `),

  // Screen 3: Product - Instant Multi-Chain Swap
  crypto4_product: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1600" viewBox="0 0 800 1600">
      <rect width="800" height="1600" fill="#090b14"/>
      <text x="60" y="70" fill="#ffffff" font-size="28" font-weight="700">10:42</text>
      <text x="60" y="140" fill="#ffffff" font-size="38" font-weight="900">Multi-Chain Swap</text>

      <rect x="40" y="190" width="720" height="420" rx="32" fill="#131726" stroke="#232a45" stroke-width="2"/>
      <text x="80" y="250" fill="#94a3b8" font-size="20">YOU PAY</text>
      <text x="80" y="320" fill="#ffffff" font-size="52" font-weight="900">4.50 ETH</text>
      <text x="680" y="320" fill="#627eea" font-size="26" font-weight="bold" text-anchor="end">Ethereum Mainnet</text>

      <line x1="80" y1="370" x2="680" y2="370" stroke="#232a45" stroke-width="2"/>

      <text x="80" y="430" fill="#94a3b8" font-size="20">YOU RECEIVE (ESTIMATED)</text>
      <text x="80" y="500" fill="#10b981" font-size="52" font-weight="900">15,670 USDC</text>
      <text x="680" y="500" fill="#2775ca" font-size="26" font-weight="bold" text-anchor="end">Solana Route</text>

      <rect x="80" y="540" width="600" height="74" rx="24" fill="#f59e0b"/>
      <text x="380" y="586" fill="#000000" font-size="24" font-weight="900" text-anchor="middle">BIOMETRIC INSTANT SWAP</text>
    </svg>
  `),

  // Screen 4: Benefit - Cold Storage Enclave Security
  crypto4_benefit: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1600" viewBox="0 0 800 1600">
      <rect width="800" height="1600" fill="#090b14"/>
      <text x="60" y="70" fill="#ffffff" font-size="28" font-weight="700">10:42</text>

      <rect x="50" y="140" width="700" height="360" rx="36" fill="#131726" stroke="#10b981" stroke-width="2"/>
      <text x="90" y="210" fill="#10b981" font-size="22" font-weight="bold">INSTITUTIONAL GRADE SECURITY</text>
      <text x="90" y="290" fill="#ffffff" font-size="44" font-weight="900">Passkey Enclave Active</text>
      <text x="90" y="340" fill="#94a3b8" font-size="22">Your private keys never leave the Android Titan M2 security chip.</text>
      <rect x="90" y="380" width="280" height="50" rx="25" fill="#10b981"/>
      <text x="230" y="412" fill="#000000" font-size="20" font-weight="900" text-anchor="middle">HARDWARE BACKED</text>
    </svg>
  `),

  // =========================================================================
  // 5. TEMPLATE 5: 3D PRODUCT SHOWCASE (HyperDrive Connected EV HUD)
  // EV telemetry, 3D vehicle rendering, battery charge, smart climate
  // =========================================================================

  // Screen 1: Hero - Battery Range & Vehicle Cockpit
  ev5_hero: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1600" viewBox="0 0 800 1600">
      <defs>
        <linearGradient id="evGlow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#38bdf8"/>
          <stop offset="100%" stop-color="#0284c7"/>
        </linearGradient>
      </defs>
      <rect width="800" height="1600" fill="#0b0f17"/>
      <text x="60" y="70" fill="#ffffff" font-size="28" font-weight="700">14:20</text>
      <text x="60" y="140" fill="#38bdf8" font-size="22" font-weight="bold">HYPERDRIVE EV PRO</text>
      <text x="60" y="200" fill="#ffffff" font-size="48" font-weight="900">CyberCoupe GT</text>

      <!-- Battery Arc / Dial Card -->
      <rect x="50" y="240" width="700" height="320" rx="32" fill="#131c2e" stroke="#1e293b" stroke-width="2"/>
      <text x="90" y="305" fill="#94a3b8" font-size="22">ESTIMATED BATTERY RANGE</text>
      <text x="90" y="400" fill="#38bdf8" font-size="96" font-weight="900">384</text>
      <text x="320" y="375" fill="#ffffff" font-size="34" font-weight="800">MILES</text>
      <text x="90" y="460" fill="#10b981" font-size="24" font-weight="700">88% Charged • 250 kW Supercharging</text>

      <!-- Vehicle Silhouette Vector -->
      <path d="M 120 500 Q 240 440 400 440 Q 560 440 680 500 L 720 540 L 80 540 Z" fill="rgba(56, 189, 248, 0.15)"/>
    </svg>
  `),

  // Screen 2: Feature - Cabin Climate Control
  ev5_feature: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1600" viewBox="0 0 800 1600">
      <rect width="800" height="1600" fill="#0b0f17"/>
      <text x="60" y="70" fill="#ffffff" font-size="28" font-weight="700">14:20</text>
      <text x="60" y="140" fill="#ffffff" font-size="38" font-weight="900">Remote Cabin Pre-Heat</text>

      <rect x="50" y="190" width="700" height="340" rx="32" fill="#131c2e" stroke="#1e293b" stroke-width="2"/>
      <text x="90" y="250" fill="#94a3b8" font-size="22">TARGET CABIN TEMPERATURE</text>
      <text x="90" y="370" fill="#f59e0b" font-size="100" font-weight="900">70°</text>
      <text x="270" y="330" fill="#ffffff" font-size="36" font-weight="800">FAHRENHEIT</text>
      <text x="90" y="440" fill="#10b981" font-size="22" font-weight="700">Dual Heated Seats & Defrost Active</text>
    </svg>
  `),

  // Screen 3: Product - Supercharger Route Map
  ev5_product: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1600" viewBox="0 0 800 1600">
      <rect width="800" height="1600" fill="#0b0f17"/>
      <text x="60" y="70" fill="#ffffff" font-size="28" font-weight="700">14:20</text>
      <text x="60" y="140" fill="#ffffff" font-size="38" font-weight="900">Supercharger Route</text>

      <rect x="40" y="190" width="720" height="380" rx="32" fill="#131c2e" stroke="#1e293b" stroke-width="2"/>
      <text x="80" y="250" fill="#38bdf8" font-size="24" font-weight="bold">NEXT CHARGER: 64 MILES</text>
      <text x="80" y="310" fill="#ffffff" font-size="36" font-weight="900">Kettleman City Megastation</text>
      <text x="80" y="360" fill="#10b981" font-size="24">18 of 24 Stalls Available • 350 kW</text>
      <text x="80" y="420" fill="#94a3b8" font-size="20">Battery pre-conditioning for fastest charge.</text>
    </svg>
  `),

  // Screen 4: Benefit - Digital Key & Valet Summon
  ev5_benefit: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1600" viewBox="0 0 800 1600">
      <rect width="800" height="1600" fill="#0b0f17"/>
      <text x="60" y="70" fill="#ffffff" font-size="28" font-weight="700">14:20</text>
      <rect x="50" y="140" width="700" height="320" rx="32" fill="#131c2e" stroke="#38bdf8" stroke-width="2"/>
      <circle cx="400" cy="230" r="40" fill="#38bdf8"/>
      <text x="400" y="244" font-size="38" text-anchor="middle">🔑</text>
      <text x="400" y="325" fill="#ffffff" font-size="36" font-weight="900" text-anchor="middle">Phone Key Proximity</text>
      <text x="400" y="375" fill="#10b981" font-size="22" font-weight="bold" text-anchor="middle">Vehicle Unlocked • Ready to Drive</text>
    </svg>
  `),

  // =========================================================================
  // 6. TEMPLATE 6: BRIGHT PLAYFUL LIFESTYLE (QuickBite Express Delivery)
  // Warm peach, coral, sunny amber, artisanal food delivery, live courier
  // =========================================================================

  // Screen 1: Hero - Courier Map & Arrival Countdown
  food6_hero: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1600" viewBox="0 0 800 1600">
      <rect width="800" height="1600" fill="#fff7ed"/>
      <text x="60" y="70" fill="#431407" font-size="28" font-weight="bold">12:30</text>
      <text x="60" y="140" fill="#ea580c" font-size="22" font-weight="bold">QUICKBITE EXPRESS</text>
      <text x="60" y="210" fill="#431407" font-size="52" font-weight="900">Arriving in 14 min</text>

      <!-- Live Order Card -->
      <rect x="40" y="260" width="720" height="420" rx="36" fill="#ffffff" stroke="#fed7aa" stroke-width="2"/>
      <circle cx="100" cy="330" r="30" fill="#ffedd5"/>
      <text x="100" y="342" font-size="30" text-anchor="middle">🛵</text>
      <text x="150" y="330" fill="#431407" font-size="26" font-weight="bold">Marco is 3 blocks away</text>
      <text x="150" y="360" fill="#ea580c" font-size="20">Yamaha NMAX • Order #8841</text>

      <!-- Progress Track -->
      <line x1="80" y1="420" x2="680" y2="420" stroke="#fed7aa" stroke-width="8" stroke-linecap="round"/>
      <line x1="80" y1="420" x2="520" y2="420" stroke="#ea580c" stroke-width="8" stroke-linecap="round"/>

      <text x="80" y="490" fill="#78350f" font-size="24" font-weight="bold">2x Artisanal Wagyu Smash Burgers</text>
      <text x="80" y="530" fill="#9a3412" font-size="20">1x Truffle Parmesan Fries • 1x Craft Soda</text>
    </svg>
  `),

  // Screen 2: Feature - Curated Chef Menus
  food6_feature: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1600" viewBox="0 0 800 1600">
      <rect width="800" height="1600" fill="#fff7ed"/>
      <text x="60" y="70" fill="#431407" font-size="28" font-weight="bold">12:30</text>
      <text x="60" y="140" fill="#431407" font-size="38" font-weight="900">Local Chef Secret Menus</text>

      <rect x="40" y="190" width="720" height="220" rx="28" fill="#ffffff" stroke="#fed7aa" stroke-width="2"/>
      <circle cx="110" cy="280" r="44" fill="#ffedd5"/>
      <text x="110" y="295" font-size="44" text-anchor="middle">🍔</text>
      <text x="180" y="260" fill="#431407" font-size="28" font-weight="bold">Double Truffle Smash</text>
      <text x="180" y="295" fill="#78350f" font-size="20">Aged cheddar, caramelized onions, brioche</text>
      <text x="180" y="340" fill="#ea580c" font-size="26" font-weight="900">$18.50 • 4.9 ★ (1,240)</text>
    </svg>
  `),

  // Screen 3: Product - 1-Tap Checkout Customization
  food6_product: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1600" viewBox="0 0 800 1600">
      <rect width="800" height="1600" fill="#fff7ed"/>
      <text x="60" y="70" fill="#431407" font-size="28" font-weight="bold">12:30</text>
      <text x="60" y="140" fill="#431407" font-size="38" font-weight="900">Order Summary</text>

      <rect x="40" y="190" width="720" height="340" rx="28" fill="#ffffff" stroke="#fed7aa" stroke-width="2"/>
      <text x="80" y="250" fill="#431407" font-size="24" font-weight="bold">Subtotal</text>
      <text x="680" y="250" fill="#431407" font-size="24" font-weight="bold" text-anchor="end">$34.50</text>
      <text x="80" y="300" fill="#16a34a" font-size="22" font-weight="bold">Express Delivery</text>
      <text x="680" y="300" fill="#16a34a" font-size="22" font-weight="bold" text-anchor="end">FREE</text>
      <line x1="80" y1="340" x2="680" y2="340" stroke="#f1f5f9" stroke-width="2"/>
      <text x="80" y="400" fill="#431407" font-size="32" font-weight="900">Total Charged</text>
      <text x="680" y="400" fill="#ea580c" font-size="36" font-weight="900" text-anchor="end">$34.50</text>
    </svg>
  `),

  // Screen 4: Benefit - VIP Zero Fee Pass
  food6_benefit: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1600" viewBox="0 0 800 1600">
      <rect width="800" height="1600" fill="#fff7ed"/>
      <text x="60" y="70" fill="#431407" font-size="28" font-weight="bold">12:30</text>
      <rect x="50" y="140" width="700" height="320" rx="36" fill="#ea580c"/>
      <text x="400" y="230" fill="#ffffff" font-size="44" font-weight="900" text-anchor="middle">QUICKBITE VIP PASS</text>
      <text x="400" y="290" fill="#fed7aa" font-size="26" text-anchor="middle">$0 Delivery Fees On All Orders</text>
      <text x="400" y="350" fill="#ffffff" font-size="22" text-anchor="middle">50,000,000+ Hot Meals Delivered In 2026</text>
    </svg>
  `),

  // =========================================================================
  // 7. TEMPLATE 7: DARK CINEMATIC AI (Nova AI Gemini Copilot)
  // Luminous neural particles, code synthesis, multimodal voice orb
  // =========================================================================

  // Screen 1: Hero - Luminous Voice Orb & Conversational Stream
  ai7_hero: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1600" viewBox="0 0 800 1600">
      <defs>
        <radialGradient id="aiOrb" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#38bdf8"/>
          <stop offset="60%" stop-color="#818cf8"/>
          <stop offset="100%" stop-color="#0f172a" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="800" height="1600" fill="#07090e"/>
      <text x="60" y="70" fill="#ffffff" font-size="28" font-weight="700">09:41</text>
      <text x="60" y="140" fill="#38bdf8" font-size="22" font-weight="bold">NOVA GEMINI COPILOT</text>

      <!-- Glowing AI Orb -->
      <circle cx="400" cy="380" r="160" fill="url(#aiOrb)"/>
      <circle cx="400" cy="380" r="70" fill="#ffffff" opacity="0.9"/>

      <text x="400" y="580" fill="#ffffff" font-size="40" font-weight="900" text-anchor="middle">Listening...</text>
      <text x="400" y="630" fill="#94a3b8" font-size="22" text-anchor="middle">"Synthesize architecture for low-latency streaming"</text>

      <!-- Real-time Response Box -->
      <rect x="50" y="700" width="700" height="240" rx="28" fill="#111625" stroke="#1f283f" stroke-width="2"/>
      <text x="80" y="760" fill="#38bdf8" font-size="20" font-weight="bold">GEMINI 2.0 ULTRA REASONING</text>
      <text x="80" y="810" fill="#ffffff" font-size="22">I have outlined an event-driven architecture with WebSockets,</text>
      <text x="80" y="850" fill="#ffffff" font-size="22">Redis pub/sub channels, and sub-15ms edge caching.</text>
    </svg>
  `),

  // Screen 2: Feature - Autonomous Multi-Step Reasoning
  ai7_feature: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1600" viewBox="0 0 800 1600">
      <rect width="800" height="1600" fill="#07090e"/>
      <text x="60" y="70" fill="#ffffff" font-size="28" font-weight="700">09:41</text>
      <text x="60" y="140" fill="#ffffff" font-size="38" font-weight="900">Autonomous Reasoning Pipeline</text>

      <rect x="50" y="200" width="700" height="110" rx="24" fill="#111625" stroke="#10b981" stroke-width="2"/>
      <circle cx="100" cy="255" r="18" fill="#10b981"/>
      <text x="140" y="262" fill="#ffffff" font-size="22" font-weight="bold">Step 1: AST Tokenized & Ingested</text>

      <rect x="50" y="330" width="700" height="110" rx="24" fill="#111625" stroke="#38bdf8" stroke-width="2"/>
      <circle cx="100" cy="385" r="18" fill="#38bdf8"/>
      <text x="140" y="392" fill="#ffffff" font-size="22" font-weight="bold">Step 2: Vector Semantic Search & Context</text>

      <rect x="50" y="460" width="700" height="110" rx="24" fill="#111625" stroke="#a855f7" stroke-width="2"/>
      <circle cx="100" cy="515" r="18" fill="#a855f7"/>
      <text x="140" y="522" fill="#ffffff" font-size="22" font-weight="bold">Step 3: Synthesis & Test Generation</text>
    </svg>
  `),

  // Screen 3: Product - Code Generation Terminal
  ai7_product: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1600" viewBox="0 0 800 1600">
      <rect width="800" height="1600" fill="#07090e"/>
      <text x="60" y="70" fill="#ffffff" font-size="28" font-weight="700">09:41</text>

      <!-- Terminal Window -->
      <rect x="40" y="140" width="720" height="460" rx="28" fill="#0f1422" stroke="#222b42" stroke-width="2"/>
      <circle cx="80" cy="180" r="8" fill="#ef4444"/>
      <circle cx="110" cy="180" r="8" fill="#f59e0b"/>
      <circle cx="140" cy="180" r="8" fill="#10b981"/>
      <text x="400" y="185" fill="#64748b" font-size="18" text-anchor="middle">stream-processor.ts</text>

      <text x="70" y="240" fill="#38bdf8" font-size="20" font-family="monospace">export async function processEvent(req: Request) {</text>
      <text x="90" y="280" fill="#a855f7" font-size="20" font-family="monospace">  const { payload } = await req.json();</text>
      <text x="90" y="320" fill="#10b981" font-size="20" font-family="monospace">  return new Response(JSON.stringify({</text>
      <text x="110" y="360" fill="#f59e0b" font-size="20" font-family="monospace">    status: "ok",</text>
      <text x="110" y="400" fill="#ffffff" font-size="20" font-family="monospace">    latencyMs: 12.4</text>
      <text x="90" y="440" fill="#10b981" font-size="20" font-family="monospace">  }));</text>
      <text x="70" y="480" fill="#38bdf8" font-size="20" font-family="monospace">}</text>
    </svg>
  `),

  // Screen 4: Benefit - On-Device Privacy Architecture
  ai7_benefit: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1600" viewBox="0 0 800 1600">
      <rect width="800" height="1600" fill="#07090e"/>
      <text x="60" y="70" fill="#ffffff" font-size="28" font-weight="700">09:41</text>
      <rect x="50" y="140" width="700" height="320" rx="36" fill="#111625" stroke="#38bdf8" stroke-width="2"/>
      <text x="90" y="220" fill="#38bdf8" font-size="22" font-weight="bold">ZERO DATA RETENTION</text>
      <text x="90" y="300" fill="#ffffff" font-size="44" font-weight="900">100% On-Device Neural Chip</text>
      <text x="90" y="350" fill="#94a3b8" font-size="22">Your prompts and proprietary code never train foundation models.</text>
    </svg>
  `),

  // =========================================================================
  // 8. TEMPLATE 8: SWISS GRID (SoundWave Hi-Fi Audiophile)
  // Grid architecture, numbered sections 01/02, parametric EQ, FLAC lossless
  // =========================================================================

  // Screen 1: Hero - Studio Player & Vinyl Groove
  audio8_hero: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1600" viewBox="0 0 800 1600">
      <rect width="800" height="1600" fill="#0f1117"/>
      <text x="60" y="70" fill="#ffffff" font-size="28" font-weight="700">22:04</text>
      <text x="60" y="130" fill="#ff3e00" font-size="20" font-family="monospace" font-weight="bold">01 // PURITY • MASTER FLAC</text>

      <!-- Vinyl Groove Centerpiece -->
      <circle cx="400" cy="420" r="240" fill="#1a1e29" stroke="#334155" stroke-width="2"/>
      <circle cx="400" cy="420" r="160" fill="#12151e"/>
      <circle cx="400" cy="420" r="70" fill="#ff3e00"/>
      <circle cx="400" cy="420" r="20" fill="#ffffff"/>

      <text x="400" y="740" fill="#ffffff" font-size="44" font-weight="900" text-anchor="middle">Aetheria Opus IV</text>
      <text x="400" y="785" fill="#94a3b8" font-size="24" text-anchor="middle">24-bit / 192kHz Lossless Studio Master</text>

      <!-- Scrub Bar -->
      <rect x="80" y="850" width="640" height="8" rx="4" fill="#1e293b"/>
      <rect x="80" y="850" width="420" height="8" rx="4" fill="#ff3e00"/>
      <circle cx="500" cy="854" r="12" fill="#ffffff"/>
    </svg>
  `),

  // Screen 2: Feature - 10-Band Parametric EQ
  audio8_feature: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1600" viewBox="0 0 800 1600">
      <rect width="800" height="1600" fill="#0f1117"/>
      <text x="60" y="70" fill="#ffffff" font-size="28" font-weight="700">22:04</text>
      <text x="60" y="130" fill="#ff3e00" font-size="20" font-family="monospace" font-weight="bold">02 // CONTROL • PARAMETRIC EQ</text>
      <text x="60" y="180" fill="#ffffff" font-size="38" font-weight="900">10-Band Studio Equalizer</text>

      <!-- EQ Sliders Grid -->
      <rect x="40" y="230" width="720" height="420" rx="28" fill="#181b24" stroke="#2a3040" stroke-width="2"/>
      <line x1="60" y1="440" x2="740" y2="440" stroke="#334155" stroke-width="1.5"/>

      <!-- Sliders -->
      <line x1="120" y1="300" x2="120" y2="580" stroke="#334155" stroke-width="4"/>
      <circle cx="120" cy="380" r="14" fill="#ff3e00"/>
      <text x="120" y="615" fill="#94a3b8" font-size="18" text-anchor="middle">32Hz</text>

      <line x1="240" y1="300" x2="240" y2="580" stroke="#334155" stroke-width="4"/>
      <circle cx="240" cy="420" r="14" fill="#ff3e00"/>
      <text x="240" y="615" fill="#94a3b8" font-size="18" text-anchor="middle">250Hz</text>

      <line x1="360" y1="300" x2="360" y2="580" stroke="#334155" stroke-width="4"/>
      <circle cx="360" cy="360" r="14" fill="#ff3e00"/>
      <text x="360" y="615" fill="#94a3b8" font-size="18" text-anchor="middle">1kHz</text>

      <line x1="480" y1="300" x2="480" y2="580" stroke="#334155" stroke-width="4"/>
      <circle cx="480" cy="460" r="14" fill="#ff3e00"/>
      <text x="480" y="615" fill="#94a3b8" font-size="18" text-anchor="middle">4kHz</text>

      <line x1="600" y1="300" x2="600" y2="580" stroke="#334155" stroke-width="4"/>
      <circle cx="600" cy="340" r="14" fill="#ff3e00"/>
      <text x="600" y="615" fill="#94a3b8" font-size="18" text-anchor="middle">16kHz</text>
    </svg>
  `),

  // Screen 3: Product - Bit-Perfect DAC Telemetry
  audio8_product: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1600" viewBox="0 0 800 1600">
      <rect width="800" height="1600" fill="#0f1117"/>
      <text x="60" y="70" fill="#ffffff" font-size="28" font-weight="700">22:04</text>
      <text x="60" y="130" fill="#ff3e00" font-size="20" font-family="monospace" font-weight="bold">03 // ARCHITECTURE • DAC STREAM</text>

      <rect x="50" y="190" width="700" height="280" rx="28" fill="#181b24" stroke="#2a3040" stroke-width="2"/>
      <text x="90" y="250" fill="#94a3b8" font-size="22">OUTPUT DEVICE</text>
      <text x="90" y="310" fill="#ffffff" font-size="36" font-weight="bold">AudioQuest DragonFly Cobalt</text>
      <text x="90" y="370" fill="#10b981" font-size="24" font-weight="bold">Bit-Perfect USB Bypass • 192kHz / 24-bit</text>
    </svg>
  `),

  // Screen 4: Benefit - Technical Audio Spec Sheet
  audio8_benefit: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1600" viewBox="0 0 800 1600">
      <rect width="800" height="1600" fill="#0f1117"/>
      <text x="60" y="70" fill="#ffffff" font-size="28" font-weight="700">22:04</text>
      <rect x="50" y="140" width="700" height="320" rx="32" fill="#181b24" stroke="#ff3e00" stroke-width="2"/>
      <text x="90" y="220" fill="#ff3e00" font-size="22" font-family="monospace" font-weight="bold">THD+N &lt; 0.0001%</text>
      <text x="90" y="300" fill="#ffffff" font-size="44" font-weight="900">Zero Android Mixer Jitter</text>
      <text x="90" y="360" fill="#94a3b8" font-size="22">Direct low-level ALSA audio pipeline stream.</text>
    </svg>
  `),

  // =========================================================================
  // 9. TEMPLATE 9: ORGANIC WELLNESS (ZenFlow Deep Sleep & Pacer)
  // Calming sage greens, linen tones, 4-7-8 breathing sphere, hypnogram
  // =========================================================================

  // Screen 1: Hero - Circadian Sleep Dial & Score
  wellness9_hero: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1600" viewBox="0 0 800 1600">
      <defs>
        <linearGradient id="sageMist" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#1e2920"/>
          <stop offset="100%" stop-color="#2d3d30"/>
        </linearGradient>
      </defs>
      <rect width="800" height="1600" fill="url(#sageMist)"/>
      <text x="60" y="70" fill="#f4efe6" font-size="28" font-weight="600">22:45</text>
      <text x="60" y="140" fill="#a7b8a9" font-size="20" letter-spacing="2">EVENING WIND-DOWN</text>
      <text x="60" y="195" fill="#f4efe6" font-size="44" font-weight="700">Restful Sleep Flow</text>

      <!-- Sleep Score Card -->
      <rect x="50" y="240" width="700" height="340" rx="32" fill="rgba(255, 255, 255, 0.08)" stroke="rgba(255, 255, 255, 0.15)" stroke-width="2"/>
      <text x="90" y="305" fill="#a7b8a9" font-size="22">OPTIMAL RECOVERY SCORE</text>
      <text x="90" y="410" fill="#f4efe6" font-size="96" font-weight="800">92%</text>
      <text x="90" y="470" fill="#86efac" font-size="22">Deep REM Architecture • 8h 14m Target</text>
    </svg>
  `),

  // Screen 2: Feature - 4-7-8 Breathing Sphere
  wellness9_feature: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1600" viewBox="0 0 800 1600">
      <rect width="800" height="1600" fill="#1b241c"/>
      <text x="60" y="70" fill="#f4efe6" font-size="28" font-weight="600">22:45</text>
      <text x="400" y="140" fill="#f4efe6" font-size="36" font-weight="700" text-anchor="middle">4-7-8 Breathing Pacer</text>

      <!-- Expanding sphere -->
      <circle cx="400" cy="420" r="180" fill="rgba(167, 243, 208, 0.15)"/>
      <circle cx="400" cy="420" r="120" fill="rgba(167, 243, 208, 0.35)"/>
      <circle cx="400" cy="420" r="60" fill="#a7f3d0"/>

      <text x="400" y="680" fill="#f4efe6" font-size="44" font-weight="800" text-anchor="middle">Breathe In...</text>
      <text x="400" y="730" fill="#a7b8a9" font-size="24" text-anchor="middle">4 seconds • Gently fill lungs</text>
    </svg>
  `),

  // Screen 3: Product - Clinical Sleep Hypnogram
  wellness9_product: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1600" viewBox="0 0 800 1600">
      <rect width="800" height="1600" fill="#1b241c"/>
      <text x="60" y="70" fill="#f4efe6" font-size="28" font-weight="600">22:45</text>
      <text x="60" y="140" fill="#f4efe6" font-size="38" font-weight="700">Sleep Stages Breakdown</text>

      <rect x="50" y="190" width="700" height="320" rx="28" fill="rgba(255, 255, 255, 0.08)"/>
      <text x="90" y="250" fill="#86efac" font-size="24" font-weight="bold">Deep Restorative Sleep</text>
      <text x="680" y="250" fill="#f4efe6" font-size="24" text-anchor="end">2h 15m (28%)</text>

      <text x="90" y="320" fill="#93c5fd" font-size="24" font-weight="bold">REM Cognitive Sleep</text>
      <text x="680" y="320" fill="#f4efe6" font-size="24" text-anchor="end">1h 50m (23%)</text>

      <text x="90" y="390" fill="#cbd5e1" font-size="24" font-weight="bold">Light Sleep</text>
      <text x="680" y="390" fill="#f4efe6" font-size="24" text-anchor="end">3h 40m (49%)</text>
    </svg>
  `),

  // Screen 4: Benefit - Ambient Soundscape Mixer
  wellness9_benefit: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1600" viewBox="0 0 800 1600">
      <rect width="800" height="1600" fill="#1b241c"/>
      <text x="60" y="70" fill="#f4efe6" font-size="28" font-weight="600">22:45</text>
      <rect x="50" y="140" width="700" height="300" rx="32" fill="rgba(255, 255, 255, 0.08)"/>
      <text x="90" y="210" fill="#a7b8a9" font-size="22">SOUNDSCAPE ACTIVE</text>
      <text x="90" y="270" fill="#f4efe6" font-size="36" font-weight="700">Nordic Pine Rain & Delta Waves</text>
      <text x="90" y="330" fill="#86efac" font-size="22">Gentle smart wake-up alarm set for 06:45</text>
    </svg>
  `),

  // =========================================================================
  // 10. TEMPLATE 10: MAGAZINE COLLAGE (Lumina Matter Smart Home)
  // Editorial interior spreads, Matter IoT tile grid, lighting temperatures
  // =========================================================================

  // Screen 1: Hero - Connected Sanctuary Cover
  home10_hero: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1600" viewBox="0 0 800 1600">
      <rect width="800" height="1600" fill="#191c24"/>
      <text x="60" y="70" fill="#ffffff" font-size="28" font-weight="700">19:15</text>
      <text x="60" y="140" fill="#94a3b8" font-size="20" letter-spacing="3">MATTER 1.3 CERTIFIED</text>
      <text x="60" y="200" fill="#ffffff" font-size="46" font-weight="800">The Connected Sanctuary</text>

      <!-- Living Room Atmosphere Tile -->
      <rect x="50" y="250" width="700" height="340" rx="32" fill="#232734" stroke="#333a4d" stroke-width="2"/>
      <text x="90" y="315" fill="#f59e0b" font-size="22" font-weight="bold">SCENE ACTIVE</text>
      <text x="90" y="380" fill="#ffffff" font-size="52" font-weight="900">Sunset Cinema</text>
      <text x="90" y="440" fill="#94a3b8" font-size="22">Warm Amber 2400K • Blinds Closed • 71°F</text>
    </svg>
  `),

  // Screen 2: Feature - Kelvin Lighting Wheel
  home10_feature: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1600" viewBox="0 0 800 1600">
      <rect width="800" height="1600" fill="#191c24"/>
      <text x="60" y="70" fill="#ffffff" font-size="28" font-weight="700">19:15</text>
      <text x="60" y="140" fill="#ffffff" font-size="38" font-weight="800">Circadian Lighting</text>

      <!-- Color temp arc -->
      <circle cx="400" cy="400" r="180" fill="none" stroke="#f59e0b" stroke-width="24"/>
      <circle cx="400" cy="400" r="150" fill="#232734"/>
      <text x="400" y="390" fill="#ffffff" font-size="64" font-weight="900" text-anchor="middle">2700K</text>
      <text x="400" y="440" fill="#f59e0b" font-size="22" font-weight="bold" text-anchor="middle">WARM CANDLELIGHT</text>
    </svg>
  `),

  // Screen 3: Product - Whole Home Device Grid
  home10_product: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1600" viewBox="0 0 800 1600">
      <rect width="800" height="1600" fill="#191c24"/>
      <text x="60" y="70" fill="#ffffff" font-size="28" font-weight="700">19:15</text>
      <text x="60" y="140" fill="#ffffff" font-size="38" font-weight="800">48 Devices Connected</text>

      <rect x="40" y="190" width="345" height="180" rx="24" fill="#232734"/>
      <text x="70" y="250" fill="#ffffff" font-size="26" font-weight="bold">Living Room</text>
      <text x="70" y="290" fill="#f59e0b" font-size="20">8 Lights • On</text>

      <rect x="415" y="190" width="345" height="180" rx="24" fill="#232734"/>
      <text x="445" y="250" fill="#ffffff" font-size="26" font-weight="bold">Master Suite</text>
      <text x="445" y="290" fill="#38bdf8" font-size="20">Climate 70°F</text>
    </svg>
  `),

  // Screen 4: Benefit - Matter & Thread Local Mesh
  home10_benefit: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1600" viewBox="0 0 800 1600">
      <rect width="800" height="1600" fill="#191c24"/>
      <text x="60" y="70" fill="#ffffff" font-size="28" font-weight="700">19:15</text>
      <rect x="50" y="140" width="700" height="300" rx="32" fill="#232734" stroke="#f59e0b" stroke-width="2"/>
      <text x="90" y="220" fill="#f59e0b" font-size="22" font-weight="bold">THREAD BORDER ROUTER</text>
      <text x="90" y="290" fill="#ffffff" font-size="40" font-weight="900">Zero Cloud Latency</text>
      <text x="90" y="340" fill="#94a3b8" font-size="22">Automations trigger locally in &lt;10ms even without internet.</text>
    </svg>
  `),
};
