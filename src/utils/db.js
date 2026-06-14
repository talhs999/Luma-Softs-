import mysql from 'mysql2/promise';

// Connection pool for efficient MySQL connections
const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'lumasoft_db',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'lumasoft_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

/**
 * Execute a MySQL query with optional parameters
 * @param {string} sql - SQL query string
 * @param {Array} params - Query parameters
 * @returns {Promise<Array>} - Query results
 */
export async function query(sql, params = []) {
  const [results] = await pool.execute(sql, params);
  return results;
}

export default pool;
