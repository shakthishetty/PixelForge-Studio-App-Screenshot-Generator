"use client";

import React, { useState, useEffect } from "react";
import { useEditorStore } from "@/stores/editor-store";
import { STARTER_TEMPLATES } from "@/templates/definitions";
import {
  FolderKanban,
  Globe,
  Heart,
  Upload,
  Download,
  Trash2,
  Plus,
  Search,
  Check,
  Sparkles,
  Layers,
  RotateCcw,
} from "lucide-react";
import { toast } from "@/stores/toast-store";
import { applyUserContentToCanvases } from "@/lib/utils/template-content-replacer";

type CategoryFilter =
  | "all"
  | "google_play"
  | "app_store"
  | "ai_saas"
  | "fitness"
  | "finance"
  | "minimal_luxury"
  | "lifestyle"
  | "marketing";

const CATEGORIES: { id: CategoryFilter; label: string; count: number }[] = [
  { id: "all", label: "All", count: 40 },
  { id: "google_play", label: "Google Play", count: 10 },
  { id: "app_store", label: "App Store", count: 6 },
  { id: "ai_saas", label: "AI & SaaS", count: 5 },
  { id: "fitness", label: "Fitness", count: 4 },
  { id: "finance", label: "Finance", count: 4 },
  { id: "minimal_luxury", label: "Minimal", count: 4 },
  { id: "lifestyle", label: "Lifestyle", count: 3 },
  { id: "marketing", label: "Marketing", count: 4 },
];

