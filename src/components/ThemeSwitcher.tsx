import { Button } from "@mui/material";
import { useThemeStore } from "../hooks/useThemeStore";

export const ThemeSwitcher = () => {
  const { theme, toggleMode } = useThemeStore();

  return (
    <Button
      variant="contained"
      onClick={toggleMode}
      color="primary"
    >
      {theme === "light" ? "Dark" : "Light"}
    </Button>
  );
};
