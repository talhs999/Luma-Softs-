require('dotenv').config({ path: '.env.local' });
const mysql = require('mysql2/promise');

async function run() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  
  await connection.query("INSERT INTO app_settings (setting_key, setting_value) VALUES ('auto_blog_enabled', 'true') ON DUPLICATE KEY UPDATE setting_value = 'true'");
  console.log("Setting updated.");
  process.exit(0);
}
run();
