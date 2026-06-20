import mysql from 'mysql2/promise';

async function createSubscribersTable() {
  const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'lumasoft_db',
    password: 'pak12345lumasofts',
    database: 'lumasoft_db',
  });

  try {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS email_subscribers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        is_subscribed BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await pool.query(createTableQuery);
    console.log("Successfully created email_subscribers table!");
  } catch (err) {
    console.error("Error creating table:", err);
  } finally {
    pool.end();
  }
}

createSubscribersTable();
