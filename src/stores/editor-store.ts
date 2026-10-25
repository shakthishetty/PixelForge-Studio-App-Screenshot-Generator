import { create } from "zustand";
import {
  ActiveNavSection,
  BackgroundConfig,
  CanvasElement,
  CanvasItem,
  ProjectDocument,
} from "@/types/editor";
import { STARTER_TEMPLATES } from "@/templates/definitions";
import { CANVAS_SIZE_PRESETS } from "@/lib/constants/presets";

const MAX_HISTORY = 30;

export interface SavedProjectMeta {
  id: string;
  title: string;
  updatedAt: string;
  canvasCount: number;
}

interface EditorState {
  // Document state
  project: ProjectDocument;
  activeNav: ActiveNavSection;
  selectedElementId: string | null;
  isPreview: boolean;
  zoom: number; // 0.2 to 2.0
  isDirty: boolean;
  lastSavedAt: string | null;
  exportModalOpen: boolean;
  savedProjectsList: SavedProjectMeta[];

  // Undo / Redo
  past: ProjectDocument[];
  future: ProjectDocument[];

  // Navigation & UI
  setActiveNav: (nav: ActiveNavSection) => void;
  setSelectedElementId: (id: string | null) => void;
  togglePreview: () => void;
  setZoom: (zoom: number | ((prev: number) => number)) => void;
  setExportModalOpen: (open: boolean) => void;

  // Project Level Actions
  setTitle: (title: string) => void;
  setTargetPlatform: (platform: string) => void;
  loadTemplate: (templateId: string, keepContent?: boolean) => void;
  newProject: (presetId?: string) => void;
  loadProjectDocument: (doc: ProjectDocument) => void;
  importProjectJson: (json: string) => boolean;
  saveProjectLocally: () => void;
  deleteSavedProject: (id: string) => void;
  refreshSavedProjects: () => void;

  // Canvas Actions
  setActiveCanvas: (id: string) => void;
  addCanvas: (presetId?: string, insertIndex?: number) => void;
  duplicateCanvas: (canvasId: string) => void;
  deleteCanvas: (canvasId: string) => void;
  reorderCanvases: (fromIndex: number, toIndex: number) => void;
  bulkCreateCanvases: (canvases: CanvasItem[], targetPlatform?: string) => void;
  updateCanvasSize: (canvasId: string, width: number, height: number) => void;
  updateAllCanvasesSize: (width: number, height: number) => void;
  updateCanvasBackground: (
    canvasId: string,
    bg: Partial<BackgroundConfig> | ((prev: BackgroundConfig) => BackgroundConfig)
  ) => void;

  // Element Actions
  addElement: (canvasId: string, element: CanvasElement) => void;
  updateElement: (
    canvasId: string,
    elementId: string,
    updates: Partial<CanvasElement>
  ) => void;
  deleteElement: (canvasId: string, elementId: string) => void;
  duplicateElement: (canvasId: string, elementId: string) => void;
  reorderElement: (
    canvasId: string,
    elementId: string,
    direction: "up" | "down" | "top" | "bottom"
  ) => void;
  toggleElementVisibility: (canvasId: string, elementId: string) => void;
  toggleElementLock: (canvasId: string, elementId: string) => void;

  // History Actions
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
}

// Initial template
const defaultTemplate = STARTER_TEMPLATES[0];

