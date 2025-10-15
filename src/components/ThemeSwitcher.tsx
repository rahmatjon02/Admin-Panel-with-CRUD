import { Button } from "@mui/material";
import { useThemeStore } from "../hooks/zustand/useThemeStore";
import { Moon, Sun } from "lucide-react";
import React from "react";

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useThemeStore();
  console.log("theme");

  return (
    <Button className="!text-white" onClick={toggleTheme}>
      {theme === `light` ? <Sun /> : <Moon />}
      {theme === `light` ? "Dark" : "light"}
    </Button>
  );
};
export default React.memo(ThemeSwitcher);
