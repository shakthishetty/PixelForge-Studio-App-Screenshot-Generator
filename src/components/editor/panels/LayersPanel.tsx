"use client";

import React, { useState, useEffect } from "react";
import { useEditorStore } from "@/stores/editor-store";
import { CanvasElement, ImageElement, BadgeElement } from "@/types/editor";
import { SAMPLE_SCREENS } from "@/lib/constants/sample-screens";
import {
  Layers,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Trash2,
  Copy,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  Type,
  Smartphone,
  Sparkles,
  Square,
  Circle,
  ArrowRight,
  Plus,
  Search,
  Award,
  Check,
} from "lucide-react";

interface BadgePreset {
  id: string;
  name: string;
  category: "app_stores" | "product_hunt" | "custom_laurel" | "awards";
  type: "badge" | "image";
  text?: string;
  url?: string;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  width: number;
  height: number;
}

const BADGE_PRESETS: BadgePreset[] = [
  // 1. App Stores
  {
    id: "app-store-black",
    name: "Download on App Store (Black)",
    category: "app_stores",
    type: "image",
    url: SAMPLE_SCREENS.appStoreBadgeBlack,
    width: 360,
    height: 110,
  },
  {
    id: "app-store-white",
    name: "Download on App Store (White)",
    category: "app_stores",
    type: "image",
    url: SAMPLE_SCREENS.appStoreBadgeWhite,
    width: 360,
    height: 110,
  },
  {
    id: "google-play-badge-black",
    name: "Get it on Google Play (Black)",
    category: "app_stores",
    type: "image",
    url: SAMPLE_SCREENS.googlePlayBadge,
    width: 360,
    height: 110,
  },
  {
    id: "google-play-badge-white",
    name: "Get it on Google Play (White)",
    category: "app_stores",
    type: "image",
    url: SAMPLE_SCREENS.googlePlayBadgeWhite,
    width: 360,
    height: 110,
  },
  {
    id: "duo-app-store-google-play",
    name: "App Store & Google Play Duo",
    category: "app_stores",
    type: "image",
    url: SAMPLE_SCREENS.appStoreGooglePlayDuo,
    width: 480,
    height: 110,
  },
  {
    id: "mac-app-store",
    name: "Download on Mac App Store",
    category: "app_stores",
    type: "image",
    url: SAMPLE_SCREENS.macAppStoreBadge,
    width: 380,
    height: 110,
  },
  {
    id: "chrome-web-store",
    name: "Available in Chrome Web Store",
    category: "app_stores",
    type: "image",
    url: SAMPLE_SCREENS.chromeWebStoreBadge,
    width: 380,
    height: 110,
  },
  {
    id: "apk-direct-download",
    name: "Direct APK Download (Android)",
    category: "app_stores",
    type: "image",
    url: SAMPLE_SCREENS.apkDirectDownload,
    width: 380,
    height: 110,
  },

  // 2. Product Hunt
  {
    id: "ph-kitty-1",
    name: "#1 Product of the Day",
    category: "product_hunt",
    type: "image",
    url: SAMPLE_SCREENS.productHuntKittyBadge,
    width: 460,
    height: 110,
  },
  {
    id: "ph-ribbon-5",
    name: "#5 Product of the Day",
    category: "product_hunt",
    type: "image",
    url: SAMPLE_SCREENS.productHuntBadge5,
    width: 460,
    height: 110,
  },
  {
    id: "ph-golden-kitty",
    name: "Golden Kitty Award Winner",
    category: "product_hunt",
    type: "image",
    url: SAMPLE_SCREENS.goldenKittyAward,
    width: 480,
    height: 240,
  },

  // 3. Or Create Your Own Badge (Laurel Wreaths)
  {
    id: "laurel-ph-1st",
    name: "Product of the day 1st",
    category: "custom_laurel",
    type: "image",
    url: SAMPLE_SCREENS.laurelProductHunt1st,
    width: 480,
    height: 240,
  },
  {
    id: "laurel-ph-2nd",
    name: "Product of the day 2nd",
    category: "custom_laurel",
    type: "image",
    url: SAMPLE_SCREENS.laurelProductHunt1st,
    width: 480,
    height: 240,
  },
  {
    id: "laurel-ph-3rd",
    name: "Product of the day 3rd",
    category: "custom_laurel",
    type: "image",
    url: SAMPLE_SCREENS.laurelProductHunt1st,
    width: 480,
    height: 240,
  },
  {
    id: "laurel-10m-users",
    name: "10M+ Users Worldwide",
    category: "custom_laurel",
    type: "image",
    url: SAMPLE_SCREENS.oneMillionUsers,
    width: 480,
    height: 240,
  },

  // 4. Award Badges
  {
    id: "laurel-apple-watch",
    name: "Apple Watch Spotlight",
    category: "awards",
    type: "image",
    url: SAMPLE_SCREENS.laurelAppleWatch,
    width: 480,
    height: 240,
  },
  {
    id: "laurel-1m-downloads",
    name: "1M Downloads (5 Stars)",
    category: "awards",
    type: "image",
    url: SAMPLE_SCREENS.laurel1MDownloads,
    width: 480,
    height: 240,
  },
  {
    id: "laurel-apps-we-love",
    name: "Apps We Love",
    category: "awards",
    type: "image",
    url: SAMPLE_SCREENS.laurelAppsWeLove,
    width: 480,
    height: 240,
  },
  {
    id: "laurel-five-stars",
    name: "4.9 Rating (45K Reviews)",
    category: "awards",
    type: "image",
    url: SAMPLE_SCREENS.laurelRating,
    width: 480,
    height: 240,
  },
  {
    id: "laurel-gp-best-2026",
    name: "Google Play Best of 2026",
    category: "awards",
    type: "image",
    url: SAMPLE_SCREENS.googlePlayBest2026,
    width: 480,
    height: 240,
  },
  {
    id: "badge-gp-editors-choice",
    name: "Google Play Editor's Choice",
    category: "awards",
    type: "image",
    url: SAMPLE_SCREENS.googlePlayEditorsChoice,
    width: 460,
    height: 110,
  },
  {
    id: "laurel-techcrunch-disrupt",
    name: "TechCrunch Disrupt Winner",
    category: "awards",
    type: "image",
    url: SAMPLE_SCREENS.techcrunchDisrupt,
    width: 480,
    height: 240,
  },
];

