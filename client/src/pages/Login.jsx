import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post("/users/login", { email, password });
      localStorage.setItem("token", response.data.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      const message = error.response?.data?.message || error.message || "Login Failed";
      alert(message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-white flex items-center justify-center px-4 py-10">
      <div className="grid w-full max-w-4xl gap-8 overflow-hidden rounded-[2rem] bg-white/95 shadow-2xl shadow-slate-200/40 md:grid-cols-[1.2fr_1fr]">
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-10 text-white">
          <div className="space-y-6">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-orange-100/80">Welcome back</p>
              <h1 className="mt-3 text-3xl font-semibold">Access your dashboard</h1>
            </div>
            <p className="text-sm leading-7 text-orange-100/90">Log in to manage pujas, purohits, bookings and admin actions from one polished control panel.</p>
            <div className="rounded-[2rem] bg-white/10 p-4 text-sm text-orange-50 shadow-inner shadow-orange-500/10">
              <p className="font-semibold">Tip</p>
              <p className="mt-2 text-orange-100/90">Use your registered email and password to continue securely.</p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="mb-6 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-orange-500">Login</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900">Sign in</h2>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
            />
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
            />
            <button
              type="submit"
              className="w-full rounded-3xl bg-orange-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-700"
            >
              Login
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-slate-500">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="font-semibold text-orange-600 hover:text-orange-700">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
