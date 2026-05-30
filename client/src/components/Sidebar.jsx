import { NavLink } from "react-router-dom";

function Sidebar() {
  const items = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/pujas", label: "Pujas" },
    { to: "/purohits", label: "Purohits" },
    { to: "/users", label: "Users" },
  ];

  const linkClasses = ({ isActive }) =>
    `block rounded-3xl px-4 py-3 text-sm font-medium transition ${
      isActive
        ? "bg-orange-50 text-orange-700 shadow-sm"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

  return (
    <aside className="w-full lg:w-64 xl:w-72">
      <div className="sticky top-5 space-y-5 rounded-[1.75rem] border border-slate-200 bg-white/95 p-5 shadow-2xl shadow-slate-200/30">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-orange-500">Admin Panel</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-900">Navigation</h2>
        </div>

        <nav className="space-y-2">
          {items.map((item) => (
            <NavLink key={item.to} to={item.to} end className={linkClasses}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