export const LayersPanel: React.FC = () => {
  const project = useEditorStore((s) => s.project);
  const activeCanvas =
    project.canvases.find((c) => c.id === project.activeCanvasId) ||
    project.canvases[0];
  const selectedElementId = useEditorStore((s) => s.selectedElementId);
  const setSelectedElementId = useEditorStore((s) => s.setSelectedElementId);
  const toggleVisibility = useEditorStore((s) => s.toggleElementVisibility);
  const toggleLock = useEditorStore((s) => s.toggleElementLock);
  const deleteElement = useEditorStore((s) => s.deleteElement);
  const duplicateElement = useEditorStore((s) => s.duplicateElement);
  const reorderElement = useEditorStore((s) => s.reorderElement);
  const addElement = useEditorStore((s) => s.addElement);
  const updateElement = useEditorStore((s) => s.updateElement);

  const [subView, setSubView] = useState<"list" | "badge">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [periodTab, setPeriodTab] = useState<"DAY" | "WEEK" | "MONTH">("DAY");
  const [colorFilter, setColorFilter] = useState<string>("#38bdf8");

  const selectedEl = activeCanvas?.elements.find((el) => el.id === selectedElementId);
  const isBadgeOrLaurel =
    selectedEl &&
    (selectedEl.type === "badge" ||
      (selectedEl.type === "image" &&
        (selectedEl.id.toLowerCase().includes("badge") ||
          selectedEl.id.toLowerCase().includes("wreath") ||
          selectedEl.id.toLowerCase().includes("laurel") ||
          selectedEl.name.toLowerCase().includes("badge") ||
          selectedEl.name.toLowerCase().includes("laurel") ||
          selectedEl.name.toLowerCase().includes("wreath") ||
          selectedEl.name.toLowerCase().includes("rating") ||
          selectedEl.name.toLowerCase().includes("spotlight") ||
          selectedEl.name.toLowerCase().includes("award"))));

  // Automatically switch to "badge" subview if user clicked a badge/laurel element
  useEffect(() => {
    if (isBadgeOrLaurel) {
      setSubView("badge");
    }
  }, [selectedElementId, isBadgeOrLaurel]);

  if (!activeCanvas) return null;

  // Add geometric shape
  const handleAddShape = (shapeType: "rect" | "circle" | "arrow") => {
    const isCircle = shapeType === "circle";
    const size = isCircle ? 180 : 200;
    const newShape: CanvasElement = {
      id: "shape-" + Math.random().toString(36).substring(2, 9),
      name: shapeType.charAt(0).toUpperCase() + shapeType.slice(1),
      type: "shape",
      x: Math.round((activeCanvas.width - size) / 2),
      y: Math.round((activeCanvas.height - size) / 2),
      width: size,
      height: shapeType === "arrow" ? 60 : size,
      rotation: 0,
      opacity: 0.9,
      visible: true,
      locked: false,
      shapeType,
      fill: "#38bdf8",
      stroke: "#0284c7",
      strokeWidth: 2,
      cornerRadius: 24,
    };
    addElement(activeCanvas.id, newShape);
  };

  // Replace current selected layer with chosen badge preset, or add new
  const handleSelectBadgePreset = (preset: BadgePreset) => {
    if (selectedEl) {
      const oldCenterX = selectedEl.x + (selectedEl.width || 0) / 2;
      const oldCenterY = selectedEl.y + (selectedEl.height || 0) / 2;
      const newX = Math.max(20, Math.round(oldCenterX - preset.width / 2));
      const newY = Math.max(20, Math.round(oldCenterY - preset.height / 2));

      if (preset.type === "image" && preset.url) {
        updateElement(activeCanvas.id, selectedEl.id, {
          type: "image",
          name: preset.name,
          url: preset.url,
          width: preset.width,
          height: preset.height,
          x: newX,
          y: newY,
        });
        return;
      } else if (preset.type === "badge") {
        updateElement(activeCanvas.id, selectedEl.id, {
          type: "badge",
          name: preset.name,
          text: preset.text || preset.name,
          bgColor: preset.bgColor,
          textColor: preset.textColor,
          borderColor: preset.borderColor,
          width: preset.width,
          height: preset.height,
          x: newX,
          y: newY,
        });
        return;
      }
    }

    // Otherwise add as new element
    if (preset.type === "image" && preset.url) {
      const newImg: ImageElement = {
        id: "badge-img-" + Math.random().toString(36).substring(2, 9),
        name: preset.name,
        type: "image",
        x: Math.round((activeCanvas.width - preset.width) / 2),
        y: Math.round(activeCanvas.height * 0.18),
        width: preset.width,
        height: preset.height,
        rotation: 0,
        opacity: 1,
        visible: true,
        locked: false,
        url: preset.url,
        cornerRadius: 0,
        shadowBlur: 20,
        shadowColor: "rgba(0,0,0,0.4)",
      };
      addElement(activeCanvas.id, newImg);
      setSelectedElementId(newImg.id);
    } else {
      const newBadge: BadgeElement = {
        id: "badge-" + Math.random().toString(36).substring(2, 9),
        name: preset.name,
        type: "badge",
        x: Math.round((activeCanvas.width - 320) / 2),
        y: Math.round(activeCanvas.height * 0.18),
        width: 320,
        height: 60,
        rotation: 0,
        opacity: 1,
        visible: true,
        locked: false,
        text: preset.text || preset.name,
        fontSize: 18,
        borderRadius: 30,
        bgColor: preset.bgColor || "rgba(56, 189, 248, 0.15)",
        textColor: preset.textColor || "#38bdf8",
        borderColor: preset.borderColor || "#38bdf8",
      };
      addElement(activeCanvas.id, newBadge);
      setSelectedElementId(newBadge.id);
    }
  };

  const getElementIcon = (el: CanvasElement) => {
    switch (el.type) {
      case "text":
        return <Type className="w-3.5 h-3.5 text-sky-400" />;
      case "mockup":
        return <Smartphone className="w-3.5 h-3.5 text-indigo-400" />;
      case "badge":
        return <Sparkles className="w-3.5 h-3.5 text-amber-400" />;
      case "shape":
        return el.shapeType === "circle" ? (
          <Circle className="w-3.5 h-3.5 text-emerald-400" />
        ) : el.shapeType === "arrow" ? (
          <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
        ) : (
          <Square className="w-3.5 h-3.5 text-emerald-400" />
        );
      case "image":
        return <Sparkles className="w-3.5 h-3.5 text-amber-400" />;
      default:
        return <Layers className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  // Canvas elements in top-to-bottom list
  const elements = [...activeCanvas.elements].reverse();

  // Filtered badges for search
  const filteredBadges = BADGE_PRESETS.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ==========================================
  // VIEW 1: LAYERS / BADGE (Reference Screenshot 2)
  // ==========================================
  if (subView === "badge") {
    return (
      <div className="flex flex-col h-full text-slate-200 overflow-y-auto pr-1 space-y-3.5 select-none">
        {/* Header: LAYERS / BADGE + button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-sky-400" />
            <span className="text-[11px] font-bold tracking-wider text-slate-300 uppercase">
              LAYERS / BADGE
            </span>
          </div>
          <button
            onClick={() => {
              const newBadge: BadgeElement = {
                id: "badge-" + Math.random().toString(36).substring(2, 9),
                name: "Custom Pill Badge",
                type: "badge",
                x: Math.round((activeCanvas.width - 280) / 2),
                y: Math.round(activeCanvas.height * 0.18),
                width: 280,
                height: 56,
                rotation: 0,
                opacity: 1,
                visible: true,
                locked: false,
                text: "✦ Featured App",
                fontSize: 18,
                borderRadius: 28,
                bgColor: "rgba(56, 189, 248, 0.2)",
                textColor: "#38bdf8",
                borderColor: "#38bdf8",
              };
              addElement(activeCanvas.id, newBadge);
              setSelectedElementId(newBadge.id);
            }}
            className="w-7 h-7 rounded-lg bg-[#0ea5e9] hover:bg-[#0284c7] text-white flex items-center justify-center transition shadow"
            title="Insert New Badge"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Back to Layers button */}
        <button
          onClick={() => setSubView("list")}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#111420] hover:bg-[#161b2c] border border-[#212738] text-xs font-semibold text-slate-300 hover:text-white transition"
        >
          <ChevronLeft className="w-4 h-4 text-slate-400" />
          <span>Back to layers</span>
        </button>

        {/* Selected Layer Info / Replace Notification */}
        {selectedEl && (
          <div className="px-3 py-2 bg-sky-500/10 border border-sky-500/30 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <Sparkles className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span className="text-[11px] text-sky-300 font-medium truncate">
                Replacing: {selectedEl.name}
              </span>
            </div>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 font-bold">
              ACTIVE
            </span>
          </div>
        )}

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for badges..."
            className="w-full pl-8 pr-3 py-2 bg-[#111420] border border-[#212738] focus:border-sky-500 rounded-xl text-xs text-slate-200 placeholder:text-slate-500 outline-none"
          />
        </div>

        {/* 1. APP STORES */}
        <div className="space-y-2">
          <span className="text-[10px] font-bold text-slate-400 tracking-wider block">
            APP STORES
          </span>
          <div className="grid grid-cols-2 gap-2">
            {filteredBadges
              .filter((p) => p.category === "app_stores")
              .map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handleSelectBadgePreset(preset)}
                  className="group relative flex flex-col items-center justify-center p-2 rounded-xl bg-[#111420] hover:bg-[#161c2d] border border-[#212738] hover:border-sky-500/50 transition cursor-pointer"
                >
                  <img
                    src={preset.url}
                    alt={preset.name}
                    className="max-h-11 w-auto object-contain transition group-hover:scale-105"
                  />
                  <span className="text-[9px] text-slate-400 mt-1 text-center font-medium line-clamp-1">
                    {preset.name}
                  </span>
                </button>
              ))}
          </div>
        </div>

        {/* 2. PRODUCT HUNT */}
        <div className="space-y-2 pt-2 border-t border-[#1d2232]">
          <span className="text-[10px] font-bold text-slate-400 tracking-wider block">
            PRODUCT HUNT
          </span>
          <div className="space-y-2">
            {filteredBadges
              .filter((p) => p.category === "product_hunt")
              .map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handleSelectBadgePreset(preset)}
                  className="group w-full flex items-center justify-center p-2 rounded-xl bg-[#111420] hover:bg-[#161c2d] border border-[#212738] hover:border-sky-500/50 transition cursor-pointer"
                >
                  <img
                    src={preset.url}
                    alt={preset.name}
                    className="max-h-12 w-auto object-contain transition group-hover:scale-102"
                  />
                </button>
              ))}
          </div>
        </div>

        {/* 3. OR CREATE YOUR OWN BADGE */}
        <div className="space-y-2.5 pt-2 border-t border-[#1d2232]">
          <span className="text-[10px] font-bold text-slate-400 tracking-wider block">
            OR CREATE YOUR OWN BADGE
          </span>

          {/* DAY / WEEK / MONTH tabs */}
          <div className="grid grid-cols-3 gap-1 bg-[#111420] border border-[#212738] rounded-xl p-1">
            {(["DAY", "WEEK", "MONTH"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setPeriodTab(tab)}
                className={`py-1 text-[10px] font-bold rounded-lg transition ${
                  periodTab === tab
                    ? "bg-[#0ea5e9] text-white"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Color Palette Dots */}
          <div className="flex items-center gap-2">
            {["#38bdf8", "#ffffff", "#f43f5e", "#f59e0b", "#a855f7", "#10b981"].map((col) => (
              <button
                key={col}
                onClick={() => setColorFilter(col)}
                style={{ backgroundColor: col }}
                className={`w-6 h-6 rounded-full border-2 transition ${
                  colorFilter === col
                    ? "border-white scale-110 shadow-lg"
                    : "border-transparent opacity-80 hover:opacity-100"
                }`}
              />
            ))}
          </div>

          {/* Laurel Wreaths */}
          <div className="grid grid-cols-2 gap-2">
            {filteredBadges
              .filter((p) => p.category === "custom_laurel")
              .map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handleSelectBadgePreset(preset)}
                  className="group flex flex-col items-center justify-center p-2 rounded-xl bg-[#111420] hover:bg-[#161c2d] border border-[#212738] hover:border-sky-500/50 transition cursor-pointer"
                >
                  <img
                    src={preset.url}
                    alt={preset.name}
                    className="max-h-16 w-auto object-contain transition group-hover:scale-105"
                  />
                  <span className="text-[9px] text-slate-400 mt-1 text-center font-medium">
                    {preset.name}
                  </span>
                </button>
              ))}
          </div>
        </div>

        {/* 4. AWARD BADGES */}
        <div className="space-y-2 pt-2 border-t border-[#1d2232]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 tracking-wider">
              AWARD BADGES
            </span>
            <Award className="w-3.5 h-3.5 text-slate-500" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            {filteredBadges
              .filter((p) => p.category === "awards")
              .map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handleSelectBadgePreset(preset)}
                  className="group flex flex-col items-center justify-center p-2 rounded-xl bg-[#111420] hover:bg-[#161c2d] border border-[#212738] hover:border-sky-500/50 transition cursor-pointer"
                >
                  <img
                    src={preset.url}
                    alt={preset.name}
                    className="max-h-16 w-auto object-contain transition group-hover:scale-105"
                  />
                  <span className="text-[9px] text-slate-400 mt-1 text-center font-medium">
                    {preset.name}
                  </span>
                </button>
              ))}
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: STANDARD LAYERS LIST
  // ==========================================
  return (
    <div className="flex flex-col h-full text-slate-200 select-none">
      {/* Quick Add Elements Bar */}
      <div className="mb-3">
        <h4 className="text-xs font-semibold text-slate-400 mb-2">
          Insert New Layer
        </h4>
        <div className="grid grid-cols-4 gap-1.5">
          <button
            onClick={() => handleAddShape("rect")}
            className="flex flex-col items-center justify-center gap-1 p-2 rounded-xl bg-[#141724] border border-[#212638] hover:border-sky-500/50 text-[10px] text-slate-300 hover:text-sky-300 transition"
          >
            <Square className="w-3.5 h-3.5 text-sky-400" />
            <span>Card</span>
          </button>
          <button
            onClick={() => handleAddShape("circle")}
            className="flex flex-col items-center justify-center gap-1 p-2 rounded-xl bg-[#141724] border border-[#212638] hover:border-sky-500/50 text-[10px] text-slate-300 hover:text-sky-300 transition"
          >
            <Circle className="w-3.5 h-3.5 text-emerald-400" />
            <span>Circle</span>
          </button>
          <button
            onClick={() => handleAddShape("arrow")}
            className="flex flex-col items-center justify-center gap-1 p-2 rounded-xl bg-[#141724] border border-[#212638] hover:border-sky-500/50 text-[10px] text-slate-300 hover:text-sky-300 transition"
          >
            <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
            <span>Arrow</span>
          </button>
          <button
            onClick={() => setSubView("badge")}
            className="flex flex-col items-center justify-center gap-1 p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 hover:border-amber-400 text-[10px] text-amber-300 hover:text-white transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Badges</span>
          </button>
        </div>
      </div>

      {/* Layers Stack */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-1.5">
        <div className="flex items-center justify-between text-[11px] text-slate-500 px-1 mb-1">
          <span>Layers ({activeCanvas.elements.length})</span>
          <span>Order (Top to Bottom)</span>
        </div>

        {elements.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-xs">
            No layers on this canvas.
          </div>
        ) : (
          elements.map((el) => {
            const isSelected = selectedElementId === el.id;

            return (
              <div
                key={el.id}
                onClick={() => {
                  setSelectedElementId(el.id);
                  if (
                    el.type === "badge" ||
                    (el.type === "image" &&
                      (el.id.toLowerCase().includes("badge") ||
                        el.id.toLowerCase().includes("wreath") ||
                        el.id.toLowerCase().includes("laurel") ||
                        el.name.toLowerCase().includes("badge") ||
                        el.name.toLowerCase().includes("laurel") ||
                        el.name.toLowerCase().includes("wreath") ||
                        el.name.toLowerCase().includes("rating") ||
                        el.name.toLowerCase().includes("spotlight") ||
                        el.name.toLowerCase().includes("award")))
                  ) {
                    setSubView("badge");
                  }
                }}
                className={`p-2 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                  isSelected
                    ? "bg-sky-500/15 border-sky-500/50 shadow-[0_0_12px_rgba(56,189,248,0.2)] text-white"
                    : "bg-[#141724] border-[#212638] hover:border-slate-700 text-slate-300"
                }`}
              >
                {/* Layer Icon & Title */}
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  {getElementIcon(el)}
                  <span className="text-xs font-medium truncate">
                    {el.type === "text"
                      ? el.text.slice(0, 22) || el.name
                      : el.name}
                  </span>
                </div>

                {/* Layer Action Controls */}
                <div
                  className="flex items-center gap-0.5 ml-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Reorder Up */}
                  <button
                    onClick={() => reorderElement(activeCanvas.id, el.id, "up")}
                    title="Move Layer Up"
                    className="p-1 rounded text-slate-500 hover:text-white transition"
                  >
                    <ChevronUp className="w-3 h-3" />
                  </button>

                  {/* Reorder Down */}
                  <button
                    onClick={() => reorderElement(activeCanvas.id, el.id, "down")}
                    title="Move Layer Down"
                    className="p-1 rounded text-slate-500 hover:text-white transition"
                  >
                    <ChevronDown className="w-3 h-3" />
                  </button>

                  {/* Lock / Unlock */}
                  <button
                    onClick={() => toggleLock(activeCanvas.id, el.id)}
                    title={el.locked ? "Unlock Layer" : "Lock Layer"}
                    className={`p-1 rounded transition ${
                      el.locked
                        ? "text-amber-400 hover:text-amber-300"
                        : "text-slate-500 hover:text-white"
                    }`}
                  >
                    {el.locked ? (
                      <Lock className="w-3 h-3" />
                    ) : (
                      <Unlock className="w-3 h-3" />
                    )}
                  </button>

                  {/* Hide / Show */}
                  <button
                    onClick={() => toggleVisibility(activeCanvas.id, el.id)}
                    title={el.visible ? "Hide Layer" : "Show Layer"}
                    className={`p-1 rounded transition ${
                      !el.visible
                        ? "text-slate-600 hover:text-slate-400"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {!el.visible ? (
                      <EyeOff className="w-3 h-3" />
                    ) : (
                      <Eye className="w-3 h-3" />
                    )}
                  </button>

                  {/* Duplicate */}
                  <button
                    onClick={() => duplicateElement(activeCanvas.id, el.id)}
                    title="Duplicate Layer"
                    className="p-1 rounded text-slate-500 hover:text-white transition"
                  >
                    <Copy className="w-3 h-3" />
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => deleteElement(activeCanvas.id, el.id)}
                    title="Delete Layer"
                    className="p-1 rounded text-slate-500 hover:text-rose-400 transition"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
