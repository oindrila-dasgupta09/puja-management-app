const pool = require("../config/db")

// CREATE BOOKING
const createBooking = async (req, res) => {
  try {
    const { purohit_id, user_name, user_contact, scheduled_at, notes } = req.body

    const newBooking = await pool.query(
      `
      INSERT INTO bookings
      (purohit_id, user_name, user_contact, scheduled_at, notes)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
      `,
      [purohit_id, user_name, user_contact, scheduled_at, notes]
    )

    res.json(newBooking.rows[0])
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Create Booking Failed" })
  }
}

// GET BOOKINGS (optionally by purohit)
const getBookings = async (req, res) => {
  try {
    const { purohitId } = req.query

    let result
    if (purohitId) {
      result = await pool.query(
        "SELECT * FROM bookings WHERE purohit_id=$1 ORDER BY scheduled_at DESC",
        [purohitId]
      )
    } else {
      result = await pool.query("SELECT * FROM bookings ORDER BY scheduled_at DESC")
    }

    res.json(result.rows)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Fetch Bookings Failed" })
  }
}

module.exports = {
  createBooking,
  getBookings
}
