"use client";

import dynamic from "next/dynamic";

const EditorShell = dynamic(
  () => import("@/components/editor/EditorShell").then((mod) => mod.EditorShell),
  {
    ssr: false,
    loading: () => (
      <div className="flex flex-col items-center justify-center h-screen w-screen bg-[#090a0f] text-slate-200">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center shadow-[0_0_25px_rgba(56,189,248,0.5)] animate-pulse mb-4">
          <span className="text-white text-lg font-bold">✦</span>
        </div>
        <div className="font-semibold text-sm tracking-tight text-white mb-1">
          PixelForge Studio
        </div>
        <p className="text-xs text-slate-500">Initializing design canvas engine...</p>
      </div>
    ),
  }
);

export default function HomePage() {
  return <EditorShell />;
}
