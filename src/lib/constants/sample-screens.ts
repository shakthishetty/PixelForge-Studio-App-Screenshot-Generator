// PixelForge Studio - Authentic Vector Sample Screens & Illustrations
// Rendered as standalone SVGs and data URIs for crisp, zero-latency, offline rendering

const createSvgDataUrl = (svgContent: string) => {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgContent.trim())}`;
};

export const SAMPLE_SCREENS = {
  // Stripe 1: Dual Phone Back Mockup screen (Violet gradient)
  stripeBackPurple: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1600" viewBox="0 0 800 1600">
      <defs>
        <linearGradient id="purpleBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#581c87"/>
          <stop offset="50%" stop-color="#7c3aed"/>
          <stop offset="100%" stop-color="#9333ea"/>
        </linearGradient>
      </defs>
      <rect width="800" height="1600" fill="url(#purpleBg)"/>
      <circle cx="400" cy="800" r="280" fill="rgba(255,255,255,0.08)"/>
      <circle cx="400" cy="800" r="160" fill="rgba(255,255,255,0.12)"/>
    </svg>
  `),

  // Stripe 1: Front Phone Balance Screen ($1,827 Gross Volume, 48 Payments, 86 Customers)
  stripeFrontBalance: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1600" viewBox="0 0 800 1600">
      <rect width="800" height="1600" fill="#f8fafc"/>
      <!-- Status bar -->
      <text x="70" y="70" fill="#0f172a" font-size="28" font-weight="bold" font-family="system-ui, sans-serif">2:14</text>
      <circle cx="730" cy="62" r="14" fill="#0f172a"/>

      <!-- Header: Home -->
      <text x="400" y="140" fill="#0f172a" font-size="34" font-weight="700" text-anchor="middle" font-family="system-ui, sans-serif">Home</text>
      
      <!-- Today Metric Card -->
      <rect x="40" y="190" width="720" height="240" rx="28" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
      <text x="80" y="245" fill="#0f172a" font-size="28" font-weight="bold" font-family="system-ui, sans-serif">Today</text>
      <text x="80" y="295" fill="#64748b" font-size="20" font-family="system-ui, sans-serif">Gross Volume</text>
      <text x="80" y="355" fill="#0f172a" font-size="44" font-weight="800" font-family="system-ui, sans-serif">$1,827</text>

      <text x="350" y="295" fill="#64748b" font-size="20" font-family="system-ui, sans-serif">Payments</text>
      <text x="350" y="355" fill="#0f172a" font-size="44" font-weight="800" font-family="system-ui, sans-serif">48</text>

      <text x="560" y="295" fill="#64748b" font-size="20" font-family="system-ui, sans-serif">Customers</text>
      <text x="560" y="355" fill="#0f172a" font-size="44" font-weight="800" font-family="system-ui, sans-serif">86</text>

      <!-- Reports Overview -->
      <rect x="40" y="470" width="720" height="340" rx="28" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
      <div xmlns="http://www.w3.org/1999/xhtml"></div>
      <text x="80" y="525" fill="#0f172a" font-size="28" font-weight="bold" font-family="system-ui, sans-serif">Reports overview</text>
      <text x="700" y="525" fill="#6366f1" font-size="22" font-weight="600" text-anchor="end" font-family="system-ui, sans-serif">Edit</text>

      <!-- Filter pills -->
      <rect x="80" y="560" width="70" height="36" rx="18" fill="#f1f5f9"/>
      <text x="115" y="585" fill="#475569" font-size="18" text-anchor="middle" font-family="system-ui, sans-serif">1D</text>
      <rect x="165" y="560" width="70" height="36" rx="18" fill="#f1f5f9"/>
      <text x="200" y="585" fill="#475569" font-size="18" text-anchor="middle" font-family="system-ui, sans-serif">1W</text>
      <rect x="250" y="560" width="70" height="36" rx="18" fill="#6366f1"/>
      <text x="285" y="585" fill="#ffffff" font-size="18" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">1M</text>
      <rect x="335" y="560" width="70" height="36" rx="18" fill="#f1f5f9"/>
      <text x="370" y="585" fill="#475569" font-size="18" text-anchor="middle" font-family="system-ui, sans-serif">YTD</text>
      <rect x="420" y="560" width="70" height="36" rx="18" fill="#f1f5f9"/>
      <text x="455" y="585" fill="#475569" font-size="18" text-anchor="middle" font-family="system-ui, sans-serif">ALL</text>

      <text x="80" y="650" fill="#64748b" font-size="20" font-family="system-ui, sans-serif">Gross volume</text>
      <text x="80" y="700" fill="#6366f1" font-size="44" font-weight="800" font-family="system-ui, sans-serif">$1,827</text>

      <text x="700" y="650" fill="#10b981" font-size="20" font-weight="bold" text-anchor="end" font-family="system-ui, sans-serif">+314.3%</text>
      <text x="700" y="700" fill="#0f172a" font-size="34" font-weight="700" text-anchor="end" font-family="system-ui, sans-serif">$529.00</text>
      <text x="700" y="735" fill="#94a3b8" font-size="18" text-anchor="end" font-family="system-ui, sans-serif">OCT 1 - OCT 4</text>

      <!-- Mini Sparkline -->
      <path d="M 80 770 Q 200 750 350 730 T 550 710 T 700 680" fill="none" stroke="#6366f1" stroke-width="4" stroke-linecap="round"/>
    </svg>
  `),

  // Stripe 2: Floating Payment Menu Card
  stripePaymentMenu: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="700" height="480" viewBox="0 0 700 480">
      <defs>
        <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="125%">
          <feDropShadow dx="0" dy="18" stdDeviation="22" flood-color="#000000" flood-opacity="0.18"/>
        </filter>
      </defs>
      <rect x="20" y="20" width="660" height="440" rx="32" fill="#ffffff" filter="url(#cardShadow)"/>
      
      <!-- Option 1: Charge a card or send an invoice -->
      <rect x="50" y="55" width="46" height="46" rx="12" fill="#ede9fe"/>
      <text x="73" y="86" fill="#7c3aed" font-size="24" text-anchor="middle">💳</text>
      <text x="115" y="85" fill="#0f172a" font-size="24" font-weight="700" font-family="system-ui, sans-serif">Charge a card or send an invoice</text>

      <line x1="50" y1="130" x2="650" y2="130" stroke="#f1f5f9" stroke-width="2"/>

      <!-- Option 2: Create a payment link -->
      <rect x="50" y="155" width="46" height="46" rx="12" fill="#ede9fe"/>
      <text x="73" y="186" fill="#7c3aed" font-size="24" text-anchor="middle">🔗</text>
      <text x="115" y="185" fill="#0f172a" font-size="24" font-weight="700" font-family="system-ui, sans-serif">Create a payment link</text>

      <line x1="50" y1="230" x2="650" y2="230" stroke="#f1f5f9" stroke-width="2"/>

      <!-- Option 3: Create a customer -->
      <rect x="50" y="255" width="46" height="46" rx="12" fill="#ede9fe"/>
      <text x="73" y="286" fill="#7c3aed" font-size="24" text-anchor="middle">👤</text>
      <text x="115" y="285" fill="#0f172a" font-size="24" font-weight="700" font-family="system-ui, sans-serif">Create a customer</text>

      <line x1="50" y1="330" x2="650" y2="330" stroke="#f1f5f9" stroke-width="2"/>

      <!-- Option 4: Pay out funds -->
      <rect x="50" y="355" width="46" height="46" rx="12" fill="#ede9fe"/>
      <text x="73" y="386" fill="#7c3aed" font-size="24" text-anchor="middle">⇅</text>
      <text x="115" y="385" fill="#0f172a" font-size="24" font-weight="700" font-family="system-ui, sans-serif">Pay out funds</text>
    </svg>
  `),

  // Stripe 2: Background Phone with Transaction Success
  stripeSuccessList: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1600" viewBox="0 0 800 1600">
      <rect width="800" height="1600" fill="#f8fafc"/>
      <text x="70" y="70" fill="#0f172a" font-size="28" font-weight="bold" font-family="system-ui, sans-serif">2:14</text>
      <circle cx="730" cy="62" r="14" fill="#0f172a"/>
      <!-- Succeeded row 1 -->
      <rect x="40" y="700" width="720" height="150" rx="24" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5"/>
      <circle cx="95" cy="775" r="24" fill="#dcfce7"/>
      <text x="95" y="784" fill="#16a34a" font-size="22" font-weight="bold" text-anchor="middle">✓</text>
      <text x="145" y="760" fill="#0f172a" font-size="26" font-weight="bold" font-family="system-ui, sans-serif">$15.00 succeeded</text>
      <text x="145" y="795" fill="#64748b" font-size="20" font-family="system-ui, sans-serif">Rectangular Pocket View, White</text>
      
      <!-- Succeeded row 2 -->
      <rect x="40" y="880" width="720" height="150" rx="24" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5"/>
      <circle cx="95" cy="955" r="24" fill="#dcfce7"/>
      <text x="95" y="964" fill="#16a34a" font-size="22" font-weight="bold" text-anchor="middle">✓</text>
      <text x="145" y="940" fill="#0f172a" font-size="26" font-weight="bold" font-family="system-ui, sans-serif">$1,899.00 succeeded</text>
      <text x="145" y="975" fill="#64748b" font-size="20" font-family="system-ui, sans-serif">Enterprise Annual Tier</text>
    </svg>
  `),

  // Stripe 3: Floating Metallic Platinum VISA Card
  stripeVisaCard: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="720" height="440" viewBox="0 0 720 440">
      <defs>
        <linearGradient id="silverGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#f1f5f9"/>
          <stop offset="30%" stop-color="#e2e8f0"/>
          <stop offset="70%" stop-color="#cbd5e1"/>
          <stop offset="100%" stop-color="#94a3b8"/>
        </linearGradient>
        <filter id="visaShadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="24" stdDeviation="28" flood-color="#000000" flood-opacity="0.32"/>
        </filter>
      </defs>
      <!-- Card Body -->
      <rect x="20" y="20" width="680" height="400" rx="32" fill="url(#silverGrad)" stroke="#ffffff" stroke-width="2" filter="url(#visaShadow)"/>
      
      <!-- Brushed lines -->
      <path d="M 40 40 L 660 380" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
      <path d="M 120 40 L 680 340" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>

      <!-- EMV Gold Chip -->
      <rect x="70" y="140" width="80" height="65" rx="14" fill="#fbbf24" stroke="#d97706" stroke-width="1.5"/>
      <line x1="70" y1="172" x2="150" y2="172" stroke="#b45309" stroke-width="1"/>
      <line x1="110" y1="140" x2="110" y2="205" stroke="#b45309" stroke-width="1"/>

      <!-- Contactless Wave -->
      <path d="M 175 160 A 15 15 0 0 1 175 185" fill="none" stroke="#64748b" stroke-width="3" stroke-linecap="round"/>
      <path d="M 185 152 A 25 25 0 0 1 185 193" fill="none" stroke="#64748b" stroke-width="3" stroke-linecap="round"/>

      <!-- VISA Wordmark -->
      <text x="630" y="360" fill="#1e293b" font-size="64" font-weight="900" font-style="italic" text-anchor="end" font-family="system-ui, sans-serif">VISA</text>
    </svg>
  `),

  // Stripe 3: Tap to Pay Phone Screen
  stripeTapToPayScreen: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1600" viewBox="0 0 800 1600">
      <rect width="800" height="1600" fill="#f8fafc"/>
      <!-- Charge prompt card -->
      <rect x="50" y="520" width="700" height="480" rx="36" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
      <text x="400" y="620" fill="#0f172a" font-size="34" font-weight="700" text-anchor="middle" font-family="system-ui, sans-serif">How would you like to</text>
      <text x="400" y="670" fill="#0f172a" font-size="34" font-weight="700" text-anchor="middle" font-family="system-ui, sans-serif">charge your Customer?</text>

      <!-- Contactless button -->
      <circle cx="280" cy="790" r="50" fill="#e0f2fe"/>
      <text x="280" y="805" fill="#0284c7" font-size="36" text-anchor="middle">📡</text>

      <!-- Insert Card button -->
      <circle cx="520" cy="790" r="50" fill="#e0f2fe"/>
      <text x="520" y="805" fill="#0284c7" font-size="36" text-anchor="middle">💳</text>
    </svg>
  `),

  // Stripe 4: Notifications & Invoices Screen
  stripeNotificationsScreen: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1600" viewBox="0 0 800 1600">
      <rect width="800" height="1600" fill="#f8fafc"/>
      <!-- Top Banner -->
      <rect x="0" y="0" width="800" height="200" fill="#ffffff"/>
      <circle cx="80" cy="130" r="26" fill="#22c55e"/>
      <text x="80" y="140" fill="#ffffff" font-size="28" font-weight="bold" text-anchor="middle">🌵</text>
      <text x="130" y="140" fill="#0f172a" font-size="30" font-weight="bold" font-family="system-ui, sans-serif">Payments</text>
      
      <rect x="600" y="105" width="160" height="50" rx="25" fill="#6366f1"/>
      <text x="680" y="137" fill="#ffffff" font-size="20" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">Request</text>

      <!-- Items -->
      <rect x="50" y="240" width="700" height="110" rx="20" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5"/>
      <circle cx="100" cy="295" r="20" fill="#dcfce7"/>
      <text x="100" y="303" fill="#16a34a" font-size="18" font-weight="bold" text-anchor="middle">✓</text>
      <text x="140" y="290" fill="#0f172a" font-size="24" font-weight="700" font-family="system-ui, sans-serif">$720.00 charged</text>
      <text x="140" y="320" fill="#64748b" font-size="18" font-family="system-ui, sans-serif">Sep 23, 3:17 PM</text>

      <rect x="50" y="370" width="700" height="110" rx="20" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5"/>
      <circle cx="100" cy="425" r="20" fill="#dcfce7"/>
      <text x="100" y="433" fill="#16a34a" font-size="18" font-weight="bold" text-anchor="middle">✓</text>
      <text x="140" y="420" fill="#0f172a" font-size="24" font-weight="700" font-family="system-ui, sans-serif">$91.00 charged</text>
      <text x="140" y="450" fill="#64748b" font-size="18" font-family="system-ui, sans-serif">Sep 23, 2:12 PM</text>

      <rect x="50" y="500" width="700" height="110" rx="20" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5"/>
      <circle cx="100" cy="555" r="20" fill="#dcfce7"/>
      <text x="100" y="563" fill="#16a34a" font-size="18" font-weight="bold" text-anchor="middle">✓</text>
      <text x="140" y="550" fill="#0f172a" font-size="24" font-weight="700" font-family="system-ui, sans-serif">$107.00 charged</text>
      <text x="140" y="580" fill="#64748b" font-size="18" font-family="system-ui, sans-serif">Sep 23, 1:40 PM</text>

      <rect x="50" y="630" width="700" height="110" rx="20" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5"/>
      <circle cx="100" cy="685" r="20" fill="#fee2e2"/>
      <text x="100" y="693" fill="#ef4444" font-size="18" font-weight="bold" text-anchor="middle">✕</text>
      <text x="140" y="680" fill="#0f172a" font-size="24" font-weight="700" font-family="system-ui, sans-serif">$307.00 charged</text>
      <text x="140" y="710" fill="#64748b" font-size="18" font-family="system-ui, sans-serif">Sep 23, 11:20 AM</text>
    </svg>
  `),

  // Notion 1: Minimalist Line Art Character at Laptop
  notionLineArtGirl: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
      <!-- Desk line -->
      <line x1="50" y1="620" x2="750" y2="620" stroke="#000000" stroke-width="6" stroke-linecap="round"/>

      <!-- Laptop -->
      <polygon points="450,470 650,470 600,620 400,620" fill="#ffffff" stroke="#000000" stroke-width="6" stroke-linejoin="round"/>
      <line x1="600" y1="620" x2="700" y2="620" stroke="#000000" stroke-width="6"/>
      <!-- Laptop logo circle -->
      <circle cx="530" cy="545" r="16" fill="none" stroke="#000000" stroke-width="5"/>
      
      <!-- Energy spark lines from laptop -->
      <line x1="390" y1="530" x2="370" y2="500" stroke="#38bdf8" stroke-width="5" stroke-linecap="round"/>
      <line x1="415" y1="520" x2="415" y2="480" stroke="#38bdf8" stroke-width="5" stroke-linecap="round"/>
      <line x1="440" y1="530" x2="460" y2="500" stroke="#38bdf8" stroke-width="5" stroke-linecap="round"/>

      <!-- Thought Cloud / Face Circle -->
      <g transform="translate(480, 240)">
        <circle cx="80" cy="80" r="90" fill="#ffffff" stroke="#000000" stroke-width="6"/>
        <!-- Face features inside circle -->
        <circle cx="50" cy="65" r="6" fill="#000000"/>
        <path d="M 105 60 C 110 55, 120 70, 115 85 C 110 100, 100 95, 95 105" fill="none" stroke="#000000" stroke-width="5" stroke-linecap="round"/>
        <path d="M 65 110 Q 80 120 95 110" fill="none" stroke="#000000" stroke-width="5" stroke-linecap="round"/>
      </g>

      <!-- Woman Character Head & Hair -->
      <!-- Black hair bun & flowing hair -->
      <circle cx="280" cy="220" r="45" fill="#000000"/>
      <path d="M 270 230 C 230 250, 190 330, 210 440 C 220 500, 260 520, 290 480 C 310 450, 310 400, 310 350 Z" fill="#000000"/>
      
      <!-- Profile Face -->
      <path d="M 280 270 C 330 270, 350 320, 340 370 C 335 390, 320 410, 300 420" fill="#ffffff" stroke="#000000" stroke-width="6" stroke-linecap="round"/>
      <path d="M 330 330 Q 345 338 335 348" fill="none" stroke="#000000" stroke-width="5"/>
      <circle cx="315" cy="330" r="5" fill="#000000"/>
      <!-- Smile -->
      <path d="M 315 375 Q 325 385 335 378" fill="none" stroke="#000000" stroke-width="5" stroke-linecap="round"/>

      <!-- Body / Patterned Shirt -->
      <path d="M 250 440 C 220 480, 180 540, 180 620 L 370 620 C 370 560, 350 510, 320 450 Z" fill="#ffffff" stroke="#000000" stroke-width="6"/>
      <!-- Shirt confetti flecks -->
      <line x1="220" y1="480" x2="230" y2="495" stroke="#000000" stroke-width="4"/>
      <line x1="260" y1="510" x2="250" y2="525" stroke="#000000" stroke-width="4"/>
      <line x1="230" y1="560" x2="245" y2="560" stroke="#000000" stroke-width="4"/>
      <line x1="290" y1="540" x2="280" y2="555" stroke="#000000" stroke-width="4"/>
      <line x1="330" y1="500" x2="340" y2="515" stroke="#000000" stroke-width="4"/>

      <!-- Arm & Hands Typing on Laptop -->
      <path d="M 290 470 C 320 520, 350 560, 410 570 C 440 575, 460 560, 480 580" fill="none" stroke="#000000" stroke-width="6" stroke-linecap="round"/>
      <path d="M 460 560 C 475 550, 495 565, 485 580" fill="none" stroke="#000000" stroke-width="5"/>
    </svg>
  `),

  // Notion 2: Create your perfect home (Notion App Dashboard)
  notionHomeDashboard: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1600" viewBox="0 0 800 1600">
      <rect width="800" height="1600" fill="#ffffff"/>
      <!-- Top user bar -->
      <text x="60" y="80" fill="#000000" font-size="32" font-weight="700" font-family="system-ui, sans-serif">J</text>
      <text x="100" y="80" fill="#000000" font-size="28" font-weight="600" font-family="system-ui, sans-serif">James's Notion</text>
      <text x="100" y="110" fill="#94a3b8" font-size="18" font-family="system-ui, sans-serif">james@gmail.com</text>
      <text x="740" y="80" fill="#94a3b8" font-size="28" text-anchor="end">•••</text>

      <text x="60" y="180" fill="#64748b" font-size="20" font-weight="600" font-family="system-ui, sans-serif">Jump back in</text>
      
      <!-- Cards row -->
      <rect x="60" y="210" width="210" height="180" rx="20" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
      <text x="90" y="270" fill="#000000" font-size="36">👤</text>
      <text x="90" y="340" fill="#0f172a" font-size="20" font-weight="bold" font-family="system-ui, sans-serif">James' wiki</text>

      <rect x="295" y="210" width="210" height="180" rx="20" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
      <text x="325" y="270" fill="#ef4444" font-size="36">🏋️</text>
      <text x="325" y="340" fill="#0f172a" font-size="20" font-weight="bold" font-family="system-ui, sans-serif">Workout Tracker</text>

      <rect x="530" y="210" width="210" height="180" rx="20" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1.5"/>
      <text x="560" y="270" fill="#10b981" font-size="36">🥗</text>
      <text x="560" y="340" fill="#0f172a" font-size="20" font-weight="bold" font-family="system-ui, sans-serif">Nutrition Plan</text>

      <!-- Favorites section -->
      <text x="60" y="450" fill="#64748b" font-size="20" font-weight="600" font-family="system-ui, sans-serif">Favorites</text>
      
      <text x="60" y="510" fill="#94a3b8" font-size="22">›</text>
      <text x="95" y="510" fill="#0f172a" font-size="24" font-weight="600" font-family="system-ui, sans-serif">👤  James' wiki</text>
      <text x="740" y="510" fill="#94a3b8" font-size="24" text-anchor="end">＋</text>
      <line x1="60" y1="540" x2="740" y2="540" stroke="#f1f5f9" stroke-width="2"/>

      <text x="60" y="590" fill="#94a3b8" font-size="22">›</text>
      <text x="95" y="590" fill="#0f172a" font-size="24" font-weight="600" font-family="system-ui, sans-serif">💳  Finances</text>
      <text x="740" y="590" fill="#94a3b8" font-size="24" text-anchor="end">＋</text>
      <line x1="60" y1="620" x2="740" y2="620" stroke="#f1f5f9" stroke-width="2"/>

      <text x="60" y="670" fill="#94a3b8" font-size="22">˅</text>
      <text x="95" y="670" fill="#0f172a" font-size="24" font-weight="600" font-family="system-ui, sans-serif">🏋️  Workout Tracker</text>
      <text x="740" y="670" fill="#94a3b8" font-size="24" text-anchor="end">＋</text>
      
      <text x="140" y="730" fill="#475569" font-size="22">Workouts</text>
      <text x="140" y="780" fill="#475569" font-size="22">Body Weight</text>

      <line x1="60" y1="820" x2="740" y2="820" stroke="#f1f5f9" stroke-width="2"/>
      <text x="60" y="870" fill="#94a3b8" font-size="22">›</text>
      <text x="95" y="870" fill="#0f172a" font-size="24" font-weight="600" font-family="system-ui, sans-serif">🥗  Nutrition Plan</text>
      <text x="740" y="870" fill="#94a3b8" font-size="24" text-anchor="end">＋</text>
    </svg>
  `),

  // Notion 3: Organize your life's work (James's Wiki)
  notionWikiScreen: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1600" viewBox="0 0 800 1600">
      <rect width="800" height="1600" fill="#ffffff"/>
      <!-- Top banner image / black abstract art -->
      <rect x="0" y="0" width="800" height="260" fill="#18181b"/>
      <circle cx="680" cy="180" r="140" fill="#27272a"/>
      <circle cx="720" cy="120" r="80" fill="#3f3f46"/>

      <!-- Navigation icons -->
      <text x="50" y="70" fill="#ffffff" font-size="28">‹  Travel</text>
      <text x="680" y="70" fill="#ffffff" font-size="24">⇪</text>
      <text x="740" y="70" fill="#ffffff" font-size="24">•••</text>

      <!-- Emoji avatar -->
      <circle cx="100" cy="260" r="45" fill="#f1f5f9" stroke="#ffffff" stroke-width="4"/>
      <text x="100" y="275" font-size="44" text-anchor="middle">👨🏽‍💻</text>

      <text x="60" y="360" fill="#94a3b8" font-size="20">Add comment</text>
      <text x="60" y="430" fill="#000000" font-size="48" font-weight="800" font-family="system-ui, sans-serif">James' wiki</text>

      <!-- Growth Section -->
      <text x="60" y="520" fill="#64748b" font-size="24" font-weight="700" font-family="system-ui, sans-serif">Growth</text>
      <text x="60" y="580" fill="#0f172a" font-size="24" font-family="system-ui, sans-serif">📝  Notes</text>
      <text x="60" y="635" fill="#0f172a" font-size="24" font-family="system-ui, sans-serif">📖  Journal</text>
      <text x="60" y="690" fill="#0f172a" font-size="24" font-family="system-ui, sans-serif">🏋️  Workout Tracker</text>
      <text x="60" y="745" fill="#0f172a" font-size="24" font-family="system-ui, sans-serif">🥗  Nutrition Plan</text>

      <!-- Personal Section -->
      <text x="60" y="830" fill="#64748b" font-size="24" font-weight="700" font-family="system-ui, sans-serif">Personal</text>
      <text x="60" y="890" fill="#0f172a" font-size="24" font-family="system-ui, sans-serif">💳  Finances</text>
      <text x="60" y="945" fill="#0f172a" font-size="24" font-family="system-ui, sans-serif">✈️  Travel</text>
    </svg>
  `),

  // Notion 4: Plan trips and adventures (Travel planner with airplane)
  notionTravelScreen: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1600" viewBox="0 0 800 1600">
      <rect width="800" height="1600" fill="#ffffff"/>
      <text x="50" y="70" fill="#64748b" font-size="26">‹  Travel</text>
      
      <!-- Big Blue Airplane Icon -->
      <g transform="translate(60, 110)">
        <text font-size="72">✈️</text>
      </g>
      <text x="60" y="250" fill="#000000" font-size="52" font-weight="800" font-family="system-ui, sans-serif">Travel</text>

      <rect x="60" y="285" width="110" height="38" rx="8" fill="#f1f5f9"/>
      <text x="80" y="310" fill="#475569" font-size="18" font-family="system-ui, sans-serif">≡ List ˅</text>

      <!-- Destinations -->
      <text x="60" y="380" fill="#0f172a" font-size="26" font-weight="bold" font-family="system-ui, sans-serif">🇺🇸  US Trip</text>
      <text x="60" y="415" fill="#94a3b8" font-size="20">January 19, 2025 → February 12, 2025</text>
      <line x1="60" y1="445" x2="740" y2="445" stroke="#f1f5f9" stroke-width="2"/>

      <text x="60" y="495" fill="#0f172a" font-size="26" font-weight="bold" font-family="system-ui, sans-serif">🇳🇱  Amsterdam</text>
      <text x="60" y="530" fill="#94a3b8" font-size="20">April 2, 2024 → April 8, 2024</text>
      <line x1="60" y1="560" x2="740" y2="560" stroke="#f1f5f9" stroke-width="2"/>

      <text x="60" y="610" fill="#0f172a" font-size="26" font-weight="bold" font-family="system-ui, sans-serif">🇪🇸  Canary Islands</text>
      <text x="60" y="645" fill="#94a3b8" font-size="20">May 12, 2024 → May 21, 2024</text>
      <line x1="60" y1="675" x2="740" y2="675" stroke="#f1f5f9" stroke-width="2"/>

      <text x="60" y="725" fill="#0f172a" font-size="26" font-weight="bold" font-family="system-ui, sans-serif">🇵🇱  Poland</text>
      <text x="60" y="760" fill="#94a3b8" font-size="20">March 3, 2023 → March 14, 2023</text>
      <line x1="60" y1="790" x2="740" y2="790" stroke="#f1f5f9" stroke-width="2"/>

      <text x="60" y="840" fill="#0f172a" font-size="26" font-weight="bold" font-family="system-ui, sans-serif">🇩🇪  Bremen</text>
      <text x="60" y="875" fill="#94a3b8" font-size="20">January 20, 2022 → January 28, 2022</text>
    </svg>
  `),

  fitness: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1600" viewBox="0 0 800 1600">
      <defs>
        <linearGradient id="fitBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0a0a0c"/>
          <stop offset="100%" stop-color="#14141d"/>
        </linearGradient>
      </defs>
      <rect width="800" height="1600" fill="url(#fitBg)"/>
      <text x="60" y="120" fill="#f43f5e" font-size="22" font-weight="bold" letter-spacing="2">BEVEL HEALTH</text>
      <text x="60" y="170" fill="#ffffff" font-size="44" font-weight="800">Today's Recovery</text>
      
      <!-- Activity Rings -->
      <g transform="translate(400, 420)">
        <circle r="190" fill="none" stroke="#27272a" stroke-width="26"/>
        <circle r="190" fill="none" stroke="#f43f5e" stroke-width="26" stroke-dasharray="1193" stroke-dashoffset="300" stroke-linecap="round"/>
        <circle r="150" fill="none" stroke="#27272a" stroke-width="26"/>
        <circle r="150" fill="none" stroke="#10b981" stroke-width="26" stroke-dasharray="942" stroke-dashoffset="180" stroke-linecap="round"/>
        <circle r="110" fill="none" stroke="#27272a" stroke-width="26"/>
        <circle r="110" fill="none" stroke="#06b6d4" stroke-width="26" stroke-dasharray="691" stroke-dashoffset="80" stroke-linecap="round"/>
        <text y="-10" fill="#ffffff" font-size="52" font-weight="bold" text-anchor="middle">84%</text>
        <text y="30" fill="#a1a1aa" font-size="22" text-anchor="middle">OPTIMAL</text>
      </g>

      <!-- Stat Cards -->
      <rect x="60" y="680" width="320" height="200" rx="28" fill="#18181b"/>
      <text x="95" y="735" fill="#f43f5e" font-size="22" font-weight="bold">HRV STRAIN</text>
      <text x="95" y="810" fill="#ffffff" font-size="54" font-weight="800">68 <tspan font-size="22" fill="#71717a">MS</tspan></text>
      <text x="95" y="850" fill="#10b981" font-size="20">+12% vs 30-day baseline</text>

      <rect x="420" y="680" width="320" height="200" rx="28" fill="#18181b"/>
      <text x="455" y="735" fill="#06b6d4" font-size="22" font-weight="bold">SLEEP SCORE</text>
      <text x="455" y="810" fill="#ffffff" font-size="54" font-weight="800">92 <tspan font-size="22" fill="#71717a">/100</tspan></text>
      <text x="455" y="850" fill="#38bdf8" font-size="20">8h 14m restorative sleep</text>
    </svg>
  `),

  aiChat: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1600" viewBox="0 0 800 1600">
      <rect width="800" height="1600" fill="#0c0a1a"/>
      <circle cx="100" cy="110" r="30" fill="#6366f1"/>
      <text x="100" y="120" fill="#ffffff" font-size="28" font-weight="bold" text-anchor="middle">✦</text>
      <text x="150" y="105" fill="#ffffff" font-size="28" font-weight="bold">Orbit AI</text>
      <!-- Message bubble -->
      <rect x="50" y="240" width="700" height="340" rx="28" fill="#1e1838" stroke="#3b2d6a" stroke-width="2"/>
      <text x="90" y="320" fill="#ffffff" font-size="32" font-weight="bold">Instant Answers to Anything</text>
      <text x="90" y="375" fill="#c084fc" font-size="24">Draft strategies, synthesize research,</text>
      <text x="90" y="415" fill="#c084fc" font-size="24">and compound your creative output.</text>
    </svg>
  `),

  dashboard: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="1280" height="800" viewBox="0 0 1280 800">
      <rect width="1280" height="800" fill="#0f172a"/>
      <!-- Header -->
      <rect x="0" y="0" width="1280" height="60" fill="#1e293b"/>
      <circle cx="30" cy="30" r="7" fill="#ef4444"/>
      <circle cx="50" cy="30" r="7" fill="#eab308"/>
      <circle cx="70" cy="30" r="7" fill="#22c55e"/>
      <text x="120" y="36" fill="#94a3b8" font-size="16">https://cloudvue.io/analytics</text>
      <!-- Content -->
      <text x="80" y="140" fill="#ffffff" font-size="38" font-weight="bold">System Performance & Revenue</text>
      <rect x="80" y="190" width="340" height="150" rx="16" fill="#1e293b"/>
      <text x="110" y="240" fill="#94a3b8" font-size="16">MONTHLY REVENUE</text>
      <text x="110" y="295" fill="#ffffff" font-size="44" font-weight="bold">$124,590</text>
    </svg>
  `),

  finance: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1600" viewBox="0 0 800 1600">
      <rect width="800" height="1600" fill="#0f172a"/>
      <text x="400" y="140" fill="#ffffff" font-size="34" font-weight="700" text-anchor="middle">FinPulse</text>
    </svg>
  `),

  // Laurel Wreath: Apple Watch Spotlight (Screenshot 1 & 2)
  laurelAppleWatch: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="300" viewBox="0 0 600 300">
      <!-- Left Laurel Branch -->
      <g fill="#ffffff">
        <path d="M 120 180 C 110 140, 125 90, 160 50 C 150 70, 140 100, 142 130 C 144 150, 148 170, 150 180 Z" opacity="0.95"/>
        <ellipse cx="115" cy="140" rx="20" ry="10" transform="rotate(-35 115 140)"/>
        <ellipse cx="125" cy="100" rx="18" ry="9" transform="rotate(-45 125 100)"/>
        <ellipse cx="150" cy="65" rx="17" ry="8" transform="rotate(-60 150 65)"/>
        <ellipse cx="138" cy="170" rx="18" ry="8" transform="rotate(-20 138 170)"/>
        <ellipse cx="105" cy="175" rx="16" ry="8" transform="rotate(-15 105 175)"/>
        <ellipse cx="95" cy="130" rx="17" ry="8" transform="rotate(-40 95 130)"/>
        <ellipse cx="110" cy="85" rx="16" ry="7" transform="rotate(-55 110 85)"/>
      </g>
      <!-- Right Laurel Branch -->
      <g fill="#ffffff">
        <path d="M 480 180 C 490 140, 475 90, 440 50 C 450 70, 460 100, 458 130 C 456 150, 452 170, 450 180 Z" opacity="0.95"/>
        <ellipse cx="485" cy="140" rx="20" ry="10" transform="rotate(35 485 140)"/>
        <ellipse cx="475" cy="100" rx="18" ry="9" transform="rotate(45 475 100)"/>
        <ellipse cx="450" cy="65" rx="17" ry="8" transform="rotate(60 450 65)"/>
        <ellipse cx="462" cy="170" rx="18" ry="8" transform="rotate(20 462 170)"/>
        <ellipse cx="495" cy="175" rx="16" ry="8" transform="rotate(15 495 175)"/>
        <ellipse cx="505" cy="130" rx="17" ry="8" transform="rotate(40 505 130)"/>
        <ellipse cx="490" cy="85" rx="16" ry="7" transform="rotate(55 490 85)"/>
      </g>
      <!-- Apple Logo -->
      <text x="300" y="90" fill="#ffffff" font-size="44" font-weight="bold" text-anchor="middle"></text>
      <!-- Text -->
      <text x="300" y="145" fill="#ffffff" font-size="34" font-weight="800" text-anchor="middle" font-family="system-ui, sans-serif">Apple Watch</text>
      <text x="300" y="185" fill="#ffffff" font-size="32" font-weight="700" text-anchor="middle" font-family="system-ui, sans-serif">Spotlight</text>
    </svg>
  `),

  // Laurel Wreath: 1M Downloads (Screenshot 1 & 2)
  laurel1MDownloads: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="300" viewBox="0 0 600 300">
      <!-- Left Laurel Branch -->
      <g fill="#ffffff">
        <ellipse cx="135" cy="140" rx="20" ry="10" transform="rotate(-35 135 140)"/>
        <ellipse cx="145" cy="100" rx="18" ry="9" transform="rotate(-45 145 100)"/>
        <ellipse cx="170" cy="65" rx="17" ry="8" transform="rotate(-60 170 65)"/>
        <ellipse cx="158" cy="170" rx="18" ry="8" transform="rotate(-20 158 170)"/>
        <ellipse cx="115" cy="130" rx="17" ry="8" transform="rotate(-40 115 130)"/>
      </g>
      <!-- Right Laurel Branch -->
      <g fill="#ffffff">
        <ellipse cx="465" cy="140" rx="20" ry="10" transform="rotate(35 465 140)"/>
        <ellipse cx="455" cy="100" rx="18" ry="9" transform="rotate(45 455 100)"/>
        <ellipse cx="430" cy="65" rx="17" ry="8" transform="rotate(60 430 65)"/>
        <ellipse cx="442" cy="170" rx="18" ry="8" transform="rotate(20 442 170)"/>
        <ellipse cx="485" cy="130" rx="17" ry="8" transform="rotate(40 485 130)"/>
      </g>
      <!-- 5 Stars -->
      <text x="300" y="105" fill="#ffffff" font-size="32" letter-spacing="6" text-anchor="middle">★★★★★</text>
      <!-- 1M Downloads Text -->
      <text x="300" y="160" fill="#ffffff" font-size="34" font-weight="800" text-anchor="middle" font-family="system-ui, sans-serif">1M Downloads</text>
    </svg>
  `),

  // Floating HRR 44 bpm Metric Card (Screenshot 1 & 2)
  floatingHrrCard: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="480" height="320" viewBox="0 0 480 320">
      <defs>
        <filter id="hrrShadow" x="-15%" y="-15%" width="130%" height="140%">
          <feDropShadow dx="0" dy="20" stdDeviation="24" flood-color="#000000" flood-opacity="0.28"/>
        </filter>
        <linearGradient id="hrrGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#ec4899"/>
          <stop offset="100%" stop-color="#f97316"/>
        </linearGradient>
      </defs>
      <rect x="20" y="20" width="440" height="280" rx="28" fill="#ffffff" filter="url(#hrrShadow)"/>
      
      <!-- Icon + HRR label -->
      <text x="50" y="80" fill="#64748b" font-size="22" font-weight="700">⚡ HRR</text>
      <text x="420" y="80" fill="#94a3b8" font-size="24" text-anchor="end">›</text>

      <!-- Large 44 bpm -->
      <text x="50" y="150" fill="#0f172a" font-size="52" font-weight="900" font-family="system-ui, sans-serif">44 bpm</text>
      <text x="50" y="195" fill="#9333ea" font-size="22" font-weight="700" font-family="system-ui, sans-serif">Low Aerobic</text>
      <text x="50" y="225" fill="#94a3b8" font-size="18" font-family="system-ui, sans-serif">Excellence</text>

      <!-- Sparkline curve -->
      <path d="M 230 250 Q 280 230 310 240 T 360 200 T 420 160" fill="none" stroke="url(#hrrGrad)" stroke-width="6" stroke-linecap="round"/>
    </svg>
  `),

  // Floating Sleep Stages Card (Screenshot 1 & 2)
  floatingSleepStagesCard: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="460" height="260" viewBox="0 0 460 260">
      <defs>
        <filter id="sleepShadow" x="-15%" y="-15%" width="130%" height="140%">
          <feDropShadow dx="0" dy="20" stdDeviation="24" flood-color="#000000" flood-opacity="0.45"/>
        </filter>
      </defs>
      <rect x="20" y="20" width="420" height="220" rx="28" fill="#181c2e" stroke="#2d3752" stroke-width="2" filter="url(#sleepShadow)"/>
      
      <circle cx="65" cy="75" r="20" fill="#3b82f6"/>
      <text x="65" y="82" fill="#ffffff" font-size="20" text-anchor="middle">🌙</text>
      <text x="100" y="70" fill="#ffffff" font-size="22" font-weight="bold">Awake 1h 7m</text>
      <text x="100" y="95" fill="#94a3b8" font-size="16">10% optimal</text>

      <text x="50" y="150" fill="#ffffff" font-size="26" font-weight="800">Deep 56m <tspan font-size="18" fill="#a855f7">15%</tspan></text>
      <text x="50" y="190" fill="#94a3b8" font-size="18">Core 4h 28m • 57%</text>
    </svg>
  `),

  // Apple Watch Ultra Mockup (Beside phone on Canvas 2)
  appleWatchUltra: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="600" viewBox="0 0 400 600">
      <defs>
        <filter id="watchShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="24" stdDeviation="30" flood-color="#000000" flood-opacity="0.5"/>
        </filter>
      </defs>
      <!-- Straps -->
      <rect x="110" y="20" width="180" height="100" rx="12" fill="#3f3f46"/>
      <rect x="110" y="480" width="180" height="100" rx="12" fill="#3f3f46"/>

      <!-- Digital Crown (Orange accent + titanium) -->
      <rect x="330" y="210" width="18" height="90" rx="6" fill="#f97316" stroke="#27272a" stroke-width="2"/>
      <!-- Action button on left -->
      <rect x="52" y="230" width="12" height="60" rx="4" fill="#ea580c"/>

      <!-- Watch Titanium Body -->
      <rect x="60" y="110" width="280" height="380" rx="72" fill="#27272a" stroke="#52525b" stroke-width="6" filter="url(#watchShadow)"/>
      <!-- Screen bezel -->
      <rect x="80" y="130" width="240" height="340" rx="54" fill="#000000"/>

      <!-- Watch Face: 10:09 -->
      <text x="200" y="230" fill="#ffffff" font-size="64" font-weight="800" text-anchor="middle" font-family="system-ui, sans-serif">10:09</text>
      
      <!-- Mini Activity Rings -->
      <g transform="translate(200, 330)">
        <circle r="60" fill="none" stroke="#27272a" stroke-width="12"/>
        <circle r="60" fill="none" stroke="#f43f5e" stroke-width="12" stroke-dasharray="377" stroke-dashoffset="90" stroke-linecap="round"/>

        <circle r="44" fill="none" stroke="#27272a" stroke-width="12"/>
        <circle r="44" fill="none" stroke="#10b981" stroke-width="12" stroke-dasharray="276" stroke-dashoffset="60" stroke-linecap="round"/>

        <circle r="28" fill="none" stroke="#27272a" stroke-width="12"/>
        <circle r="28" fill="none" stroke="#06b6d4" stroke-width="12" stroke-dasharray="176" stroke-dashoffset="30" stroke-linecap="round"/>
      </g>
    </svg>
  `),

  // Bevel Health App Screen (Screenshot 1 & 2)
  bevelHealthAppScreen: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1600" viewBox="0 0 800 1600">
      <rect width="800" height="1600" fill="#f8fafc"/>
      <!-- Header -->
      <text x="70" y="80" fill="#0f172a" font-size="28" font-weight="bold">9:41</text>
      <circle cx="730" cy="72" r="14" fill="#0f172a"/>
      <text x="70" y="150" fill="#64748b" font-size="22">Today, 14 September ˅</text>

      <!-- 3 Activity/Strain Dials -->
      <g transform="translate(160, 290)">
        <circle r="75" fill="none" stroke="#e2e8f0" stroke-width="16"/>
        <circle r="75" fill="none" stroke="#10b981" stroke-width="16" stroke-dasharray="471" stroke-dashoffset="290" stroke-linecap="round"/>
        <text y="10" fill="#0f172a" font-size="34" font-weight="800" text-anchor="middle">38%</text>
        <text y="40" fill="#64748b" font-size="18" text-anchor="middle">Activity</text>
      </g>

      <g transform="translate(400, 290)">
        <circle r="75" fill="none" stroke="#e2e8f0" stroke-width="16"/>
        <circle r="75" fill="none" stroke="#eab308" stroke-width="16" stroke-dasharray="471" stroke-dashoffset="110" stroke-linecap="round"/>
        <text y="10" fill="#0f172a" font-size="34" font-weight="800" text-anchor="middle">77%</text>
        <text y="40" fill="#64748b" font-size="18" text-anchor="middle">Recovery</text>
      </g>

      <g transform="translate(640, 290)">
        <circle r="75" fill="none" stroke="#e2e8f0" stroke-width="16"/>
        <circle r="75" fill="none" stroke="#3b82f6" stroke-width="16" stroke-dasharray="471" stroke-dashoffset="60" stroke-linecap="round"/>
        <text y="10" fill="#0f172a" font-size="34" font-weight="800" text-anchor="middle">87%</text>
        <text y="40" fill="#64748b" font-size="18" text-anchor="middle">Sleep</text>
      </g>

      <!-- Bio-Markers Card -->
      <rect x="50" y="440" width="700" height="240" rx="28" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
      <text x="90" y="500" fill="#0f172a" font-size="28" font-weight="bold">Cardio Load Summary</text>
      <text x="90" y="540" fill="#64748b" font-size="20">Optimal aerobic stimulus achieved for today.</text>
      <text x="90" y="620" fill="#10b981" font-size="44" font-weight="800">112 <tspan font-size="22" fill="#64748b">Productive Load</tspan></text>
      
      <!-- Grid Widgets -->
      <rect x="50" y="720" width="330" height="180" rx="24" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
      <text x="85" y="780" fill="#64748b" font-size="20">Heart Rate</text>
      <text x="85" y="845" fill="#f43f5e" font-size="44" font-weight="800">58 <tspan font-size="20" fill="#64748b">bpm</tspan></text>

      <rect x="420" y="720" width="330" height="180" rx="24" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
      <text x="455" y="780" fill="#64748b" font-size="20">Energy Bank</text>
      <text x="455" y="845" fill="#3b82f6" font-size="44" font-weight="800">82%</text>
    </svg>
  `),

  // Sleep Hypnogram Stages Dark Screen (Screenshot 1 & 2 Canvas 4)
  sleepTrackerDarkScreen: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1600" viewBox="0 0 800 1600">
      <rect width="800" height="1600" fill="#0c0e18"/>
      <!-- Header -->
      <text x="70" y="80" fill="#ffffff" font-size="28" font-weight="bold">9:41</text>
      <circle cx="730" cy="72" r="14" fill="#ffffff"/>
      <text x="70" y="160" fill="#94a3b8" font-size="24">Primary Sleep</text>
      <text x="70" y="200" fill="#ffffff" font-size="34" font-weight="bold">Sep 13, 2024 • 11:24 PM</text>

      <!-- Hypnogram Stages Graph -->
      <rect x="40" y="250" width="720" height="380" rx="28" fill="#141829" stroke="#222b48" stroke-width="2"/>
      <text x="70" y="300" fill="#a855f7" font-size="22" font-weight="bold">SLEEP STAGES</text>
      
      <!-- Stepped Hypnogram bars -->
      <rect x="80" y="340" width="80" height="30" rx="4" fill="#f43f5e"/>
      <rect x="180" y="390" width="120" height="50" rx="4" fill="#38bdf8"/>
      <rect x="320" y="460" width="160" height="80" rx="4" fill="#6366f1"/>
      <rect x="500" y="380" width="100" height="40" rx="4" fill="#a855f7"/>
      <rect x="620" y="450" width="100" height="90" rx="4" fill="#6366f1"/>

      <!-- Breakdown Metrics -->
      <rect x="40" y="670" width="720" height="260" rx="28" fill="#141829" stroke="#222b48" stroke-width="2"/>
      <text x="80" y="730" fill="#ffffff" font-size="28" font-weight="bold">Total Restorative: 7h 48m</text>
      <text x="80" y="780" fill="#10b981" font-size="22">✓ Exceeded sleep need by 24 min</text>
      <text x="80" y="850" fill="#94a3b8" font-size="20">Sleep Consistency Score: 96 / 100</text>
    </svg>
  `),

  // App Store Download Badge (Black)
  appStoreBadgeBlack: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="360" height="110" viewBox="0 0 360 110">
      <rect width="360" height="110" rx="24" fill="#000000" stroke="#333333" stroke-width="2"/>
      <text x="45" y="72" fill="#ffffff" font-size="52" font-weight="bold"></text>
      <text x="110" y="48" fill="#ffffff" font-size="16" font-family="system-ui, sans-serif">Download on the</text>
      <text x="110" y="82" fill="#ffffff" font-size="28" font-weight="800" font-family="system-ui, sans-serif">App Store</text>
    </svg>
  `),

  // App Store Download Badge (White)
  appStoreBadgeWhite: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="360" height="110" viewBox="0 0 360 110">
      <rect width="360" height="110" rx="24" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
      <text x="45" y="72" fill="#000000" font-size="52" font-weight="bold"></text>
      <text x="110" y="48" fill="#000000" font-size="16" font-family="system-ui, sans-serif">Download on the</text>
      <text x="110" y="82" fill="#000000" font-size="28" font-weight="800" font-family="system-ui, sans-serif">App Store</text>
    </svg>
  `),

  // Product Hunt Kitty Badge (#1 Product of the Day)
  productHuntKittyBadge: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="460" height="110" viewBox="0 0 460 110">
      <rect width="460" height="110" rx="24" fill="#18181b" stroke="#27272a" stroke-width="2"/>
      <circle cx="55" cy="55" r="34" fill="#da552f"/>
      <text x="55" y="66" fill="#ffffff" font-size="32" font-weight="bold" text-anchor="middle">P</text>
      <text x="110" y="48" fill="#94a3b8" font-size="16" font-family="system-ui, sans-serif">PRODUCT HUNT</text>
      <text x="110" y="82" fill="#ffffff" font-size="24" font-weight="800" font-family="system-ui, sans-serif">#1 Product of the Day</text>
    </svg>
  `),

  // Product Hunt Ribbon Badge (#5 Product of the Day)
  productHuntBadge5: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="460" height="110" viewBox="0 0 460 110">
      <defs>
        <linearGradient id="phRedGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#b91c1c"/>
          <stop offset="100%" stop-color="#ea580c"/>
        </linearGradient>
      </defs>
      <rect width="460" height="110" rx="24" fill="url(#phRedGrad)" stroke="#fca5a5" stroke-width="1.5"/>
      <circle cx="55" cy="55" r="32" fill="#ffffff"/>
      <text x="55" y="66" fill="#ea580c" font-size="30" font-weight="900" text-anchor="middle">P</text>
      <text x="110" y="48" fill="#fef2f2" font-size="16" font-family="system-ui, sans-serif">FEATURED ON PRODUCT HUNT</text>
      <text x="110" y="82" fill="#ffffff" font-size="24" font-weight="800" font-family="system-ui, sans-serif">#5 Product of the Day</text>
    </svg>
  `),

  // Google Play Download Badge
  googlePlayBadge: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="360" height="110" viewBox="0 0 360 110">
      <rect width="360" height="110" rx="24" fill="#000000" stroke="#333333" stroke-width="2"/>
      <g transform="translate(35, 25)">
        <polygon points="0,5 0,55 35,30" fill="#38bdf8"/>
        <polygon points="0,5 35,30 25,12" fill="#4ade80"/>
        <polygon points="0,55 35,30 25,48" fill="#f87171"/>
        <polygon points="35,30 46,24 25,12" fill="#facc15"/>
      </g>
      <text x="105" y="48" fill="#ffffff" font-size="14" font-family="system-ui, sans-serif">GET IT ON</text>
      <text x="105" y="82" fill="#ffffff" font-size="28" font-weight="800" font-family="system-ui, sans-serif">Google Play</text>
    </svg>
  `),

  // Laurel Wreath: Product of the day 1st
  laurelProductHunt1st: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="300" viewBox="0 0 600 300">
      <g fill="#ffffff">
        <ellipse cx="140" cy="140" rx="20" ry="10" transform="rotate(-35 140 140)"/>
        <ellipse cx="150" cy="100" rx="18" ry="9" transform="rotate(-45 150 100)"/>
        <ellipse cx="175" cy="65" rx="17" ry="8" transform="rotate(-60 175 65)"/>
        <ellipse cx="160" cy="170" rx="18" ry="8" transform="rotate(-20 160 170)"/>
        <ellipse cx="460" cy="140" rx="20" ry="10" transform="rotate(35 460 140)"/>
        <ellipse cx="450" cy="100" rx="18" ry="9" transform="rotate(45 450 100)"/>
        <ellipse cx="425" cy="65" rx="17" ry="8" transform="rotate(60 425 65)"/>
        <ellipse cx="440" cy="170" rx="18" ry="8" transform="rotate(20 440 170)"/>
      </g>
      <text x="300" y="95" fill="#f59e0b" font-size="24" font-weight="bold" letter-spacing="3" text-anchor="middle">PRODUCT OF THE DAY</text>
      <text x="300" y="170" fill="#ffffff" font-size="72" font-weight="900" text-anchor="middle" font-family="system-ui, sans-serif">1st</text>
    </svg>
  `),

  // Laurel Wreath: Apps We Love
  laurelAppsWeLove: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="300" viewBox="0 0 600 300">
      <g fill="#ffffff">
        <ellipse cx="130" cy="140" rx="20" ry="10" transform="rotate(-35 130 140)"/>
        <ellipse cx="140" cy="100" rx="18" ry="9" transform="rotate(-45 140 100)"/>
        <ellipse cx="165" cy="65" rx="17" ry="8" transform="rotate(-60 165 65)"/>
        <ellipse cx="470" cy="140" rx="20" ry="10" transform="rotate(35 470 140)"/>
        <ellipse cx="460" cy="100" rx="18" ry="9" transform="rotate(45 460 100)"/>
        <ellipse cx="435" cy="65" rx="17" ry="8" transform="rotate(60 435 65)"/>
      </g>
      <text x="300" y="115" fill="#f43f5e" font-size="44" text-anchor="middle">♥</text>
      <text x="300" y="165" fill="#ffffff" font-size="36" font-weight="800" text-anchor="middle" font-family="system-ui, sans-serif">Apps We Love</text>
      <text x="300" y="200" fill="#94a3b8" font-size="20" text-anchor="middle">APPLE EDITORIAL</text>
    </svg>
  `),

  // Laurel Wreath: 4.9 Stars Rating
  laurelRating: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="300" viewBox="0 0 600 300">
      <g fill="#ffffff">
        <ellipse cx="135" cy="140" rx="20" ry="10" transform="rotate(-35 135 140)"/>
        <ellipse cx="145" cy="100" rx="18" ry="9" transform="rotate(-45 145 100)"/>
        <ellipse cx="170" cy="65" rx="17" ry="8" transform="rotate(-60 170 65)"/>
        <ellipse cx="465" cy="140" rx="20" ry="10" transform="rotate(35 465 140)"/>
        <ellipse cx="455" cy="100" rx="18" ry="9" transform="rotate(45 455 100)"/>
        <ellipse cx="430" cy="65" rx="17" ry="8" transform="rotate(60 430 65)"/>
      </g>
      <text x="300" y="110" fill="#fbbf24" font-size="34" letter-spacing="4" text-anchor="middle">★★★★★</text>
      <text x="300" y="165" fill="#ffffff" font-size="44" font-weight="900" text-anchor="middle" font-family="system-ui, sans-serif">4.9 Rating</text>
      <text x="300" y="200" fill="#94a3b8" font-size="20" text-anchor="middle">OVER 45,000 REVIEWS</text>
    </svg>
  `),

  // Developer Terminal Screen
  terminalDevScreen: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1600" viewBox="0 0 800 1600">
      <rect width="800" height="1600" fill="#090d16"/>
      <!-- Window Title -->
      <rect x="0" y="0" width="800" height="70" fill="#111827"/>
      <circle cx="40" cy="35" r="8" fill="#ef4444"/>
      <circle cx="65" cy="35" r="8" fill="#f59e0b"/>
      <circle cx="90" cy="35" r="8" fill="#10b981"/>
      <text x="400" y="42" fill="#9ca3af" font-size="20" text-anchor="middle" font-family="monospace">zsh — devflow@main</text>

      <!-- Terminal content -->
      <text x="50" y="140" fill="#38bdf8" font-size="24" font-family="monospace">~/apps/engine $</text>
      <text x="260" y="140" fill="#ffffff" font-size="24" font-family="monospace">pnpm run deploy:edge</text>
      <text x="50" y="190" fill="#10b981" font-size="22" font-family="monospace">✔ Built in 248ms [14 modules]</text>
      <text x="50" y="235" fill="#10b981" font-size="22" font-family="monospace">✔ Verified TypeScript strict types (0 errors)</text>
      <text x="50" y="280" fill="#6366f1" font-size="22" font-family="monospace">➜ Global CDN routing to 350+ PoPs</text>
      <text x="50" y="325" fill="#e2e8f0" font-size="22" font-family="monospace">  https://edge.devflow.sh/v4.9.1</text>
      
      <!-- Code Box -->
      <rect x="40" y="390" width="720" height="380" rx="20" fill="#131b2e" stroke="#1f293d" stroke-width="2"/>
      <text x="70" y="450" fill="#c084fc" font-size="22" font-family="monospace">export const</text>
      <text x="240" y="450" fill="#38bdf8" font-size="22" font-family="monospace">handler = async</text>
      <text x="440" y="450" fill="#ffffff" font-size="22" font-family="monospace">(req: Request) =&gt; {</text>
      <text x="100" y="500" fill="#64748b" font-size="22" font-family="monospace">// Zero cold start latency</text>
      <text x="100" y="550" fill="#c084fc" font-size="22" font-family="monospace">const</text>
      <text x="180" y="550" fill="#ffffff" font-size="22" font-family="monospace">{ latency, geo } = await telemetry();</text>
      <text x="100" y="600" fill="#c084fc" font-size="22" font-family="monospace">return</text>
      <text x="190" y="600" fill="#38bdf8" font-size="22" font-family="monospace">Response.json</text>
      <text x="360" y="600" fill="#ffffff" font-size="22" font-family="monospace">({ status: 200, ms: latency });</text>
      <text x="70" y="650" fill="#ffffff" font-size="22" font-family="monospace">};</text>
    </svg>
  `),

  // Private Banking Luxury Screen
  swissBankingScreen: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1600" viewBox="0 0 800 1600">
      <defs>
        <linearGradient id="goldCardGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#d97706"/>
          <stop offset="35%" stop-color="#fbbf24"/>
          <stop offset="70%" stop-color="#f59e0b"/>
          <stop offset="100%" stop-color="#b45309"/>
        </linearGradient>
      </defs>
      <rect width="800" height="1600" fill="#090a0f"/>
      <text x="70" y="80" fill="#ffffff" font-size="28" font-weight="bold">9:41</text>
      <text x="70" y="150" fill="#f59e0b" font-size="20" font-weight="bold" letter-spacing="2">NOVA PRIVATE VAULT</text>
      <text x="70" y="210" fill="#ffffff" font-size="52" font-weight="900">$840,250.00</text>
      <text x="70" y="250" fill="#10b981" font-size="22">+18.4% YTD (Zurich Multi-Asset)</text>

      <!-- Gold Obsidian Card -->
      <rect x="50" y="310" width="700" height="420" rx="36" fill="#151722" stroke="url(#goldCardGrad)" stroke-width="3"/>
      <text x="100" y="380" fill="#fbbf24" font-size="32" font-weight="900" letter-spacing="4">NOVA BLACK</text>
      <rect x="100" y="440" width="70" height="55" rx="12" fill="url(#goldCardGrad)"/>
      <text x="100" y="580" fill="#94a3b8" font-size="22" font-family="monospace">••••  ••••  ••••  9012</text>
      <text x="100" y="650" fill="#ffffff" font-size="24" font-weight="bold">ALEXANDER VON BERG</text>
      <text x="650" y="650" fill="#fbbf24" font-size="34" font-weight="bold" text-anchor="end">VISA</text>
    </svg>
  `),

  // Travel Boarding Pass Screen
  travelBoardingPass: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1600" viewBox="0 0 800 1600">
      <rect width="800" height="1600" fill="#0284c7"/>
      <text x="70" y="80" fill="#ffffff" font-size="28" font-weight="bold">9:41</text>
      <text x="70" y="140" fill="#e0f2fe" font-size="22">WANDERLUST PASSPORT</text>
      <text x="70" y="190" fill="#ffffff" font-size="44" font-weight="900">Upcoming Flight</text>

      <!-- Ticket Card -->
      <rect x="40" y="250" width="720" height="600" rx="32" fill="#ffffff"/>
      <text x="90" y="330" fill="#0284c7" font-size="56" font-weight="900">JFK</text>
      <text x="90" y="370" fill="#64748b" font-size="22">New York</text>

      <text x="400" y="340" fill="#0284c7" font-size="36" text-anchor="middle">✈ 7h 20m</text>

      <text x="710" y="330" fill="#0284c7" font-size="56" font-weight="900" text-anchor="end">LHR</text>
      <text x="710" y="370" fill="#64748b" font-size="22" text-anchor="end">London</text>

      <line x1="60" y1="430" x2="740" y2="430" stroke="#e2e8f0" stroke-width="2" stroke-dasharray="8 8"/>
      <text x="90" y="490" fill="#64748b" font-size="20">PASSENGER</text>
      <text x="90" y="530" fill="#0f172a" font-size="28" font-weight="bold">EMMA WATSON</text>
      <text x="400" y="490" fill="#64748b" font-size="20">GATE</text>
      <text x="400" y="530" fill="#0f172a" font-size="28" font-weight="bold">B24</text>
      <text x="710" y="490" fill="#64748b" font-size="20" text-anchor="end">SEAT</text>
      <text x="710" y="530" fill="#0284c7" font-size="28" font-weight="bold" text-anchor="end">3A (First)</text>
    </svg>
  `),

  // Culinary Recipe Screen
  culinaryRecipeScreen: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1600" viewBox="0 0 800 1600">
      <rect width="800" height="1600" fill="#fff7ed"/>
      <text x="70" y="80" fill="#431407" font-size="28" font-weight="bold">9:41</text>
      <text x="70" y="140" fill="#c2410c" font-size="22" font-weight="bold">FEAST ARTISAN JOURNAL</text>
      <text x="70" y="200" fill="#431407" font-size="44" font-weight="900">Black Truffle Tagliatelle</text>
      
      <!-- Recipe Card -->
      <rect x="40" y="260" width="720" height="480" rx="32" fill="#ffffff" stroke="#fed7aa" stroke-width="2"/>
      <circle cx="100" cy="330" r="30" fill="#ffedd5"/>
      <text x="100" y="342" font-size="30" text-anchor="middle">⏱</text>
      <text x="150" y="330" fill="#431407" font-size="24" font-weight="bold">25 min</text>
      <text x="150" y="355" fill="#9a3412" font-size="18">Prep & Cook</text>

      <circle cx="340" cy="330" r="30" fill="#ffedd5"/>
      <text x="340" y="342" font-size="30" text-anchor="middle">🔥</text>
      <text x="390" y="330" fill="#431407" font-size="24" font-weight="bold">520 kcal</text>
      <text x="390" y="355" fill="#9a3412" font-size="18">Per Serving</text>

      <circle cx="570" cy="330" r="30" fill="#ffedd5"/>
      <text x="570" y="342" font-size="30" text-anchor="middle">★</text>
      <text x="620" y="330" fill="#431407" font-size="24" font-weight="bold">4.9 / 5</text>
      <text x="620" y="355" fill="#9a3412" font-size="18">Michelin Chef</text>
    </svg>
  `),

  // Education Language Learning Screen
  languageLearningScreen: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1600" viewBox="0 0 800 1600">
      <rect width="800" height="1600" fill="#1e1b4b"/>
      <text x="70" y="80" fill="#ffffff" font-size="28" font-weight="bold">9:41</text>
      <!-- Streak pill -->
      <rect x="70" y="120" width="220" height="50" rx="25" fill="#f59e0b"/>
      <text x="180" y="152" fill="#ffffff" font-size="22" font-weight="900" text-anchor="middle">🔥 120 DAY STREAK</text>
      <text x="70" y="230" fill="#ffffff" font-size="44" font-weight="900">Italian Conversation</text>

      <!-- Question Card -->
      <rect x="40" y="280" width="720" height="460" rx="32" fill="#312e81" stroke="#4338ca" stroke-width="2"/>
      <text x="90" y="360" fill="#a5b4fc" font-size="24">Translate this phrase:</text>
      <text x="90" y="420" fill="#ffffff" font-size="38" font-weight="bold">"Vorrei un caffè, per favore."</text>
      
      <rect x="90" y="480" width="620" height="80" rx="20" fill="#4338ca"/>
      <text x="130" y="530" fill="#ffffff" font-size="26" font-weight="bold">A) I would like a coffee, please.</text>
      <rect x="90" y="580" width="620" height="80" rx="20" fill="#232050"/>
      <text x="130" y="630" fill="#94a3b8" font-size="26">B) Where is the train station?</text>
    </svg>
  `),

  // Google Play Badge (White Style)
  googlePlayBadgeWhite: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="360" height="110" viewBox="0 0 360 110">
      <rect width="360" height="110" rx="24" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
      <g transform="translate(35, 25)">
        <polygon points="0,5 0,55 35,30" fill="#0284c7"/>
        <polygon points="0,5 35,30 25,12" fill="#16a34a"/>
        <polygon points="0,55 35,30 25,48" fill="#dc2626"/>
        <polygon points="35,30 46,24 25,12" fill="#ca8a04"/>
      </g>
      <text x="105" y="48" fill="#0f172a" font-size="14" font-family="system-ui, sans-serif">GET IT ON</text>
      <text x="105" y="82" fill="#0f172a" font-size="28" font-weight="800" font-family="system-ui, sans-serif">Google Play</text>
    </svg>
  `),

  // Laurel Wreath: Google Play Best of 2026
  googlePlayBest2026: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="300" viewBox="0 0 600 300">
      <g fill="#ffffff">
        <ellipse cx="130" cy="140" rx="20" ry="10" transform="rotate(-35 130 140)"/>
        <ellipse cx="140" cy="100" rx="18" ry="9" transform="rotate(-45 140 100)"/>
        <ellipse cx="165" cy="65" rx="17" ry="8" transform="rotate(-60 165 65)"/>
        <ellipse cx="470" cy="140" rx="20" ry="10" transform="rotate(35 470 140)"/>
        <ellipse cx="460" cy="100" rx="18" ry="9" transform="rotate(45 460 100)"/>
        <ellipse cx="435" cy="65" rx="17" ry="8" transform="rotate(60 435 65)"/>
      </g>
      <g transform="translate(285, 60)">
        <polygon points="0,5 0,45 28,25" fill="#38bdf8"/>
        <polygon points="0,5 28,25 20,10" fill="#4ade80"/>
        <polygon points="0,45 28,25 20,40" fill="#f87171"/>
        <polygon points="28,25 36,20 20,10" fill="#facc15"/>
      </g>
      <text x="300" y="150" fill="#ffffff" font-size="34" font-weight="900" text-anchor="middle" font-family="system-ui, sans-serif">BEST OF 2026</text>
      <text x="300" y="190" fill="#38bdf8" font-size="22" font-weight="700" letter-spacing="3" text-anchor="middle">GOOGLE PLAY WINNER</text>
    </svg>
  `),

  // Google Play Editor's Choice Hexagon Badge
  googlePlayEditorsChoice: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="460" height="110" viewBox="0 0 460 110">
      <rect width="460" height="110" rx="24" fill="#0f172a" stroke="#0284c7" stroke-width="2"/>
      <circle cx="55" cy="55" r="32" fill="#0284c7"/>
      <text x="55" y="65" fill="#ffffff" font-size="30" font-weight="bold" text-anchor="middle">★</text>
      <text x="110" y="48" fill="#38bdf8" font-size="14" font-weight="bold" letter-spacing="1">GOOGLE PLAY</text>
      <text x="110" y="82" fill="#ffffff" font-size="26" font-weight="800" font-family="system-ui, sans-serif">Editor's Choice</text>
    </svg>
  `),

  // Laurel Wreath: TechCrunch Disrupt Winner
  techcrunchDisrupt: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="300" viewBox="0 0 600 300">
      <g fill="#ffffff">
        <ellipse cx="130" cy="140" rx="20" ry="10" transform="rotate(-35 130 140)"/>
        <ellipse cx="140" cy="100" rx="18" ry="9" transform="rotate(-45 140 100)"/>
        <ellipse cx="165" cy="65" rx="17" ry="8" transform="rotate(-60 165 65)"/>
        <ellipse cx="470" cy="140" rx="20" ry="10" transform="rotate(35 470 140)"/>
        <ellipse cx="460" cy="100" rx="18" ry="9" transform="rotate(45 460 100)"/>
        <ellipse cx="435" cy="65" rx="17" ry="8" transform="rotate(60 435 65)"/>
      </g>
      <text x="300" y="105" fill="#10b981" font-size="26" font-weight="900" letter-spacing="3" text-anchor="middle">TECHCRUNCH</text>
      <text x="300" y="160" fill="#ffffff" font-size="40" font-weight="900" text-anchor="middle" font-family="system-ui, sans-serif">Disrupt Winner</text>
      <text x="300" y="195" fill="#94a3b8" font-size="18" text-anchor="middle">SAN FRANCISCO</text>
    </svg>
  `),

  // Laurel Wreath: Golden Kitty Award Winner
  goldenKittyAward: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="300" viewBox="0 0 600 300">
      <g fill="#fbbf24">
        <ellipse cx="130" cy="140" rx="20" ry="10" transform="rotate(-35 130 140)"/>
        <ellipse cx="140" cy="100" rx="18" ry="9" transform="rotate(-45 140 100)"/>
        <ellipse cx="165" cy="65" rx="17" ry="8" transform="rotate(-60 165 65)"/>
        <ellipse cx="470" cy="140" rx="20" ry="10" transform="rotate(35 470 140)"/>
        <ellipse cx="460" cy="100" rx="18" ry="9" transform="rotate(45 460 100)"/>
        <ellipse cx="435" cy="65" rx="17" ry="8" transform="rotate(60 435 65)"/>
      </g>
      <text x="300" y="100" fill="#f59e0b" font-size="36" text-anchor="middle">🏆</text>
      <text x="300" y="150" fill="#ffffff" font-size="34" font-weight="900" text-anchor="middle">Golden Kitty</text>
      <text x="300" y="185" fill="#fbbf24" font-size="20" font-weight="bold" letter-spacing="2" text-anchor="middle">PRODUCT HUNT AWARDS</text>
    </svg>
  `),

  // Laurel Wreath: 10M+ Users Worldwide
  oneMillionUsers: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="300" viewBox="0 0 600 300">
      <g fill="#ffffff">
        <ellipse cx="130" cy="140" rx="20" ry="10" transform="rotate(-35 130 140)"/>
        <ellipse cx="140" cy="100" rx="18" ry="9" transform="rotate(-45 140 100)"/>
        <ellipse cx="165" cy="65" rx="17" ry="8" transform="rotate(-60 165 65)"/>
        <ellipse cx="470" cy="140" rx="20" ry="10" transform="rotate(35 470 140)"/>
        <ellipse cx="460" cy="100" rx="18" ry="9" transform="rotate(45 460 100)"/>
        <ellipse cx="435" cy="65" rx="17" ry="8" transform="rotate(60 435 65)"/>
      </g>
      <text x="300" y="110" fill="#38bdf8" font-size="30" letter-spacing="4" text-anchor="middle">WORLDWIDE</text>
      <text x="300" y="165" fill="#ffffff" font-size="48" font-weight="900" text-anchor="middle">10M+ Users</text>
      <text x="300" y="200" fill="#94a3b8" font-size="18" text-anchor="middle">OVER 120 COUNTRIES</text>
    </svg>
  `),

  // Dual Store Badge (App Store + Google Play)
  appStoreGooglePlayDuo: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="500" height="110" viewBox="0 0 500 110">
      <rect width="500" height="110" rx="24" fill="#000000" stroke="#333333" stroke-width="2"/>
      <!-- Apple icon -->
      <text x="60" y="72" fill="#ffffff" font-size="44" font-weight="bold"></text>
      <text x="110" y="48" fill="#94a3b8" font-size="14">App Store</text>
      <text x="110" y="78" fill="#ffffff" font-size="22" font-weight="bold">iOS</text>

      <line x1="240" y1="20" x2="240" y2="90" stroke="#333333" stroke-width="2"/>

      <!-- Google Play icon -->
      <g transform="translate(270, 30)">
        <polygon points="0,5 0,45 28,25" fill="#38bdf8"/>
        <polygon points="0,5 28,25 20,10" fill="#4ade80"/>
        <polygon points="0,45 28,25 20,40" fill="#f87171"/>
        <polygon points="28,25 36,20 20,10" fill="#facc15"/>
      </g>
      <text x="325" y="48" fill="#94a3b8" font-size="14">Google Play</text>
      <text x="325" y="78" fill="#ffffff" font-size="22" font-weight="bold">Android</text>
    </svg>
  `),

  // Mac App Store Badge
  macAppStoreBadge: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="380" height="110" viewBox="0 0 380 110">
      <rect width="380" height="110" rx="24" fill="#000000" stroke="#333333" stroke-width="2"/>
      <text x="45" y="72" fill="#ffffff" font-size="52" font-weight="bold"></text>
      <text x="110" y="48" fill="#94a3b8" font-size="16">Download on the</text>
      <text x="110" y="82" fill="#ffffff" font-size="26" font-weight="800">Mac App Store</text>
    </svg>
  `),

  // Chrome Web Store Badge
  chromeWebStoreBadge: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="380" height="110" viewBox="0 0 380 110">
      <rect width="380" height="110" rx="24" fill="#0f172a" stroke="#2563eb" stroke-width="2"/>
      <circle cx="55" cy="55" r="28" fill="#2563eb"/>
      <text x="55" y="66" fill="#ffffff" font-size="28" font-weight="bold" text-anchor="middle">🌐</text>
      <text x="105" y="48" fill="#93c5fd" font-size="14">Available in the</text>
      <text x="105" y="82" fill="#ffffff" font-size="24" font-weight="800">Chrome Web Store</text>
    </svg>
  `),

  // Direct APK Download Badge
  apkDirectDownload: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="380" height="110" viewBox="0 0 380 110">
      <rect width="380" height="110" rx="24" fill="#13221b" stroke="#10b981" stroke-width="2"/>
      <circle cx="55" cy="55" r="28" fill="#10b981"/>
      <text x="55" y="66" fill="#ffffff" font-size="26" text-anchor="middle">⬇</text>
      <text x="105" y="48" fill="#6ee7b7" font-size="14">DIRECT INSTALL</text>
      <text x="105" y="82" fill="#ffffff" font-size="26" font-weight="800">Download APK</text>
    </svg>
  `),

  // 1. Android Material You Banking Screen
  androidMaterialBanking: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1600" viewBox="0 0 800 1600">
      <rect width="800" height="1600" fill="#00201a"/>
      <!-- Status bar -->
      <text x="60" y="70" fill="#ffffff" font-size="28" font-weight="bold">10:42</text>
      <circle cx="730" cy="62" r="14" fill="#004d40"/>
      <!-- Header -->
      <text x="60" y="150" fill="#80cbc4" font-size="22" font-weight="bold" letter-spacing="2">PIXELPULSE FINTECH</text>
      <text x="60" y="210" fill="#e0f2f1" font-size="32">Available Balance</text>
      <text x="60" y="280" fill="#ffffff" font-size="64" font-weight="900">$34,820.50</text>
      <text x="60" y="325" fill="#4db6ac" font-size="22">+ $2,450.00 this week (4.8% APY)</text>

      <!-- Quick Action Pills -->
      <rect x="60" y="370" width="150" height="60" rx="30" fill="#004d40"/>
      <text x="135" y="408" fill="#ffffff" font-size="22" font-weight="bold" text-anchor="middle">↑ Send</text>

      <rect x="230" y="370" width="150" height="60" rx="30" fill="#004d40"/>
      <text x="305" y="408" fill="#ffffff" font-size="22" font-weight="bold" text-anchor="middle">↓ Request</text>

      <rect x="400" y="370" width="150" height="60" rx="30" fill="#004d40"/>
      <text x="475" y="408" fill="#ffffff" font-size="22" font-weight="bold" text-anchor="middle">⚡ Pay</text>

      <!-- Material Dynamic Card -->
      <rect x="40" y="470" width="720" height="420" rx="36" fill="#00332c" stroke="#00695c" stroke-width="2"/>
      <text x="80" y="540" fill="#ffffff" font-size="28" font-weight="bold">Recent Activity</text>
      <text x="720" y="540" fill="#80cbc4" font-size="22" text-anchor="end">View all</text>

      <rect x="70" y="580" width="660" height="90" rx="20" fill="#004037"/>
      <circle cx="115" cy="625" r="22" fill="#00695c"/>
      <text x="115" y="635" fill="#ffffff" font-size="24" text-anchor="middle">☕</text>
      <text x="160" y="620" fill="#ffffff" font-size="24" font-weight="bold">Blue Bottle Coffee</text>
      <text x="160" y="648" fill="#80cbc4" font-size="18">Contactless NFC • Google Wallet</text>
      <text x="690" y="635" fill="#ffffff" font-size="26" font-weight="bold" text-anchor="end">-$6.40</text>

      <rect x="70" y="690" width="660" height="90" rx="20" fill="#004037"/>
      <circle cx="115" cy="735" r="22" fill="#00695c"/>
      <text x="115" y="745" fill="#ffffff" font-size="24" text-anchor="middle">💼</text>
      <text x="160" y="730" fill="#ffffff" font-size="24" font-weight="bold">Stripe Direct Payout</text>
      <text x="160" y="758" fill="#80cbc4" font-size="18">Instant settlement</text>
      <text x="690" y="745" fill="#4db6ac" font-size="26" font-weight="bold" text-anchor="end">+$2,450.00</text>
    </svg>
  `),

  // 2. Android Gemini AI Assistant Screen
  androidGeminiAi: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1600" viewBox="0 0 800 1600">
      <defs>
        <linearGradient id="geminiGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#38bdf8"/>
          <stop offset="50%" stop-color="#818cf8"/>
          <stop offset="100%" stop-color="#c084fc"/>
        </linearGradient>
      </defs>
      <rect width="800" height="1600" fill="#090a0f"/>
      <text x="60" y="70" fill="#ffffff" font-size="28" font-weight="bold">10:42</text>
      
      <!-- Sparkle Icon -->
      <g transform="translate(60, 120)">
        <polygon points="25,0 30,18 48,25 30,32 25,50 20,32 2,25 20,18" fill="url(#geminiGrad)"/>
      </g>
      <text x="120" y="155" fill="#ffffff" font-size="32" font-weight="bold">Nova Gemini Copilot</text>

      <!-- Prompt Result Card -->
      <rect x="40" y="210" width="720" height="480" rx="36" fill="#131622" stroke="#252a3d" stroke-width="2"/>
      <text x="80" y="280" fill="#c084fc" font-size="22" font-weight="bold">✦ ON-DEVICE MULTI-MODAL REASONING</text>
      <text x="80" y="340" fill="#ffffff" font-size="34" font-weight="bold">"Analyze our Google Play metrics & suggest 3 growth levers."</text>
      
      <rect x="80" y="380" width="640" height="2" fill="#252a3d"/>
      <text x="80" y="440" fill="#94a3b8" font-size="24">1. Localize screenshots for 14 languages</text>
      <text x="80" y="490" fill="#94a3b8" font-size="24">2. Highlight Wear OS & Android Auto companion apps</text>
      <text x="80" y="540" fill="#94a3b8" font-size="24">3. Enable Material You dynamic color palettes</text>

      <!-- Live Waveform -->
      <rect x="40" y="720" width="720" height="120" rx="30" fill="#181c2c"/>
      <path d="M 80 780 Q 150 730 220 780 T 360 780 T 500 740 T 640 780 T 700 780" fill="none" stroke="url(#geminiGrad)" stroke-width="6" stroke-linecap="round"/>
    </svg>
  `),

  // 3. Android Health Connect & Wear OS Screen
  androidHealthConnect: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1600" viewBox="0 0 800 1600">
      <rect width="800" height="1600" fill="#0d1117"/>
      <text x="60" y="70" fill="#ffffff" font-size="28" font-weight="bold">10:42</text>
      <text x="60" y="140" fill="#10b981" font-size="22" font-weight="bold">HEALTH CONNECT SYNCED</text>
      <text x="60" y="200" fill="#ffffff" font-size="44" font-weight="900">Today's Performance</text>

      <!-- 3 Concentric Android Rings -->
      <g transform="translate(400, 460)">
        <circle r="190" fill="none" stroke="#1f2937" stroke-width="26"/>
        <circle r="190" fill="none" stroke="#10b981" stroke-width="26" stroke-dasharray="1193" stroke-dashoffset="240" stroke-linecap="round"/>

        <circle r="150" fill="none" stroke="#1f2937" stroke-width="26"/>
        <circle r="150" fill="none" stroke="#3b82f6" stroke-width="26" stroke-dasharray="942" stroke-dashoffset="180" stroke-linecap="round"/>

        <circle r="110" fill="none" stroke="#1f2937" stroke-width="26"/>
        <circle r="110" fill="none" stroke="#ec4899" stroke-width="26" stroke-dasharray="691" stroke-dashoffset="120" stroke-linecap="round"/>

        <text y="-10" fill="#ffffff" font-size="54" font-weight="900" text-anchor="middle">11,420</text>
        <text y="30" fill="#9ca3af" font-size="22" text-anchor="middle">DAILY STEPS</text>
      </g>

      <!-- Two metric widgets -->
      <rect x="50" y="720" width="330" height="180" rx="28" fill="#161b22" stroke="#30363d" stroke-width="2"/>
      <text x="80" y="775" fill="#ec4899" font-size="20" font-weight="bold">ACTIVE CALS</text>
      <text x="80" y="845" fill="#ffffff" font-size="48" font-weight="800">840 <tspan font-size="20" fill="#9ca3af">kcal</tspan></text>

      <rect x="420" y="720" width="330" height="180" rx="28" fill="#161b22" stroke="#30363d" stroke-width="2"/>
      <text x="450" y="775" fill="#3b82f6" font-size="20" font-weight="bold">WEAR OS BPM</text>
      <text x="450" y="845" fill="#ffffff" font-size="48" font-weight="800">62 <tspan font-size="20" fill="#9ca3af">resting</tspan></text>
    </svg>
  `),

  // 4. Android EV Connected Car HUD Screen
  androidEvCarHud: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1600" viewBox="0 0 800 1600">
      <defs>
        <linearGradient id="evGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#0284c7"/>
          <stop offset="100%" stop-color="#38bdf8"/>
        </linearGradient>
      </defs>
      <rect width="800" height="1600" fill="#060c18"/>
      <text x="60" y="70" fill="#ffffff" font-size="28" font-weight="bold">10:42</text>
      <text x="60" y="140" fill="#38bdf8" font-size="22" font-weight="bold">CONNECTED VEHICLE</text>
      <text x="60" y="200" fill="#ffffff" font-size="44" font-weight="900">CyberTruck Long Range</text>

      <!-- Battery Arc Gauge -->
      <g transform="translate(400, 420)">
        <circle r="180" fill="none" stroke="#132238" stroke-width="24"/>
        <circle r="180" fill="none" stroke="url(#evGrad)" stroke-width="24" stroke-dasharray="1130" stroke-dashoffset="180" stroke-linecap="round"/>
        <text y="-10" fill="#ffffff" font-size="72" font-weight="900" text-anchor="middle">86%</text>
        <text y="40" fill="#38bdf8" font-size="26" font-weight="bold" text-anchor="middle">342 MI RANGE</text>
      </g>

      <!-- Control Pills -->
      <rect x="50" y="680" width="330" height="130" rx="28" fill="#0f1d33" stroke="#1d3557" stroke-width="2"/>
      <text x="90" y="735" fill="#38bdf8" font-size="24">⚡ Supercharger</text>
      <text x="90" y="775" fill="#ffffff" font-size="28" font-weight="bold">+45 mi in 10m</text>

      <rect x="420" y="680" width="330" height="130" rx="28" fill="#0f1d33" stroke="#1d3557" stroke-width="2"/>
      <text x="460" y="735" fill="#38bdf8" font-size="24">❄ Climate Pre-set</text>
      <text x="460" y="775" fill="#ffffff" font-size="28" font-weight="bold">21°C Active</text>
    </svg>
  `),

  // 5. Android Matter Smart Home Screen
  androidSmartHome: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1600" viewBox="0 0 800 1600">
      <rect width="800" height="1600" fill="#18120c"/>
      <text x="60" y="70" fill="#ffffff" font-size="28" font-weight="bold">10:42</text>
      <text x="60" y="140" fill="#f59e0b" font-size="22" font-weight="bold">MATTER CERTIFIED IOT</text>
      <text x="60" y="200" fill="#ffffff" font-size="44" font-weight="900">Modern Atelier Home</text>

      <!-- Thermostat Dial -->
      <rect x="40" y="260" width="720" height="340" rx="36" fill="#291d14" stroke="#453123" stroke-width="2"/>
      <text x="80" y="325" fill="#f59e0b" font-size="24" font-weight="bold">CLIMATE CONTROL</text>
      <text x="80" y="420" fill="#ffffff" font-size="80" font-weight="900">22.5° <tspan font-size="32" fill="#d97706">Living Room</tspan></text>
      <text x="80" y="470" fill="#fbbf24" font-size="22">Eco Mode: 14% energy saved today</text>

      <!-- Smart device toggles -->
      <rect x="50" y="640" width="330" height="180" rx="28" fill="#291d14"/>
      <text x="80" y="700" fill="#fbbf24" font-size="34">💡</text>
      <text x="80" y="750" fill="#ffffff" font-size="26" font-weight="bold">Studio Lights</text>
      <text x="80" y="785" fill="#f59e0b" font-size="20">85% Warm 2700K</text>

      <rect x="420" y="640" width="330" height="180" rx="28" fill="#291d14"/>
      <text x="450" y="700" fill="#fbbf24" font-size="34">🔒</text>
      <text x="450" y="750" fill="#ffffff" font-size="26" font-weight="bold">Front Door Lock</text>
      <text x="450" y="785" fill="#10b981" font-size="20">Secured • NFC Ready</text>
    </svg>
  `),

  // 6. Android Hi-Fi Music Player Screen
  androidSoundwavePlayer: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1600" viewBox="0 0 800 1600">
      <defs>
        <linearGradient id="soundGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#9333ea"/>
          <stop offset="100%" stop-color="#c084fc"/>
        </linearGradient>
      </defs>
      <rect width="800" height="1600" fill="#0d0718"/>
      <text x="60" y="70" fill="#ffffff" font-size="28" font-weight="bold">10:42</text>
      
      <!-- Album Vinyl Art -->
      <rect x="140" y="160" width="520" height="520" rx="40" fill="#1f1035" stroke="#3b1d63" stroke-width="2"/>
      <circle cx="400" cy="420" r="180" fill="#120822"/>
      <circle cx="400" cy="420" r="70" fill="url(#soundGrad)"/>
      <circle cx="400" cy="420" r="20" fill="#ffffff"/>

      <text x="400" y="740" fill="#ffffff" font-size="40" font-weight="900" text-anchor="middle">Midnight Horizon</text>
      <text x="400" y="785" fill="#c084fc" font-size="24" text-anchor="middle">Aetheria • 24-bit / 192kHz Lossless FLAC</text>

      <!-- Scrub bar -->
      <rect x="80" y="840" width="640" height="8" rx="4" fill="#3b1d63"/>
      <rect x="80" y="840" width="420" height="8" rx="4" fill="#c084fc"/>
      <circle cx="500" cy="844" r="10" fill="#ffffff"/>
    </svg>
  `),

  // 7. Android Offline Topographic GPS Map Screen
  androidOfflineGps: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1600" viewBox="0 0 800 1600">
      <rect width="800" height="1600" fill="#0c1d2e"/>
      <text x="60" y="70" fill="#ffffff" font-size="28" font-weight="bold">10:42</text>
      <!-- Topo map contour lines -->
      <path d="M 0 300 Q 200 240 400 350 T 800 280" fill="none" stroke="#1a3b5c" stroke-width="4"/>
      <path d="M 0 450 Q 300 400 500 500 T 800 420" fill="none" stroke="#1a3b5c" stroke-width="4"/>
      <path d="M 0 600 Q 250 560 450 680 T 800 590" fill="none" stroke="#1a3b5c" stroke-width="4"/>

      <!-- Route Line (Glowing Cyan) -->
      <path d="M 120 750 L 280 620 L 440 680 L 580 420 L 680 320" fill="none" stroke="#38bdf8" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="680" cy="320" r="24" fill="#f43f5e"/>
      <circle cx="680" cy="320" r="10" fill="#ffffff"/>

      <!-- Navigation Card -->
      <rect x="40" y="140" width="720" height="180" rx="32" fill="#0f2b48" stroke="#1e4d7a" stroke-width="2"/>
      <text x="80" y="210" fill="#38bdf8" font-size="44" font-weight="900">In 400m</text>
      <text x="80" y="260" fill="#ffffff" font-size="28" font-weight="bold">Turn right onto Alpine Ridge Pass</text>
    </svg>
  `),

  // 8. Android Zen Sleep & Meditation Screen
  androidZenSleepTimer: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1600" viewBox="0 0 800 1600">
      <defs>
        <linearGradient id="zenGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0e1e2d"/>
          <stop offset="100%" stop-color="#1e3a53"/>
        </linearGradient>
      </defs>
      <rect width="800" height="1600" fill="url(#zenGrad)"/>
      <text x="60" y="70" fill="#ffffff" font-size="28" font-weight="bold">10:42</text>
      
      <!-- Glowing Moon -->
      <circle cx="400" cy="340" r="140" fill="#f8fafc" opacity="0.95"/>
      <circle cx="450" cy="310" r="120" fill="url(#zenGrad)"/>

      <text x="400" y="560" fill="#ffffff" font-size="52" font-weight="900" text-anchor="middle">Deep Sleep Flow</text>
      <text x="400" y="610" fill="#93c5fd" font-size="24" text-anchor="middle">Rain on Nordic Cedar Forest • 45 min</text>

      <!-- 4-7-8 Breathing Circle -->
      <rect x="60" y="680" width="680" height="180" rx="32" fill="#13273c" stroke="#254668" stroke-width="2"/>
      <text x="100" y="750" fill="#60a5fa" font-size="26" font-weight="bold">BREATHING PACER</text>
      <text x="100" y="810" fill="#ffffff" font-size="40" font-weight="bold">Breathe In... 4s</text>
    </svg>
  `),

  // 9. Android Web3 DEX Crypto Screen
  androidCryptoDex: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1600" viewBox="0 0 800 1600">
      <rect width="800" height="1600" fill="#090a0f"/>
      <text x="60" y="70" fill="#ffffff" font-size="28" font-weight="bold">10:42</text>
      <text x="60" y="140" fill="#f59e0b" font-size="22" font-weight="bold">CRYPTOVAULT ANDROID DEX</text>
      <text x="60" y="210" fill="#ffffff" font-size="56" font-weight="900">$240,580.40</text>
      <text x="60" y="260" fill="#10b981" font-size="24" font-weight="bold">+14.2% Today (Multi-Chain Vault)</text>

      <!-- Swap Card -->
      <rect x="40" y="320" width="720" height="420" rx="36" fill="#151722" stroke="#2a2e42" stroke-width="2"/>
      <text x="80" y="380" fill="#94a3b8" font-size="20">YOU PAY</text>
      <text x="80" y="440" fill="#ffffff" font-size="48" font-weight="bold">4.50 ETH</text>
      <text x="680" y="440" fill="#818cf8" font-size="28" font-weight="bold" text-anchor="end">Ethereum</text>

      <line x1="80" y1="480" x2="680" y2="480" stroke="#2a2e42" stroke-width="2"/>

      <text x="80" y="530" fill="#94a3b8" font-size="20">YOU RECEIVE</text>
      <text x="80" y="590" fill="#ffffff" font-size="48" font-weight="bold">11,480 USDC</text>
      <text x="680" y="590" fill="#38bdf8" font-size="28" font-weight="bold" text-anchor="end">Solana</text>

      <!-- Instant Swap Button -->
      <rect x="80" y="630" width="600" height="74" rx="24" fill="#f59e0b"/>
      <text x="380" y="678" fill="#000000" font-size="26" font-weight="900" text-anchor="middle">CONFIRM BIOMETRIC SWAP</text>
    </svg>
  `),

  // 10. Android Food Delivery & Courier Screen
  androidFoodCourier: createSvgDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1600" viewBox="0 0 800 1600">
      <rect width="800" height="1600" fill="#fff7ed"/>
      <text x="60" y="70" fill="#431407" font-size="28" font-weight="bold">10:42</text>
      <text x="60" y="140" fill="#ea580c" font-size="22" font-weight="bold">QUICKBITE EXPRESS</text>
      <text x="60" y="200" fill="#431407" font-size="44" font-weight="900">Order Arriving in 14 min</text>

      <!-- Live Delivery Progress Card -->
      <rect x="40" y="260" width="720" height="460" rx="36" fill="#ffffff" stroke="#fed7aa" stroke-width="2"/>
      <circle cx="100" cy="330" r="30" fill="#ffedd5"/>
      <text x="100" y="342" font-size="30" text-anchor="middle">🛵</text>
      <text x="150" y="330" fill="#431407" font-size="26" font-weight="bold">Marco is on the way</text>
      <text x="150" y="360" fill="#ea580c" font-size="20">Yamaha NMAX • Order #4910</text>

      <!-- Progress Track -->
      <line x1="80" y1="430" x2="680" y2="430" stroke="#fed7aa" stroke-width="8" stroke-linecap="round"/>
      <line x1="80" y1="430" x2="520" y2="430" stroke="#ea580c" stroke-width="8" stroke-linecap="round"/>

      <text x="80" y="510" fill="#78350f" font-size="24" font-weight="bold">2x Artisanal Wagyu Smash Burgers</text>
      <text x="80" y="550" fill="#9a3412" font-size="20">1x Truffle Parmesan Fries • 1x Zero Cola</text>

      <!-- 1-tap reorder -->
      <rect x="80" y="600" width="600" height="74" rx="24" fill="#ea580c"/>
      <text x="380" y="648" fill="#ffffff" font-size="24" font-weight="900" text-anchor="middle">TRACK LIVE ON MAP</text>
    </svg>
  `),
};
