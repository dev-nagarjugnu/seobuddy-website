// scripts/create-table.mjs
import { db } from '@vercel/postgres';

async function createTable() {
  try {
    // Check if the connection string is available
    if (!process.env.POSTGRES_URL) {
      throw new Error("POSTGRES_URL environment variable was not found. Make sure .env.local is configured correctly.");
    }
    
    // The db object will automatically use the process.env.POSTGRES_URL
    await db.sql`
      CREATE TABLE IF NOT EXISTS subscribers (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log('Table "subscribers" created successfully.');
  } catch (error) {
    console.error('Error creating table:', error);
    process.exit(1); 
  }
}

createTable();