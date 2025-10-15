import { Button } from "@mui/material";
import { useThemeStore } from "../hooks/useThemeStore";
import { Moon, Sun } from "lucide-react";
export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <Button className="!text-white"  onClick={toggleTheme}>
      {theme === `light` ? <Sun /> : <Moon />}
      {theme === `light` ? "Dark" : "light"}
    </Button>
  );
};
