"use client";

import React, { useState } from "react";
import { useEditorStore } from "@/stores/editor-store";
import { Hash, ChevronDown } from "lucide-react";

const SWATCH_PALETTE = [
  // Row 1
  ["#ffffff", "#f1f5f9", "#94a3b8", "#334155", "#0f172a", "#ef4444", "#f97316"],
  // Row 2
  ["#eab308", "#84cc16", "#10b981", "#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899"],
];

export const BackgroundPanel: React.FC = () => {
  const project = useEditorStore((s) => s.project);
  const activeCanvas =
    project.canvases.find((c) => c.id === project.activeCanvasId) ||
    project.canvases[0];
  const updateCanvasBackground = useEditorStore((s) => s.updateCanvasBackground);

  const [bgTab, setBgTab] = useState<"solid" | "gradient" | "pattern" | "image">("solid");
  const [useOnAll, setUseOnAll] = useState(false);

  if (!activeCanvas) return null;

  const bg = activeCanvas.background;

  const handleApplyColor = (color: string) => {
    if (useOnAll) {
      project.canvases.forEach((c) => {
        updateCanvasBackground(c.id, {
          type: "solid",
          color,
        });
      });
    } else {
      updateCanvasBackground(activeCanvas.id, {
        type: "solid",
        color,
      });
    }
  };

  return (
    <div className="flex flex-col h-full text-slate-200 overflow-y-auto pr-1 space-y-4">
      {/* Header (Matches Screenshot 5) */}
      <div className="flex items-center gap-2 mb-1">
        <Hash className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-[11px] font-bold tracking-wider text-slate-300 uppercase">
          BACKGROUND
        </span>
      </div>

      {/* Tabs: Solid | Gradient | Pattern | Image */}
      <div className="flex rounded-xl bg-[#111420] border border-[#212738] p-1">
        {[
          { id: "solid", label: "Solid" },
          { id: "gradient", label: "Gradient" },
          { id: "pattern", label: "Pattern" },
          { id: "image", label: "Image" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => {
              setBgTab(t.id as any);
              if (t.id === "gradient" || t.id === "solid") {
                updateCanvasBackground(activeCanvas.id, { type: t.id });
              }
            }}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition ${
              bgTab === t.id
                ? "bg-slate-800 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Color Dropdown Swatch */}
      <div className="flex items-center gap-2">
        <div
          style={{ backgroundColor: bg.color || "#ffffff" }}
          className="w-8 h-8 rounded-lg border border-slate-700 shadow-sm flex-shrink-0"
        />
        <div className="flex items-center justify-between flex-1 bg-[#111420] border border-[#212738] rounded-lg px-2.5 py-1 text-xs text-slate-200">
          <span className="font-mono">{bg.color || "#ffffff"}</span>
          <ChevronDown className="w-3 h-3 text-slate-500" />
        </div>
      </div>

      {/* 2-Row 14-Color Swatch Palette (Exact match to Screenshot 5) */}
      <div className="space-y-2">
        {SWATCH_PALETTE.map((row, rIdx) => (
          <div key={rIdx} className="grid grid-cols-7 gap-1.5">
            {row.map((color) => (
              <button
                key={color}
                onClick={() => handleApplyColor(color)}
                style={{ backgroundColor: color }}
                className="w-full h-8 rounded-lg border border-slate-700/60 hover:scale-105 active:scale-95 transition shadow"
              />
            ))}
          </div>
        ))}
      </div>

      {/* USE ON ALL CANVASES Switch (Matches Screenshot 5) */}
      <div className="pt-3 border-t border-[#1d2232] flex items-center justify-between">
        <span className="text-[10px] font-bold text-slate-400 tracking-wider">
          USE ON ALL CANVASES
        </span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={useOnAll}
            onChange={(e) => setUseOnAll(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-8 h-4 bg-slate-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#0ea5e9] peer-checked:after:bg-white"></div>
        </label>
      </div>
    </div>
  );
};
