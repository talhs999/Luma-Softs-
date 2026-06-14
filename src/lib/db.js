import mysql from 'mysql2/promise';

let pool;

export async function getDbConnection() {
  if (!pool) {
    const host = process.env.DB_HOST || '127.0.0.1';
    const user = process.env.DB_USER;
    const password = process.env.DB_PASSWORD;
    const database = process.env.DB_NAME;

    if (!user || !database) {
      console.warn("Database credentials missing in environment variables!");
    }

    pool = mysql.createPool({
      host,
      user,
      password,
      database,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0
    });
  }
  return pool;
}

export async function query(sql, params) {
  try {
    const db = await getDbConnection();
    const [results] = await db.execute(sql, params);
    return results;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}
