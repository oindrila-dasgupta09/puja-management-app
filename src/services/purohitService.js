const pool = require("../config/db")

const createPurohit = async (data) => {
  const { name, contact, experience, specialization, availability } = data

  const query = `
    INSERT INTO purohits
    (name, contact, experience, specialization, availability)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `

  const values = [name, contact, experience, specialization, availability]

  const result = await pool.query(query, values)

  return result.rows[0]
}

const getAllPurohits = async () => {
  const result = await pool.query("SELECT * FROM purohits ORDER BY id DESC")
  return result.rows
}

module.exports = {
  createPurohit,
  getAllPurohits
}
