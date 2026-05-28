const { Pool } = require("pg");

const isProduction = process.env.NODE_ENV === "production";
const useDatabaseUrl = Boolean(process.env.DATABASE_URL);
const hasDbCredentials =
  Boolean(process.env.DB_USER) &&
  Boolean(process.env.DB_HOST) &&
  Boolean(process.env.DB_NAME) &&
  Boolean(process.env.DB_PASSWORD);

if (!useDatabaseUrl && !hasDbCredentials) {
  const missing = [
    "DATABASE_URL",
    "DB_USER",
    "DB_HOST",
    "DB_NAME",
    "DB_PASSWORD",
  ].filter((name) => !process.env[name]);

  console.error(
    "Database configuration is missing. Set DATABASE_URL or DB_USER/DB_HOST/DB_NAME/DB_PASSWORD."
  );
  console.error("Missing env vars:", missing.join(", "));

  if (isProduction) {
    throw new Error(
      "Missing database environment variables in production. Please configure DATABASE_URL or DB_* vars."
    );
  }
}

if (isProduction && process.env.DB_HOST === "localhost") {
  console.error(
    "Warning: DB_HOST is set to localhost in production. Vercel cannot connect to a local database. Use a hosted PostgreSQL instance."
  );
}

const databaseConfig = useDatabaseUrl
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: isProduction ? { rejectUnauthorized: false } : false,
    }
  : {
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    };

const pool = new Pool(databaseConfig);

module.exports = pool;
