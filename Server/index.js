const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const jwt = require('jsonwebtoken');
require("dotenv").config();

app.use(cors());
app.use(express.json());

// --------- Connect to MongoDB ---------
mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error: "));
db.once("open", () => console.log("Connected Successfully"));

// ---- Define User Schema and Model ----
const userSchema = new mongoose.Schema({
   name: String,
   phone: String,
});

const User = mongoose.model("User", userSchema);

// --- Route to check whether user is exist or not in DB ---
app.post("/api/users/check", async (req, res) => {
   const { phone } = req.body;
   try {
      const user = await User.findOne({ phone });
      if (user) {
         console.log("check success")
         res.status(200).json({ success: true, userId: user._id });
      } else {
         res.status(404).json({ success: false });
      }
   } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
   }
});

app.post("/api/users/login", async (req, res) => {
   const { userId } = req.body;
   try {
      const token = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10m" });
      if (token) {
         console.log("jwt success")
         res.status(200).json({ success: true, token });
      } else {
         res.status(404).json({ success: false });
      }
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
   }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
   console.log(`Server is running on ${PORT}`);
});
