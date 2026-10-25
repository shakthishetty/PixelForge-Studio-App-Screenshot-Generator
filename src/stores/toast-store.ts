import { create } from "zustand";

export interface ToastItem {
  id: string;
  message: string;
  type: "success" | "info" | "loading" | "error";
  duration?: number;
}

interface ToastStore {
  toasts: ToastItem[];
  addToast: (message: string, type?: ToastItem["type"], duration?: number) => string;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastStore>((set, get) => ({
  toasts: [],
  addToast: (message, type = "info", duration = 2800) => {
    const id = "toast-" + Math.random().toString(36).substring(2, 9);
    set((state) => ({
      toasts: [...state.toasts, { id, message, type, duration }],
    }));

    if (duration > 0) {
      setTimeout(() => {
        get().removeToast(id);
      }, duration);
    }
    return id;
  },
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },
}));

// Quick convenience helpers
export const toast = {
  success: (msg: string, duration?: number) =>
    useToastStore.getState().addToast(msg, "success", duration),
  info: (msg: string, duration?: number) =>
    useToastStore.getState().addToast(msg, "info", duration),
  loading: (msg: string, duration?: number) =>
    useToastStore.getState().addToast(msg, "loading", duration),
  error: (msg: string, duration?: number) =>
    useToastStore.getState().addToast(msg, "error", duration),
};
