import { useEffect, useState } from "react";
import api from "../services/api";

function Pujas() {
  const [pujas, setPujas] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    benefits: "",
    bestTime: "",
    mantras: "",
    procedures: "",
    ingredients: "",
    rules: "",
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
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (editingId) {
        await api.put(`/pujas/${editingId}`, formData);
      } else {
        await api.post("/pujas", formData);
      }

      setFormData({
        title: "",
        category: "",
        description: "",
        benefits: "",
        bestTime: "",
        mantras: "",
        procedures: "",
        ingredients: "",
        rules: "",
        duration: "",
      });
      setEditingId(null);
      fetchPujas();
    } catch (err) {
      console.error(err);
      alert("Unable to save puja.");
    }
  };

  const handleEdit = (puja) => {
    setEditingId(puja.id);
    setFormData({
      title: puja.title || "",
      category: puja.category || "",
      description: puja.description || "",
      benefits: puja.benefits || "",
      bestTime: puja.best_time || puja.bestTime || "",
      mantras: puja.mantras || "",
      procedures: puja.procedures || "",
      ingredients: puja.ingredients || "",
      rules: puja.rules || "",
      duration: puja.duration || "",
    });
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/pujas/${id}`);
      fetchPujas();
    } catch (err) {
      console.error(err);
      alert("Delete failed.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/80 px-4 py-8 sm:px-5 lg:px-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="overflow-hidden rounded-[2.25rem] bg-gradient-to-r from-orange-500 via-fuchsia-500 to-violet-600 p-6 text-white shadow-2xl shadow-fuchsia-300/25">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.35em] text-orange-100/80">Puja details</p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Pujas</h1>
              <p className="mt-4 text-base text-orange-100/90">A bright, modern place to add, edit, and manage your puja catalog with style.</p>
            </div>
        
          </div>
        </header>

        <div className="grid gap-5 xl:grid-cols-[500px_minmax(0,1fr)]">
          <section className="overflow-hidden rounded-[1.75rem] bg-white p-6 shadow-xl shadow-slate-200/20 ring-1 ring-slate-200/80">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">{editingId ? "Edit Puja" : "Add Puja Details"}</h2>
                <p className="mt-2 text-sm text-slate-500">Use this form to create or update puja details instantly.</p>
              </div>
              <span className="rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700">{editingId ? "Editing existing" : "New entry"}</span>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Title"
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
                />
                <input
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Category"
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
                />
              </div>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                placeholder="Description"
                className="w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-4 text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <textarea
                  name="benefits"
                  value={formData.benefits}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Benefits"
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
                />
                <input
                  name="bestTime"
                  value={formData.bestTime}
                  onChange={handleChange}
                  placeholder="Best Time"
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <textarea
                  name="mantras"
                  value={formData.mantras}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Mantras"
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
                />
                <textarea
                  name="procedures"
                  value={formData.procedures}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Procedures"
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <textarea
                  name="ingredients"
                  value={formData.ingredients}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Ingredients"
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
                />
                <textarea
                  name="rules"
                  value={formData.rules}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Rules"
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="Duration"
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
                />
                <button
                  type="submit"
                  className="w-full rounded-3xl bg-gradient-to-r from-orange-500 to-rose-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-300/20 transition hover:from-orange-600 hover:to-rose-600"
                >
                  {editingId ? "Update Puja" : "Add Puja"}
                </button>
              </div>
            </form>
          </section>

          <section className="overflow-hidden rounded-[1.75rem] bg-white p-6 shadow-xl shadow-slate-200/20 ring-1 ring-slate-200/80">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Recent pujas</h2>
                <p className="mt-1 text-sm text-slate-500">Review your current catalog and manage entries.</p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600">{pujas.length} total</span>
            </div>

            {pujas.length === 0 ? (
              <div className="rounded-[2rem] bg-slate-50 p-5 text-slate-500 shadow-sm shadow-slate-200/20">
                No pujas found yet. Add a puja to get started.
              </div>
            ) : (
              pujas.map((puja) => (
                <article key={puja.id} className="rounded-[2rem] bg-white p-5 shadow-lg shadow-slate-200/30">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">{puja.title}</h3>
                      <p className="mt-2 text-slate-500">{puja.category}</p>
                    </div>
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                      {puja.duration || "Duration unknown"}
                    </span>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div>
                      <p className="font-semibold text-slate-700">Description</p>
                      <p className="mt-1 text-slate-600">{puja.description || "-"}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-700">Best Time</p>
                      <p className="mt-1 text-slate-600">{puja.best_time || puja.bestTime || "-"}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-700">Benefits</p>
                      <p className="mt-1 text-slate-600">{puja.benefits || "-"}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-700">Mantras</p>
                      <p className="mt-1 text-slate-600">{puja.mantras || "-"}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-700">Procedures</p>
                      <p className="mt-1 text-slate-600">{puja.procedures || "-"}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-700">Ingredients</p>
                      <p className="mt-1 text-slate-600">{puja.ingredients || "-"}</p>
                    </div>
                    <div className="sm:col-span-2">
                      <p className="font-semibold text-slate-700">Rules</p>
                      <p className="mt-1 text-slate-600">{puja.rules || "-"}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                    <button
                      type="button"
                      onClick={() => handleEdit(puja)}
                      className="w-full rounded-3xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(puja.id)}
                      className="w-full rounded-3xl bg-red-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default Pujas;
