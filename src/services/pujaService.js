const pool = require("../config/db");

const createPuja = async (data, userId) => {
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
    checklist,
  } = data;

  const query = `
    INSERT INTO pujas
    (title, description, category, duration, benefits, best_time, mantras, procedures, ingredients, rules, checklist, created_by)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
    RETURNING *
  `;

  const values = [
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
    userId,
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};

const getAllPujas = async () => {
  const result = await pool.query(
    "SELECT * FROM pujas ORDER BY id DESC"
  );

  return result.rows;
};

module.exports = {
  createPuja,
  getAllPujas,
};