"use client";

import React, { useRef, useState, useEffect } from "react";
import { useEditorStore } from "@/stores/editor-store";
import { EditorToolbar } from "./EditorToolbar";
import { EditorSidebar } from "./EditorSidebar";
import { PropertiesPanel } from "./PropertiesPanel";
import { CanvasWorkspace } from "./CanvasWorkspace";
import { ExportDialog } from "./ExportDialog";
import { ToastNotification } from "@/components/ui/ToastNotification";
import type { DesignCanvasHandle } from "./DesignCanvas";

export const EditorShell: React.FC = () => {
  const canvasRefsMap = useRef<Map<string, DesignCanvasHandle>>(new Map());

  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [preselectedCanvasId, setPreselectedCanvasId] = useState<string | undefined>();

  const project = useEditorStore((s) => s.project);
  const undo = useEditorStore((s) => s.undo);
  const redo = useEditorStore((s) => s.redo);
  const selectedElementId = useEditorStore((s) => s.selectedElementId);
  const deleteElement = useEditorStore((s) => s.deleteElement);
  const duplicateElement = useEditorStore((s) => s.duplicateElement);
  const saveProjectLocally = useEditorStore((s) => s.saveProjectLocally);

  // Global Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input or textarea
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      // Undo: Ctrl+Z / Cmd+Z
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z" && !e.shiftKey) {
        e.preventDefault();
        undo();
        return;
      }

      // Redo: Ctrl+Y or Ctrl+Shift+Z
      if (
        ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "y") ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "z")
      ) {
        e.preventDefault();
        redo();
        return;
      }

      // Save: Ctrl+S
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        saveProjectLocally();
        return;
      }

      // Delete: Delete or Backspace when element selected
      if ((e.key === "Delete" || e.key === "Backspace") && selectedElementId) {
        e.preventDefault();
        deleteElement(project.activeCanvasId, selectedElementId);
        return;
      }

      // Duplicate: Ctrl+D
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "d" && selectedElementId) {
        e.preventDefault();
        duplicateElement(project.activeCanvasId, selectedElementId);
        return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    undo,
    redo,
    selectedElementId,
    deleteElement,
    duplicateElement,
    saveProjectLocally,
    project.activeCanvasId,
  ]);

  const handleOpenExportSingle = (canvasId: string) => {
    setPreselectedCanvasId(canvasId);
    setExportModalOpen(true);
  };

  const handleOpenExportGeneral = () => {
    setPreselectedCanvasId(undefined);
    setExportModalOpen(true);
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#090a0f] text-slate-100 select-none">
      {/* Top Toolbar */}
      <EditorToolbar onOpenExport={handleOpenExportGeneral} />

      {/* Main Studio Body: Sidebar + Properties Panel + Multi-Canvas Workspace */}
      <div className="flex flex-1 w-full h-[calc(100vh-3.5rem)] overflow-hidden">
        <EditorSidebar />
        <PropertiesPanel />
        <CanvasWorkspace
          canvasRefsMap={canvasRefsMap}
          onExportSingleCanvas={handleOpenExportSingle}
        />
      </div>

      {/* Export Dialog */}
      <ExportDialog
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        canvasRefsMap={canvasRefsMap}
        preselectedCanvasId={preselectedCanvasId}
      />

      {/* Global Toast Notifications */}
      <ToastNotification />
    </div>
  );
};
