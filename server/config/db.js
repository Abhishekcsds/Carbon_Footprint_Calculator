import dotenv from "dotenv";
import pg from "pg";
const { Pool } = pg;

dotenv.config();

// Database connection configuration
const pool = new Pool({
  connectionString: process.env.PG_CONNECTION_STRING,
  // --- START OF FIX ---
  // Render's PostgreSQL database requires SSL for all external connections.
  // This setting enables SSL and allows for self-signed certificates.
  ssl: {
    rejectUnauthorized: false,
  },
  // --- END OF FIX ---
});

// Connection test
pool.query("SELECT NOW()")
  .then(() => console.log("✅ PostgreSQL database connection successful."))
  .catch((err) => console.error("❌ Database connection error:", err.message));

// Export query function and the pool instance
export const query = (text, params) => pool.query(text, params);
export { pool };
