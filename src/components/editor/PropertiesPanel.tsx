"use client";

import React from "react";
import { useEditorStore } from "@/stores/editor-store";
import { ProjectsPanel } from "./panels/ProjectsPanel";
import { LayoutPanel } from "./panels/LayoutPanel";
import { ContentPanel } from "./panels/ContentPanel";
import { MockupPanel } from "./panels/MockupPanel";
import { BackgroundPanel } from "./panels/BackgroundPanel";
import { LayersPanel } from "./panels/LayersPanel";
import { BrandsPanel } from "./panels/BrandsPanel";

export const PropertiesPanel: React.FC = () => {
  const activeNav = useEditorStore((s) => s.activeNav);
  const isPreview = useEditorStore((s) => s.isPreview);

  if (isPreview) return null;

  return (
    <div className="my-3 ml-2 w-80 h-[calc(100vh-4.25rem)] bg-[#0b0e17] border border-[#1d2232] rounded-2xl flex flex-col p-4 z-20 select-none shadow-2xl overflow-hidden">
      {activeNav === "projects" && <ProjectsPanel />}
      {activeNav === "layout" && <LayoutPanel />}
      {activeNav === "content" && <ContentPanel />}
      {activeNav === "screenshot" && <MockupPanel />}
      {activeNav === "background" && <BackgroundPanel />}
      {activeNav === "layers" && <LayersPanel />}
      {activeNav === "brands" && <BrandsPanel />}
    </div>
  );
};
