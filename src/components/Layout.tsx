import { NavLink, Outlet } from "react-router-dom";
import InstallPrompt from "./InstallPrompt";

const navItems = [
  { to: "/", label: "Map", end: true },
  { to: "/insights", label: "Insights" },
  { to: "/findings", label: "Findings" },
  { to: "/about", label: "About" },
];

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header
        className="border-b border-black/10 dark:border-white/10 sticky top-0 bg-[#f7f6f2]/90 dark:bg-[#0f1015]/90 backdrop-blur z-20"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="max-w-6xl mx-auto px-4 py-2.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <NavLink to="/" className="font-semibold tracking-tight text-base sm:text-lg whitespace-nowrap">
            Gen Z Revival Map
          </NavLink>
          <nav className="flex gap-1 -mx-1 px-1 overflow-x-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-full text-sm whitespace-nowrap shrink-0 transition-colors ${
                    isActive
                      ? "bg-amber-100 text-amber-950 font-semibold dark:bg-amber-400/20 dark:text-amber-100"
                      : "hover:bg-black/5 dark:hover:bg-white/10"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer
        className="border-t border-black/10 dark:border-white/10 text-xs text-black/50 dark:text-white/40 py-6 mt-12"
        style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
      >
        <div className="max-w-6xl mx-auto px-4">
          Independent research project tracking publicly reported Protestant revival activity among Gen Z in the
          U.S., 2012-present. Not affiliated with any church, ministry, or news outlet. See{" "}
          <NavLink to="/about" className="underline">
            methodology &amp; caveats
          </NavLink>
          .
        </div>
      </footer>
      <InstallPrompt />
    </div>
  );
}
