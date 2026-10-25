"use client";

import React, { useState } from "react";
import { useEditorStore } from "@/stores/editor-store";
import { CANVAS_SIZE_PRESETS } from "@/lib/constants/presets";
import {
  LayoutGrid,
  Smartphone,
  ChevronDown,
  Plus,
  Link2,
} from "lucide-react";

export const LayoutPanel: React.FC = () => {
  const project = useEditorStore((s) => s.project);
  const activeCanvas =
    project.canvases.find((c) => c.id === project.activeCanvasId) ||
    project.canvases[0];
  const updateCanvasSize = useEditorStore((s) => s.updateCanvasSize);
  const addCanvas = useEditorStore((s) => s.addCanvas);
  const updateElement = useEditorStore((s) => s.updateElement);

  const [layoutType, setLayoutType] = useState<number>(0);
  const [posX, setPosX] = useState<number>(0);
  const [posY, setPosY] = useState<number>(0);
  const [sizeVal, setSizeVal] = useState<number>(75);
  const [spacingVal, setSpacingVal] = useState<number>(5);
  const [paddingVal, setPaddingVal] = useState<number>(0);
  const [stretchText, setStretchText] = useState<boolean>(false);
  const [showNearby, setShowNearby] = useState<boolean>(false);

  if (!activeCanvas) return null;

  const handleApplyLayoutType = (typeIdx: number) => {
    setLayoutType(typeIdx);
    const textEl = activeCanvas.elements.find((el) => el.type === "text");
    const mockupEl = activeCanvas.elements.find((el) => el.type === "mockup");

    if (typeIdx === 0) {
      // Type 0: Top text, large phone below
      if (textEl) {
        updateElement(activeCanvas.id, textEl.id, {
          y: 90,
          align: "left",
        });
      }
      if (mockupEl) {
        updateElement(activeCanvas.id, mockupEl.id, {
          y: Math.round(activeCanvas.height * 0.28),
        });
      }
    } else if (typeIdx === 1) {
      // Type 1: Top phone, bottom text
      if (textEl) {
        updateElement(activeCanvas.id, textEl.id, {
          y: Math.round(activeCanvas.height * 0.75),
          align: "center",
        });
      }
      if (mockupEl) {
        updateElement(activeCanvas.id, mockupEl.id, {
          y: 80,
        });
      }
    } else if (typeIdx === 2) {
      // Type 2: Centered phone with text
      if (textEl) {
        updateElement(activeCanvas.id, textEl.id, {
          y: 120,
          align: "center",
        });
      }
      if (mockupEl) {
        updateElement(activeCanvas.id, mockupEl.id, {
          y: Math.round(activeCanvas.height * 0.24),
        });
      }
    }
  };

  return (
    <div className="flex flex-col h-full text-slate-200 overflow-y-auto pr-1 space-y-4">
      {/* Header (Matches Screenshot 2) */}
      <div className="flex items-center gap-2 mb-1">
        <LayoutGrid className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-[11px] font-bold tracking-wider text-slate-300 uppercase">
          LAYOUT
        </span>
      </div>

      {/* SIZES 1 Section */}
      <div>
        <span className="text-[10px] font-bold text-slate-400 tracking-wider mb-1.5 block">
          SIZES 1
        </span>
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#111420] border border-[#212738] mb-2">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-slate-400" />
            <div>
              <div className="text-xs font-semibold text-slate-200">Phone 5&quot;</div>
              <div className="text-[10px] text-slate-500 font-mono">1080×1920</div>
            </div>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
        </div>
        <button
          onClick={() => addCanvas()}
          className="flex items-center justify-center gap-1.5 w-full py-1.5 rounded-xl bg-[#111420] border border-[#212738] text-xs font-semibold text-slate-300 hover:text-white transition"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Size</span>
        </button>
      </div>

      {/* TYPE (3 visual cards matching Screenshot 2) */}
      <div>
        <span className="text-[10px] font-bold text-slate-400 tracking-wider mb-1.5 block">
          TYPE
        </span>
        <div className="grid grid-cols-3 gap-2">
          {/* Card 1: Top text, large phone below */}
          <div
            onClick={() => handleApplyLayoutType(0)}
            className={`p-2 rounded-xl bg-[#111420] border cursor-pointer transition flex flex-col items-center justify-center h-20 ${
              layoutType === 0
                ? "border-[#0ea5e9] shadow-[0_0_12px_rgba(14,165,233,0.3)]"
                : "border-[#212738] hover:border-slate-700"
            }`}
          >
            <div className="w-7 h-1.5 rounded-full bg-slate-500 mb-1.5" />
            <div className="w-6 h-9 rounded-sm bg-[#0ea5e9]/70 border border-[#0ea5e9]" />
          </div>

          {/* Card 2: Top phone, bottom text */}
          <div
            onClick={() => handleApplyLayoutType(1)}
            className={`p-2 rounded-xl bg-[#111420] border cursor-pointer transition flex flex-col items-center justify-center h-20 ${
              layoutType === 1
                ? "border-[#0ea5e9] shadow-[0_0_12px_rgba(14,165,233,0.3)]"
                : "border-[#212738] hover:border-slate-700"
            }`}
          >
            <div className="w-6 h-9 rounded-sm bg-slate-700 border border-slate-600 mb-1.5" />
            <div className="w-7 h-1.5 rounded-full bg-slate-500" />
          </div>

          {/* Card 3: Stacked / Dual */}
          <div
            onClick={() => handleApplyLayoutType(2)}
            className={`p-2 rounded-xl bg-[#111420] border cursor-pointer transition flex flex-col items-center justify-center h-20 ${
              layoutType === 2
                ? "border-[#0ea5e9] shadow-[0_0_12px_rgba(14,165,233,0.3)]"
                : "border-[#212738] hover:border-slate-700"
            }`}
          >
            <div className="w-7 h-1.5 rounded-full bg-slate-500 mb-1" />
            <div className="w-5 h-7 rounded-sm bg-slate-700 border border-slate-600" />
            <div className="w-7 h-1.5 rounded-full bg-slate-500 mt-1" />
          </div>
        </div>
      </div>

      {/* POSITION & SLIDERS (Matches Screenshot 2) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-slate-400 tracking-wider">
            POSITION
          </span>
          <Link2 className="w-3.5 h-3.5 text-slate-500" />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center bg-[#111420] border border-[#212738] rounded-lg px-2 py-1">
            <span className="text-[10px] text-slate-500 mr-2">X</span>
            <input
              type="number"
              value={posX}
              onChange={(e) => setPosX(Number(e.target.value))}
              className="w-full bg-transparent text-xs text-slate-200 outline-none font-mono"
            />
          </div>
          <div className="flex items-center bg-[#111420] border border-[#212738] rounded-lg px-2 py-1">
            <span className="text-[10px] text-slate-500 mr-2">Y</span>
            <input
              type="number"
              value={posY}
              onChange={(e) => setPosY(Number(e.target.value))}
              className="w-full bg-transparent text-xs text-slate-200 outline-none font-mono"
            />
          </div>
        </div>

        {/* SIZE Slider */}
        <div className="flex items-center justify-between gap-3 bg-[#111420] border border-[#212738] rounded-lg px-3 py-1.5">
          <span className="text-[10px] font-bold text-slate-400 tracking-wider">SIZE</span>
          <input
            type="range"
            min={40}
            max={100}
            value={sizeVal}
            onChange={(e) => setSizeVal(Number(e.target.value))}
            className="flex-1"
          />
          <span className="text-xs font-mono text-slate-300 w-6 text-right">{sizeVal}</span>
        </div>

        {/* SPACING Slider */}
        <div className="flex items-center justify-between gap-3 bg-[#111420] border border-[#212738] rounded-lg px-3 py-1.5">
          <span className="text-[10px] font-bold text-slate-400 tracking-wider">SPACING</span>
          <input
            type="range"
            min={0}
            max={20}
            value={spacingVal}
            onChange={(e) => setSpacingVal(Number(e.target.value))}
            className="flex-1"
          />
          <span className="text-xs font-mono text-slate-300 w-6 text-right">{spacingVal}</span>
        </div>

        {/* PADDING Slider */}
        <div className="flex items-center justify-between gap-3 bg-[#111420] border border-[#212738] rounded-lg px-3 py-1.5">
          <span className="text-[10px] font-bold text-slate-400 tracking-wider">PADDING</span>
          <input
            type="range"
            min={0}
            max={50}
            value={paddingVal}
            onChange={(e) => setPaddingVal(Number(e.target.value))}
            className="flex-1"
          />
          <span className="text-xs font-mono text-slate-300 w-6 text-right">{paddingVal}</span>
        </div>
      </div>

      {/* Switches at bottom (Matches Screenshot 2) */}
      <div className="pt-2 border-t border-[#1d2232] space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-slate-400 tracking-wider">
            STRETCH TEXT TO CANVAS WIDTH
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={stretchText}
              onChange={(e) => setStretchText(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-8 h-4 bg-slate-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#0ea5e9] peer-checked:after:bg-white"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-slate-400 tracking-wider">
            SHOW ON NEARBY CANVASES
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={showNearby}
              onChange={(e) => setShowNearby(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-8 h-4 bg-slate-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#0ea5e9] peer-checked:after:bg-white"></div>
          </label>
        </div>
      </div>
    </div>
  );
};
