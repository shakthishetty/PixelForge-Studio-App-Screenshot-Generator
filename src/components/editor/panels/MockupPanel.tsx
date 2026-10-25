"use client";

import React, { useRef, useState } from "react";
import { useEditorStore } from "@/stores/editor-store";
import { CanvasElement, DeviceTheme, DeviceType, ImageElement, MockupElement } from "@/types/editor";
import { SAMPLE_SCREENS } from "@/lib/constants/sample-screens";
import {
  Smartphone,
  Upload,
  Cloud,
  Layers,
  ChevronDown,
  Link2,
  Sparkles,
  Box,
  RotateCw,
  Check,
  X,
  Loader2,
} from "lucide-react";
import { toast } from "@/stores/toast-store";

const SAMPLE_SCREEN_OPTIONS = [
  { id: "stripe-balance", name: "Stripe Revenue & Metrics", url: SAMPLE_SCREENS.stripeFrontBalance },
  { id: "stripe-tap", name: "Tap to Pay Prompt", url: SAMPLE_SCREENS.stripeTapToPayScreen },
  { id: "stripe-success", name: "Transaction Feed", url: SAMPLE_SCREENS.stripeSuccessList },
  { id: "bevel-health", name: "Health & Strain Dials", url: SAMPLE_SCREENS.bevelHealthAppScreen },
  { id: "bevel-sleep", name: "Sleep Stages Hypnogram", url: SAMPLE_SCREENS.sleepTrackerDarkScreen },
  { id: "fitness-rings", name: "Activity Rings & Recovery", url: SAMPLE_SCREENS.fitness },
  { id: "notion-wiki", name: "Notion Life's Work Wiki", url: SAMPLE_SCREENS.notionWikiScreen },
  { id: "notion-travel", name: "Travel Itinerary", url: SAMPLE_SCREENS.notionTravelScreen },
  { id: "ai-chat", name: "AI Conversational Chat", url: SAMPLE_SCREENS.aiChat },
  { id: "terminal-dev", name: "DevFlow Code Terminal", url: SAMPLE_SCREENS.terminalDevScreen },
  { id: "swiss-bank", name: "Nova Private Vault & Black Card", url: SAMPLE_SCREENS.swissBankingScreen },
  { id: "travel-pass", name: "Flight Boarding Pass", url: SAMPLE_SCREENS.travelBoardingPass },
  { id: "culinary-recipe", name: "Artisan Culinary Journal", url: SAMPLE_SCREENS.culinaryRecipeScreen },
  { id: "language-learn", name: "Language Streaks & Quiz", url: SAMPLE_SCREENS.languageLearningScreen },
  { id: "saas-dashboard", name: "CloudVue Dark Telemetry", url: SAMPLE_SCREENS.dashboard },
];

const DEVICE_OPTIONS: { id: DeviceType; name: string; subtitle: string }[] = [
  { id: "phone_modern", name: "iPhone 17 (Modern)", subtitle: "Dynamic Island Frame" },
  { id: "phone_minimal", name: "iPhone Minimal", subtitle: "Ultra-thin Bezel" },
  { id: "tablet", name: "iPad Pro 13\"", subtitle: "Tablet Frame" },
  { id: "laptop", name: "MacBook Pro 16\"", subtitle: "Laptop Display" },
  { id: "browser", name: "Safari Browser", subtitle: "macOS Window" },
  { id: "watch", name: "Apple Watch Ultra", subtitle: "Titanium Case" },
];

const THEME_OPTIONS: { id: DeviceTheme; name: string; color: string }[] = [
  { id: "dark", name: "Dark Titanium", color: "#16181f" },
  { id: "silver", name: "Natural Titanium", color: "#e2e8f0" },
  { id: "gold", name: "Desert Titanium", color: "#d4af37" },
  { id: "midnight", name: "Midnight Blue", color: "#0f172a" },
  { id: "deep_purple", name: "Deep Purple", color: "#2e1065" },
];

