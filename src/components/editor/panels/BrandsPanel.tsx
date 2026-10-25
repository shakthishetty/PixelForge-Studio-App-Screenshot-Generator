"use client";

import React, { useState } from "react";
import { useEditorStore } from "@/stores/editor-store";
import { BadgeElement, ImageElement } from "@/types/editor";
import { SAMPLE_SCREENS } from "@/lib/constants/sample-screens";
import {
  ChevronLeft,
  Plus,
  Search,
  Sparkles,
  Award,
  Sliders,
  Check,
} from "lucide-react";

interface BadgePreset {
  id: string;
  name: string;
  category: "app_stores" | "product_hunt" | "custom_laurel" | "awards";
  type: "badge" | "image";
  text?: string;
  url?: string;
  previewUrl?: string;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  width: number;
  height: number;
}

const BADGE_PRESETS: BadgePreset[] = [
  // App Stores
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
    id: "google-play-badge",
    name: "Get it on Google Play",
    category: "app_stores",
    type: "image",
    url: SAMPLE_SCREENS.googlePlayBadge,
    width: 360,
    height: 110,
  },

  // Product Hunt
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

  // Laurel Wreaths
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

  // Award Badges
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
];

export const BrandsPanel: React.FC = () => {
  const project = useEditorStore((s) => s.project);
  const activeCanvas =
    project.canvases.find((c) => c.id === project.activeCanvasId) ||
    project.canvases[0];
  const selectedElementId = useEditorStore((s) => s.selectedElementId);
  const setSelectedElementId = useEditorStore((s) => s.setSelectedElementId);
  const setActiveNav = useEditorStore((s) => s.setActiveNav);
  const addElement = useEditorStore((s) => s.addElement);
  const updateElement = useEditorStore((s) => s.updateElement);

  const [searchQuery, setSearchQuery] = useState("");
  const [periodTab, setPeriodTab] = useState<"DAY" | "WEEK" | "MONTH">("DAY");
  const [colorFilter, setColorFilter] = useState<string>("#38bdf8");

  if (!activeCanvas) return null;

  // Selected element if it's a badge or image laurel
  const selectedEl = activeCanvas.elements.find((el) => el.id === selectedElementId);
  const isBadgeSelected = selectedEl && (selectedEl.type === "badge" || selectedEl.type === "image");

  // Apply or replace badge
  const handleSelectPreset = (preset: BadgePreset) => {
    if (selectedEl) {
      if (preset.type === "image" && preset.url) {
        if (selectedEl.type === "image") {
          updateElement(activeCanvas.id, selectedEl.id, {
            url: preset.url,
            width: preset.width,
            height: preset.height,
          });
          return;
        }
      } else if (preset.type === "badge" && selectedEl.type === "badge") {
        updateElement(activeCanvas.id, selectedEl.id, {
          text: preset.text || preset.name,
          bgColor: preset.bgColor,
          textColor: preset.textColor,
          borderColor: preset.borderColor,
        });
        return;
      }
    }

    // Otherwise add as new element to active canvas
    if (preset.type === "image" && preset.url) {
      const newImg: ImageElement = {
        id: "badge-img-" + Math.random().toString(36).substring(2, 9),
        name: preset.name,
        type: "image",
        x: Math.round((activeCanvas.width - preset.width) / 2),
        y: 280,
        width: preset.width,
        height: preset.height,
        rotation: 0,
        opacity: 1,
        visible: true,
        locked: false,
        url: preset.url,
        cornerRadius: 0,
        shadowBlur: 20,
        shadowColor: "rgba(0,0,0,0.3)",
      };
      addElement(activeCanvas.id, newImg);
    } else {
      const newBadge: BadgeElement = {
        id: "badge-" + Math.random().toString(36).substring(2, 9),
        name: preset.name,
        type: "badge",
        x: Math.round((activeCanvas.width - 320) / 2),
        y: 300,
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
    }
  };

  const filteredPresets = BADGE_PRESETS.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full text-slate-200 overflow-y-auto pr-1 space-y-4">
      {/* Header: Matches Screenshot 4 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-sky-400" />
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
              y: 280,
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
          }}
          className="w-7 h-7 rounded-lg bg-[#0ea5e9] hover:bg-[#0284c7] text-white flex items-center justify-center transition shadow"
          title="Add Custom Badge"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>

      {/* Back to Layers button */}
      <button
        onClick={() => setActiveNav("layers")}
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#111420] hover:bg-[#161b2c] border border-[#212738] text-xs font-semibold text-slate-300 hover:text-white transition"
      >
        <ChevronLeft className="w-4 h-4 text-slate-400" />
        <span>Back to layers</span>
      </button>

      {/* Selected Badge Text Editor */}
      {selectedEl && selectedEl.type === "badge" && (
        <div className="p-3 bg-[#111420] border border-[#212738] rounded-xl space-y-2.5">
          <span className="text-[10px] font-bold text-sky-400 tracking-wider block">
            EDIT SELECTED BADGE
          </span>
          <input
            type="text"
            value={(selectedEl as BadgeElement).text}
            onChange={(e) =>
              updateElement(activeCanvas.id, selectedEl.id, {
                text: e.target.value,
              })
            }
            placeholder="Badge text"
            className="w-full bg-[#0b0e17] border border-[#212738] focus:border-sky-500 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none"
          />
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
          {filteredPresets
            .filter((p) => p.category === "app_stores")
            .map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset)}
                className="group relative flex flex-col items-center justify-center p-2 rounded-xl bg-[#111420] hover:bg-[#161c2d] border border-[#212738] hover:border-sky-500/50 transition cursor-pointer"
              >
                <img
                  src={preset.url}
                  alt={preset.name}
                  className="max-h-12 w-auto object-contain transition group-hover:scale-105"
                />
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
          {filteredPresets
            .filter((p) => p.category === "product_hunt")
            .map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset)}
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
      <div className="space-y-3 pt-2 border-t border-[#1d2232]">
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
          {["#38bdf8", "#ffffff", "#f43f5e", "#f59e0b", "#a855f7"].map((col) => (
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
          {filteredPresets
            .filter((p) => p.category === "custom_laurel")
            .map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset)}
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
          {filteredPresets
            .filter((p) => p.category === "awards")
            .map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset)}
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
};
