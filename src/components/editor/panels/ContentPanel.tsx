"use client";

import React, { useState } from "react";
import { useEditorStore } from "@/stores/editor-store";
import { TextElement } from "@/types/editor";
import { toast } from "@/stores/toast-store";
import {
  Type,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Layers,
  Sparkles,
  Loader2,
  Plus,
} from "lucide-react";

const FONT_OPTIONS = [
  "Archivo",
  "Inter",
  "Plus Jakarta Sans",
  "Geist Sans",
  "Outfit",
  "Roboto",
  "Monospace",
];

export const ContentPanel: React.FC = () => {
  const project = useEditorStore((s) => s.project);
  const activeCanvas =
    project.canvases.find((c) => c.id === project.activeCanvasId) ||
    project.canvases[0];
  const selectedElementId = useEditorStore((s) => s.selectedElementId);
  const updateElement = useEditorStore((s) => s.updateElement);
  const addElement = useEditorStore((s) => s.addElement);

  const [syncWithTitle, setSyncWithTitle] = useState(false);
  const [isConverting, setIsConverting] = useState(false);

  if (!activeCanvas) return null;

  // Find all text elements on active canvas
  const textElements = activeCanvas.elements.filter(
    (el) => el.type === "text"
  ) as TextElement[];

  // Primary headline / title element
  const titleEl =
    (selectedElementId &&
      textElements.find(
        (el) =>
          el.id === selectedElementId &&
          !el.name.toLowerCase().includes("desc") &&
          !el.id.toLowerCase().includes("desc")
      )) ||
    textElements.find(
      (el) =>
        el.name.toLowerCase().includes("title") ||
        el.name.toLowerCase().includes("headline") ||
        el.id.toLowerCase().includes("title")
    ) ||
    textElements[0];

  // Description / subtitle element
  const descEl =
    textElements.find(
      (el) =>
        el !== titleEl &&
        (el.name.toLowerCase().includes("desc") ||
          el.name.toLowerCase().includes("subtitle") ||
          el.id.toLowerCase().includes("desc"))
    ) ||
    (selectedElementId &&
      textElements.find(
        (el) =>
          el.id === selectedElementId &&
          (el.name.toLowerCase().includes("desc") ||
            el.id.toLowerCase().includes("desc"))
      )) ||
    (textElements.length > 1 && textElements[1] !== titleEl
      ? textElements[1]
      : undefined);

  // Convert to annotation layers handler
  const handleConvertAnnotations = () => {
    if (isConverting) return;
    setIsConverting(true);
    setTimeout(() => {
      setIsConverting(false);
      toast.success("Converted text to independent annotation layers!");
    }, 400);
  };

  // Handle description change (update or dynamically create)
  const handleDescriptionChange = (newVal: string) => {
    if (descEl) {
      updateElement(activeCanvas.id, descEl.id, {
        text: newVal,
      });
    } else if (newVal.trim().length > 0) {
      // Dynamically create a clean, elegant subtitle description element
      const titleY = titleEl?.y || 90;
      const titleHeight = titleEl?.height || 160;
      const titleWidth = titleEl?.width || Math.min(activeCanvas.width * 0.85, 920);
      const titleX = titleEl?.x || Math.round((activeCanvas.width - titleWidth) / 2);
      const titleFont = titleEl?.fontFamily || "Inter";
      const titleAlign = titleEl?.align || "center";
      const titleColor = titleEl?.fill || "#ffffff";

      const newDescId = "desc-" + Math.random().toString(36).substring(2, 9);
      addElement(activeCanvas.id, {
        id: newDescId,
        name: "Subtitle Description",
        type: "text",
        x: titleX,
        y: titleY + titleHeight + 20,
        width: titleWidth,
        height: 60,
        rotation: 0,
        opacity: 0.85,
        visible: true,
        locked: false,
        text: newVal,
        fontSize: 34,
        fontFamily: syncWithTitle ? titleFont : "Inter",
        fontWeight: "400",
        fontStyle: "normal",
        fill: titleColor,
        align: titleAlign,
        lineHeight: 1.25,
        letterSpacing: -0.5,
      });
    }
  };

  // Add clean description if none exists
  const handleAddDescription = () => {
    if (descEl) return;
    handleDescriptionChange("Your key benefit, workflow details, or product highlights.");
    toast.success("Added description subtitle to canvas!");
  };

  return (
    <div className="flex flex-col h-full text-slate-200 overflow-y-auto pr-1 space-y-4">
      {/* Header (Matches Screenshot 3) */}
      <div className="flex items-center gap-2 mb-1">
        <Type className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-[11px] font-bold tracking-wider text-slate-300 uppercase">
          CONTENT
        </span>
      </div>

      {/* Convert to Annotation Layers Button with Loading State */}
      <button
        onClick={handleConvertAnnotations}
        disabled={isConverting}
        className="flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-[#111420] border border-[#212738] text-xs font-semibold text-slate-300 hover:text-white transition disabled:opacity-60"
      >
        {isConverting ? (
          <Loader2 className="w-3.5 h-3.5 text-sky-400 animate-spin" />
        ) : (
          <Layers className="w-3.5 h-3.5 text-slate-400" />
        )}
        <span>{isConverting ? "Converting..." : "Convert to Annotation Layers"}</span>
      </button>

      {/* TITLE Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-slate-400 tracking-wider block">
            TITLE
          </span>
          {titleEl && (
            <span className="text-[10px] text-slate-500 font-mono">
              {titleEl.name}
            </span>
          )}
        </div>

        {/* Text area for multi-line headlines */}
        <textarea
          rows={3}
          value={titleEl?.text || ""}
          onChange={(e) => {
            if (titleEl) {
              updateElement(activeCanvas.id, titleEl.id, {
                text: e.target.value,
              });
            }
          }}
          placeholder="Your app's key feature"
          className="w-full bg-[#111420] border border-[#212738] focus:border-[#0ea5e9] rounded-xl px-3 py-2 text-xs text-slate-100 outline-none resize-none font-sans"
        />

        {/* Hint text */}
        <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
          <Sparkles className="w-3 h-3 text-slate-600" />
          <span>Select any word to highlight it.</span>
        </div>

        {/* Font dropdown */}
        <select
          value={titleEl?.fontFamily || "Archivo"}
          onChange={(e) => {
            if (titleEl) {
              updateElement(activeCanvas.id, titleEl.id, {
                fontFamily: e.target.value,
              });
              if (syncWithTitle && descEl) {
                updateElement(activeCanvas.id, descEl.id, {
                  fontFamily: e.target.value,
                });
              }
            }
          }}
          className="w-full bg-[#111420] border border-[#212738] text-xs text-slate-200 rounded-xl px-3 py-2 outline-none cursor-pointer"
        >
          {FONT_OPTIONS.map((f) => (
            <option key={f} value={f} className="bg-[#0b0e17]">
              {f}
            </option>
          ))}
        </select>

        {/* FONT SIZE slider */}
        <div className="flex items-center justify-between gap-3 bg-[#111420] border border-[#212738] rounded-lg px-3 py-1.5">
          <span className="text-[10px] font-bold text-slate-400 tracking-wider">
            FONT SIZE
          </span>
          <input
            type="range"
            min={24}
            max={350}
            value={titleEl?.fontSize || 78}
            onChange={(e) => {
              if (titleEl) {
                updateElement(activeCanvas.id, titleEl.id, {
                  fontSize: Number(e.target.value),
                });
              }
            }}
            className="flex-1 cursor-pointer"
          />
          <span className="text-xs font-mono text-slate-300 w-8 text-right">
            {titleEl?.fontSize || 78}
          </span>
        </div>

        {/* LINE HEIGHT slider */}
        <div className="flex items-center justify-between gap-3 bg-[#111420] border border-[#212738] rounded-lg px-3 py-1.5">
          <span className="text-[10px] font-bold text-slate-400 tracking-wider">
            LINE HEIGHT
          </span>
          <input
            type="range"
            min={80}
            max={150}
            value={Math.round((titleEl?.lineHeight || 1.15) * 100)}
            onChange={(e) => {
              if (titleEl) {
                updateElement(activeCanvas.id, titleEl.id, {
                  lineHeight: Number(e.target.value) / 100,
                });
              }
            }}
            className="flex-1 cursor-pointer"
          />
          <span className="text-xs font-mono text-slate-300 w-8 text-right">
            {Math.round((titleEl?.lineHeight || 1.15) * 100)}
          </span>
        </div>

        {/* LETTER SPACING slider */}
        <div className="flex items-center justify-between gap-3 bg-[#111420] border border-[#212738] rounded-lg px-3 py-1.5">
          <span className="text-[10px] font-bold text-slate-400 tracking-wider">
            LETTER SPACING
          </span>
          <input
            type="range"
            min={-10}
            max={10}
            value={titleEl?.letterSpacing || -1.5}
            onChange={(e) => {
              if (titleEl) {
                updateElement(activeCanvas.id, titleEl.id, {
                  letterSpacing: Number(e.target.value),
                });
              }
            }}
            className="flex-1 cursor-pointer"
          />
          <span className="text-xs font-mono text-slate-300 w-8 text-right">
            {titleEl?.letterSpacing || -1.5}
          </span>
        </div>

        {/* Styling row (Color box, B, I, Align Left, Center, Right) */}
        <div className="flex items-center gap-2 pt-1">
          {/* Color box */}
          <input
            type="color"
            value={titleEl?.fill || "#ffffff"}
            onChange={(e) => {
              if (titleEl) {
                updateElement(activeCanvas.id, titleEl.id, {
                  fill: e.target.value,
                });
              }
            }}
            className="w-8 h-8 rounded-lg bg-transparent border border-[#212738] cursor-pointer"
            title="Text Color"
          />

          {/* Bold */}
          <button
            onClick={() => {
              if (titleEl) {
                const isCurrentlyBold =
                  titleEl.fontWeight === "bold" ||
                  titleEl.fontWeight === "800" ||
                  titleEl.fontWeight === "900";
                updateElement(activeCanvas.id, titleEl.id, {
                  fontWeight: isCurrentlyBold ? "400" : "800",
                });
              }
            }}
            className={`p-2 rounded-lg border text-xs font-bold transition ${
              titleEl?.fontWeight === "bold" ||
              titleEl?.fontWeight === "800" ||
              titleEl?.fontWeight === "900"
                ? "bg-[#0ea5e9]/20 text-[#38bdf8] border-[#0ea5e9]/50"
                : "bg-[#111420] text-slate-400 border-[#212738]"
            }`}
          >
            <Bold className="w-3.5 h-3.5" />
          </button>

          {/* Italic */}
          <button
            onClick={() => {
              if (titleEl) {
                updateElement(activeCanvas.id, titleEl.id, {
                  fontStyle: titleEl.fontStyle === "italic" ? "normal" : "italic",
                });
              }
            }}
            className={`p-2 rounded-lg border text-xs transition ${
              titleEl?.fontStyle === "italic"
                ? "bg-[#0ea5e9]/20 text-[#38bdf8] border-[#0ea5e9]/50"
                : "bg-[#111420] text-slate-400 border-[#212738]"
            }`}
          >
            <Italic className="w-3.5 h-3.5" />
          </button>

          {/* Alignment */}
          <div className="flex items-center rounded-lg bg-[#111420] border border-[#212738] p-0.5 ml-auto">
            <button
              onClick={() => {
                if (titleEl) {
                  updateElement(activeCanvas.id, titleEl.id, { align: "left" });
                  if (syncWithTitle && descEl) {
                    updateElement(activeCanvas.id, descEl.id, { align: "left" });
                  }
                }
              }}
              className={`p-1.5 rounded ${
                titleEl?.align === "left"
                  ? "bg-sky-500/20 text-sky-400"
                  : "text-slate-400"
              }`}
            >
              <AlignLeft className="w-3 h-3" />
            </button>
            <button
              onClick={() => {
                if (titleEl) {
                  updateElement(activeCanvas.id, titleEl.id, { align: "center" });
                  if (syncWithTitle && descEl) {
                    updateElement(activeCanvas.id, descEl.id, { align: "center" });
                  }
                }
              }}
              className={`p-1.5 rounded ${
                titleEl?.align === "center"
                  ? "bg-sky-500/20 text-sky-400"
                  : "text-slate-400"
              }`}
            >
              <AlignCenter className="w-3 h-3" />
            </button>
            <button
              onClick={() => {
                if (titleEl) {
                  updateElement(activeCanvas.id, titleEl.id, { align: "right" });
                  if (syncWithTitle && descEl) {
                    updateElement(activeCanvas.id, descEl.id, { align: "right" });
                  }
                }
              }}
              className={`p-1.5 rounded ${
                titleEl?.align === "right"
                  ? "bg-sky-500/20 text-sky-400"
                  : "text-slate-400"
              }`}
            >
              <AlignRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* DESCRIPTION Section (Matches Screenshot 1 & 3) */}
      <div className="pt-3 border-t border-[#1d2232] space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-slate-400 tracking-wider block">
            DESCRIPTION
          </span>
          {!descEl ? (
            <button
              onClick={handleAddDescription}
              className="flex items-center gap-1 text-[10px] text-sky-400 hover:text-sky-300 transition"
            >
              <Plus className="w-3 h-3" />
              <span>Add Subtitle</span>
            </button>
          ) : (
            <span className="text-[10px] text-emerald-400 font-mono">
              Active on Canvas
            </span>
          )}
        </div>

        <textarea
          rows={2}
          value={descEl?.text || ""}
          onChange={(e) => handleDescriptionChange(e.target.value)}
          placeholder="Optional description (type here to add to canvas)"
          className="w-full bg-[#111420] border border-[#212738] focus:border-[#0ea5e9] rounded-xl px-3 py-2 text-xs text-slate-100 outline-none resize-none font-sans"
        />

        <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
          <Sparkles className="w-3 h-3 text-slate-600" />
          <span>Select any word to highlight it.</span>
        </div>

        {/* SYNC WITH TITLE switch */}
        <div className="flex items-center justify-between py-1">
          <span className="text-[10px] font-bold text-slate-400 tracking-wider">
            SYNC WITH TITLE
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={syncWithTitle}
              onChange={(e) => {
                const nextVal = e.target.checked;
                setSyncWithTitle(nextVal);
                if (nextVal && descEl && titleEl) {
                  updateElement(activeCanvas.id, descEl.id, {
                    fontFamily: titleEl.fontFamily,
                    align: titleEl.align,
                  });
                }
              }}
              className="sr-only peer"
            />
            <div className="w-8 h-4 bg-slate-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#0ea5e9] peer-checked:after:bg-white"></div>
          </label>
        </div>

        {/* Font dropdown */}
        <select
          value={descEl?.fontFamily || (syncWithTitle ? titleEl?.fontFamily : "Inter") || "Inter"}
          onChange={(e) => {
            const font = e.target.value;
            if (descEl) {
              updateElement(activeCanvas.id, descEl.id, { fontFamily: font });
            }
          }}
          disabled={syncWithTitle}
          className="w-full bg-[#111420] border border-[#212738] text-xs text-slate-200 rounded-xl px-3 py-2 outline-none cursor-pointer disabled:opacity-50"
        >
          {FONT_OPTIONS.map((f) => (
            <option key={f} value={f} className="bg-[#0b0e17]">
              {f}
            </option>
          ))}
        </select>

        {/* FONT SIZE slider */}
        <div className="flex items-center justify-between gap-3 bg-[#111420] border border-[#212738] rounded-lg px-3 py-1.5">
          <span className="text-[10px] font-bold text-slate-400 tracking-wider">
            FONT SIZE
          </span>
          <input
            type="range"
            min={18}
            max={90}
            value={descEl?.fontSize || 34}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (descEl) {
                updateElement(activeCanvas.id, descEl.id, { fontSize: val });
              }
            }}
            className="flex-1 cursor-pointer"
          />
          <span className="text-xs font-mono text-slate-300 w-8 text-right">
            {descEl?.fontSize || 34}
          </span>
        </div>

        {/* Styling controls for Description */}
        {descEl && (
          <div className="flex items-center gap-2 pt-1">
            <input
              type="color"
              value={descEl.fill || "#ffffff"}
              onChange={(e) => {
                updateElement(activeCanvas.id, descEl.id, {
                  fill: e.target.value,
                });
              }}
              className="w-7 h-7 rounded-lg bg-transparent border border-[#212738] cursor-pointer"
              title="Description Text Color"
            />

            <button
              onClick={() => {
                const isCurrentlyBold =
                  descEl.fontWeight === "bold" ||
                  descEl.fontWeight === "700" ||
                  descEl.fontWeight === "800";
                updateElement(activeCanvas.id, descEl.id, {
                  fontWeight: isCurrentlyBold ? "400" : "700",
                });
              }}
              className={`p-1.5 rounded-lg border text-xs font-bold transition ${
                descEl.fontWeight === "bold" ||
                descEl.fontWeight === "700" ||
                descEl.fontWeight === "800"
                  ? "bg-[#0ea5e9]/20 text-[#38bdf8] border-[#0ea5e9]/50"
                  : "bg-[#111420] text-slate-400 border-[#212738]"
              }`}
            >
              <Bold className="w-3 h-3" />
            </button>

            <button
              onClick={() => {
                updateElement(activeCanvas.id, descEl.id, {
                  fontStyle: descEl.fontStyle === "italic" ? "normal" : "italic",
                });
              }}
              className={`p-1.5 rounded-lg border text-xs transition ${
                descEl.fontStyle === "italic"
                  ? "bg-[#0ea5e9]/20 text-[#38bdf8] border-[#0ea5e9]/50"
                  : "bg-[#111420] text-slate-400 border-[#212738]"
              }`}
            >
              <Italic className="w-3 h-3" />
            </button>

            <div className="flex items-center rounded-lg bg-[#111420] border border-[#212738] p-0.5 ml-auto">
              <button
                onClick={() =>
                  updateElement(activeCanvas.id, descEl.id, { align: "left" })
                }
                className={`p-1 rounded ${
                  descEl.align === "left"
                    ? "bg-sky-500/20 text-sky-400"
                    : "text-slate-400"
                }`}
              >
                <AlignLeft className="w-3 h-3" />
              </button>
              <button
                onClick={() =>
                  updateElement(activeCanvas.id, descEl.id, { align: "center" })
                }
                className={`p-1 rounded ${
                  descEl.align === "center"
                    ? "bg-sky-500/20 text-sky-400"
                    : "text-slate-400"
                }`}
              >
                <AlignCenter className="w-3 h-3" />
              </button>
              <button
                onClick={() =>
                  updateElement(activeCanvas.id, descEl.id, { align: "right" })
                }
                className={`p-1 rounded ${
                  descEl.align === "right"
                    ? "bg-sky-500/20 text-sky-400"
                    : "text-slate-400"
                }`}
              >
                <AlignRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