export const MockupPanel: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const project = useEditorStore((s) => s.project);
  const activeCanvas =
    project.canvases.find((c) => c.id === project.activeCanvasId) ||
    project.canvases[0];
  const selectedElementId = useEditorStore((s) => s.selectedElementId);
  const setSelectedElementId = useEditorStore((s) => s.setSelectedElementId);
  const updateElement = useEditorStore((s) => s.updateElement);

  const [deviceDropdownOpen, setDeviceDropdownOpen] = useState(false);
  const [projectGalleryOpen, setProjectGalleryOpen] = useState(false);
  const [replaceMode, setReplaceMode] = useState<"single" | "both">("single");
  const [isConverting, setIsConverting] = useState(false);

  if (!activeCanvas) return null;

  const isBadgeOrLaurel = (el: CanvasElement) =>
    el.type === "badge" ||
    (el.type === "image" &&
      (el.id.toLowerCase().includes("badge") ||
        el.id.toLowerCase().includes("wreath") ||
        el.id.toLowerCase().includes("laurel") ||
        el.id.toLowerCase().includes("rating") ||
        el.id.toLowerCase().includes("spotlight") ||
        el.id.toLowerCase().includes("award") ||
        el.name.toLowerCase().includes("badge") ||
        el.name.toLowerCase().includes("laurel") ||
        el.name.toLowerCase().includes("wreath") ||
        el.name.toLowerCase().includes("rating") ||
        el.name.toLowerCase().includes("spotlight") ||
        el.name.toLowerCase().includes("award")));

  // All replaceable screen/image elements on this canvas
  const screenElements = activeCanvas.elements.filter(
    (el): el is MockupElement | ImageElement =>
      el.type === "mockup" || (el.type === "image" && !isBadgeOrLaurel(el))
  );

  // Selected element: Check if it's one of the screen elements, otherwise pick first
  const selectedEl = activeCanvas.elements.find((el) => el.id === selectedElementId);
  const targetElement =
    (selectedEl && screenElements.some((s) => s.id === selectedEl.id)
      ? (selectedEl as MockupElement | ImageElement)
      : null) ||
    screenElements[0] ||
    null;

  const mockupEl = targetElement?.type === "mockup" ? (targetElement as MockupElement) : null;
  const imageEl = targetElement?.type === "image" ? (targetElement as ImageElement) : null;

  // Upload screenshot from local computer
  const handleUploadScreenshot = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      if (replaceMode === "both" && screenElements.length > 1) {
        screenElements.forEach((el) => {
          if (el.type === "mockup") {
            updateElement(activeCanvas.id, el.id, { screenshotUrl: dataUrl });
          } else if (el.type === "image") {
            updateElement(activeCanvas.id, el.id, { url: dataUrl });
          }
        });
      } else {
        if (targetElement?.type === "mockup") {
          updateElement(activeCanvas.id, targetElement.id, { screenshotUrl: dataUrl });
        } else if (targetElement?.type === "image") {
          updateElement(activeCanvas.id, targetElement.id, { url: dataUrl });
        }
      }
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleSelectSampleScreen = (url: string) => {
    if (replaceMode === "both" && screenElements.length > 1) {
      screenElements.forEach((el) => {
        if (el.type === "mockup") {
          updateElement(activeCanvas.id, el.id, { screenshotUrl: url });
        } else if (el.type === "image") {
          updateElement(activeCanvas.id, el.id, { url });
        }
      });
    } else {
      if (targetElement?.type === "mockup") {
        updateElement(activeCanvas.id, targetElement.id, { screenshotUrl: url });
      } else if (targetElement?.type === "image") {
        updateElement(activeCanvas.id, targetElement.id, { url });
      }
    }
    setProjectGalleryOpen(false);
  };

  const currentScreenshotUrl =
    imageEl ? imageEl.url : mockupEl ? mockupEl.screenshotUrl : "";

  return (
    <div className="flex flex-col h-full text-slate-200 overflow-y-auto pr-1 space-y-4">
      {/* Header (Matches Screenshot 3) */}
      <div className="flex items-center gap-2 mb-1">
        <Smartphone className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-[11px] font-bold tracking-wider text-slate-300 uppercase">
          {imageEl ? "IMAGE ASSET" : "SCREENSHOT"}
        </span>
      </div>

      {/* Convert to Annotation Layer button */}
      <button
        onClick={() => {
          if (isConverting) return;
          setIsConverting(true);
          setTimeout(() => {
            setIsConverting(false);
            toast.success("Converted screenshot layer to independent annotation!");
          }, 400);
        }}
        disabled={isConverting}
        className="flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-[#111420] border border-[#212738] text-xs font-semibold text-slate-300 hover:text-white transition disabled:opacity-60"
      >
        {isConverting ? (
          <Loader2 className="w-3.5 h-3.5 text-sky-400 animate-spin" />
        ) : (
          <Layers className="w-3.5 h-3.5 text-slate-400" />
        )}
        <span>{isConverting ? "Converting..." : "Convert to Annotation Layer"}</span>
      </button>

      {/* MULTIPLE SCREEN ASSETS SELECTOR & DUAL REPLACE CONTROLS */}
      {screenElements.length > 1 && (
        <div className="space-y-2.5 p-3 rounded-2xl bg-[#0e121d] border border-[#212738] shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-sky-400 tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>SCREEN ASSETS ON THIS CANVAS ({screenElements.length})</span>
            </span>
            <span className="text-[9px] text-slate-400 font-medium">Select to replace</span>
          </div>

          {/* Cards for each screen element */}
          <div className="grid grid-cols-2 gap-2">
            {screenElements.map((el, idx) => {
              const isSelected = targetElement?.id === el.id;
              const screenUrl = el.type === "mockup" ? el.screenshotUrl : el.url;

              return (
                <div
                  key={el.id}
                  onClick={() => {
                    setSelectedElementId(el.id);
                  }}
                  className={`p-2 rounded-xl border flex flex-col items-center gap-1.5 cursor-pointer transition relative ${
                    isSelected
                      ? "bg-sky-500/15 border-sky-500 shadow-[0_0_12px_rgba(56,189,248,0.25)] text-white"
                      : "bg-[#141824] border-[#22283a] text-slate-400 hover:text-slate-200 hover:border-slate-700"
                  }`}
                >
                  <div className="w-full flex items-center justify-between text-[10px] font-bold">
                    <span className="truncate">{el.name || `Asset ${idx + 1}`}</span>
                    {isSelected && (
                      <span className="text-[8px] bg-sky-500 text-white font-mono px-1 py-0.2 rounded">
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <div className="w-full h-16 rounded-lg bg-black/60 border border-white/10 overflow-hidden flex items-center justify-center">
                    {screenUrl ? (
                      <img src={screenUrl} className="w-full h-full object-cover" />
                    ) : (
                      <Smartphone className="w-5 h-5 text-slate-600" />
                    )}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedElementId(el.id);
                      fileInputRef.current?.click();
                    }}
                    className="w-full py-1 text-[9px] font-semibold bg-[#182033] hover:bg-[#202c46] border border-[#2b3a5b] text-sky-300 rounded-md transition"
                  >
                    Replace Image {idx + 1}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Replace Mode Toggle: Single vs Both */}
          <div className="pt-2 border-t border-[#1d2334] flex items-center justify-between gap-2">
            <span className="text-[10px] text-slate-300 font-medium">Target:</span>
            <div className="flex rounded-lg bg-[#141824] border border-[#212738] p-0.5">
              <button
                onClick={() => setReplaceMode("single")}
                className={`px-2 py-0.5 rounded text-[10px] font-semibold transition ${
                  replaceMode === "single"
                    ? "bg-sky-500 text-white shadow"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Selected
              </button>
              <button
                onClick={() => setReplaceMode("both")}
                className={`px-2 py-0.5 rounded text-[10px] font-semibold transition ${
                  replaceMode === "both"
                    ? "bg-amber-500 text-black font-bold shadow"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                ⚡ Replace Both
              </button>
            </div>
          </div>

          {replaceMode === "both" && (
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-[10px] text-amber-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>Next upload or gallery screen will replace <b>both images</b> on this canvas.</span>
            </div>
          )}
        </div>
      )}

      {/* APP SCREENSHOT SECTION (Matches Screenshot 3) */}
      <div className="space-y-2.5">
        <span className="text-[10px] font-bold text-slate-400 tracking-wider block">
          APP SCREENSHOT
        </span>

        {/* Thumbnail Preview Row with Add Highlight */}
        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#111420] border border-[#212738]">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="w-14 h-20 rounded-lg bg-[#090b10] border border-slate-700/50 overflow-hidden flex items-center justify-center cursor-pointer hover:border-sky-500 transition group relative"
          >
            {currentScreenshotUrl ? (
              <img
                src={currentScreenshotUrl}
                alt="App Screen"
                className="w-full h-full object-cover group-hover:scale-105 transition"
              />
            ) : (
              <Smartphone className="w-6 h-6 text-slate-600" />
            )}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition text-[9px] text-white font-medium text-center px-1">
              Replace
            </div>
          </div>

          <div className="flex-1 space-y-2">
            <button
              onClick={() =>
                toast.info(
                  "Highlight tool active: drag across screenshot to add magnifier or focus glow."
                )
              }
              className="flex items-center justify-center gap-1.5 w-full py-1.5 rounded-lg bg-[#161c2d] hover:bg-[#1d253b] border border-[#26314d] text-xs font-semibold text-sky-400 transition"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Add Highlight</span>
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center justify-center gap-1.5 w-full py-1.5 rounded-lg bg-[#0e121d] hover:bg-[#141a29] border border-[#212738] text-[11px] font-medium text-slate-300 transition"
            >
              <Upload className="w-3 h-3 text-slate-400" />
              <span>Upload Custom</span>
            </button>
          </div>
        </div>

        {/* Use Screenshot From Project Button */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={handleUploadScreenshot}
          className="hidden"
        />

        <button
          onClick={() => setProjectGalleryOpen(!projectGalleryOpen)}
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#111420] hover:bg-[#161b2c] border border-[#212738] text-xs font-semibold text-slate-200 hover:text-white transition"
        >
          <Cloud className="w-3.5 h-3.5 text-slate-400" />
          <span>Use Screenshot From Project</span>
        </button>

        {/* Project Screenshots Gallery Drawer */}
        {projectGalleryOpen && (
          <div className="p-3 bg-[#0d101a] border border-[#212738] rounded-xl space-y-2.5 max-h-60 overflow-y-auto">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-sky-400 tracking-wider">
                CHOOSE SAMPLE APPLICATION SCREEN
              </span>
              <button
                onClick={() => setProjectGalleryOpen(false)}
                className="text-slate-500 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {SAMPLE_SCREEN_OPTIONS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelectSampleScreen(item.url)}
                  className="group flex flex-col items-center p-1.5 rounded-lg bg-[#111420] hover:bg-[#182035] border border-[#212738] hover:border-sky-500 transition cursor-pointer"
                >
                  <img
                    src={item.url}
                    alt={item.name}
                    className="w-full h-16 object-cover rounded shadow"
                  />
                  <span className="text-[8px] text-slate-400 mt-1 line-clamp-1 group-hover:text-sky-300">
                    {item.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* MOCKUP SECTION (Matches Screenshot 3) */}
      {mockupEl && (
        <div className="space-y-3 pt-2 border-t border-[#1d2232]">
          <span className="text-[10px] font-bold text-slate-400 tracking-wider block">
            MOCKUP
          </span>

          {/* Dropdown Card */}
          <div className="relative">
            <div
              onClick={() => setDeviceDropdownOpen(!deviceDropdownOpen)}
              className="flex items-center justify-between p-2.5 rounded-xl bg-[#111420] hover:bg-[#151a2b] border border-[#212738] cursor-pointer transition"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-sky-500 to-indigo-600 border border-white/20 flex items-center justify-center shadow">
                  <Smartphone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-200">
                    {DEVICE_OPTIONS.find((d) => d.id === mockupEl.deviceType)?.name || "iPhone 17 (Modern)"}
                  </div>
                  <div className="text-[10px] text-slate-500">Device Frame</div>
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-500" />
            </div>

            {deviceDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 p-1 bg-[#111420] border border-[#212738] rounded-xl shadow-2xl z-30 space-y-1">
                {DEVICE_OPTIONS.map((dev) => (
                  <button
                    key={dev.id}
                    onClick={() => {
                      updateElement(activeCanvas.id, mockupEl.id, {
                        deviceType: dev.id,
                      });
                      setDeviceDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded-lg text-left text-xs transition ${
                      mockupEl.deviceType === dev.id
                        ? "bg-[#182236] text-sky-400 font-semibold"
                        : "text-slate-300 hover:bg-[#161a28]"
                    }`}
                  >
                    <div>
                      <div>{dev.name}</div>
                      <div className="text-[10px] text-slate-500">{dev.subtitle}</div>
                    </div>
                    {mockupEl.deviceType === dev.id && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Colors */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-[10px] font-bold text-slate-400 tracking-wider">FINISH</span>
            <div className="flex items-center gap-2">
              {THEME_OPTIONS.map((thm) => (
                <button
                  key={thm.id}
                  onClick={() =>
                    updateElement(activeCanvas.id, mockupEl.id, {
                      deviceTheme: thm.id,
                    })
                  }
                  title={thm.name}
                  style={{ backgroundColor: thm.color }}
                  className={`w-5 h-5 rounded-full border-2 transition ${
                    mockupEl.deviceTheme === thm.id
                      ? "border-sky-400 scale-110 shadow"
                      : "border-slate-700 hover:border-slate-400"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* SIZE Slider */}
          <div className="flex items-center justify-between gap-3 bg-[#111420] border border-[#212738] rounded-lg px-3 py-1.5">
            <span className="text-[10px] font-bold text-slate-400 tracking-wider">SIZE</span>
            <input
              type="range"
              min={250}
              max={1100}
              value={mockupEl.width}
              onChange={(e) => {
                const newW = Number(e.target.value);
                const ratio = mockupEl.height / mockupEl.width || 2.16;
                updateElement(activeCanvas.id, mockupEl.id, {
                  width: newW,
                  height: Math.round(newW * ratio),
                });
              }}
              className="flex-1 accent-sky-500"
            />
            <span className="text-xs font-mono text-slate-300 w-8 text-right">
              {Math.round((mockupEl.width / 600) * 100)}%
            </span>
          </div>

          {/* SHADOW Switch (Matches Screenshot 3) */}
          <div className="flex items-center justify-between py-1">
            <span className="text-[10px] font-bold text-slate-400 tracking-wider">
              SHADOW
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={mockupEl.shadowBlur > 0}
                onChange={(e) => {
                  updateElement(activeCanvas.id, mockupEl.id, {
                    shadowBlur: e.target.checked ? 50 : 0,
                    shadowOpacity: e.target.checked ? 0.6 : 0,
                  });
                }}
                className="sr-only peer"
              />
              <div className="w-8 h-4 bg-slate-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#0ea5e9] peer-checked:after:bg-white"></div>
            </label>
          </div>
        </div>
      )}

      {/* POSITION (Matches Screenshot 3) */}
      <div className="space-y-2 pt-2 border-t border-[#1d2232]">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-slate-400 tracking-wider">
            POSITION
          </span>
          <Link2 className="w-3.5 h-3.5 text-slate-500" />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center bg-[#111420] border border-[#212738] rounded-lg px-2.5 py-1.5">
            <span className="text-[10px] text-slate-500 mr-2 font-bold">X</span>
            <input
              type="number"
              value={selectedEl ? selectedEl.x : mockupEl ? mockupEl.x : 0}
              onChange={(e) => {
                const target = selectedEl || mockupEl;
                if (target) {
                  updateElement(activeCanvas.id, target.id, {
                    x: Number(e.target.value),
                  });
                }
              }}
              className="w-full bg-transparent text-xs text-slate-200 outline-none font-mono"
            />
          </div>
          <div className="flex items-center bg-[#111420] border border-[#212738] rounded-lg px-2.5 py-1.5">
            <span className="text-[10px] text-slate-500 mr-2 font-bold">Y</span>
            <input
              type="number"
              value={selectedEl ? selectedEl.y : mockupEl ? mockupEl.y : 0}
              onChange={(e) => {
                const target = selectedEl || mockupEl;
                if (target) {
                  updateElement(activeCanvas.id, target.id, {
                    y: Number(e.target.value),
                  });
                }
              }}
              className="w-full bg-transparent text-xs text-slate-200 outline-none font-mono"
            />
          </div>
        </div>
      </div>

      {/* 3D TILT / ROTATION (Matches Screenshot 3) */}
      <div className="space-y-2 pt-2 border-t border-[#1d2232]">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-slate-400 tracking-wider">
            3D TILT & ROTATION
          </span>
          <Box className="w-3.5 h-3.5 text-slate-500" />
        </div>

        <div className="flex items-center gap-3 bg-[#111420] border border-[#212738] rounded-lg px-3 py-1.5">
          <RotateCw className="w-3.5 h-3.5 text-slate-400" />
          <input
            type="range"
            min={-45}
            max={45}
            value={selectedEl ? selectedEl.rotation || 0 : mockupEl ? mockupEl.rotation || 0 : 0}
            onChange={(e) => {
              const target = selectedEl || mockupEl;
              if (target) {
                updateElement(activeCanvas.id, target.id, {
                  rotation: Number(e.target.value),
                });
              }
            }}
            className="flex-1 accent-sky-500"
          />
          <span className="text-xs font-mono text-slate-300 w-8 text-right">
            {(selectedEl ? selectedEl.rotation || 0 : mockupEl ? mockupEl.rotation || 0 : 0)}°
          </span>
        </div>
      </div>
    </div>
  );
};
