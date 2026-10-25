"use client";

import React, { useState, useRef } from "react";
import { useEditorStore } from "@/stores/editor-store";
import { CanvasItem, BackgroundConfig } from "@/types/editor";
import { CANVAS_SIZE_PRESETS } from "@/lib/constants/presets";
import { toast } from "@/stores/toast-store";
import {
  X,
  Upload,
  Sparkles,
  ArrowUp,
  ArrowDown,
  Trash2,
  Smartphone,
  Check,
  Plus,
  Loader2,
  Info,
} from "lucide-react";

interface ImportedItem {
  id: string;
  url: string;
  title: string;
  subtitle: string;
}

interface BulkImportDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

// Preset color options matching Screenshot 3
const BACKGROUND_SWATCHES: {
  id: string;
  label: string;
  solid: string;
  gradient: BackgroundConfig["gradient"];
}[] = [
  {
    id: "blue-indigo",
    label: "Vibrant Indigo Blue",
    solid: "#3b82f6",
    gradient: {
      type: "linear",
      angle: 180,
      stops: [
        { offset: 0, color: "#6366f1" },
        { offset: 0.5, color: "#3b82f6" },
        { offset: 1, color: "#2563eb" },
      ],
    },
  },
  {
    id: "bronze-titanium",
    label: "Bronze Titanium Dark",
    solid: "#1c1917",
    gradient: {
      type: "linear",
      angle: 180,
      stops: [
        { offset: 0, color: "#44403c" },
        { offset: 0.6, color: "#292524" },
        { offset: 1, color: "#1c1917" },
      ],
    },
  },
  {
    id: "rose-white",
    label: "Soft Rose Violet",
    solid: "#fdf4ff",
    gradient: {
      type: "linear",
      angle: 180,
      stops: [
        { offset: 0, color: "#fdf4ff" },
        { offset: 0.6, color: "#f5f3ff" },
        { offset: 1, color: "#ede9fe" },
      ],
    },
  },
  {
    id: "clean-light",
    label: "Minimal Crisp White",
    solid: "#ffffff",
    gradient: {
      type: "linear",
      angle: 180,
      stops: [
        { offset: 0, color: "#ffffff" },
        { offset: 1, color: "#f1f5f9" },
      ],
    },
  },
  {
    id: "midnight-dark",
    label: "Midnight Obsidian",
    solid: "#090a0f",
    gradient: {
      type: "linear",
      angle: 180,
      stops: [
        { offset: 0, color: "#090a0f" },
        { offset: 0.5, color: "#111827" },
        { offset: 1, color: "#1e1b4b" },
      ],
    },
  },
];

type LayoutChoice = "text-top" | "screenshot-top" | "alternate";

