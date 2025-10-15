// import { create } from "zustand";

// type ThemeStore = {
//   theme: "light" | "dark";
//   toggleMode: () => void;
// };

// export const useThemeStore = create<ThemeStore>((set) => ({
//   theme: "light",
//   toggleMode: () =>
//     set((state) => ({
//       theme: state.theme === "light" ? "dark" : "light",
//     })),
// }));

import { create } from "zustand";

type ThemeState = {
  theme: "light" | "dark" | string;
  toggleTheme: () => void;
  setTheme: (theme: "light" | "dark") => void;
};

export const useThemeStore = create<ThemeState>((set) => ({
  theme: localStorage.getItem("theme") || "light",
  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return { theme: newTheme };
    }),
  setTheme: (theme) => {
    localStorage.setItem("theme", theme);
    set({ theme });
  },
}));
