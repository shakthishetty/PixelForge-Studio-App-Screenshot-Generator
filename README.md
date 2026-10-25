# PixelForge Studio - App Store & Google Play Screenshot Studio

> Professional web application for creating high-converting App Store screenshots, Google Play Store visuals, device mockups, and feature graphics.

![PixelForge Studio](public/preview.png)

## ✨ Features

- **Coordinated Multi-Canvas Workspace**: Design 4 coordinated screenshots simultaneously in a unified horizontal canvas.
- **Store Presets Built-in**:
  - Google Play Phone (1080 × 1920 px)
  - Google Play Feature Graphic (1024 × 500 px)
  - iPhone 6.9" & 6.7" (1290 × 2796 px / 1179 × 2556 px)
  - Android & iPad Tablets (1200 × 1920 px / 2048 × 2732 px)
  - Social & Landscape Banners (1080 × 1080 px / 1440 × 900 px)
- **10+ Curated Android & iOS Templates**: Material You Banking, Nova Gemini AI, FitTrack Health Connect, SaaS Dashboards, Crypto DeFi, and Minimalist sets.
- **Interactive Device Mockups**: Dynamic Island, bezel-less frames, dual-mockup layout, titanium themes (Dark Titanium, Natural Titanium, Desert Gold, Midnight).
- **Dynamic Content & Descriptions**: Real-time headline editing, customizable subtitle descriptions, live font family selection (Archivo, Inter, Plus Jakarta Sans, Geist, Outfit, Roboto).
- **Canvas Re-arrangement**: Reorder screens in seconds via the 6-dots `[ ⠿ ]` handle using drag-and-drop or one-click left/right controls.
- **High-Resolution Multi-Format Export**: Export individual canvases or all screens at once in PNG/JPEG with 1x, 2x, and 3x scale options.
- **Zero Browser Alerts**: Sleek, non-intrusive floating toast notifications and button loading indicators.

---

## 🐳 Docker Deployment

### 1. Using Docker Compose (Recommended)

```bash
docker compose up -d --build
```
Open [http://localhost:3001](http://localhost:3001) in your browser.

### 2. Using Docker CLI

```bash
# Build the production image
docker build -t pixelforge-studio .

# Run the container
docker run -p 3000:3000 pixelforge-studio
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚀 Local Development

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Turbopack, Standalone output)
- **Interactive Canvas**: [React Konva](https://konvajs.org/) & [Konva](https://konvajs.org/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) with undo/redo history
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & Vanilla CSS design system
- **Icons**: [Lucide React](https://lucide.dev/)
- **Containerization**: [Docker](https://www.docker.com/) (Multi-stage Node 20 Alpine)
