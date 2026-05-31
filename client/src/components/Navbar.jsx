import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-gradient-to-r from-violet-800 via-purple-700 to-indigo-800 shadow-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 text-xl font-bold text-white backdrop-blur">
            🕉️
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-violet-200">
              Puja Management
            </p>

            <h1 className="text-lg font-bold text-white">
              Admin Dashboard
            </h1>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="rounded-xl bg-white/15 px-5 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/25"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;
