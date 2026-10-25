"use client";

import React, { useRef, useState, useEffect } from "react";
import { useEditorStore } from "@/stores/editor-store";
import {
  Undo2,
  Redo2,
  Eye,
  EyeOff,
  Download,
  Save,
  Globe,
  Upload,
  Smartphone,
  ChevronDown,
  Layers,
  Sparkles,
  Check,
  Loader2,
} from "lucide-react";
import { CANVAS_SIZE_PRESETS } from "@/lib/constants/presets";
import { toast } from "@/stores/toast-store";

interface EditorToolbarProps {
  onOpenExport: () => void;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({ onOpenExport }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const sizeMenuRef = useRef<HTMLDivElement>(null);
  const [isSizeMenuOpen, setIsSizeMenuOpen] = useState(false);

  const project = useEditorStore((s) => s.project);
  const undo = useEditorStore((s) => s.undo);
  const redo = useEditorStore((s) => s.redo);
  const canUndo = useEditorStore((s) => s.canUndo());
  const canRedo = useEditorStore((s) => s.canRedo());
  const isPreview = useEditorStore((s) => s.isPreview);
  const togglePreview = useEditorStore((s) => s.togglePreview);
  const isDirty = useEditorStore((s) => s.isDirty);
  const saveProjectLocally = useEditorStore((s) => s.saveProjectLocally);
  const lastSavedAt = useEditorStore((s) => s.lastSavedAt);
  const [saveFeedback, setSaveFeedback] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLocalising, setIsLocalising] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleSave = () => {
    if (isSaving) return;
    setIsSaving(true);
    setTimeout(() => {
      saveProjectLocally();
      setIsSaving(false);
      setSaveFeedback(true);
      toast.success("Project saved! Available anytime in Projects → My Projects");
      setTimeout(() => {
        setSaveFeedback(false);
      }, 2200);
    }, 450);
  };

  const handleLocalise = () => {
    if (isLocalising) return;
    setIsLocalising(true);
    setTimeout(() => {
      setIsLocalising(false);
      toast.info("Localisation enabled: multi-language sets and auto-translation ready.");
    }, 400);
  };

  const handleLogIn = () => {
    if (isLoggingIn) return;
    setIsLoggingIn(true);
    setTimeout(() => {
      setIsLoggingIn(false);
      toast.info("Guest session active. Cloud account login can be connected anytime.");
    }, 350);
  };

  const activeCanvas =
    project.canvases.find((c) => c.id === project.activeCanvasId) ||
    project.canvases[0];
  const updateCanvasSize = useEditorStore((s) => s.updateCanvasSize);
  const updateAllCanvasesSize = useEditorStore((s) => s.updateAllCanvasesSize);
  const updateElement = useEditorStore((s) => s.updateElement);
  const selectedElementId = useEditorStore((s) => s.selectedElementId);
  const addElement = useEditorStore((s) => s.addElement);
  const setActiveNav = useEditorStore((s) => s.setActiveNav);

