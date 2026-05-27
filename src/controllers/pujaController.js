const pool = require("../config/db")

// Ensure pujas has purohit_id column when needed
const ensurePujasPurohitColumn = async () => {
  try {
    await pool.query(`ALTER TABLE pujas ADD COLUMN IF NOT EXISTS purohit_id INTEGER`)
  } catch (e) {
    // ignore
  }
}

// CREATE PUJA
const createPuja = async (req, res) => {
  try {

    const {
      title,
      description,
      category,
      duration,
      purohit_id,
      benefits,
      bestTime,
      mantras,
      procedures,
      ingredients,
      rules,
      checklist
    } = req.body
    // try extended insert including purohit_id
    try {
      const cols = [title, description, category, duration, benefits, bestTime, mantras, procedures, ingredients, rules, checklist]
      let placeholders = '$1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11'
      let sql = `INSERT INTO pujas
        (title, description, category, duration, benefits, best_time, mantras, procedures, ingredients, rules, checklist)
        VALUES (${placeholders}) RETURNING *`

      // if purohit_id provided, attempt to add it
      if (purohit_id !== undefined && purohit_id !== null && purohit_id !== '') {
        // ensure column exists then include in insert
        await ensurePujasPurohitColumn()
        cols.push(purohit_id)
        placeholders += ',$12'
        sql = `INSERT INTO pujas
          (title, description, category, duration, benefits, best_time, mantras, procedures, ingredients, rules, checklist, purohit_id)
          VALUES (${placeholders}) RETURNING *`
      }

      const newPuja = await pool.query(sql, cols)
      return res.json(newPuja.rows[0])
    } catch (err) {
      // if insert failed due to missing table/columns, attempt fallback simple insert
      console.log('CreatePuja insert error:', err.message)
      try {
        const fallback = await pool.query(
          `
          INSERT INTO pujas
          (title, description, category, duration)
          VALUES ($1, $2, $3, $4)
          RETURNING *
          `,
          [title, description, category, duration]
        )
        return res.json(fallback.rows[0])
      } catch (fallbackErr) {
        console.log('Fallback INSERT also failed:', fallbackErr.message)
        throw fallbackErr
      }
    }

  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: "Create Puja Failed"
    })
  }
}

// GET ALL PUJAS
const getPujas = async (req, res) => {
  try {

    // join with purohits to provide associated purohit name when available
    const pujas = await pool.query(
      `SELECT p.*, ph.name as purohit_name FROM pujas p LEFT JOIN purohits ph ON p.purohit_id = ph.id ORDER BY p.id DESC`
    )

    res.json(pujas.rows)

  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: "Fetch Failed"
    })
  }
}

// UPDATE PUJA
const updatePuja = async (req, res) => {
  try {

    const { id } = req.params

    const {
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
    } = req.body

    // allow updating purohit association if provided
    const purohit_id = req.body.purohit_id

    try {
      // if purohit_id provided, ensure column and include in update
      if (purohit_id !== undefined) {
        await ensurePujasPurohitColumn()
        const updatedPuja = await pool.query(
          `
          UPDATE pujas
          SET
            title=$1,
            description=$2,
            category=$3,
            duration=$4,
            benefits=$5,
            best_time=$6,
            mantras=$7,
            procedures=$8,
            ingredients=$9,
            rules=$10,
            checklist=$11,
            purohit_id=$12
          WHERE id=$13
          RETURNING *
          `,
          [
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
            checklist,
            purohit_id,
            id
          ]
        )

        return res.json(updatedPuja.rows[0])
      }

      const updatedPuja = await pool.query(
        `
        UPDATE pujas
        SET
          title=$1,
          description=$2,
          category=$3,
          duration=$4,
          benefits=$5,
          best_time=$6,
          mantras=$7,
          procedures=$8,
          ingredients=$9,
          rules=$10,
          checklist=$11
        WHERE id=$12
        RETURNING *
        `,
        [
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
          checklist,
          id
        ]
      )

      return res.json(updatedPuja.rows[0])
    } catch (err) {
      console.log("Extended UPDATE failed, attempting fallback:", err.message)
      // fallback to update only existing columns
      try {
        const fallback = await pool.query(
          `
          UPDATE pujas
          SET
            title=$1,
            description=$2,
            category=$3,
            duration=$4
          WHERE id=$5
          RETURNING *
          `,
          [title, description, category, duration, id]
        )

        return res.json(fallback.rows[0])
      } catch (fallbackErr) {
        console.log("Fallback UPDATE also failed:", fallbackErr.message)
        throw fallbackErr
      }
    }

  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: "Update Failed"
    })
  }
}

// DELETE PUJA
const deletePuja = async (req, res) => {
  try {

    const { id } = req.params

    await pool.query(
      "DELETE FROM pujas WHERE id=$1",
      [id]
    )

    res.json({
      message: "Puja Deleted Successfully"
    })

  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: "Delete Failed"
    })
  }
}

module.exports = {
  createPuja,
  getPujas,
  updatePuja,
  deletePuja
}
