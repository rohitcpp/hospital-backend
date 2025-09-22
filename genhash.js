const bcrypt = require('bcrypt');

async function generateHash() {
  const hash = await bcrypt.hash('password123', 10);
  console.log('Hashed password:', hash);
}

generateHash();