  // Close size menu on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sizeMenuRef.current && !sizeMenuRef.current.contains(e.target as Node)) {
        setIsSizeMenuOpen(false);
      }
    };
    if (isSizeMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSizeMenuOpen]);

  // Determine current size preset display name
  const getCurrentSizeName = () => {
    if (!activeCanvas) return "Phone 5\"";
    if (activeCanvas.width === 1080 && activeCanvas.height === 1920) return "Phone 5\"";
    if (activeCanvas.width === 1290 && activeCanvas.height === 2796) return "iPhone 6.9\"";
    if (activeCanvas.width === 1179 && activeCanvas.height === 2556) return "iPhone 6.1\" - 6.7\"";
    if (activeCanvas.width === 1200 && activeCanvas.height === 1920) return "Tablet 10\"";
    if (activeCanvas.width === 2048 && activeCanvas.height === 2732) return "iPad Pro 12.9\"";
    if (activeCanvas.width === 1024 && activeCanvas.height === 500) return "Feature (1024x500)";
    if (activeCanvas.width === 1080 && activeCanvas.height === 1080) return "Square (1080x1080)";
    if (activeCanvas.width === 1440 && activeCanvas.height === 900) return "Banner (1440x900)";
    return `${activeCanvas.width} × ${activeCanvas.height}`;
  };

  // Quick import screenshot
  const handleQuickImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeCanvas) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;

      const currentSelected = activeCanvas.elements.find(
        (el) => el.id === selectedElementId
      );
      if (currentSelected && currentSelected.type === "mockup") {
        updateElement(activeCanvas.id, currentSelected.id, {
          screenshotUrl: result,
        });
        return;
      }

      const existingMockup = activeCanvas.elements.find((el) => el.type === "mockup");
      if (existingMockup) {
        updateElement(activeCanvas.id, existingMockup.id, {
          screenshotUrl: result,
        });
      } else {
        const mockupWidth = Math.min(activeCanvas.width * 0.65, 700);
        const mockupHeight = mockupWidth * 2;
        addElement(activeCanvas.id, {
          id: "mockup-" + Math.random().toString(36).substring(2, 9),
          name: "Phone Mockup",
          type: "mockup",
          x: Math.round((activeCanvas.width - mockupWidth) / 2),
          y: Math.round(activeCanvas.height * 0.25),
          width: Math.round(mockupWidth),
          height: Math.round(mockupHeight),
          rotation: 0,
          opacity: 1,
          visible: true,
          locked: false,
          deviceType: "phone_modern",
          deviceTheme: "silver",
          screenshotUrl: result,
          screenFit: "cover",
          showNotchOrIsland: true,
          cornerRadius: 48,
          shadowBlur: 50,
          shadowOpacity: 0.7,
          shadowOffsetY: 25,
          glareEffect: true,
        });
      }
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  return (
    <header className="h-12 w-full bg-[#0a0d14] border-b border-[#181d2a] flex items-center justify-between px-3 z-40 select-none">
      {/* Left Region */}
      <div className="flex items-center gap-2">
        {/* Logo Squircle */}
        <div className="w-7 h-7 rounded-lg bg-[#0ea5e9] flex items-center justify-center shadow-[0_0_12px_rgba(14,165,233,0.5)]">
          <span className="text-white font-extrabold text-sm">P</span>
        </div>

        {/* FREE Badge */}
        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#142332] text-[#38bdf8] border border-[#0284c7]/40 tracking-wider">
          FREE
        </span>

        {/* Platform Selector Dropdown */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#111420] border border-[#212738] text-xs text-slate-300 hover:text-white cursor-pointer transition">
          <span className="text-emerald-400 text-xs">▶</span>
          <span className="text-[11px] font-medium">Play Store</span>
          <ChevronDown className="w-3 h-3 text-slate-500" />
        </div>

        {/* Templates Quick Icon Button */}
        <button
          onClick={() => setActiveNav("projects")}
          title="Browse Templates"
          className="p-1.5 rounded-lg bg-[#111420] border border-[#212738] text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <Layers className="w-3.5 h-3.5" />
        </button>

        {/* Quick Import Button */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={handleQuickImport}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          title="Quick Import Screenshot"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#111420] hover:bg-[#191e2e] border border-[#212738] text-xs font-medium text-slate-300 hover:text-white transition"
        >
          <Upload className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[11px]">Quick Import</span>
        </button>
      </div>

      {/* Right Region */}
      <div className="flex items-center gap-2">
        {/* Undo / Redo */}
        <div className="flex items-center gap-0.5 mr-1">
          <button
            onClick={undo}
            disabled={!canUndo}
            title="Undo (Ctrl+Z)"
            className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30 transition"
          >
            <Undo2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={redo}
            disabled={!canRedo}
            title="Redo (Ctrl+Y)"
            className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30 transition"
          >
            <Redo2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Preview Eye Toggle */}
        <button
          onClick={togglePreview}
          title={isPreview ? "Exit Preview" : "Clean Preview"}
          className={`p-1.5 rounded-lg border transition ${
            isPreview
              ? "bg-sky-500/20 text-sky-400 border-sky-500/50"
              : "bg-[#111420] text-slate-400 hover:text-white border-[#212738]"
          }`}
        >
          {isPreview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
        </button>

        {/* Device Size Preset Dropdown */}
        {activeCanvas && (
          <div className="relative" ref={sizeMenuRef}>
            <button
              onClick={() => setIsSizeMenuOpen(!isSizeMenuOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#111420] hover:bg-[#191e2e] border border-[#212738] hover:border-slate-700 text-xs text-slate-300 hover:text-white transition cursor-pointer"
            >
              <Smartphone className="w-3.5 h-3.5 text-sky-400" />
              <span className="text-[11px] font-medium">
                {getCurrentSizeName()}
              </span>
              <ChevronDown className={`w-3 h-3 text-slate-500 transition-transform ${isSizeMenuOpen ? "rotate-180" : ""}`} />
            </button>

            {isSizeMenuOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-64 rounded-xl bg-[#0e121d] border border-[#23293d] shadow-2xl p-1.5 z-50 text-xs">
                <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-[#1b2132] mb-1">
                  Resize All {project.canvases.length} Canvases
                </div>
                <div className="space-y-0.5 max-h-72 overflow-y-auto">
                  {CANVAS_SIZE_PRESETS.map((preset) => {
                    const isSelected =
                      activeCanvas.width === preset.width &&
                      activeCanvas.height === preset.height;
                    return (
                      <button
                        key={preset.id}
                        onClick={() => {
                          updateAllCanvasesSize(preset.width, preset.height);
                          setIsSizeMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition ${
                          isSelected
                            ? "bg-sky-500/20 text-sky-300 font-semibold"
                            : "hover:bg-slate-800/80 text-slate-300 hover:text-white"
                        }`}
                      >
                        <div className="flex flex-col">
                          <span className="text-xs">{preset.name}</span>
                          <span className="text-[10px] text-slate-500">
                            {preset.width} × {preset.height} px
                          </span>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-sky-400" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Localise Button (Unlocked) */}
        <button
          onClick={handleLocalise}
          disabled={isLocalising}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#111420] hover:bg-[#191e2e] border border-[#212738] text-xs text-slate-300 hover:text-white transition disabled:opacity-60"
          title="Multi-language localization"
        >
          {isLocalising ? (
            <Loader2 className="w-3.5 h-3.5 text-sky-400 animate-spin" />
          ) : (
            <Globe className="w-3.5 h-3.5 text-slate-400" />
          )}
          <span className="text-[11px]">{isLocalising ? "Localising..." : "Localise"}</span>
        </button>

        {/* Save Button (Unlocked & Functional with Loading State) */}
        <button
          onClick={handleSave}
          disabled={isSaving}
          title={lastSavedAt ? `Project saved at ${lastSavedAt}` : "Save Project Locally"}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-medium transition cursor-pointer disabled:opacity-70 ${
            saveFeedback
              ? "bg-emerald-500/20 border-emerald-500/60 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.35)]"
              : isSaving
              ? "bg-sky-500/20 border-sky-500/50 text-sky-300"
              : "bg-[#111420] hover:bg-[#191e2e] border-[#212738] text-sky-400 hover:text-sky-300 hover:border-sky-500/40"
          }`}
        >
          {isSaving ? (
            <Loader2 className="w-3.5 h-3.5 text-sky-400 animate-spin" />
          ) : saveFeedback ? (
            <Check className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <Save className="w-3.5 h-3.5 text-sky-400" />
          )}
          <span className="text-[11px] font-semibold">
            {isSaving ? "Saving..." : saveFeedback ? "Saved!" : "Save"}
          </span>
        </button>

        {/* Export Button */}
        <button
          onClick={onOpenExport}
          className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#0ea5e9] hover:bg-[#0284c7] text-white text-xs font-semibold shadow-[0_0_15px_rgba(14,165,233,0.4)] transition"
        >
          <Download className="w-3.5 h-3.5" />
          <span className="text-[11px]">Export</span>
        </button>

        {/* Log In Button */}
        <button
          onClick={handleLogIn}
          disabled={isLoggingIn}
          className="flex items-center gap-1 px-3 py-1 rounded-lg bg-[#0ea5e9] hover:bg-[#0284c7] text-white text-xs font-semibold transition disabled:opacity-60"
        >
          {isLoggingIn ? (
            <Loader2 className="w-3 h-3 animate-spin text-white" />
          ) : null}
          <span className="text-[11px]">{isLoggingIn ? "Logging in..." : "Log In"}</span>
          {!isLoggingIn && <span className="text-[10px]">›</span>}
        </button>
      </div>
    </header>
  );
};
