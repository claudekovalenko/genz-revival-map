import { NavLink, Outlet } from "react-router-dom";

const navItems = [
  { to: "/", label: "Map", end: true },
  { to: "/insights", label: "Insights" },
  { to: "/findings", label: "Findings" },
  { to: "/about", label: "About" },
];

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-black/10 dark:border-white/10 sticky top-0 bg-[#f7f6f2]/90 dark:bg-[#0f1015]/90 backdrop-blur z-20">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <NavLink to="/" className="font-semibold tracking-tight text-lg">
            Gen Z Revival Map
          </NavLink>
          <nav className="flex gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-full text-sm transition-colors ${
                    isActive
                      ? "bg-black text-white dark:bg-white dark:text-black"
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
      <footer className="border-t border-black/10 dark:border-white/10 text-xs text-black/50 dark:text-white/40 py-6 mt-12">
        <div className="max-w-6xl mx-auto px-4">
          Independent research project tracking publicly reported Protestant revival activity among Gen Z in the
          U.S., 2012-present. Not affiliated with any church, ministry, or news outlet. See{" "}
          <NavLink to="/about" className="underline">
            methodology &amp; caveats
          </NavLink>
          .
        </div>
      </footer>
    </div>
  );
}
