require("dotenv").config({ path: ".env.local" });  // force load .env.local
const mongoose = require("mongoose");

async function testConnection() {
  try {
    console.log("Loaded URI:", process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected successfully!");
  } catch (err) {
    console.error("❌ Connection failed:", err.message);
  }
}

testConnection();