const createInitialProject = (): ProjectDocument => ({
  id: "proj-" + Math.random().toString(36).substring(2, 9),
  version: 1,
  title: defaultTemplate.title,
  canvases: JSON.parse(JSON.stringify(defaultTemplate.canvases)),
  activeCanvasId: defaultTemplate.canvases[0].id,
  targetPlatform: defaultTemplate.category,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

export const useEditorStore = create<EditorState>((set, get) => {
  // Helper to record history snapshot
  const recordHistory = (newProject: ProjectDocument) => {
    const { project, past } = get();
    const newPast = [...past, JSON.parse(JSON.stringify(project))].slice(
      -MAX_HISTORY
    );
    set({
      past: newPast,
      future: [],
      project: {
        ...newProject,
        updatedAt: new Date().toISOString(),
      },
      isDirty: true,
    });
  };

  return {
    project: createInitialProject(),
    activeNav: "projects",
    selectedElementId: null,
    isPreview: false,
    zoom: 0.34, // default comfortable viewport zoom showing multi-canvases
    isDirty: false,
    lastSavedAt: null,
    exportModalOpen: false,
    savedProjectsList: [],
    past: [],
    future: [],

    setActiveNav: (nav) => set({ activeNav: nav }),
    setSelectedElementId: (id) => set({ selectedElementId: id }),
    togglePreview: () => set((s) => ({ isPreview: !s.isPreview })),
    setZoom: (zoom) =>
      set((s) => {
        const val = typeof zoom === "function" ? zoom(s.zoom) : zoom;
        const clamped = Math.min(Math.max(val, 0.15), 1.8);
        return { zoom: Math.round(clamped * 100) / 100 };
      }),
    setExportModalOpen: (open) => set({ exportModalOpen: open }),

    setTitle: (title) => {
      const { project } = get();
      const updated = { ...project, title };
      recordHistory(updated);
    },

    setTargetPlatform: (platform) => {
      const { project } = get();
      const updated = { ...project, targetPlatform: platform };
      recordHistory(updated);
    },

    loadTemplate: (templateId, keepContent) => {
      const template =
        STARTER_TEMPLATES.find((t) => t.id === templateId) || STARTER_TEMPLATES[0];
      const clonedCanvases: CanvasItem[] = JSON.parse(JSON.stringify(template.canvases));

      if (keepContent) {
        const { project } = get();
        const currentTexts = project.canvases
          .map((c) => c.elements.find((el) => el.type === "text"))
          .filter(Boolean);
        const currentScreenshots = project.canvases
          .map((c) => c.elements.find((el) => el.type === "mockup" && (el as any).screenshotUrl))
          .filter(Boolean);

        clonedCanvases.forEach((c, idx) => {
          if (currentTexts[idx]) {
            const targetText = c.elements.find((el) => el.type === "text");
            if (targetText) {
              (targetText as any).text = (currentTexts[idx] as any).text;
            }
          }
          if (currentScreenshots[idx]) {
            const targetMockup = c.elements.find((el) => el.type === "mockup");
            if (targetMockup) {
              (targetMockup as any).screenshotUrl = (currentScreenshots[idx] as any).screenshotUrl;
            }
          }
        });
      }

      const newProject: ProjectDocument = {
        id: "proj-" + Math.random().toString(36).substring(2, 9),
        version: 1,
        title: template.title,
        canvases: clonedCanvases,
        activeCanvasId: clonedCanvases[0].id,
        targetPlatform: template.category,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      recordHistory(newProject);
      set({ selectedElementId: null, isDirty: true });
    },

    newProject: (presetId) => {
      const preset =
        CANVAS_SIZE_PRESETS.find((p) => p.id === presetId) ||
        CANVAS_SIZE_PRESETS[0];
      const newCanvasId = "canvas-" + Math.random().toString(36).substring(2, 9);
      const newProject: ProjectDocument = {
        id: "proj-" + Math.random().toString(36).substring(2, 9),
        version: 1,
        title: "Untitled " + preset.name,
        targetPlatform: preset.platform,
        activeCanvasId: newCanvasId,
        canvases: [
          {
            id: newCanvasId,
            name: "Canvas 1",
            width: preset.width,
            height: preset.height,
            background: {
              type: "gradient",
              color: "#0f172a",
              gradient: {
                type: "linear",
                angle: 135,
                stops: [
                  { offset: 0, color: "#090a0f" },
                  { offset: 0.6, color: "#141724" },
                  { offset: 1, color: "#1e2235" },
                ],
              },
              pattern: { type: "dots", color: "#38bdf8", opacity: 0.1, scale: 24 },
            },
            elements: [
              {
                id: "title-" + Math.random().toString(36).substring(2, 9),
                name: "Headline",
                type: "text",
                x: Math.round(preset.width * 0.1),
                y: Math.round(preset.height * 0.12),
                width: Math.round(preset.width * 0.8),
                height: 120,
                rotation: 0,
                opacity: 1,
                visible: true,
                locked: false,
                text: "Your Product Headline",
                fontSize: Math.round(preset.width * 0.05),
                fontFamily: "var(--font-sans)",
                fontWeight: "800",
                fontStyle: "normal",
                fill: "#ffffff",
                align: "center",
                lineHeight: 1.2,
                letterSpacing: -1,
              },
            ],
          },
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      recordHistory(newProject);
      set({ selectedElementId: null, isDirty: true });
    },

    loadProjectDocument: (doc) => {
      set({
        project: {
          ...doc,
          activeCanvasId: doc.activeCanvasId || doc.canvases[0]?.id || "",
        },
        selectedElementId: null,
        past: [],
        future: [],
        isDirty: false,
      });
    },

    importProjectJson: (jsonStr) => {
      try {
        const parsed = JSON.parse(jsonStr) as ProjectDocument;
        if (!parsed.canvases || !Array.isArray(parsed.canvases) || parsed.canvases.length === 0) {
          return false;
        }
        recordHistory(parsed);
        set({
          selectedElementId: null,
          isDirty: true,
        });
        return true;
      } catch (err) {
        console.error("Invalid JSON document import:", err);
        return false;
      }
    },

    saveProjectLocally: () => {
      const { project } = get();
      if (typeof window === "undefined") return;
      try {
        const projectKey = "pixelforge_proj_" + project.id;
        window.localStorage.setItem(projectKey, JSON.stringify(project));

        // Update list of saved projects
        const listKey = "pixelforge_projects_meta";
        const raw = window.localStorage.getItem(listKey);
        const metaList: SavedProjectMeta[] = raw ? JSON.parse(raw) : [];
        const existingIdx = metaList.findIndex((p) => p.id === project.id);
        const metaItem: SavedProjectMeta = {
          id: project.id,
          title: project.title,
          updatedAt: new Date().toISOString(),
          canvasCount: project.canvases.length,
        };
        if (existingIdx >= 0) {
          metaList[existingIdx] = metaItem;
        } else {
          metaList.unshift(metaItem);
        }
        window.localStorage.setItem(listKey, JSON.stringify(metaList));

        set({
          isDirty: false,
          lastSavedAt: new Date().toLocaleTimeString(),
          savedProjectsList: metaList,
        });
      } catch (err) {
        console.error("Failed to save project locally:", err);
      }
    },

    deleteSavedProject: (id) => {
      if (typeof window === "undefined") return;
      window.localStorage.removeItem("pixelforge_proj_" + id);
      const listKey = "pixelforge_projects_meta";
      const raw = window.localStorage.getItem(listKey);
      if (raw) {
        const metaList: SavedProjectMeta[] = JSON.parse(raw);
        const filtered = metaList.filter((p) => p.id !== id);
        window.localStorage.setItem(listKey, JSON.stringify(filtered));
        set({ savedProjectsList: filtered });
      }
    },

    refreshSavedProjects: () => {
      if (typeof window === "undefined") return;
      const listKey = "pixelforge_projects_meta";
      const raw = window.localStorage.getItem(listKey);
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          set({ savedProjectsList: parsed });
        } catch {
          set({ savedProjectsList: [] });
        }
      }
    },

    // Canvas actions
    setActiveCanvas: (id) => {
      set((s) => ({
        project: { ...s.project, activeCanvasId: id },
        selectedElementId: null,
      }));
    },

    addCanvas: (presetId, insertIndex) => {
      const { project } = get();
      const currentCanvas =
        project.canvases.find((c) => c.id === project.activeCanvasId) ||
        project.canvases[0];
      const preset = CANVAS_SIZE_PRESETS.find((p) => p.id === presetId);
      const width = preset ? preset.width : currentCanvas.width;
      const height = preset ? preset.height : currentCanvas.height;

      const newCanvas: CanvasItem = {
        id: "canvas-" + Math.random().toString(36).substring(2, 9),
        name: `Canvas ${project.canvases.length + 1}`,
        width,
        height,
        background: JSON.parse(JSON.stringify(currentCanvas.background)),
        elements: [],
      };

      const canvases = [...project.canvases];
      const targetIndex =
        typeof insertIndex === "number" ? insertIndex : canvases.length;
      canvases.splice(targetIndex, 0, newCanvas);

      const updated = {
        ...project,
        canvases,
        activeCanvasId: newCanvas.id,
      };
      recordHistory(updated);
      set({ selectedElementId: null });
    },

    duplicateCanvas: (canvasId) => {
      const { project } = get();
      const source = project.canvases.find((c) => c.id === canvasId);
      if (!source) return;

      const clone: CanvasItem = {
        ...JSON.parse(JSON.stringify(source)),
        id: "canvas-" + Math.random().toString(36).substring(2, 9),
        name: `${source.name} (Copy)`,
      };
      // Regenerate element IDs so they don't collide
      clone.elements = clone.elements.map((el) => ({
        ...el,
        id: "el-" + Math.random().toString(36).substring(2, 9),
      }));

      const idx = project.canvases.findIndex((c) => c.id === canvasId);
      const canvases = [...project.canvases];
      canvases.splice(idx + 1, 0, clone);

      const updated = {
        ...project,
        canvases,
        activeCanvasId: clone.id,
      };
      recordHistory(updated);
      set({ selectedElementId: null });
    },

    deleteCanvas: (canvasId) => {
      const { project } = get();
      if (project.canvases.length <= 1) return; // Keep at least one canvas

      const canvases = project.canvases.filter((c) => c.id !== canvasId);
      const nextActiveId =
        project.activeCanvasId === canvasId
          ? canvases[0].id
          : project.activeCanvasId;

      const updated = {
        ...project,
        canvases,
        activeCanvasId: nextActiveId,
      };
      recordHistory(updated);
      set({ selectedElementId: null });
    },

    reorderCanvases: (fromIndex, toIndex) => {
      const { project } = get();
      if (
        fromIndex < 0 ||
        fromIndex >= project.canvases.length ||
        toIndex < 0 ||
        toIndex >= project.canvases.length
      )
        return;

      const canvases = [...project.canvases];
      const [moved] = canvases.splice(fromIndex, 1);
      canvases.splice(toIndex, 0, moved);

      const updated = { ...project, canvases };
      recordHistory(updated);
    },

    bulkCreateCanvases: (newCanvases, targetPlatform = "google_play") => {
      const { project } = get();
      const updated = {
        ...project,
        canvases: newCanvases,
        activeCanvasId: newCanvases[0]?.id || "",
        targetPlatform: targetPlatform as any,
        updatedAt: new Date().toISOString(),
      };
      recordHistory(updated);
      set({ selectedElementId: null, isDirty: true });
    },

    updateCanvasSize: (canvasId, width, height) => {
      const { project } = get();
      const canvases = project.canvases.map((c) =>
        c.id === canvasId ? { ...c, width, height } : c
      );
      recordHistory({ ...project, canvases });
    },

    updateAllCanvasesSize: (width, height) => {
      const { project } = get();
      const canvases = project.canvases.map((c) => {
        const scaleX = width / c.width;
        const scaleY = height / c.height;
        const elements: CanvasElement[] = c.elements.map((el) => {
          if (el.type === "text") {
            return {
              ...el,
              x: Math.round(el.x * scaleX),
              y: Math.round(el.y * scaleY),
              width: Math.round(el.width * scaleX),
              height: Math.round(el.height * scaleY),
              fontSize: Math.round(el.fontSize * Math.min(scaleX, scaleY)),
            };
          }
          return {
            ...el,
            x: Math.round(el.x * scaleX),
            y: Math.round(el.y * scaleY),
            width: Math.round(el.width * scaleX),
            height: Math.round(el.height * scaleY),
          };
        });
        return { ...c, width, height, elements };
      });
      recordHistory({ ...project, canvases });
    },

    updateCanvasBackground: (canvasId, bgUpdate) => {
      const { project } = get();
      const canvases = project.canvases.map((c) => {
        if (c.id !== canvasId) return c;
        const newBg =
          typeof bgUpdate === "function" ? bgUpdate(c.background) : { ...c.background, ...bgUpdate };
        return { ...c, background: newBg };
      });
      recordHistory({ ...project, canvases });
    },

    // Elements
    addElement: (canvasId, element) => {
      const { project } = get();
      const canvases = project.canvases.map((c) => {
        if (c.id !== canvasId) return c;
        return {
          ...c,
          elements: [...c.elements, element],
        };
      });
      const updated = { ...project, canvases };
      recordHistory(updated);
      set({ selectedElementId: element.id });
    },

    updateElement: (canvasId, elementId, updates) => {
      const { project } = get();
      const canvases = project.canvases.map((c) => {
        if (c.id !== canvasId) return c;
        return {
          ...c,
          elements: c.elements.map((el) =>
            el.id === elementId ? ({ ...el, ...updates } as CanvasElement) : el
          ),
        };
      });
      recordHistory({ ...project, canvases });
    },

    deleteElement: (canvasId, elementId) => {
      const { project } = get();
      const canvases = project.canvases.map((c) => {
        if (c.id !== canvasId) return c;
        return {
          ...c,
          elements: c.elements.filter((el) => el.id !== elementId),
        };
      });
      recordHistory({ ...project, canvases });
      set({ selectedElementId: null });
    },

    duplicateElement: (canvasId, elementId) => {
      const { project } = get();
      const targetCanvas = project.canvases.find((c) => c.id === canvasId);
      if (!targetCanvas) return;
      const source = targetCanvas.elements.find((el) => el.id === elementId);
      if (!source) return;

      const clone: CanvasElement = {
        ...JSON.parse(JSON.stringify(source)),
        id: "el-" + Math.random().toString(36).substring(2, 9),
        name: `${source.name} (Copy)`,
        x: source.x + 30,
        y: source.y + 30,
      };

      const canvases = project.canvases.map((c) => {
        if (c.id !== canvasId) return c;
        return {
          ...c,
          elements: [...c.elements, clone],
        };
      });

      recordHistory({ ...project, canvases });
      set({ selectedElementId: clone.id });
    },

    reorderElement: (canvasId, elementId, direction) => {
      const { project } = get();
      const targetCanvas = project.canvases.find((c) => c.id === canvasId);
      if (!targetCanvas) return;
      const idx = targetCanvas.elements.findIndex((el) => el.id === elementId);
      if (idx === -1) return;

      const elements = [...targetCanvas.elements];
      const [item] = elements.splice(idx, 1);

      if (direction === "top") {
        elements.push(item);
      } else if (direction === "bottom") {
        elements.unshift(item);
      } else if (direction === "up") {
        const nextIdx = Math.min(idx + 1, elements.length);
        elements.splice(nextIdx, 0, item);
      } else if (direction === "down") {
        const prevIdx = Math.max(idx - 1, 0);
        elements.splice(prevIdx, 0, item);
      }

      const canvases = project.canvases.map((c) =>
        c.id === canvasId ? { ...c, elements } : c
      );
      recordHistory({ ...project, canvases });
    },

    toggleElementVisibility: (canvasId, elementId) => {
      const { project } = get();
      const canvases = project.canvases.map((c) => {
        if (c.id !== canvasId) return c;
        return {
          ...c,
          elements: c.elements.map((el) =>
            el.id === elementId ? ({ ...el, visible: !el.visible } as CanvasElement) : el
          ),
        };
      });
      recordHistory({ ...project, canvases });
    },

    toggleElementLock: (canvasId, elementId) => {
      const { project } = get();
      const canvases = project.canvases.map((c) => {
        if (c.id !== canvasId) return c;
        return {
          ...c,
          elements: c.elements.map((el) =>
            el.id === elementId ? ({ ...el, locked: !el.locked } as CanvasElement) : el
          ),
        };
      });
      recordHistory({ ...project, canvases });
    },

    // Undo / Redo
    undo: () => {
      const { past, project, future } = get();
      if (past.length === 0) return;
      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);
      set({
        past: newPast,
        future: [JSON.parse(JSON.stringify(project)), ...future],
        project: previous,
        isDirty: true,
      });
    },

    redo: () => {
      const { past, project, future } = get();
      if (future.length === 0) return;
      const next = future[0];
      const newFuture = future.slice(1);
      set({
        past: [...past, JSON.parse(JSON.stringify(project))],
        future: newFuture,
        project: next,
        isDirty: true,
      });
    },

    canUndo: () => get().past.length > 0,
    canRedo: () => get().future.length > 0,
  };
});
