import { Button, ThemeProvider } from "@mui/material";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useThemeStore } from "../hooks/useThemeStore";
import { lightTheme, darkTheme } from "../theme";
import { ThemeSwitcher } from "../components/ThemeSwitcher";

const Layout = () => {
  const { pathname } = useLocation();
  const { theme } = useThemeStore();

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <div className="flex min-h-screen transition-colors">
        <aside className="w-48 bg-sky-600 text-white flex flex-col p-6 ">
          <h1 className="text-2xl font-bold mb-8 text-center">Admin Panel</h1>

          <nav className="flex flex-col gap-3">
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
            <ThemeSwitcher />
          </nav>
        </aside>

        <main className="flex-1 overflow-y-scroll max-h-[100vh] min-h-[100vh]">
          <Outlet />
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Layout;
