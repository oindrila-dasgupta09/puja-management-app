import { NavLink } from "react-router-dom";

function Sidebar() {
  const items = [
    { to: "/dashboard", label: "Dashboard", icon: "📊" },
    { to: "/pujas", label: "Puja Details", icon: "🪔" },
    { to: "/purohits", label: "Purohits", icon: "🙏" },
    { to: "/users", label: "Users", icon: "👥" },
  ];

  return (
    <aside className="w-full lg:w-72">
      <div className="sticky top-24 rounded-3xl border border-slate-200 bg-white p-5 shadow-xl">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-600">
            Navigation
          </p>

          <h2 className="mt-2 text-2xl font-bold text-slate-800">
            Menu
          </h2>
        </div>

        <nav className="space-y-3">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-3 font-medium transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-violet-600 to-purple-700 text-white shadow-lg"
                    : "text-slate-700 hover:bg-violet-50 hover:text-violet-700"
                }`
              }
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-8 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-700 p-4 text-white">
          <p className="text-xs uppercase tracking-[0.2em] text-violet-200">
            Puja App
          </p>

          <h3 className="mt-2 font-semibold">
            Manage Pujas & Purohits
          </h3>

          <p className="mt-2 text-sm text-violet-100">
            Fast, simple and organized management.
          </p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
