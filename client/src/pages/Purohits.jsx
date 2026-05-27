import { useEffect, useState } from "react"
import api from "../services/api"

const Purohits = () => {
  const [purohits, setPurohits] = useState([])

  const [name, setName] = useState("")
  const [contact, setContact] = useState("")
  const [experience, setExperience] = useState("")
  const [specialization, setSpecialization] = useState("")
  const [availability, setAvailability] = useState("")

  const [editingId, setEditingId] = useState(null)

  // booking
  const [bookingPurohit, setBookingPurohit] = useState(null)
  const [bookName, setBookName] = useState("")
  const [bookContact, setBookContact] = useState("")
  const [bookScheduledAt, setBookScheduledAt] = useState("")
  const [bookNotes, setBookNotes] = useState("")

  const fetchPurohits = async () => {
    try {
      const res = await api.get("/purohits")
      setPurohits(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchPurohits()
  }, [])

  const clearForm = () => {
    setName("")
    setContact("")
    setExperience("")
    setSpecialization("")
    setAvailability("")
    setEditingId(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = { name, contact, experience, specialization, availability }

    try {
      if (editingId) {
        await api.put(`/purohits/${editingId}`, data)
      } else {
        await api.post(`/purohits`, data)
      }

      fetchPurohits()
      clearForm()
    } catch (err) {
      console.log(err)
    }
  }

  const handleEdit = (p) => {
    setName(p.name)
    setContact(p.contact)
    setExperience(p.experience)
    setSpecialization(p.specialization)
    setAvailability(p.availability)
    setEditingId(p.id)
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/purohits/${id}`)
      fetchPurohits()
    } catch (err) {
      console.log(err)
    }
  }

  const openBooking = (p) => {
    setBookingPurohit(p)
    setBookName("")
    setBookContact("")
    setBookScheduledAt("")
    setBookNotes("")
  }

  const submitBooking = async (e) => {
    e.preventDefault()
    if (!bookingPurohit) return

    try {
      await api.post(`/bookings`, {
        purohit_id: bookingPurohit.id,
        user_name: bookName,
        user_contact: bookContact,
        scheduled_at: bookScheduledAt,
        notes: bookNotes
      })

      setBookingPurohit(null)
      alert("Booking created")
    } catch (err) {
      console.log(err)
      alert("Booking failed")
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Purohits</h1>

      <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
        <form onSubmit={handleSubmit} style={{ width: 360, display: "flex", flexDirection: "column", gap: 12 }}>
          <h2>{editingId ? "Edit Purohit" : "Add Purohit"}</h2>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
          <input value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Contact details" />
          <input value={experience} onChange={(e) => setExperience(e.target.value)} placeholder="Experience (years / summary)" />
          <input value={specialization} onChange={(e) => setSpecialization(e.target.value)} placeholder="Specialization" />
          <textarea value={availability} onChange={(e) => setAvailability(e.target.value)} placeholder="Availability (days/times)" rows={3} />

          <div style={{ display: "flex", gap: 8 }}>
            <button type="submit">{editingId ? "Update" : "Add"}</button>
            <button type="button" onClick={clearForm}>Clear</button>
          </div>
        </form>

        <div style={{ flex: 1 }}>
          <h2>Available Purohits</h2>
          <div style={{ display: "grid", gap: 12 }}>
            {purohits.map((p) => (
              <div key={p.id} style={{ border: "1px solid #ddd", padding: 12, borderRadius: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <strong>{p.name}</strong>
                    <div style={{ color: "#666" }}>{p.specialization} • {p.experience}</div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => handleEdit(p)}>Edit</button>
                    <button onClick={() => handleDelete(p.id)}>Delete</button>
                    <button onClick={() => openBooking(p)}>Book</button>
                  </div>
                </div>

                <div style={{ marginTop: 8 }}>
                  <div><strong>Contact:</strong> {p.contact}</div>
                  <div><strong>Availability:</strong> {p.availability}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {bookingPurohit && (
        <div style={{ position: "fixed", right: 20, bottom: 20, background: "white", border: "1px solid #ddd", padding: 18, borderRadius: 10, width: 360 }}>
          <h3>Book {bookingPurohit.name}</h3>
          <form onSubmit={submitBooking} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <input value={bookName} onChange={(e) => setBookName(e.target.value)} placeholder="Your name" />
            <input value={bookContact} onChange={(e) => setBookContact(e.target.value)} placeholder="Your contact" />
            <input value={bookScheduledAt} onChange={(e) => setBookScheduledAt(e.target.value)} placeholder="Scheduled at (ISO or text)" />
            <textarea value={bookNotes} onChange={(e) => setBookNotes(e.target.value)} placeholder="Notes" rows={3} />

            <div style={{ display: "flex", gap: 8 }}>
              <button type="submit">Confirm Booking</button>
              <button type="button" onClick={() => setBookingPurohit(null)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default Purohits
