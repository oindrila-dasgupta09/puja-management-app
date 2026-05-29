import { useEffect, useState } from "react";
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
      setPujas(res.data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPujas();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        duration: "",
      });

      setEditingId(null);

      fetchPujas();
    } catch (err) {
      console.log(err);
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
      console.log(err);
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Puja Dashboard
          </h1>

          <p className="text-gray-600">
            Manage your pujas easily
          </p>
        </div>

        <button
          onClick={logoutHandler}
          className="bg-black text-white px-5 py-2 rounded-xl"
        >
          Logout
        </button>

      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Form */}
        <div className="bg-white p-6 rounded-2xl shadow-md">

          <h2 className="text-2xl font-bold mb-5">
            {editingId ? "Edit Puja" : "Add Puja"}
          </h2>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4"
            />

            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4"
            />

            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4"
            />

            <input
              type="text"
              name="duration"
              placeholder="Duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4"
            />

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-xl font-semibold"
            >
              {editingId ? "Update Puja" : "Add Puja"}
            </button>

          </form>
        </div>

        {/* Puja List */}
        <div className="lg:col-span-2">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {pujas.map((puja) => (
              <div
                key={puja.id}
                className="bg-white p-5 rounded-2xl shadow-md"
              >

                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {puja.title}
                </h2>

                <p className="text-sm text-gray-500 mb-2">
                  {puja.category}
                </p>

                <p className="text-gray-700 mb-3">
                  {puja.description}
                </p>

                <p className="text-sm text-gray-500">
                  Duration: {puja.duration}
                </p>

                <div className="flex gap-3 mt-5">

                  <button
                    onClick={() => handleEdit(puja)}
                    className="flex-1 bg-blue-500 text-white py-2 rounded-xl"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(puja.id)}
                    className="flex-1 bg-red-500 text-white py-2 rounded-xl"
                  >
                    Delete
                  </button>

                </div>

              </div>
            ))}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;
