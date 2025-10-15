import { create } from "zustand";

type ThemeStore = {
  theme: "light" | "dark";
  toggleMode: () => void;
};

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: "light",
  toggleMode: () =>
    set((state) => ({
      theme: state.theme === "light" ? "dark" : "light",
    })),
}));
