import {
  Button,
  CssBaseline,
  ThemeProvider,
  IconButton,
  Drawer,
} from "@mui/material";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useThemeStore } from "../hooks/zustand/useThemeStore";
import { lightTheme, darkTheme } from "../theme";
import { useEffect, useState } from "react";
import ThemeSwitcher from "../components/ThemeSwitcher";
import { Package, Users, Menu } from "lucide-react";

const Layout = () => {
  const { pathname } = useLocation();
  const { theme } = useThemeStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = theme === "dark" ? "#121212" : "#fff";
    document.body.style.color = theme === "dark" ? "#fff" : "#000";
  }, [theme]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <div className="flex min-h-screen transition-colors">
        {/* Мобильный header */}
        <header
          className={`md:hidden fixed top-0 left-0 w-full flex items-center justify-between px-4 py-3 shadow z-50 ${
            theme === "light" ? "bg-white" : "bg-[#02202B]"
          }`}
        >
          <IconButton onClick={handleDrawerToggle}>
            <Menu color={theme === "light" ? "#000" : "#fff"} />
          </IconButton>
          <h1 className="text-lg font-bold">Admin Panel</h1>
          <ThemeSwitcher />
        </header>

        {/* Sidebar для desktop */}
        <aside className="hidden md:flex">
          <div
            className={`w-48 ${
              theme === "light" ? "bg-sky-600" : "bg-[#02202B]"
            } text-white flex flex-col p-5 h-full`}
          >
            <div>
              <h1 className="text-xl font-bold mb-8 text-center">
                Admin Panel
              </h1>
            </div>

            <nav className="flex flex-col justify-between gap-3 h-full">
              <div className="flex flex-col gap-2">
                <Button
                  component={Link}
                  to={"/"}
                  color="inherit"
                  onClick={() => setMobileOpen(false)}
                  className={`!justify-start !text-white !font-medium !rounded transition-all 
            ${pathname === "/" ? "!bg-sky-800" : "hover:!bg-sky-700"}`}
                >
                  <Package className="mr-3" /> Products
                </Button>

                <Button
                  component={Link}
                  to={"/users"}
                  color="inherit"
                  onClick={() => setMobileOpen(false)}
                  className={`!justify-start !text-white !font-medium !rounded transition-all 
            ${pathname === "/users" ? "!bg-sky-800" : "hover:!bg-sky-700"}`}
                >
                  <Users className="mr-3" /> Users
                </Button>
              </div>

              <ThemeSwitcher />
            </nav>
          </div>
        </aside>

        <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle}>
          <div
            className={`w-48 ${
              theme === "light" ? "bg-sky-600" : "bg-[#02202B]"
            } text-white flex flex-col p-5 h-full`}
          >
            <div>
              <h1 className="text-xl font-bold mb-8 text-center">
                Admin Panel
              </h1>
            </div>

            <nav className="flex flex-col justify-between gap-3 h-full">
              <div className="flex flex-col gap-2">
                <Button
                  component={Link}
                  to={"/"}
                  color="inherit"
                  onClick={() => setMobileOpen(false)}
                  className={`!justify-start !text-white !font-medium !rounded transition-all 
            ${pathname === "/" ? "!bg-sky-800" : "hover:!bg-sky-700"}`}
                >
                  <Package className="mr-3" /> Products
                </Button>

                <Button
                  component={Link}
                  to={"/users"}
                  color="inherit"
                  onClick={() => setMobileOpen(false)}
                  className={`!justify-start !text-white !font-medium !rounded transition-all 
            ${pathname === "/users" ? "!bg-sky-800" : "hover:!bg-sky-700"}`}
                >
                  <Users className="mr-3" /> Users
                </Button>
              </div>

              <ThemeSwitcher />
            </nav>
          </div>
        </Drawer>

        <main className="flex-1 overflow-y-scroll max-h-[100vh] min-h-[100vh] pt-[60px] md:pt-0">
          <Outlet />
        </main>

        <CssBaseline />
      </div>
    </ThemeProvider>
  );
};

export default Layout;
