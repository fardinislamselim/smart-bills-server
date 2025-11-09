const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

// mongodb uri
const uri = `mongodb+srv://${process.env.db_user}:${process.env.db_password}@cluster0.j5l5aiu.mongodb.net/?appName=Cluster0`;

// MongoDB Client
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
    try {
      await client.connect();
      const db = client.db("smart-bills");
      console.log(
        "Pinged your deployment. You successfully connected to MongoDB!"
      );
    } catch (error) {
      console.error("❌ MongoDB connection failed:", error);
    }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Smart bills server is running...");
});

// Default route
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
