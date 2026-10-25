"use client";

import React from "react";
import { useEditorStore } from "@/stores/editor-store";
import { ActiveNavSection } from "@/types/editor";
import {
  Image,
  LayoutGrid,
  Type,
  Smartphone,
  Hash,
  Layers,
  Tag,
  Plus,
} from "lucide-react";

interface NavItem {
  id: ActiveNavSection | "brands";
  label: string;
  icon: React.ElementType;
}

const NAV_ITEMS: NavItem[] = [
  { id: "projects", label: "Projects", icon: Image },
  { id: "layout", label: "Layout", icon: LayoutGrid },
  { id: "content", label: "Content", icon: Type },
  { id: "screenshot", label: "Screenshot", icon: Smartphone },
  { id: "background", label: "Background", icon: Hash },
  { id: "layers", label: "Layers", icon: Layers },
  { id: "brands", label: "Brands", icon: Tag },
];

export const EditorSidebar: React.FC = () => {
  const activeNav = useEditorStore((s) => s.activeNav);
  const setActiveNav = useEditorStore((s) => s.setActiveNav);
  const addCanvas = useEditorStore((s) => s.addCanvas);

  return (
    <aside className="my-3 ml-3 w-16 h-[calc(100vh-4.25rem)] bg-[#0b0e17] border border-[#1d2232] rounded-2xl flex flex-col items-center justify-between py-3.5 z-30 select-none shadow-xl">
      {/* Top Nav Items */}
      <div className="flex flex-col items-center gap-1.5 w-full px-1.5">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeNav === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveNav(item.id as ActiveNavSection);
              }}
              className={`w-full py-2 rounded-xl flex flex-col items-center justify-center gap-1 transition-all ${
                isActive
                  ? "bg-[#162235] text-[#38bdf8] border border-[#0ea5e9]/40 shadow-[0_0_15px_rgba(14,165,233,0.25)]"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[9px] font-medium tracking-tight">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Bottom Sky Blue (+) Button (Exact match to reference screenshots) */}
      <button
        onClick={() => addCanvas()}
        title="Add Canvas"
        className="w-10 h-10 rounded-xl bg-[#0ea5e9] hover:bg-[#0284c7] text-white flex items-center justify-center shadow-[0_0_15px_rgba(14,165,233,0.4)] transition hover:scale-105 active:scale-95"
      >
        <Plus className="w-5 h-5 stroke-[2.5]" />
      </button>
    </aside>
  );
};
