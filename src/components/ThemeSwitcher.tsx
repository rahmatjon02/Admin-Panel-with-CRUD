import { Button } from "@mui/material";
import { useThemeStore } from "../hooks/zustand/useThemeStore";
import { Moon, Sun } from "lucide-react";
import React from "react";

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useThemeStore();
  return (
    <Button
      className={`${theme === "dark" ? "!text-white" : "!text-black"}`}
      onClick={toggleTheme}
    >
      {theme === `light` ? <Sun /> : <Moon />}
      <span className="px-2">{theme === `light` ? "Dark" : "light"}</span>
    </Button>
  );
};
export default React.memo(ThemeSwitcher);
