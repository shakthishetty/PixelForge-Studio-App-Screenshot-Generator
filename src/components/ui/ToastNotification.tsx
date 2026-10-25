"use client";

import React from "react";
import { useToastStore } from "@/stores/toast-store";
import { CheckCircle2, Info, AlertCircle, Loader2, X } from "lucide-react";

export const ToastNotification: React.FC = () => {
  const toasts = useToastStore((s) => s.toasts);
  const removeToast = useToastStore((s) => s.removeToast);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 items-center pointer-events-none select-none">
      {toasts.map((t) => {
        const isSuccess = t.type === "success";
        const isError = t.type === "error";
        const isLoading = t.type === "loading";

        return (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-center gap-2.5 px-4 py-2.5 rounded-xl border backdrop-blur-md shadow-2xl text-xs font-medium animate-in fade-in slide-in-from-top-3 duration-200 transition-all ${
              isSuccess
                ? "bg-[#0b161e]/95 border-emerald-500/50 text-emerald-300 shadow-[0_4px_25px_rgba(16,185,129,0.25)]"
                : isError
                ? "bg-[#1c0e12]/95 border-rose-500/50 text-rose-300 shadow-[0_4px_25px_rgba(244,63,94,0.25)]"
                : isLoading
                ? "bg-[#0c1424]/95 border-sky-500/50 text-sky-300 shadow-[0_4px_25px_rgba(14,165,233,0.25)]"
                : "bg-[#0f1320]/95 border-slate-700/60 text-slate-200 shadow-[0_4px_25px_rgba(0,0,0,0.4)]"
            }`}
          >
            {isSuccess && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
            {isError && <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />}
            {isLoading && <Loader2 className="w-4 h-4 text-sky-400 animate-spin shrink-0" />}
            {!isSuccess && !isError && !isLoading && (
              <Info className="w-4 h-4 text-sky-400 shrink-0" />
            )}

            <span>{t.message}</span>

            <button
              onClick={() => removeToast(t.id)}
              className="ml-1.5 p-0.5 rounded text-slate-400 hover:text-white hover:bg-white/10 transition"
              aria-label="Close"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
