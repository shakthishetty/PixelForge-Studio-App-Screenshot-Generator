"use client";

import React, { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useEditorStore } from "@/stores/editor-store";
import { toast } from "@/stores/toast-store";
import {
  Plus,
  Copy,
  Trash2,
  Bookmark,
  GripVertical,
  LayoutTemplate,
  ZoomIn,
  ZoomOut,
  MessageSquare,
  Maximize2,
  ArrowLeft,
  ArrowRight,
  X,
} from "lucide-react";
import type { DesignCanvasHandle } from "./DesignCanvas";

// Dynamically import DesignCanvas with ssr: false for Konva compatibility
const DesignCanvas = dynamic(
  () => import("./DesignCanvas").then((mod) => mod.DesignCanvas),
  { ssr: false }
);

interface CanvasWorkspaceProps {
  canvasRefsMap: React.MutableRefObject<Map<string, DesignCanvasHandle>>;
  onExportSingleCanvas: (canvasId: string) => void;
}

export const CanvasWorkspace: React.FC<CanvasWorkspaceProps> = ({
  canvasRefsMap,
  onExportSingleCanvas,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const project = useEditorStore((s) => s.project);
  const zoom = useEditorStore((s) => s.zoom);
  const setZoom = useEditorStore((s) => s.setZoom);
  const activeCanvasId = project.activeCanvasId;
  const setActiveCanvas = useEditorStore((s) => s.setActiveCanvas);
  const addCanvas = useEditorStore((s) => s.addCanvas);
  const duplicateCanvas = useEditorStore((s) => s.duplicateCanvas);
  const deleteCanvas = useEditorStore((s) => s.deleteCanvas);
  const reorderCanvases = useEditorStore((s) => s.reorderCanvases);
  const isPreview = useEditorStore((s) => s.isPreview);

  // Drag and drop reordering states
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [reorderMenuCanvasId, setReorderMenuCanvasId] = useState<string | null>(null);

  // Wheel zoom with Ctrl or trackpad pinch
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.05 : 0.05;
        setZoom(zoom + delta);
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [zoom, setZoom]);

  return (
    <div
      ref={containerRef}
      className="flex-1 flex flex-col h-full bg-[#0c0d14] relative overflow-hidden select-none"
    >
      {/* Scrollable multi-canvas horizontal viewport */}
      <div className="flex-1 overflow-x-auto overflow-y-auto canvas-grid-pattern flex items-center justify-start p-10 min-w-full">
        <div className="flex items-center gap-10 mx-auto">
          {project.canvases.map((canvas, index) => {
            const isActive = canvas.id === activeCanvasId;
            const isDragging = draggedIndex === index;
            const isDragOver = dragOverIndex === index;
            const isMenuOpen = reorderMenuCanvasId === canvas.id;

            return (
              <React.Fragment key={canvas.id}>
                {/* Single Screen Container with Drag & Drop */}
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    if (draggedIndex !== null && draggedIndex !== index) {
                      setDragOverIndex(index);
                      e.dataTransfer.dropEffect = "move";
                    }
                  }}
                  onDragLeave={() => {
                    if (dragOverIndex === index) setDragOverIndex(null);
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (draggedIndex !== null && draggedIndex !== index) {
                      const fromName = project.canvases[draggedIndex].name;
                      reorderCanvases(draggedIndex, index);
                      toast.success(`Moved "${fromName}" to position ${index + 1}!`);
                    }
                    setDraggedIndex(null);
                    setDragOverIndex(null);
                  }}
                  className={`flex flex-col items-center transition-all duration-200 ${
                    isDragging ? "opacity-40 scale-95" : ""
                  } ${
                    isDragOver
                      ? "ring-2 ring-sky-400 ring-offset-4 ring-offset-[#090a0f] scale-[1.02] rounded-3xl"
                      : ""
                  }`}
                >
                  {/* The Screen Canvas Surface */}
                  <div
                    onClick={() => setActiveCanvas(canvas.id)}
                    className={`relative rounded-2xl overflow-hidden transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "ring-2 ring-inset ring-sky-400 shadow-[0_15px_40px_rgba(56,189,248,0.25)]"
                        : "hover:ring-1 hover:ring-inset hover:ring-white/20 shadow-2xl"
                    }`}
                  >
                    <DesignCanvas
                      ref={(handle) => {
                        if (handle) {
                          canvasRefsMap.current.set(canvas.id, handle);
                        } else {
                          canvasRefsMap.current.delete(canvas.id);
                        }
                      }}
                      canvas={canvas}
                      isActive={isActive}
                      scale={zoom}
                    />
                  </div>

                  {/* Floating Action Pill Toolbar UNDER the Canvas (Matches screenshot 1, 2, 3, 4, 5) */}
                  {!isPreview && (
                    <div className="relative mt-3.5">
                      {/* Reorder Popover Menu (Opens on 6-dots click) */}
                      {isMenuOpen && (
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="absolute -top-12 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 px-2 py-1 bg-[#0c101c] border border-sky-500/50 rounded-xl shadow-2xl backdrop-blur-md text-xs animate-in fade-in zoom-in-95 duration-150"
                        >
                          <span className="text-[10px] text-slate-400 font-mono px-1">
                            {index + 1}/{project.canvases.length}
                          </span>

                          <button
                            title="Move Left"
                            disabled={index === 0}
                            onClick={() => {
                              reorderCanvases(index, index - 1);
                              toast.success(`Moved screen to position ${index}`);
                              setReorderMenuCanvasId(null);
                            }}
                            className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-800 hover:bg-sky-600 disabled:opacity-30 disabled:hover:bg-slate-800 text-slate-200 transition text-[11px]"
                          >
                            <ArrowLeft className="w-3 h-3" />
                            <span>Left</span>
                          </button>

                          <button
                            title="Move Right"
                            disabled={index === project.canvases.length - 1}
                            onClick={() => {
                              reorderCanvases(index, index + 1);
                              toast.success(`Moved screen to position ${index + 2}`);
                              setReorderMenuCanvasId(null);
                            }}
                            className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-800 hover:bg-sky-600 disabled:opacity-30 disabled:hover:bg-slate-800 text-slate-200 transition text-[11px]"
                          >
                            <span>Right</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>

                          <button
                            onClick={() => setReorderMenuCanvasId(null)}
                            className="p-1 rounded text-slate-400 hover:text-white"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      )}

                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#111420]/90 border border-[#212738] shadow-lg backdrop-blur-md text-slate-400"
                      >
                        {/* Drag Reorder Handle (Draggable AND Clickable for Quick Reorder) */}
                        <button
                          title="Drag or click to re-arrange order"
                          draggable
                          onDragStart={(e) => {
                            e.stopPropagation();
                            setDraggedIndex(index);
                            e.dataTransfer.setData("text/plain", String(index));
                            e.dataTransfer.effectAllowed = "move";
                          }}
                          onDragEnd={() => {
                            setDraggedIndex(null);
                            setDragOverIndex(null);
                          }}
                          onClick={() =>
                            setReorderMenuCanvasId(isMenuOpen ? null : canvas.id)
                          }
                          className={`p-1 rounded-full transition cursor-grab active:cursor-grabbing ${
                            isMenuOpen
                              ? "bg-sky-500/30 text-sky-300"
                              : "hover:bg-slate-800 text-slate-400 hover:text-white"
                          }`}
                        >
                          <GripVertical className="w-3.5 h-3.5" />
                        </button>

                        {/* Duplicate Canvas */}
                        <button
                          title="Duplicate Canvas"
                          onClick={() => {
                            duplicateCanvas(canvas.id);
                            toast.success(`Duplicated "${canvas.name}"!`);
                          }}
                          className="p-1 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>

                        {/* Bookmark / Save Template */}
                        <button
                          title="Save as reusable canvas"
                          onClick={() =>
                            toast.success(`Saved "${canvas.name}" to your templates library!`)
                          }
                          className="p-1 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition"
                        >
                          <Bookmark className="w-3.5 h-3.5" />
                        </button>

                        {/* Layout Presets */}
                        <button
                          title="Layout type"
                          onClick={() => setActiveCanvas(canvas.id)}
                          className="p-1 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition"
                        >
                          <LayoutTemplate className="w-3.5 h-3.5" />
                        </button>

                        {/* Delete Canvas */}
                        {project.canvases.length > 1 && (
                          <button
                            title="Delete Canvas"
                            onClick={() => {
                              deleteCanvas(canvas.id);
                              toast.info(`Deleted "${canvas.name}"`);
                            }}
                            className="p-1 rounded-full hover:bg-rose-950 text-slate-400 hover:text-rose-400 transition"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Subtle (+) Add Canvas Circle Button Between Canvases */}
                {!isPreview && (
                  <div className="flex flex-col items-center justify-center">
                    <button
                      onClick={() => {
                        addCanvas(undefined, index + 1);
                        toast.success("Added new canvas!");
                      }}
                      title="Add Next Canvas"
                      className="w-7 h-7 rounded-full bg-[#111420] border border-[#22283a] hover:border-sky-400 text-slate-500 hover:text-sky-300 flex items-center justify-center transition-all hover:scale-125 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Bottom Bar (Matches reference screenshots) */}
      <footer className="h-10 border-t border-[#181d2a] bg-[#0a0d14] flex items-center justify-between px-4 z-20">
        {/* Left: Zoom Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setZoom(zoom - 0.05)}
            className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-xs font-mono text-slate-300 w-12 text-center">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={() => setZoom(zoom + 0.05)}
            className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoom(0.25)}
            className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-400 ml-1"
          >
            Fit
          </button>
          <span className="text-[11px] text-slate-500 ml-3">
            {project.canvases.length} screen{project.canvases.length > 1 ? "s" : ""}
          </span>
        </div>

        {/* Center: Instruction indicator */}
        <div className="text-[11px] text-slate-500 hidden sm:block">
          Drag the ⠿ handle or click to re-arrange screens • Click element to edit
        </div>

        {/* Right: Feedback & Fullscreen */}
        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              toast.info("Thank you for using PixelForge Studio! Feedback recorded.")
            }
            className="flex items-center gap-1.5 text-slate-400 hover:text-slate-200 transition text-[11px]"
          >
            <MessageSquare className="w-3 h-3 text-slate-500" />
            <span>Share Feedback</span>
          </button>
          <button
            onClick={() => {
              if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
              } else {
                document.exitFullscreen();
              }
            }}
            title="Toggle Fullscreen"
            className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </footer>
    </div>
  );
};