export const ProjectsPanel: React.FC = () => {
  const [tab, setTab] = useState<"starters" | "saved">("starters");
  const [keepContent, setKeepContent] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const project = useEditorStore((s) => s.project);
  const loadTemplate = useEditorStore((s) => s.loadTemplate);
  const newProject = useEditorStore((s) => s.newProject);
  const savedProjectsList = useEditorStore((s) => s.savedProjectsList);
  const refreshSavedProjects = useEditorStore((s) => s.refreshSavedProjects);
  const deleteSavedProject = useEditorStore((s) => s.deleteSavedProject);
  const importProjectJson = useEditorStore((s) => s.importProjectJson);
  const loadProjectDocument = useEditorStore((s) => s.loadProjectDocument);
  const userImportedContent = useEditorStore((s) => s.userImportedContent);
  const clearUserImportedContent = useEditorStore((s) => s.clearUserImportedContent);
  const templatePreviewMode = useEditorStore((s) => s.templatePreviewMode);
  const setTemplatePreviewMode = useEditorStore((s) => s.setTemplatePreviewMode);
  const resetWorkspaceToDefaultTemplate = useEditorStore((s) => s.resetWorkspaceToDefaultTemplate);

  useEffect(() => {
    refreshSavedProjects();
  }, [refreshSavedProjects]);

  // Handle JSON export of current project
  const handleExportJson = () => {
    const jsonStr = JSON.stringify(project, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pixelforge-${project.title.toLowerCase().replace(/\s+/g, "-")}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJsonFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const success = importProjectJson(reader.result as string);
      if (success) {
        toast.success("Project loaded successfully!");
      } else {
        toast.error("Invalid project JSON file.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleOpenSaved = (id: string) => {
    try {
      const raw = localStorage.getItem("pixelforge_proj_" + id);
      if (raw) {
        loadProjectDocument(JSON.parse(raw));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Filter templates
  const filteredTemplates = STARTER_TEMPLATES.filter((t) => {
    const matchesCategory =
      selectedCategory === "all" || t.category === selectedCategory;
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col h-full text-slate-200">
      {/* Header Title (Matches Screenshot 1) */}
      <div className="flex items-center gap-2 mb-3">
        <FolderKanban className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-[11px] font-bold tracking-wider text-slate-300 uppercase">
          PROJECTS
        </span>
      </div>

      {/* Tabs: Starters & My Projects */}
      <div className="flex rounded-xl bg-[#111420] border border-[#212738] p-1 mb-2.5">
        <button
          onClick={() => setTab("starters")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold transition ${
            tab === "starters"
              ? "bg-[#0ea5e9] text-white shadow-[0_0_12px_rgba(14,165,233,0.35)]"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Globe className="w-3 h-3" />
          <span>Starters</span>
        </button>
        <button
          onClick={() => setTab("saved")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold transition ${
            tab === "saved"
              ? "bg-[#0ea5e9] text-white shadow-[0_0_12px_rgba(14,165,233,0.35)]"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Heart className="w-3 h-3" />
          <span>My Projects</span>
        </button>
      </div>

      {/* Keep My Content Toggle Switch (Matches Screenshot 1) */}
      <div className="flex items-center justify-between py-1 mb-2 px-1">
        <span className="text-[10px] font-bold text-slate-400 tracking-wider">
          KEEP MY CONTENT
        </span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={keepContent}
            onChange={(e) => setKeepContent(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-8 h-4 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#0ea5e9] peer-checked:after:bg-white"></div>
        </label>
      </div>

      {tab === "starters" ? (
        <div className="flex flex-col flex-1 overflow-hidden space-y-2">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 40 templates..."
              className="w-full pl-8 pr-3 py-1.5 bg-[#111420] border border-[#212738] focus:border-sky-500 rounded-xl text-xs text-slate-200 placeholder:text-slate-500 outline-none"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-[10px] font-semibold">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-2.5 py-1 rounded-lg shrink-0 transition ${
                  selectedCategory === cat.id
                    ? "bg-[#1e293b] text-sky-400 border border-sky-500/50"
                    : "bg-[#111420] text-slate-400 hover:text-slate-200 border border-[#212738]"
                }`}
              >
                {cat.label} ({cat.count})
              </button>
            ))}
          </div>

          {/* View Mode Switcher: My Screenshots vs Default Templates */}
          {userImportedContent && userImportedContent.length > 0 && (
            <div className="flex flex-col gap-2 p-2.5 rounded-xl bg-gradient-to-r from-sky-950/70 via-[#101c36] to-indigo-950/50 border border-sky-500/40 shadow-sm animate-in fade-in duration-200">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-sky-200">
                  <Sparkles className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span className="text-[11px] font-semibold">
                    {templatePreviewMode === "user_content"
                      ? "Custom Screenshots Active"
                      : "Default Templates Active"}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    resetWorkspaceToDefaultTemplate();
                    toast.success("Workspace and all templates reset to defaults!");
                  }}
                  title="Clear imported images and reset workspace to default template"
                  className="flex items-center gap-1 text-[10px] text-rose-400 hover:text-rose-300 font-medium hover:underline transition"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset to Default</span>
                </button>
              </div>

              {/* Segmented control toggle */}
              <div className="grid grid-cols-2 gap-1 p-0.5 rounded-lg bg-[#0c101a] border border-[#1b2234]">
                <button
                  onClick={() => {
                    setTemplatePreviewMode("user_content");
                    toast.info("Showing your imported screenshots on all templates");
                  }}
                  className={`flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs font-semibold transition ${
                    templatePreviewMode === "user_content"
                      ? "bg-[#0ea5e9] text-white shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>My Screenshots</span>
                </button>
                <button
                  onClick={() => {
                    setTemplatePreviewMode("defaults");
                    toast.info("Showing original default templates");
                  }}
                  className={`flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs font-semibold transition ${
                    templatePreviewMode === "defaults"
                      ? "bg-slate-700 text-white shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Default Templates</span>
                </button>
              </div>
            </div>
          )}

          {/* Template Cards Stack */}
          <div className="flex-1 overflow-y-auto pr-1 space-y-3">
            {filteredTemplates.map((template) => {
              const bgGradient =
                template.canvases[0]?.background?.type === "gradient"
                  ? template.canvases[0].background.gradient?.stops
                      ?.map((s) => s.color)
                      .join(", ")
                  : null;

              const previewCanvases =
                templatePreviewMode === "user_content" &&
                userImportedContent &&
                userImportedContent.length > 0
                  ? applyUserContentToCanvases(template.canvases, userImportedContent)
                  : template.canvases;

              return (
                <div
                  key={template.id}
                  onClick={() => {
                    loadTemplate(template.id, keepContent);
                    if (
                      templatePreviewMode === "user_content" &&
                      userImportedContent &&
                      userImportedContent.length > 0
                    ) {
                      toast.success(
                        `Loaded "${template.title}" with your screenshots & copy!`
                      );
                    } else {
                      toast.success(
                        `Loaded default template: "${template.title}"`
                      );
                    }
                  }}
                  className="group p-2.5 rounded-2xl bg-[#111420] border border-[#212738] hover:border-[#0ea5e9]/70 cursor-pointer transition-all shadow-md"
                >
                  {/* Miniature multi-canvas preview row (Matches Screenshot 3) */}
                  <div className="w-full h-32 rounded-xl p-1 mb-2.5 flex items-center justify-center gap-1.5 overflow-hidden bg-[#090b12] border border-[#1d2334]">
                    {/* Canvases thumbnails */}
                    {previewCanvases.slice(0, 4).map((c, idx) => {
                      const headlineEl = c.elements.find((el) => el.type === "text") as any;
                      const headline = headlineEl ? headlineEl.text.split("\n")[0] : `Screen ${idx + 1}`;
                      const isBottomHeadline = Boolean(headlineEl && headlineEl.y > 1200);

                      const isBadge = (el: any) =>
                        el.type === "badge" ||
                        (el.type === "image" &&
                          (el.id?.toLowerCase().includes("badge") ||
                            el.id?.toLowerCase().includes("wreath") ||
                            el.id?.toLowerCase().includes("laurel") ||
                            el.name?.toLowerCase().includes("badge") ||
                            el.name?.toLowerCase().includes("laurel") ||
                            el.name?.toLowerCase().includes("wreath") ||
                            el.name?.toLowerCase().includes("rating") ||
                            el.name?.toLowerCase().includes("spotlight") ||
                            el.name?.toLowerCase().includes("award")));

                      const badgeEl = c.elements.find(isBadge) as any;
                      const photoBackdrop = c.elements.find(
                        (el) => el.type === "image" && el.width >= 1000 && !isBadge(el)
                      ) as any;

                      const mockups = c.elements.filter(
                        (el) => el.type === "mockup" || (el.type === "image" && !isBadge(el) && el.id !== photoBackdrop?.id)
                      ) as any[];

                      const cBgGradient = photoBackdrop?.url
                        ? `url("${photoBackdrop.url}") center/cover no-repeat`
                        : c.background?.type === "gradient" && c.background.gradient?.stops
                        ? `linear-gradient(180deg, ${c.background.gradient.stops.map((s) => s.color).join(", ")})`
                        : c.background?.color || "#0f172a";

                      const headlineColor = headlineEl?.fill || "#ffffff";
                      const headlineAlign = headlineEl?.align === "left" ? "text-left" : headlineEl?.align === "right" ? "text-right" : "text-center";

                      const primaryMockup = mockups[0];
                      const isShiftedRight = primaryMockup && primaryMockup.x > 300;
                      const isShiftedLeft = primaryMockup && primaryMockup.x < 120;
                      const mockRotation = primaryMockup?.rotation
                        ? primaryMockup.rotation > 2
                          ? "rotate-2"
                          : primaryMockup.rotation < -2
                          ? "-rotate-2"
                          : ""
                        : "";

                      return (
                        <div
                          key={c.id}
                          className="h-full flex-1 rounded-lg border border-white/15 shadow-sm flex flex-col justify-between overflow-hidden relative"
                          style={{ background: cBgGradient }}
                        >
                          {/* Headline at top (if not inverted) */}
                          {!isBottomHeadline && (
                            <div
                              className={`text-[6.5px] font-bold leading-tight truncate px-1 pt-1 z-10 drop-shadow ${headlineAlign}`}
                              style={{ color: headlineColor }}
                            >
                              {headline}
                            </div>
                          )}

                          {/* Badge if present at top */}
                          {badgeEl?.url && !isBottomHeadline && (
                            <div className="h-3 w-full flex items-center justify-center px-1 z-10 shrink-0">
                              <img src={badgeEl.url} alt="Badge" className="max-h-full max-w-full object-contain" />
                            </div>
                          )}

                          {/* Mockup Frame & Screen Image */}
                          {mockups.length >= 2 ? (
                            <div className={`relative w-full flex-1 flex ${isBottomHeadline ? "items-start pt-1" : "items-end pb-0"} justify-center overflow-hidden`}>
                              {/* Back angled phone */}
                              <div className="absolute left-[4%] bottom-0 w-[64%] h-[82%] -rotate-6 rounded-t-md bg-[#0a0c14] border border-white/20 shadow overflow-hidden opacity-90 z-0">
                                <img
                                  src={mockups[0].type === "mockup" ? mockups[0].screenshotUrl : mockups[0].url}
                                  alt="Screen 1"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              {/* Front phone */}
                              <div className="relative z-10 w-[70%] h-[90%] rounded-t-md bg-black border-[1px] border-slate-600/90 shadow-md overflow-hidden">
                                <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-black rounded-full z-20" />
                                <img
                                  src={mockups[1].type === "mockup" ? mockups[1].screenshotUrl : mockups[1].url}
                                  alt="Screen 2"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </div>
                          ) : mockups.length === 1 ? (
                            <div
                              className={`relative w-full flex-1 flex ${
                                isBottomHeadline ? "items-start pt-1" : "items-end pb-0"
                              } ${
                                isShiftedRight ? "justify-end pr-0.5" : isShiftedLeft ? "justify-start pl-0.5" : "justify-center"
                              } overflow-hidden`}
                            >
                              <div
                                className={`w-[80%] h-[92%] ${isBottomHeadline ? "rounded-b-md" : "rounded-t-md"} bg-black border-[1px] border-slate-600/90 shadow-md overflow-hidden relative ${mockRotation}`}
                              >
                                <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-black rounded-full z-20" />
                                <img
                                  src={mockups[0].type === "mockup" ? mockups[0].screenshotUrl : mockups[0].url}
                                  alt="Screen"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="flex-1" />
                          )}

                          {/* Inverted Headline at bottom */}
                          {isBottomHeadline && (
                            <div
                              className={`text-[6.5px] font-bold leading-tight truncate px-1 pb-1 z-10 drop-shadow ${headlineAlign}`}
                              style={{ color: headlineColor }}
                            >
                              {headline}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Card Title & Meta Info (Matches Screenshot 3) */}
                  <div className="flex items-start justify-between gap-1">
                    <div>
                      <h4 className="text-xs font-bold text-slate-200 group-hover:text-sky-300 transition">
                        {template.title}
                      </h4>
                      <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">
                        {template.description}
                      </p>
                    </div>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#162032] border border-[#23334e] text-sky-400 font-mono shrink-0">
                      {template.canvases.length} {template.canvases.length === 1 ? "screen" : "screens"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Saved Projects tab */
        <div className="flex-1 overflow-y-auto pr-1 space-y-2">
          <button
            onClick={() => newProject()}
            className="flex items-center justify-center gap-2 w-full py-2 mb-2 rounded-xl bg-sky-500/15 border border-sky-500/40 text-sky-400 hover:bg-sky-500/25 text-xs font-semibold transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Blank Project</span>
          </button>

          {savedProjectsList.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-xs">
              No saved projects yet. Click &apos;Save&apos; in the top bar.
            </div>
          ) : (
            savedProjectsList.map((meta) => (
              <div
                key={meta.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#111420] border border-[#212738] hover:border-slate-600 transition"
              >
                <div
                  onClick={() => handleOpenSaved(meta.id)}
                  className="flex-1 cursor-pointer"
                >
                  <div className="text-xs font-bold text-slate-200 hover:text-sky-400 transition">
                    {meta.title}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    {meta.canvasCount} canvases • {meta.updatedAt ? new Date(meta.updatedAt).toLocaleDateString() : ""}
                  </div>
                </div>

                <button
                  onClick={() => deleteSavedProject(meta.id)}
                  className="p-1 text-slate-500 hover:text-red-400 transition ml-2"
                  title="Delete Project"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}

          {/* Import / Export JSON buttons */}
          <div className="pt-3 border-t border-[#1d2232] space-y-2">
            <button
              onClick={handleExportJson}
              className="flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-[#111420] hover:bg-[#161b2c] border border-[#212738] text-xs font-semibold text-slate-300 hover:text-white transition"
            >
              <Download className="w-3.5 h-3.5 text-slate-400" />
              <span>Export Project JSON</span>
            </button>

            <label className="flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-[#111420] hover:bg-[#161b2c] border border-[#212738] text-xs font-semibold text-slate-300 hover:text-white transition cursor-pointer">
              <Upload className="w-3.5 h-3.5 text-slate-400" />
              <span>Import Project JSON</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImportJsonFile}
                className="hidden"
              />
            </label>
          </div>
        </div>
      )}
    </div>
  );
};
