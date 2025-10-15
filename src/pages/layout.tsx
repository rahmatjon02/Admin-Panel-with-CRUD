import { Button, CssBaseline, ThemeProvider } from "@mui/material";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useThemeStore } from "../hooks/zustand/useThemeStore";
import { lightTheme, darkTheme } from "../theme";
import { ThemeSwitcher } from "../components/ThemeSwitcher";
import { useEffect } from "react";

const Layout = () => {
  const { pathname } = useLocation();
  const { theme } = useThemeStore();

  useEffect(() => {
    document.body.style.backgroundColor = theme === "dark" ? "#121212" : "#fff";
    document.body.style.color = theme === "dark" ? "#fff" : "#000";
  }, [theme]);

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <div className="flex min-h-screen transition-colors">
        <aside
          className={`w-48 ${
            theme === "light" ? "bg-sky-600" : "bg-sky-900"
          }  text-white flex flex-col p-5 `}
        >
          <h1 className="text-2xl font-bold mb-8 text-center">Admin Panel</h1>

          <nav className="flex flex-col justify-between gap-3 h-full">
            <div className="flex flex-col gap-2">
              <Button
                component={Link}
                to={"/"}
                color="inherit"
                className={`!justify-start !text-white !font-medium !rounded transition-all 
                ${pathname === "/" ? "!bg-sky-800" : "hover:!bg-sky-700"}`}
              >
                Products
              </Button>

              <Button
                component={Link}
                to={"/users"}
                color="inherit"
                className={`!justify-start !text-white !font-medium !rounded transition-all 
                ${pathname === "/users" ? "!bg-sky-800" : "hover:!bg-sky-700"}`}
              >
                Users
              </Button>
            </div>

            <ThemeSwitcher />
          </nav>
        </aside>

        <main className="flex-1 overflow-y-scroll max-h-[100vh] min-h-[100vh]">
          <Outlet />
        </main>
        <CssBaseline />
      </div>
    </ThemeProvider>
  );
};

export default Layout;
