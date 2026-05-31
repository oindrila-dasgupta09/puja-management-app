import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Dashboard() {
  const [pujas, setPujas] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    duration: "",
  });
  const [editingId, setEditingId] = useState(null);

  const fetchPujas = async () => {
    try {
      const res = await api.get("/pujas");
      setPujas(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPujas();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (editingId) {
        await api.put(`/pujas/${editingId}`, formData);
      } else {
        await api.post("/pujas", formData);
      }
      setFormData({ title: "", category: "", description: "", duration: "" });
      setEditingId(null);
      fetchPujas();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (puja) => {
    setEditingId(puja.id);
    setFormData({
      title: puja.title || "",
      category: puja.category || "",
      description: puja.description || "",
      duration: puja.duration || "",
    });
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/pujas/${id}`);
      fetchPujas();
    } catch (err) {
      console.error(err);
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-slate-100/70 px-4 py-8 sm:px-6 lg:px-8">
    
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="overflow-hidden rounded-[2.25rem] bg-gradient-to-r from-orange-500 via-fuchsia-500 to-violet-600 p-6 text-white shadow-2xl shadow-fuchsia-300/30">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.35em] text-orange-100/90">Puja management</p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Beautiful dashboard built for speed</h1>
              <p className="mt-4 max-w-2xl text-base text-orange-100/90">A rich admin experience with bolder cards, vivid color accents, and easy access to your most important workflows.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/pujas"
                className="inline-flex items-center justify-center rounded-full bg-white/95 px-5 py-3 text-sm font-semibold text-orange-600 shadow-md shadow-orange-500/20 transition hover:bg-white"
              >
                Pujas
              </Link>
              <Link
                to="/purohits"
                className="inline-flex items-center justify-center rounded-full bg-white/10 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-white/20"
              >
                Purohits
              </Link>
              <button
                type="button"
                onClick={logoutHandler}
                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[420px_minmax(0,1fr)]">
          <div className="grid gap-5">
            <section className="overflow-hidden rounded-[1.75rem] bg-white p-6 shadow-xl shadow-slate-200/20 ring-1 ring-slate-200/70">
              <p className="text-sm uppercase tracking-[0.35em] text-orange-500">Active overview</p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-900">Pujas in catalog</h2>
              <p className="mt-3 max-w-xl text-sm text-slate-600">A fast snapshot of how many pujas are live and your current dashboard status.</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.75rem] bg-orange-50 p-5 shadow-sm shadow-orange-200/20">
                  <p className="text-xs uppercase tracking-[0.35em] text-orange-600">Total pujas</p>
                  <p className="mt-3 text-4xl font-bold text-orange-700">{pujas.length}</p>
                </div>
                <div className="rounded-[1.75rem] bg-slate-950 p-5 text-white shadow-sm shadow-slate-900/10">
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-300">Current state</p>
                  <p className="mt-3 text-4xl font-bold">{editingId ? "Editing" : "Ready"}</p>
                </div>
              </div>
            </section>

            <section className="overflow-hidden rounded-[1.75rem] bg-slate-950 p-6 shadow-xl shadow-slate-900/20">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold text-white">Fast actions</h2>
                  <p className="mt-2 text-sm text-slate-300">Jump to workflows, open puja listings, or start editing right away.</p>
                </div>
                <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white/90">Quick launch</span>
              </div>
              <div className="mt-5 grid gap-3">
                <Link to="/pujas" className="rounded-3xl bg-gradient-to-r from-orange-500 to-rose-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-300/20 transition hover:from-orange-600 hover:to-rose-600">
                  Browse pujas
                </Link>
                <Link to="/purohits" className="rounded-3xl bg-slate-800 px-4 py-3 text-sm font-semibold text-white shadow-sm shadow-slate-900/20 transition hover:bg-slate-700">
                  Browse purohits
                </Link>
                <button type="button" onClick={logoutHandler} className="rounded-3xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/15">
                  Logout now
                </button>
              </div>
            </section>
          </div>

          <section className="overflow-hidden rounded-[1.75rem] bg-white p-6 shadow-xl shadow-slate-200/20 ring-1 ring-slate-200/70">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-orange-500">Puja form</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">{editingId ? "Edit Puja" : "Add Puja"}</h2>
              </div>
              <span className="inline-flex items-center rounded-full bg-orange-50 px-3 py-1.5 text-sm font-semibold text-orange-700">
                {editingId ? "Editing an entry" : "Create a new puja"}
              </span>
            </div>
            <form onSubmit={handleSubmit} className="grid gap-3">
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
              />
              <input
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Category"
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Description"
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
              />
              <input
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="Duration"
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
              />
              <button
                type="submit"
                className="w-full rounded-3xl bg-gradient-to-r from-orange-500 to-rose-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-300/20 transition hover:from-orange-600 hover:to-rose-600"
              >
                {editingId ? "Update Puja" : "Add Puja"}
              </button>
            </form>
          </section>
        </div>

        <section className="overflow-hidden rounded-[1.75rem] bg-white p-6 shadow-xl shadow-slate-200/20 ring-1 ring-slate-200/70">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-orange-500">Recent pujas</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">Latest catalog</h2>
            </div>
            <span className="rounded-full bg-orange-50 px-3 py-1.5 text-sm font-semibold text-orange-700">{pujas.length} puja{pujas.length === 1 ? "" : "s"}</span>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {pujas.length === 0 ? (
              <div className="rounded-[1.75rem] border border-dashed border-slate-200 bg-slate-50 p-6 text-slate-500">
                No pujas yet. Use the form to add your first entry.
              </div>
            ) : (
              pujas.map((puja) => (
                <article
                  key={puja.id || puja._id}
                  className="overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-white via-slate-50 to-slate-100 p-5 shadow-sm shadow-slate-200/30 transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.35em] text-orange-500">{puja.category}</p>
                      <h3 className="mt-2 text-xl font-semibold text-slate-900">{puja.title}</h3>
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">{puja.duration || "Duration"}</span>
                  </div>
                  <p className="text-slate-600">{puja.description}</p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(puja)}
                      className="rounded-3xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(puja.id)}
                      className="rounded-3xl bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;

