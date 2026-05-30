import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="w-full border-b border-white/10 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 shadow-2xl shadow-orange-400/10">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-white/20 text-xl font-semibold text-white shadow-lg shadow-slate-900/10">
            P
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/80">Puja Admin</p>
            <h1 className="text-xl font-semibold text-white">Control panel</h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-white/15 px-4 py-2 text-sm text-white/90">Secure access</span>
          <button
            onClick={handleLogout}
            className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-orange-600 shadow-lg shadow-orange-300/20 transition hover:bg-orange-50"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
