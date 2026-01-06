const express = require("express");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const USERS_FILE = "./users.json";

// Read users
function getUsers() {
  if (!fs.existsSync(USERS_FILE)) return [];
  return JSON.parse(fs.readFileSync(USERS_FILE));
}

// Save users
function saveUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// 🔐 REGISTER API
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const users = getUsers();

  const userExists = users.find(u => u.username === username);
  if (userExists) {
    return res.json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  saveUsers(users);

  res.json({ message: "Registration successful" });
});

// 🔑 LOGIN API
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const users = getUsers();

  const user = users.find(u => u.username === username);
  if (!user) {
    return res.json({ message: "Invalid username or password" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.json({ message: "Invalid username or password" });
  }

  res.json({ message: "Login successful" });
});

// START SERVER
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
