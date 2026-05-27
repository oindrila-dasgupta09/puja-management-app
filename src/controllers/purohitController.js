const pool = require("../config/db")

// Ensure table exists (best-effort). Creates minimal schema used by the app.
const ensurePurohitsTable = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS purohits (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      contact TEXT,
      experience TEXT,
      specialization TEXT,
      availability TEXT,
      created_at TIMESTAMP DEFAULT now()
    )
  `

  await pool.query(sql)
}

// CREATE PUROHIT
const createPurohit = async (req, res) => {
  try {
    const { name, contact, experience, specialization, availability } = req.body

    try {
      const newPurohit = await pool.query(
        `
        INSERT INTO purohits
        (name, contact, experience, specialization, availability)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
        `,
        [name, contact, experience, specialization, availability]
      )

      return res.json(newPurohit.rows[0])
    } catch (err) {
      // If table missing, create it and retry once
      if (err && (err.code === '42P01' || /does not exist/i.test(err.message))) {
        try {
          await ensurePurohitsTable()
          const retried = await pool.query(
            `
            INSERT INTO purohits
            (name, contact, experience, specialization, availability)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
            `,
            [name, contact, experience, specialization, availability]
          )
          return res.json(retried.rows[0])
        } catch (retryErr) {
          console.log('Retry insert after creating table failed:', retryErr.message)
          return res.status(500).json({ message: 'Create Purohit Failed' })
        }
      }

      console.log(err)
      return res.status(500).json({ message: 'Create Purohit Failed' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Create Purohit Failed" })
  }
}

// GET ALL PUROHITS
const getPurohits = async (req, res) => {
  try {
    try {
      const purohits = await pool.query(
        "SELECT * FROM purohits ORDER BY id DESC"
      )

      return res.json(purohits.rows)
    } catch (err) {
      if (err && (err.code === '42P01' || /does not exist/i.test(err.message))) {
        await ensurePurohitsTable()
        return res.json([])
      }

      throw err
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Fetch Failed" })
  }
}

// UPDATE PUROHIT
const updatePurohit = async (req, res) => {
  try {
    const { id } = req.params
    const { name, contact, experience, specialization, availability } = req.body

    try {
      const updated = await pool.query(
        `
        UPDATE purohits
        SET
          name=$1,
          contact=$2,
          experience=$3,
          specialization=$4,
          availability=$5
        WHERE id=$6
        RETURNING *
        `,
        [name, contact, experience, specialization, availability, id]
      )

      return res.json(updated.rows[0])
    } catch (err) {
      if (err && (err.code === '42P01' || /does not exist/i.test(err.message))) {
        await ensurePurohitsTable()
        const updated = await pool.query(
          `
          UPDATE purohits
          SET
            name=$1,
            contact=$2,
            experience=$3,
            specialization=$4,
            availability=$5
          WHERE id=$6
          RETURNING *
          `,
          [name, contact, experience, specialization, availability, id]
        )
        return res.json(updated.rows[0])
      }

      throw err
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Update Failed" })
  }
}

// DELETE PUROHIT
const deletePurohit = async (req, res) => {
  try {
    const { id } = req.params
    try {
      await pool.query("DELETE FROM purohits WHERE id=$1", [id])
    } catch (err) {
      if (err && (err.code === '42P01' || /does not exist/i.test(err.message))) {
        await ensurePurohitsTable()
        // nothing to delete
        return res.json({ message: "Purohit Deleted Successfully" })
      }

      throw err
    }

    res.json({ message: "Purohit Deleted Successfully" })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Delete Failed" })
  }
}

module.exports = {
  createPurohit,
  getPurohits,
  updatePurohit,
  deletePurohit
}
