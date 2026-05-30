import { useEffect, useState } from "react";
import api from "../services/api";

const Purohits = () => {
  const [purohits, setPurohits] = useState([]);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [experience, setExperience] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [availability, setAvailability] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [bookingPurohit, setBookingPurohit] = useState(null);
  const [bookName, setBookName] = useState("");
  const [bookContact, setBookContact] = useState("");
  const [bookScheduledAt, setBookScheduledAt] = useState("");
  const [bookNotes, setBookNotes] = useState("");

  const fetchPurohits = async () => {
    try {
      const res = await api.get("/purohits");
      setPurohits(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPurohits();
  }, []);

  const clearForm = () => {
    setName("");
    setContact("");
    setExperience("");
    setSpecialization("");
    setAvailability("");
    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { name, contact, experience, specialization, availability };

    try {
      if (editingId) {
        await api.put(`/purohits/${editingId}`, data);
      } else {
        await api.post(`/purohits`, data);
      }
      fetchPurohits();
      clearForm();
    } catch (err) {
      console.error(err);
      alert("Unable to save purohit details.");
    }
  };

  const handleEdit = (p) => {
    setName(p.name || "");
    setContact(p.contact || "");
    setExperience(p.experience || "");
    setSpecialization(p.specialization || "");
    setAvailability(p.availability || "");
    setEditingId(p.id);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/purohits/${id}`);
      fetchPurohits();
    } catch (err) {
      console.error(err);
      alert("Deletion failed.");
    }
  };

  const openBooking = (p) => {
    setBookingPurohit(p);
    setBookName("");
    setBookContact("");
    setBookScheduledAt("");
    setBookNotes("");
  };

  const submitBooking = async (event) => {
    event.preventDefault();
    if (!bookingPurohit) return;

    try {
      await api.post(`/bookings`, {
        purohit_id: bookingPurohit.id,
        user_name: bookName,
        user_contact: bookContact,
        scheduled_at: bookScheduledAt,
        notes: bookNotes,
      });
      setBookingPurohit(null);
      alert("Booking created successfully.");
    } catch (err) {
      console.error(err);
      alert("Booking failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/80 px-4 py-6 sm:px-5 lg:px-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="rounded-[1.75rem] bg-white p-5 shadow-xl shadow-slate-200/20">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-orange-500">Purohit Management</p>
              <h1 className="mt-2 text-2xl font-semibold text-slate-900">Purohits</h1>
              <p className="mt-2 text-sm text-slate-500">Manage purohit profiles and create bookings with confidence.</p>
            </div>
            <div className="inline-flex rounded-full bg-orange-50 px-3 py-1.5 text-sm font-semibold text-orange-700">
              {purohits.length} Purohit{purohits.length === 1 ? "" : "s"}
            </div>
          </div>
        </header>

        <div className="grid gap-5 xl:grid-cols-[420px_minmax(0,1fr)]">
          <section className="rounded-[1.75rem] bg-white p-5 shadow-lg shadow-slate-200/20">
            <h2 className="text-xl font-semibold text-slate-900">{editingId ? "Update Purohit" : "Add Purohit"}</h2>
            <form onSubmit={handleSubmit} className="mt-5 space-y-3">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
              />
              <input
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="Contact details"
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
              />
              <input
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="Experience"
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
              />
              <input
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                placeholder="Specialization"
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
              />
              <textarea
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                placeholder="Availability"
                rows={4}
                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-900 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
              />
              <div className="flex flex-col gap-2 sm:flex-row">
                <button
                  type="submit"
                  className="w-full rounded-3xl bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-700"
                >
                  {editingId ? "Update Purohit" : "Add Purohit"}
                </button>
                <button
                  type="button"
                  onClick={clearForm}
                  className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Clear
                </button>
              </div>
            </form>
          </section>

          <section className="space-y-4">
            {purohits.map((p) => (
              <article key={p.id || p._id} className="rounded-[2rem] bg-white p-5 shadow-lg shadow-slate-200/30">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{p.name}</h3>
                    <p className="mt-2 text-sm text-slate-500">{p.specialization}</p>
                    <p className="mt-1 text-sm text-slate-500">{p.experience}</p>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    {p.availability || "Availability unknown"}
                  </span>
                </div>
                <div className="mt-4 grid gap-2 sm:grid-cols-3">
                  <div className="rounded-3xl bg-slate-50 p-3 text-sm text-slate-600">
                    <p className="font-semibold text-slate-900">Contact</p>
                    <p className="mt-1">{p.contact || "Not provided"}</p>
                  </div>
                  <div className="rounded-3xl bg-slate-50 p-3 text-sm text-slate-600">
                    <p className="font-semibold text-slate-900">Specialization</p>
                    <p className="mt-1">{p.specialization || "Not set"}</p>
                  </div>
                  <div className="rounded-3xl bg-slate-50 p-3 text-sm text-slate-600">
                    <p className="font-semibold text-slate-900">Experience</p>
                    <p className="mt-1">{p.experience || "Not set"}</p>
                  </div>
                </div>
                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => handleEdit(p)}
                    className="w-full rounded-3xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(p.id)}
                    className="w-full rounded-3xl bg-red-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    onClick={() => openBooking(p)}
                    className="w-full rounded-3xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm font-semibold text-orange-700 transition hover:bg-orange-100"
                  >
                    Book
                  </button>
                </div>
              </article>
            ))}
          </section>
        </div>

        {bookingPurohit && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
            <div className="w-full max-w-xl rounded-[1.75rem] bg-white p-5 shadow-2xl shadow-slate-900/10">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">Book {bookingPurohit.name}</h2>
                  <p className="mt-1 text-sm text-slate-500">Fill in the booking details below.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setBookingPurohit(null)}
                  className="rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-700 hover:bg-slate-200"
                >
                  Close
                </button>
              </div>
              <form onSubmit={submitBooking} className="mt-5 space-y-3">
                <input
                  value={bookName}
                  onChange={(e) => setBookName(e.target.value)}
                  placeholder="Your name"
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-900 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
                />
                <input
                  value={bookContact}
                  onChange={(e) => setBookContact(e.target.value)}
                  placeholder="Your contact"
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-900 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
                />
                <input
                  value={bookScheduledAt}
                  onChange={(e) => setBookScheduledAt(e.target.value)}
                  placeholder="Scheduled at"
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-900 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
                />
                <textarea
                  value={bookNotes}
                  onChange={(e) => setBookNotes(e.target.value)}
                  placeholder="Notes"
                  rows={4}
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-900 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
                />
                <div className="flex flex-col gap-2 sm:flex-row">
                  <button
                    type="submit"
                    className="w-full rounded-3xl bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-700"
                  >
                    Confirm Booking
                  </button>
                  <button
                    type="button"
                    onClick={() => setBookingPurohit(null)}
                    className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Purohits;
