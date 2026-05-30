import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      await api.post("/users/register", { name, email, password });
      alert("Registration successful. Please log in.");
      navigate("/");
    } catch (error) {
      console.error(error);
      const message = error.response?.data?.message || error.message || "Registration failed";
      alert(message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-white flex items-center justify-center px-4 py-10">
      <div className="grid w-full max-w-4xl gap-8 overflow-hidden rounded-[2rem] bg-white/95 shadow-2xl shadow-slate-200/40 md:grid-cols-[1.2fr_1fr]">
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-10 text-white">
          <div className="space-y-6">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-orange-100/80">Create account</p>
              <h1 className="mt-3 text-3xl font-semibold">Get started</h1>
            </div>
            <p className="text-sm leading-7 text-orange-100/90">Register to access an elevated admin experience for managing pujas, purohits and bookings.</p>
            <div className="rounded-[2rem] bg-white/10 p-4 text-sm text-orange-50 shadow-inner shadow-orange-500/10">
              <p className="font-semibold">Tip</p>
              <p className="mt-2 text-orange-100/90">Use a valid email address so your login remains secure and easy to recover.</p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="mb-6 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-orange-500">Register</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900">Create your account</h2>
          </div>
          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
            />
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
              Register
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{' '}
            <Link to="/" className="font-semibold text-orange-600 hover:text-orange-700">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
