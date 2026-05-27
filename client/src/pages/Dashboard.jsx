import { useEffect, useState } from "react"
import api from "../services/api"

const Dashboard = () => {

  const [pujas, setPujas] = useState([])
  const [purohits, setPurohits] = useState([])
  // Quick add purohit fields
  const [phName, setPhName] = useState("")
  const [phContact, setPhContact] = useState("")
  const [phExperience, setPhExperience] = useState("")
  const [phSpecialization, setPhSpecialization] = useState("")
  const [phAvailability, setPhAvailability] = useState("")

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [duration, setDuration] = useState("")
  const [benefits, setBenefits] = useState("")
  const [bestTime, setBestTime] = useState("")
  const [mantras, setMantras] = useState("")
  const [procedures, setProcedures] = useState("")
  const [ingredients, setIngredients] = useState("")
  const [rules, setRules] = useState("")
  const [checklist, setChecklist] = useState("")

  const [editingId, setEditingId] = useState(null)
  const [pujaPurohitId, setPujaPurohitId] = useState("")
  const [purohitFilterId, setPurohitFilterId] = useState("")

  // FETCH PUJAS
  const fetchPujas = async () => {

    try {

      const response = await api.get("/pujas")

      setPujas(response.data)

    } catch (error) {

      console.log(error)
    }
  }

  // FETCH PUROHITS
  const fetchPurohits = async () => {
    try {
      const res = await api.get("/purohits")
      setPurohits(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleAddPurohit = async (e) => {
    e.preventDefault()

    try {
      await api.post("/purohits", {
        name: phName,
        contact: phContact,
        experience: phExperience,
        specialization: phSpecialization,
        availability: phAvailability
      })

      setPhName("")
      setPhContact("")
      setPhExperience("")
      setPhSpecialization("")
      setPhAvailability("")

      fetchPurohits()
    } catch (err) {
      console.log(err)
      alert("Failed to add purohit")
    }
  }

  // LOAD DATA
  useEffect(() => {

    fetchPujas()
    fetchPurohits()

  }, [])

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      const pujaData = {
        title,
        description,
        category,
        duration,
          benefits,
        bestTime,
        mantras,
        procedures,
        ingredients,
        rules,
        checklist
          ,purohit_id: pujaPurohitId || null
      }

      // UPDATE
      if (editingId) {

        await api.put(
          `/pujas/${editingId}`,
          pujaData
        )

      }

      // CREATE
      else {

        await api.post(
          "/pujas",
          pujaData
        )
      }

      // REFRESH DATA
      fetchPujas()

      // CLEAR FORM
      setTitle("")
      setDescription("")
      setCategory("")
      setDuration("")
      setBenefits("")
      setBestTime("")
      setMantras("")
      setProcedures("")
      setIngredients("")
      setRules("")
      setChecklist("")
      setPujaPurohitId("")

      // RESET EDIT MODE
      setEditingId(null)

    } catch (error) {

      console.log(error)
    }
  }

  // HANDLE EDIT
  const handleEdit = (puja) => {

    setTitle(puja.title)
    setDescription(puja.description)
    setCategory(puja.category)
    setDuration(puja.duration)
    setBenefits(puja.benefits || "")
    setBestTime(puja.best_time || puja.bestTime || "")
    setMantras(puja.mantras || "")
    setProcedures(puja.procedures || "")
    setIngredients(puja.ingredients || "")
    setRules(puja.rules || "")
    setChecklist(puja.checklist || "")
    setPujaPurohitId(puja.purohit_id || "")

    setEditingId(puja.id)
  }

  // HANDLE DELETE
  const handleDelete = async (id) => {

    try {

      await api.delete(`/pujas/${id}`)

      fetchPujas()

    } catch (error) {

      console.log(error)
    }
  }

  const renderDetailList = (value) => {
    if (!value) return null

    const items = value
      .split(/\r?\n|,/) 
      .map((item) => item.trim())
      .filter(Boolean)

    if (!items.length) return null

    return (
      <ul style={{ margin: "8px 0 0", paddingLeft: "18px" }}>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    )
  }

  // normalize the selected filter value and compute filtered list
  const selectedPurohitFilter = String(purohitFilterId)
  const filteredPujas = pujas.filter((puja) => {
    if (selectedPurohitFilter === "" || selectedPurohitFilter === "all") return true
    if (selectedPurohitFilter === "__unassigned") return !puja.purohit_id
    return String(puja.purohit_id) === selectedPurohitFilter
  })

  // compute counts of pujas per purohit (and unassigned)
  const purohitCounts = pujas.reduce((acc, p) => {
    const key = p.purohit_id ? String(p.purohit_id) : "__unassigned"
    acc[key] = (acc[key] || 0) + 1
    return acc
  }, {})

  return (

    <div className="dashboard-page">

      <header className="dashboard-header">
        <div>
          <p className="dashboard-eyebrow">Puja Management</p>
          <h1>Puja Dashboard</h1>
          <p className="dashboard-intro">
            Add and manage puja entries with rich details, rituals, ingredients, and checklists.
          </p>
        </div>
        <div className="dashboard-meta">
          <span className="dashboard-badge">{pujas.length} puja{pujas.length === 1 ? "" : "s"}</span>
        </div>
      </header>

      <main className="dashboard-main">
        <section className="dashboard-panel form-panel">
          <div className="panel-header">
            <div>
              <p className="panel-label">New Puja</p>
              <h2>{editingId ? "Edit Puja" : "Create Puja"}</h2>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="puja-form">
            <div className="form-row">
              <label>
                Title
                <input
                  type="text"
                  placeholder="Enter puja title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>

              <label>
                Category
                <input
                  type="text"
                  placeholder="Enter category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </label>
            </div>

            <label>
              Description
              <textarea
                rows="3"
                placeholder="Short description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>

            <div className="form-row">
              <label>
                Duration
                <input
                  type="text"
                  placeholder="e.g. 45 minutes"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </label>

              <label>
                Best Time
                <input
                  type="text"
                  placeholder="e.g. Morning"
                  value={bestTime}
                  onChange={(e) => setBestTime(e.target.value)}
                />
              </label>
            </div>

            <label>
              Assign Purohit
              <select value={pujaPurohitId} onChange={(e) => setPujaPurohitId(e.target.value)}>
                <option value="">-- None --</option>
                {purohits.map((ph) => (
                  <option key={ph.id} value={ph.id}>{ph.name} {ph.specialization ? `(${ph.specialization})` : ''}</option>
                ))}
              </select>
            </label>

            <label>
              Benefits
              <textarea
                rows="3"
                placeholder="Comma or newline separated"
                value={benefits}
                onChange={(e) => setBenefits(e.target.value)}
              />
            </label>

            <label>
              Mantras
              <textarea
                rows="3"
                placeholder="Comma or newline separated"
                value={mantras}
                onChange={(e) => setMantras(e.target.value)}
              />
            </label>

            <label>
              Procedures
              <textarea
                rows="3"
                placeholder="Comma or newline separated"
                value={procedures}
                onChange={(e) => setProcedures(e.target.value)}
              />
            </label>

            <label>
              Ingredients
              <textarea
                rows="3"
                placeholder="Comma or newline separated"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
              />
            </label>

            <label>
              Rules
              <textarea
                rows="3"
                placeholder="Comma or newline separated"
                value={rules}
                onChange={(e) => setRules(e.target.value)}
              />
            </label>

            <label>
              Checklist
              <textarea
                rows="3"
                placeholder="Comma or newline separated"
                value={checklist}
                onChange={(e) => setChecklist(e.target.value)}
              />
            </label>

            <button type="submit" className="primary-button">
              {editingId ? "Update Puja" : "Add Puja"}
            </button>
          </form>

          <div className="quick-add-panel">
            <div className="quick-add-header">
              <p className="panel-label">Quick Add</p>
              <h3>Add Purohit</h3>
            </div>
            <form onSubmit={handleAddPurohit} className="quick-add-form">
              <input placeholder="Name" value={phName} onChange={(e) => setPhName(e.target.value)} />
              <input placeholder="Contact" value={phContact} onChange={(e) => setPhContact(e.target.value)} />
              <input placeholder="Experience" value={phExperience} onChange={(e) => setPhExperience(e.target.value)} />
              <input placeholder="Specialization" value={phSpecialization} onChange={(e) => setPhSpecialization(e.target.value)} />
              <input placeholder="Availability" value={phAvailability} onChange={(e) => setPhAvailability(e.target.value)} />
              <div className="quick-add-actions">
                <button type="submit">Add Purohit</button>
              </div>
            </form>
          </div>
        </section>

        <section className="dashboard-panel cards-panel">
          <div className="panel-header">
            <div>
              <p className="panel-label">Saved Pujas</p>
              <h2>All Pujas</h2>
            </div>
          </div>

          <div className="filter-toolbar">
            <div className="filter-group">
              <span className="filter-label">Filter by Purohit</span>
              <select
                value={purohitFilterId}
                onChange={(e) => setPurohitFilterId(e.target.value)}
                className="filter-select"
              >
                <option value="">All Purohits ({pujas.length})</option>
                <option value="__unassigned">Unassigned ({purohitCounts["__unassigned"] || 0})</option>
                {purohits.map((ph) => (
                  <option key={ph.id} value={String(ph.id)}>{ph.name} ({purohitCounts[String(ph.id)] || 0})</option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => setPurohitFilterId("")}
                className="filter-clear-button"
              >
                Clear
              </button>
            </div>
            <div className="filter-count">Showing {filteredPujas.length} of {pujas.length} puja{pujas.length === 1 ? "" : "s"}</div>
          </div>

          <div className="card-grid">
            {filteredPujas.map((puja) => (
              <article key={puja.id} className="puja-card">
                <div className="card-top">
                  <div>
                    <h3>{puja.title}</h3>
                    <p className="subtle-text">{puja.category} • {puja.duration}</p>
                    { (puja.purohit_name || puja.purohit_id) && (
                      <p className="subtle-text" style={{ marginTop: 6 }}>
                        Assigned Purohit: {puja.purohit_name || `#${puja.purohit_id}`}
                      </p>
                    ) }
                  </div>
                </div>

                <p className="card-description">{puja.description}</p>

                <div className="card-details">
                  {puja.benefits && (
                    <div>
                      <p className="detail-title">Benefits</p>
                      {renderDetailList(puja.benefits)}
                    </div>
                  )}

                  {(puja.best_time || puja.bestTime) && (
                    <div>
                      <p className="detail-title">Best Time</p>
                      <p>{puja.best_time || puja.bestTime}</p>
                    </div>
                  )}

                  {puja.mantras && (
                    <div>
                      <p className="detail-title">Mantras</p>
                      {renderDetailList(puja.mantras)}
                    </div>
                  )}

                  {puja.procedures && (
                    <div>
                      <p className="detail-title">Procedures</p>
                      {renderDetailList(puja.procedures)}
                    </div>
                  )}

                  {puja.ingredients && (
                    <div>
                      <p className="detail-title">Ingredients</p>
                      {renderDetailList(puja.ingredients)}
                    </div>
                  )}

                  {puja.rules && (
                    <div>
                      <p className="detail-title">Rules</p>
                      {renderDetailList(puja.rules)}
                    </div>
                  )}

                  {puja.checklist && (
                    <div>
                      <p className="detail-title">Checklist</p>
                      {renderDetailList(puja.checklist)}
                    </div>
                  )}

                  {(puja.purohit_name || puja.purohit_id) && (
                    <div>
                      <p className="detail-title">Purohit</p>
                      <p>{puja.purohit_name || puja.purohit_id}</p>
                    </div>
                  )}
                </div>

                <div className="card-actions">
                  <button type="button" className="secondary-button" onClick={() => handleEdit(puja)}>
                    Edit
                  </button>
                  <button type="button" className="danger-button" onClick={() => handleDelete(puja.id)}>
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div style={{ marginTop: 28 }}>
            <p className="panel-label">Available Purohits</p>
            <div style={{ display: "grid", gap: 12, marginTop: 8 }}>
              {purohits.length === 0 && <div style={{ color: "#666" }}>No purohits yet.</div>}
              {purohits.map((p) => (
                <div key={p.id} style={{ border: "1px solid rgba(0,0,0,0.06)", padding: 12, borderRadius: 8, background: "#fff" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <strong>{p.name}</strong>
                      <div style={{ color: "#666", fontSize: 13 }}>{p.specialization} • {p.experience}</div>
                    </div>
                    <div style={{ textAlign: "right", color: "#444" }}>
                      <div style={{ fontSize: 13 }}>{p.contact}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Dashboard
