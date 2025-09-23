const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");

async function migrate() {
  const client = await MongoClient.connect("mongodb://localhost:27017/hospital-backend");
  const db = client.db();

  const doctors = await db.collection("doctors").find().toArray();

  for (const doc of doctors) {
    const hash = bcrypt.hashSync("password@123", 10);

    await db.collection("users").updateOne(
      { email: doc.email },
      {
        $setOnInsert: {
          _id: doc._id,
          name: doc.name,
          email: doc.email,
          phno: doc.phno,
          spec: doc.spec,
          dept: doc.dept,
          exp: doc.exp,
          qual: doc.qual,
          status: doc.status,
          role: "doctor",
          password: hash,
          __v: doc.__v
        }
      },
      { upsert: true }
    );
  }

  console.log("✅ Migration complete.");
  await client.close();
}

migrate().catch(err => console.error(err));