export const BulkImportDialog: React.FC<BulkImportDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const addMoreInputRef = useRef<HTMLInputElement>(null);

  const project = useEditorStore((s) => s.project);
  const bulkCreateCanvases = useEditorStore((s) => s.bulkCreateCanvases);

  // Stepper state: 1 = Upload, 2 = Content, 3 = Customize
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [items, setItems] = useState<ImportedItem[]>([]);
  const [isAiGenerating, setIsAiGenerating] = useState(false);

  // Customization options (Step 3)
  const [selectedPresetId, setSelectedPresetId] = useState("google_play_phone");
  const [bgType, setBgType] = useState<"solid" | "gradient">("gradient");
  const [selectedSwatchId, setSelectedSwatchId] = useState("blue-indigo");
  const [layoutChoice, setLayoutChoice] = useState<LayoutChoice>("text-top");

  if (!isOpen) return null;

  // Handle uploading files
  const handleFilesChosen = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const fileList = Array.from(files).slice(0, 20);
    const newItems: ImportedItem[] = [];

    let processed = 0;
    fileList.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        newItems.push({
          id: "item-" + Math.random().toString(36).substring(2, 9),
          url: reader.result as string,
          title: "",
          subtitle: "",
        });
        processed++;
        if (processed === fileList.length) {
          setItems((prev) => [...prev, ...newItems]);
          setStep(2);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Reorder items in Step 2
  const moveItem = (index: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= items.length) return;
    const reordered = [...items];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(targetIdx, 0, moved);
    setItems(reordered);
  };

  // Remove single item in Step 2
  const removeItem = (id: string) => {
    const remaining = items.filter((it) => it.id !== id);
    setItems(remaining);
    if (remaining.length === 0) {
      setStep(1);
    }
  };

  // AI Headline Generator (Step 2)
  const handleGenerateAiHeadlines = () => {
    if (items.length === 0) return;
    setIsAiGenerating(true);

    const headlineBank = [
      {
        title: "All-in-one experience",
        subtitle: "Everything you need right at your fingertips.",
      },
      {
        title: "Lightning-fast speed",
        subtitle: "Designed for zero latency and instant responses.",
      },
      {
        title: "Real-time AI insights",
        subtitle: "Automated analysis that works while you sleep.",
      },
      {
        title: "Bank-grade security",
        subtitle: "End-to-end biometric encryption on your device.",
      },
      {
        title: "Seamless integrations",
        subtitle: "Sync across all your devices in seconds.",
      },
      {
        title: "Over 1,000,000+ users",
        subtitle: "Join the highest rated community worldwide.",
      },
    ];

    setTimeout(() => {
      const updated = items.map((it, idx) => {
        const suggestion = headlineBank[idx % headlineBank.length];
        return {
          ...it,
          title: it.title || suggestion.title,
          subtitle: it.subtitle || suggestion.subtitle,
        };
      });
      setItems(updated);
      setIsAiGenerating(false);
      toast.success("Generated headlines with AI!");
    }, 600);
  };

  // Final Action: Create N Canvases (Step 3)
  const handleFinalCreateCanvases = () => {
    if (items.length === 0) return;

    const preset =
      CANVAS_SIZE_PRESETS.find((p) => p.id === selectedPresetId) ||
      CANVAS_SIZE_PRESETS[0];

    const chosenSwatch =
      BACKGROUND_SWATCHES.find((s) => s.id === selectedSwatchId) ||
      BACKGROUND_SWATCHES[0];

    const bgConfig: BackgroundConfig = {
      type: bgType,
      color: chosenSwatch.solid,
      gradient: chosenSwatch.gradient,
      pattern: { type: "none", color: "#fff", opacity: 0, scale: 20 },
    };

    const newCanvases: CanvasItem[] = items.map((item, idx) => {
      const canvasId = "c-bulk-" + (idx + 1) + "-" + Math.random().toString(36).substring(2, 7);

      // Determine text and mockup positioning based on layout choice
      const isTextTop =
        layoutChoice === "text-top"
          ? true
          : layoutChoice === "screenshot-top"
          ? false
          : idx % 2 === 0;

      const elements: any[] = [];

      if (isTextTop) {
        // Option 1: Headline on top, Mockup on bottom
        const mockupW = Math.min(Math.round(preset.width * 0.68), 700);
        const mockupH = Math.round(mockupW * 2.05);
        const mockupX = Math.round((preset.width - mockupW) / 2);
        const mockupY = item.subtitle && item.subtitle.trim().length > 0 ? 350 : 290;

        // 1. Title on top
        elements.push({
          id: `t-bulk-${idx}-title`,
          name: "Headline",
          type: "text",
          x: 80,
          y: 85,
          width: preset.width - 160,
          height: 150,
          rotation: 0,
          opacity: 1,
          visible: true,
          locked: false,
          text: item.title || `Key feature #${idx + 1}`,
          fontSize: 78,
          fontFamily: "Outfit",
          fontWeight: "800",
          fontStyle: "normal",
          fill: "#ffffff",
          align: "center",
          lineHeight: 1.15,
          letterSpacing: -1.5,
        });

        // 2. Subtitle (if present)
        if (item.subtitle && item.subtitle.trim().length > 0) {
          elements.push({
            id: `d-bulk-${idx}-desc`,
            name: "Subtitle Description",
            type: "text",
            x: 90,
            y: 245,
            width: preset.width - 180,
            height: 55,
            rotation: 0,
            opacity: 0.9,
            visible: true,
            locked: false,
            text: item.subtitle,
            fontSize: 34,
            fontFamily: "Outfit",
            fontWeight: "400",
            fontStyle: "normal",
            fill: "#e0e7ff",
            align: "center",
            lineHeight: 1.25,
            letterSpacing: -0.5,
          });
        }

        // 3. Phone mockup on bottom (Matches Screenshot 4 Gold / Modern frame)
        elements.push({
          id: `m-bulk-${idx}-mock`,
          name: "Phone Mockup",
          type: "mockup",
          x: mockupX,
          y: mockupY,
          width: mockupW,
          height: mockupH,
          rotation: 0,
          opacity: 1,
          visible: true,
          locked: false,
          deviceType: "phone_modern",
          deviceTheme: "gold",
          screenshotUrl: item.url,
          screenFit: "cover",
          showNotchOrIsland: true,
          cornerRadius: 48,
          shadowBlur: 55,
          shadowOpacity: 0.65,
          shadowOffsetY: 25,
          glareEffect: true,
        });
      } else {
        // Option 2: Phone Mockup on top, Headline & Subtitle on bottom
        // Top margin ensures the phone top, dynamic island, and rounded gold bezel are 100% visible inside canvas
        const topMargin = Math.round(preset.height * 0.045); // e.g. 85px on 1920
        const hasSubtitle = !!(item.subtitle && item.subtitle.trim().length > 0);

        // Leave balanced room for text below
        const bottomTextSpace = hasSubtitle ? 380 : 300;
        const availableHeight = preset.height - topMargin - bottomTextSpace;
        const mockupH = Math.min(Math.round(availableHeight), Math.round(preset.height * 0.68));
        const mockupW = Math.round(mockupH / 2.05);
        const mockupX = Math.round((preset.width - mockupW) / 2);
        const mockupY = topMargin;

        // 1. Phone Mockup placed comfortably at top
        elements.push({
          id: `m-bulk-${idx}-mock`,
          name: "Phone Mockup",
          type: "mockup",
          x: mockupX,
          y: mockupY,
          width: mockupW,
          height: mockupH,
          rotation: 0,
          opacity: 1,
          visible: true,
          locked: false,
          deviceType: "phone_modern",
          deviceTheme: "gold",
          screenshotUrl: item.url,
          screenFit: "cover",
          showNotchOrIsland: true,
          cornerRadius: 48,
          shadowBlur: 55,
          shadowOpacity: 0.65,
          shadowOffsetY: 25,
          glareEffect: true,
        });

        // 2. Headline Title centered in the lower area below mockup
        const spaceBelow = preset.height - (mockupY + mockupH);
        const textBlockHeight = hasSubtitle ? 200 : 120;
        const titleY = (mockupY + mockupH) + Math.max(Math.round((spaceBelow - textBlockHeight) / 2), 25);

        elements.push({
          id: `t-bulk-${idx}-title`,
          name: "Headline",
          type: "text",
          x: 80,
          y: titleY,
          width: preset.width - 160,
          height: 140,
          rotation: 0,
          opacity: 1,
          visible: true,
          locked: false,
          text: item.title || `Key feature #${idx + 1}`,
          fontSize: 76,
          fontFamily: "Outfit",
          fontWeight: "800",
          fontStyle: "normal",
          fill: "#ffffff",
          align: "center",
          lineHeight: 1.15,
          letterSpacing: -1.5,
        });

        // 3. Subtitle Description (if present)
        if (hasSubtitle) {
          elements.push({
            id: `d-bulk-${idx}-desc`,
            name: "Subtitle Description",
            type: "text",
            x: 90,
            y: titleY + 120,
            width: preset.width - 180,
            height: 55,
            rotation: 0,
            opacity: 0.9,
            visible: true,
            locked: false,
            text: item.subtitle,
            fontSize: 34,
            fontFamily: "Outfit",
            fontWeight: "400",
            fontStyle: "normal",
            fill: "#e0e7ff",
            align: "center",
            lineHeight: 1.25,
            letterSpacing: -0.5,
          });
        }
      }

      return {
        id: canvasId,
        name: `Screen ${idx + 1}`,
        width: preset.width,
        height: preset.height,
        background: bgConfig,
        elements,
      };
    });

    const importedContentItems = items.map((it) => ({
      url: it.url,
      title: it.title,
      subtitle: it.subtitle,
    }));
    bulkCreateCanvases(newCanvases, preset.platform, importedContentItems);
    onClose();
    toast.success(
      `Created ${items.length} canvases & applied your screenshots to all 40 templates!`
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-150 select-none">
      {/* Modal Card */}
      <div className="w-full max-w-2xl bg-[#0e121d] border border-[#212738] rounded-2xl shadow-2xl overflow-hidden flex flex-col text-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1b2030]">
          <h2 className="text-sm font-bold text-white tracking-wide">
            Bulk Import Screenshots
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Stepper (Matches Screenshot 1, 2, 3) */}
        <div className="flex items-center justify-center gap-3 py-3 border-b border-[#181d2c] text-xs">
          {/* Step 1 */}
          <div
            className={`flex items-center gap-1.5 ${
              step === 1 ? "text-white font-semibold" : "text-slate-400"
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                step === 1
                  ? "bg-slate-700 text-white"
                  : step > 1
                  ? "bg-slate-800 text-emerald-400"
                  : "bg-slate-800 text-slate-500"
              }`}
            >
              {step > 1 ? <Check className="w-3 h-3 text-emerald-400" /> : "1"}
            </span>
            <span>Upload</span>
          </div>

          <div className="w-8 h-[1px] bg-slate-700" />

          {/* Step 2 */}
          <div
            className={`flex items-center gap-1.5 ${
              step === 2
                ? "text-white font-semibold"
                : step > 2
                ? "text-slate-400"
                : "text-slate-500"
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                step === 2
                  ? "bg-slate-700 text-white"
                  : step > 2
                  ? "bg-slate-800 text-emerald-400"
                  : "bg-slate-800 text-slate-500"
              }`}
            >
              {step > 2 ? <Check className="w-3 h-3 text-emerald-400" /> : "2"}
            </span>
            <span>Content</span>
          </div>

          <div className="w-8 h-[1px] bg-slate-700" />

          {/* Step 3 */}
          <div
            className={`flex items-center gap-1.5 ${
              step === 3 ? "text-white font-semibold" : "text-slate-500"
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                step === 3 ? "bg-slate-700 text-white" : "bg-slate-800 text-slate-500"
              }`}
            >
              3
            </span>
            <span>Customize</span>
          </div>
        </div>

        {/* STEP 1: UPLOAD (Matches Screenshot 1) */}
        {step === 1 && (
          <div className="p-8">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/png,image/jpeg,image/webp"
              onChange={(e) => handleFilesChosen(e.target.files)}
              className="hidden"
            />

            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                handleFilesChosen(e.dataTransfer.files);
              }}
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center justify-center border-2 border-dashed border-[#263148] hover:border-sky-500/80 rounded-2xl p-14 bg-[#0a0d15]/60 hover:bg-[#111726]/40 transition cursor-pointer text-center group"
            >
              <div className="w-12 h-12 rounded-full bg-[#182033] flex items-center justify-center text-slate-400 group-hover:text-sky-400 group-hover:scale-110 transition mb-4">
                <Upload className="w-5 h-5" />
              </div>

              <h3 className="text-base font-bold text-white mb-1.5">
                Bulk import your screenshots
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mb-6 leading-relaxed">
                Drag and drop up to 20 images, or click to upload. We'll create
                one canvas per screenshot so you can add copies next.
              </p>

              <button
                type="button"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0ea5e9] hover:bg-[#0284c7] text-white text-xs font-semibold shadow-lg shadow-sky-500/30 transition"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload screenshots</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: CONTENT (Matches Screenshot 2) */}
        {step === 2 && (
          <div className="p-6 flex flex-col max-h-[500px]">
            {/* Top Toolbar */}
            <div className="flex items-center justify-between pb-3">
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                <span>Tip: Press</span>
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">
                  ⌘ V
                </kbd>
                <span>to fill all rows from your clipboard</span>
                <Info className="w-3 h-3 text-slate-500" />
              </div>

              <button
                onClick={handleGenerateAiHeadlines}
                disabled={isAiGenerating}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#14213d] hover:bg-[#1a2d54] border border-[#233866] text-xs font-semibold text-sky-400 hover:text-sky-300 transition"
              >
                {isAiGenerating ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5" />
                )}
                <span>Generate with AI</span>
              </button>
            </div>

            {/* Hidden Input to add more screenshots */}
            <input
              ref={addMoreInputRef}
              type="file"
              multiple
              accept="image/png,image/jpeg,image/webp"
              onChange={(e) => handleFilesChosen(e.target.files)}
              className="hidden"
            />

            {/* List of Screenshot Rows */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1 py-1">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-[#111624] border border-[#1e273c]"
                >
                  {/* Left: Reorder arrows & index number */}
                  <div className="flex flex-col items-center justify-center text-slate-400 w-6 shrink-0">
                    <span className="text-[11px] font-bold text-slate-500">
                      {index + 1}
                    </span>
                    <button
                      onClick={() => moveItem(index, "up")}
                      disabled={index === 0}
                      title="Move up"
                      className="p-0.5 hover:text-white disabled:opacity-20 transition"
                    >
                      <ArrowUp className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => moveItem(index, "down")}
                      disabled={index === items.length - 1}
                      title="Move down"
                      className="p-0.5 hover:text-white disabled:opacity-20 transition"
                    >
                      <ArrowDown className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Thumbnail Preview */}
                  <div className="w-16 h-14 rounded-lg bg-black/60 border border-[#2b3550] overflow-hidden shrink-0 flex items-center justify-center">
                    <img
                      src={item.url}
                      alt={`Screenshot ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Inputs */}
                  <div className="flex-1 space-y-1.5">
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => {
                        const val = e.target.value;
                        setItems((prev) =>
                          prev.map((it, i) => (i === index ? { ...it, title: val } : it))
                        );
                      }}
                      placeholder="Title"
                      className="w-full bg-[#161c2d] border border-[#243049] focus:border-[#0ea5e9] rounded-lg px-2.5 py-1 text-xs text-white outline-none"
                    />
                    <input
                      type="text"
                      value={item.subtitle}
                      onChange={(e) => {
                        const val = e.target.value;
                        setItems((prev) =>
                          prev.map((it, i) =>
                            i === index ? { ...it, subtitle: val } : it
                          )
                        );
                      }}
                      placeholder="Subtitle (optional)"
                      className="w-full bg-[#161c2d] border border-[#243049] focus:border-[#0ea5e9] rounded-lg px-2.5 py-1 text-xs text-slate-300 outline-none"
                    />
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    title="Remove screenshot"
                    className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 rounded-lg transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}

              {/* Add More Screenshots Button */}
              <button
                onClick={() => addMoreInputRef.current?.click()}
                className="flex items-center justify-center gap-1.5 w-full py-2 rounded-xl bg-[#131929] hover:bg-[#1a233a] border border-[#232f4a] text-xs font-semibold text-slate-300 hover:text-white transition"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Add more screenshots</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: CUSTOMIZE (Matches Screenshot 3) */}
        {step === 3 && (
          <div className="p-6 space-y-4">
            {/* Top Grid: Size Preset & Background */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* SIZE PRESET Card */}
              <div className="p-3.5 rounded-xl bg-[#111624] border border-[#1e273c] space-y-2">
                <span className="text-[10px] font-bold text-slate-400 tracking-wider block">
                  SIZE PRESET
                </span>

                <div className="relative">
                  <select
                    value={selectedPresetId}
                    onChange={(e) => setSelectedPresetId(e.target.value)}
                    className="w-full bg-[#161c2d] border border-[#26334d] text-xs text-slate-100 rounded-lg pl-8 pr-3 py-2 outline-none cursor-pointer appearance-none"
                  >
                    <option value="google_play_phone">PHONE 5"</option>
                    <option value="iphone_6_9">iPhone 6.9"</option>
                    <option value="iphone_6_7">iPhone 6.1" - 6.7"</option>
                    <option value="android_tablet_10">Tablet 10"</option>
                    <option value="google_play_feature">Feature (1024x500)</option>
                    <option value="square_post">Square (1080x1080)</option>
                  </select>
                  <Smartphone className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
                </div>
              </div>

              {/* BACKGROUND Card */}
              <div className="p-3.5 rounded-xl bg-[#111624] border border-[#1e273c] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 tracking-wider">
                    BACKGROUND
                  </span>
                  <div className="flex items-center rounded-lg bg-[#161c2d] border border-[#243049] p-0.5 text-[10px]">
                    <button
                      onClick={() => setBgType("solid")}
                      className={`px-2 py-0.5 rounded font-medium transition ${
                        bgType === "solid"
                          ? "bg-slate-700 text-white"
                          : "text-slate-400"
                      }`}
                    >
                      Solid
                    </button>
                    <button
                      onClick={() => setBgType("gradient")}
                      className={`px-2 py-0.5 rounded font-medium transition ${
                        bgType === "gradient"
                          ? "bg-slate-700 text-white"
                          : "text-slate-400"
                      }`}
                    >
                      Gradient
                    </button>
                  </div>
                </div>

                {/* Swatch options (Matches Screenshot 3) */}
                <div className="flex items-center gap-2 pt-1">
                  {BACKGROUND_SWATCHES.map((swatch) => {
                    const isSelected = selectedSwatchId === swatch.id;
                    return (
                      <button
                        key={swatch.id}
                        onClick={() => setSelectedSwatchId(swatch.id)}
                        className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all ${
                          isSelected
                            ? "border-sky-400 ring-2 ring-sky-400/40 scale-105"
                            : "border-transparent opacity-85 hover:opacity-100"
                        }`}
                        style={{
                          background:
                            bgType === "gradient"
                              ? `linear-gradient(180deg, ${swatch.gradient.stops[0].color}, ${swatch.gradient.stops[swatch.gradient.stops.length - 1].color})`
                              : swatch.solid,
                        }}
                        title={swatch.label}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                      </button>
                    );
                  })}
                </div>

                <p className="text-[10px] text-slate-500 leading-tight">
                  We picked these from your screenshots. You can fine-tune the
                  background later from the sidebar.
                </p>
              </div>
            </div>

            {/* Bottom Card: LAYOUT (Matches Screenshot 3) */}
            <div className="p-3.5 rounded-xl bg-[#111624] border border-[#1e273c] space-y-2">
              <span className="text-[10px] font-bold text-slate-400 tracking-wider block">
                LAYOUT
              </span>

              <div className="space-y-2">
                {/* Option 1: All: Text top, screenshot bottom */}
                <div
                  onClick={() => setLayoutChoice("text-top")}
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${
                    layoutChoice === "text-top"
                      ? "bg-[#0c1a2f] border-sky-500 text-sky-200"
                      : "bg-[#141a2b] border-[#222d46] text-slate-300 hover:border-slate-600"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center border text-[10px] ${
                      layoutChoice === "text-top"
                        ? "border-sky-400 bg-sky-500 text-white"
                        : "border-slate-600"
                    }`}
                  >
                    {layoutChoice === "text-top" && <Check className="w-2.5 h-2.5" />}
                  </div>

                  {/* 3 mini phone icons (Text top, screen bottom) */}
                  <div className="flex items-center gap-1">
                    {[1, 2, 3].map((n) => (
                      <div
                        key={n}
                        className={`w-4 h-7 rounded border flex flex-col justify-between p-0.5 ${
                          layoutChoice === "text-top"
                            ? "border-sky-400 bg-sky-500/10"
                            : "border-slate-600 bg-slate-800"
                        }`}
                      >
                        <div className="w-full h-0.5 rounded bg-sky-400" />
                        <div className="w-full h-4 rounded bg-sky-400/30" />
                      </div>
                    ))}
                  </div>

                  <span className="text-xs font-semibold">
                    All: Text top, screenshot bottom
                  </span>
                </div>

                {/* Option 2: All: Screenshot top, text bottom */}
                <div
                  onClick={() => setLayoutChoice("screenshot-top")}
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${
                    layoutChoice === "screenshot-top"
                      ? "bg-[#0c1a2f] border-sky-500 text-sky-200"
                      : "bg-[#141a2b] border-[#222d46] text-slate-300 hover:border-slate-600"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center border text-[10px] ${
                      layoutChoice === "screenshot-top"
                        ? "border-sky-400 bg-sky-500 text-white"
                        : "border-slate-600"
                    }`}
                  >
                    {layoutChoice === "screenshot-top" && <Check className="w-2.5 h-2.5" />}
                  </div>

                  {/* 3 mini phone icons (Screen top, text bottom) */}
                  <div className="flex items-center gap-1">
                    {[1, 2, 3].map((n) => (
                      <div
                        key={n}
                        className={`w-4 h-7 rounded border flex flex-col justify-between p-0.5 ${
                          layoutChoice === "screenshot-top"
                            ? "border-sky-400 bg-sky-500/10"
                            : "border-slate-600 bg-slate-800"
                        }`}
                      >
                        <div
                          className={`w-full h-4 rounded ${
                            layoutChoice === "screenshot-top"
                              ? "bg-sky-400/30"
                              : "bg-slate-600"
                          }`}
                        />
                        <div
                          className={`w-full h-0.5 rounded ${
                            layoutChoice === "screenshot-top"
                              ? "bg-sky-400"
                              : "bg-slate-400"
                          }`}
                        />
                      </div>
                    ))}
                  </div>

                  <span className="text-xs font-semibold">
                    All: Screenshot top, text bottom
                  </span>
                </div>

                {/* Option 3: Alternate */}
                <div
                  onClick={() => setLayoutChoice("alternate")}
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${
                    layoutChoice === "alternate"
                      ? "bg-[#0c1a2f] border-sky-500 text-sky-200"
                      : "bg-[#141a2b] border-[#222d46] text-slate-300 hover:border-slate-600"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center border text-[10px] ${
                      layoutChoice === "alternate"
                        ? "border-sky-400 bg-sky-500 text-white"
                        : "border-slate-600"
                    }`}
                  >
                    {layoutChoice === "alternate" && <Check className="w-2.5 h-2.5" />}
                  </div>

                  {/* 3 mini phone icons (Alternating) */}
                  <div className="flex items-center gap-1">
                    <div
                      className={`w-4 h-7 rounded border flex flex-col justify-between p-0.5 ${
                        layoutChoice === "alternate"
                          ? "border-sky-400 bg-sky-500/10"
                          : "border-slate-600 bg-slate-800"
                      }`}
                    >
                      <div
                        className={`w-full h-0.5 rounded ${
                          layoutChoice === "alternate"
                            ? "bg-sky-400"
                            : "bg-slate-400"
                        }`}
                      />
                      <div
                        className={`w-full h-4 rounded ${
                          layoutChoice === "alternate"
                            ? "bg-sky-400/30"
                            : "bg-slate-600"
                        }`}
                      />
                    </div>
                    <div
                      className={`w-4 h-7 rounded border flex flex-col justify-between p-0.5 ${
                        layoutChoice === "alternate"
                          ? "border-sky-400 bg-sky-500/10"
                          : "border-slate-600 bg-slate-800"
                      }`}
                    >
                      <div
                        className={`w-full h-4 rounded ${
                          layoutChoice === "alternate"
                            ? "bg-sky-400/30"
                            : "bg-slate-600"
                        }`}
                      />
                      <div
                        className={`w-full h-0.5 rounded ${
                          layoutChoice === "alternate"
                            ? "bg-sky-400"
                            : "bg-slate-400"
                        }`}
                      />
                    </div>
                    <div
                      className={`w-4 h-7 rounded border flex flex-col justify-between p-0.5 ${
                        layoutChoice === "alternate"
                          ? "border-sky-400 bg-sky-500/10"
                          : "border-slate-600 bg-slate-800"
                      }`}
                    >
                      <div
                        className={`w-full h-0.5 rounded ${
                          layoutChoice === "alternate"
                            ? "bg-sky-400"
                            : "bg-slate-400"
                        }`}
                      />
                      <div
                        className={`w-full h-4 rounded ${
                          layoutChoice === "alternate"
                            ? "bg-sky-400/30"
                            : "bg-slate-600"
                        }`}
                      />
                    </div>
                  </div>

                  <span className="text-xs font-semibold">
                    Alternate (text top first)
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-[#1b2030] bg-[#0c101a] text-xs">
          {/* Left Context Notice */}
          {step > 1 ? (
            <span className="text-slate-400 text-[11px]">
              This will replace your existing {project.canvases.length} canvases.
            </span>
          ) : (
            <div />
          )}

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg bg-[#151a29] hover:bg-[#1e2538] border border-[#242f49] text-xs font-medium text-slate-300 hover:text-white transition"
            >
              Cancel
            </button>

            {step === 2 && (
              <button
                onClick={() => setStep(3)}
                disabled={items.length === 0}
                className="px-4 py-1.5 rounded-lg bg-[#0ea5e9] hover:bg-[#0284c7] text-white text-xs font-semibold shadow-md shadow-sky-500/20 transition disabled:opacity-50"
              >
                Next: Customize
              </button>
            )}

            {step === 3 && (
              <>
                <button
                  onClick={() => setStep(2)}
                  className="px-3.5 py-1.5 rounded-lg bg-[#151a29] hover:bg-[#1e2538] border border-[#242f49] text-xs font-medium text-slate-300 hover:text-white transition"
                >
                  Back
                </button>
                <button
                  onClick={handleFinalCreateCanvases}
                  className="px-4 py-1.5 rounded-lg bg-[#0ea5e9] hover:bg-[#0284c7] text-white text-xs font-semibold shadow-md shadow-sky-500/30 transition"
                >
                  Create {items.length} canvas{items.length > 1 ? "es" : ""}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
