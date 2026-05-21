const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

const users = [
  {
    id: 1,
    email: "admin@test.com",
    passwordHash: bcrypt.hashSync("admin123", 10),
    role: "admin",
  },
  {
    id: 2,
    email: "user@test.com",
    passwordHash: bcrypt.hashSync("user123", 10),
    role: "user",
  },
];

app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign(
    {
      userId: user.id,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({
    accessToken: token,
    userId: user.id,
    role: user.role,
  });
});

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}

function authorize(role) {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
}

app.get("/admin", authenticate, authorize("admin"), (req, res) => {
  res.json({
    message: "Welcome to admin panel",
    user: req.user,
  });
});

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}

module.exports = app;
module.exports.authenticate = authenticate;
module.exports.authorize = authorize;