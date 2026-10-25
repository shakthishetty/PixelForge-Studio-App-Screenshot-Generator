"use client";

import React, { useState } from "react";
import JSZip from "jszip";
import { useEditorStore } from "@/stores/editor-store";
import type { DesignCanvasHandle } from "./DesignCanvas";
import {
  X,
  Download,
  Archive,
  CheckCircle2,
  AlertCircle,
  Loader2,
  FileImage,
  Layers,
} from "lucide-react";

interface ExportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  canvasRefsMap: React.MutableRefObject<Map<string, DesignCanvasHandle>>;
  preselectedCanvasId?: string;
}

export const ExportDialog: React.FC<ExportDialogProps> = ({
  isOpen,
  onClose,
  canvasRefsMap,
  preselectedCanvasId,
}) => {
  const project = useEditorStore((s) => s.project);

  const [targetMode, setTargetMode] = useState<"all" | "single">(
    preselectedCanvasId ? "single" : "all"
  );
  const [selectedCanvasId, setSelectedCanvasId] = useState<string>(
    preselectedCanvasId || project.canvases[0]?.id || ""
  );
  const [format, setFormat] = useState<"png" | "jpeg">("png");
  const [quality, setQuality] = useState<number>(0.92);
  const [scale, setScale] = useState<number>(1.0); // 1x, 2x, 3x
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportSuccess, setExportSuccess] = useState<string | null>(null);
  const [exportError, setExportError] = useState<string | null>(null);

  if (!isOpen) return null;

  const sanitizeName = (str: string) => {
    return str.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-");
  };

  const downloadDataUrl = (dataUrl: string, fileName: string) => {
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleExport = async () => {
    setIsExporting(true);
    setExportSuccess(null);
    setExportError(null);

    try {
      const mimeType = format === "png" ? "image/png" : "image/jpeg";
      const ext = format === "png" ? "png" : "jpg";
      const projectSlug = sanitizeName(project.title) || "screenshot";

      if (targetMode === "single") {
        const handle = canvasRefsMap.current.get(selectedCanvasId);
        const canvasObj = project.canvases.find((c) => c.id === selectedCanvasId);
        if (!handle || !canvasObj) {
          throw new Error("Target canvas handle not found. Please try again.");
        }

        const dataUrl = handle.exportImage({
          format: mimeType,
          quality: quality,
          pixelRatio: scale,
        });

        if (!dataUrl || dataUrl === "data:,") {
          throw new Error("Export render failed. Canvas may be initializing.");
        }

        const canvasSlug = sanitizeName(canvasObj.name);
        const fileName = `pixelforge-${projectSlug}-${canvasSlug}-${scale}x.${ext}`;
        downloadDataUrl(dataUrl, fileName);

        setExportSuccess(`Successfully exported "${canvasObj.name}" as ${format.toUpperCase()}!`);
      } else {
        // Export ALL canvases as ZIP
        const zip = new JSZip();
        let exportedCount = 0;

        for (let i = 0; i < project.canvases.length; i++) {
          const c = project.canvases[i];
          const handle = canvasRefsMap.current.get(c.id);
          if (!handle) continue;

          const dataUrl = handle.exportImage({
            format: mimeType,
            quality: quality,
            pixelRatio: scale,
          });

          if (dataUrl && dataUrl.startsWith("data:")) {
            const base64Data = dataUrl.split(",")[1];
            const canvasSlug = sanitizeName(c.name);
            const fileName = `canvas-${i + 1}-${canvasSlug}.${ext}`;
            zip.file(fileName, base64Data, { base64: true });
            exportedCount++;
          }
        }

        if (exportedCount === 0) {
          throw new Error("No canvases were ready for export.");
        }

        const zipBlob = await zip.generateAsync({ type: "blob" });
        const zipUrl = URL.createObjectURL(zipBlob);
        const zipName = `pixelforge-${projectSlug}-all-${scale}x.zip`;
        downloadDataUrl(zipUrl, zipName);
        URL.revokeObjectURL(zipUrl);

        setExportSuccess(`Successfully packaged ${exportedCount} canvases into ZIP bundle!`);
      }
    } catch (err: any) {
      console.error("Export error:", err);
      setExportError(err.message || "Failed to export canvases. Check browser permissions.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-[#0f111a] border border-[#212638] rounded-2xl shadow-2xl p-6 text-slate-100 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-9 h-9 rounded-xl bg-sky-500/15 border border-sky-500/40 flex items-center justify-center text-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.3)]">
            <Download className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">
              Export Production Graphics
            </h3>
            <p className="text-xs text-slate-400">
              High-resolution raster export without editor overlays or UI handles.
            </p>
          </div>
        </div>

        {/* Mode Selector: All Canvases vs Single Canvas */}
        <div className="space-y-4">
          <div className="flex rounded-xl bg-[#141724] border border-[#212638] p-1">
            <button
              onClick={() => setTargetMode("all")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition ${
                targetMode === "all"
                  ? "bg-sky-500 text-white shadow-[0_0_10px_rgba(56,189,248,0.3)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Archive className="w-3.5 h-3.5" />
              <span>All Canvases (ZIP) ({project.canvases.length})</span>
            </button>
            <button
              onClick={() => setTargetMode("single")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition ${
                targetMode === "single"
                  ? "bg-sky-500 text-white shadow-[0_0_10px_rgba(56,189,248,0.3)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <FileImage className="w-3.5 h-3.5" />
              <span>Single Canvas</span>
            </button>
          </div>

          {/* Single Canvas Selector */}
          {targetMode === "single" && (
            <div>
              <label className="text-[11px] font-medium text-slate-400 mb-1.5 block">
                Choose Canvas to Export
              </label>
              <select
                value={selectedCanvasId}
                onChange={(e) => setSelectedCanvasId(e.target.value)}
                className="w-full bg-[#141724] border border-[#212638] text-xs text-slate-200 rounded-xl px-3 py-2 outline-none cursor-pointer"
              >
                {project.canvases.map((c, i) => (
                  <option key={c.id} value={c.id} className="bg-[#0f111a]">
                    Canvas {i + 1}: {c.name} ({c.width} × {c.height})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Format & Resolution Scale */}
          <div className="grid grid-cols-2 gap-3">
            {/* Format Selection */}
            <div>
              <label className="text-[11px] font-medium text-slate-400 mb-1.5 block">
                Format
              </label>
              <div className="flex rounded-xl bg-[#141724] border border-[#212638] p-1">
                <button
                  onClick={() => setFormat("png")}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition ${
                    format === "png"
                      ? "bg-sky-500/20 text-sky-400 border border-sky-500/40"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  PNG (Lossless)
                </button>
                <button
                  onClick={() => setFormat("jpeg")}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition ${
                    format === "jpeg"
                      ? "bg-sky-500/20 text-sky-400 border border-sky-500/40"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  JPEG
                </button>
              </div>
            </div>

            {/* Scale multiplier (1x, 2x, 3x) */}
            <div>
              <label className="text-[11px] font-medium text-slate-400 mb-1.5 block">
                Export Resolution
              </label>
              <div className="flex rounded-xl bg-[#141724] border border-[#212638] p-1">
                {[
                  { val: 1.0, label: "1x Standard" },
                  { val: 2.0, label: "2x Retina" },
                  { val: 3.0, label: "3x Ultra" },
                ].map((s) => (
                  <button
                    key={s.val}
                    onClick={() => setScale(s.val)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition ${
                      scale === s.val
                        ? "bg-sky-500/20 text-sky-400 border border-sky-500/40"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {s.label.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* JPEG Quality Slider */}
          {format === "jpeg" && (
            <div className="p-3 rounded-xl bg-[#141724] border border-[#212638] space-y-1.5">
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>JPEG Compression Quality</span>
                <span className="font-mono">{Math.round(quality * 100)}%</span>
              </div>
              <input
                type="range"
                min={60}
                max={100}
                value={Math.round(quality * 100)}
                onChange={(e) => setQuality(Number(e.target.value) / 100)}
                className="w-full"
              />
            </div>
          )}

          {/* Feedback messages */}
          {exportSuccess && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2 text-xs text-emerald-400">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>{exportSuccess}</span>
            </div>
          )}

          {exportError && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2 text-xs text-rose-400">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{exportError}</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl bg-[#141724] hover:bg-[#1a1f30] border border-[#212638] text-xs font-semibold text-slate-300 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white text-xs font-semibold shadow-[0_0_20px_rgba(56,189,248,0.35)] transition-all disabled:opacity-50"
            >
              {isExporting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Rendering...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>
                    {targetMode === "all" ? "Export ZIP Bundle" : "Download Image"}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
