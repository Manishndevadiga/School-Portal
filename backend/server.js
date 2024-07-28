const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
const port = 10000;

app.use(bodyParser.json());
app.use(cors());
// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "student_db",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to database");
});

// Registration route
app.post("/register", async (req, res) => {
  const {
    name,
    email,
    phone,
    additionalPhone,
    address,
    password,
    confirmPassword,
  } = req.body;

  // Validate input (this should mirror the front-end validations)
  if (!/^[A-Za-z ]{2,}$/.test(name)) {
    return res.status(400).json({ message: "Invalid name." });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: "Invalid email." });
  }
  if (!/^\d{10}$/.test(phone)) {
    return res.status(400).json({ message: "Invalid phone number." });
  }
  if (
    additionalPhone &&
    (!/^\d{10}$/.test(additionalPhone) || phone === additionalPhone)
  ) {
    return res
      .status(400)
      .json({ message: "Invalid additional phone number." });
  }
  if (!address.trim()) {
    return res.status(400).json({ message: "Address is required." });
  }
  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(password)) {
    return res.status(400).json({ message: "Invalid password." });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match." });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert user into the database
  const sql =
    "INSERT INTO students (name, email, phone, additionalPhone, address, password) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [name, email, phone, additionalPhone, address, hashedPassword],
    (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).json({ message: "Email already exists." });
        }
        return res.status(500).json({ message: "Database error" });
      }
      res.json({ message: "Registration successful!" });
    }
  );
});

// Login route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM students WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) return res.status(500).json({ message: "Internal server error" });
    if (results.length === 0)
      return res.status(400).json({ message: "Email not found" });

    const user = results[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err)
        return res.status(500).json({ message: "Internal server error" });
      if (!isMatch)
        return res.status(400).json({ message: "Incorrect password" });

      // Generate JWT token
      const token = jwt.sign({ id: user.id }, "secret_key", {
        expiresIn: "1h",
      });
      res.status(200).json({ message: "Login successful!", token });
    });
  });
});

// Mentor registration route
app.post("/register-mentor", async (req, res) => {
  console.log("Received mentor registration request:", req.body);
  const {
    name,
    email,
    phone,
    additionalPhone,
    address,
    course,
    experience,
    password,
    confirmPassword,
  } = req.body;

  // Validate input (this should mirror the front-end validations)
  if (!/^[A-Za-z ]{2,}$/.test(name)) {
    return res.status(400).json({ message: "Invalid name." });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: "Invalid email." });
  }
  if (!/^\d{10}$/.test(phone)) {
    return res.status(400).json({ message: "Invalid phone number." });
  }
  if (
    additionalPhone &&
    (!/^\d{10}$/.test(additionalPhone) || phone === additionalPhone)
  ) {
    return res
      .status(400)
      .json({ message: "Invalid additional phone number." });
  }
  if (!address.trim()) {
    return res.status(400).json({ message: "Address is required." });
  }
  if (!course.trim()) {
    return res.status(400).json({ message: "Course is required." });
  }
  if (!experience.trim()) {
    return res.status(400).json({ message: "Experience is required." });
  }
  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(password)) {
    return res.status(400).json({ message: "Invalid password." });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match." });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert mentor into the database
  const sql =
    "INSERT INTO mentor (name, email, phone, additionalPhone, address, course, experience, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [
      name,
      email,
      phone,
      additionalPhone,
      address,
      course,
      experience,
      hashedPassword,
    ],
    (err, result) => {
      if (err) {
        console.error("Database error:", err);
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).json({ message: "Email already exists." });
        }
        return res
          .status(500)
          .json({ message: "Database error", error: err.message });
      }
      console.log("Mentor registered successfully");
      res.json({ message: "Registration successful!" });
    }
  );
});

//mentor fix
app.get("/mentors-by-course/:course", (req, res) => {
  const course = req.params.course;
  const query = "SELECT * FROM mentor WHERE course = ?";
  db.query(query, [course], (err, results) => {
    if (err) return res.status(500).json({ message: "Database query error" });
    res.json(results);
  });
});

//enroll
app.post("/enroll", (req, res) => {
  const { course, student, mentor, timing, email } = req.body;
  const query =
    "INSERT INTO enrollments (course, student, mentor, timing, email) VALUES (?, ?, ?, ?, ?)";
  db.query(query, [course, student, mentor, timing, email], (err, result) => {
    if (err)
      return res
        .status(500)
        .json({ message: "Database error", error: err.message });
    res.json({ message: "Enrollment successful!", id: result.insertId });
  });
});
//fetch enroll
app.get("/enrollments", (req, res) => {
  const query = "SELECT * FROM enrollments";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ message: "Database query error" });
    res.json(results);
  });
});
// Mentor login route
app.post("/login-mentor", (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM mentor WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) return res.status(500).json({ message: "Internal server error" });
    if (results.length === 0)
      return res.status(400).json({ message: "Email not found" });

    const mentor = results[0];
    bcrypt.compare(password, mentor.password, (err, isMatch) => {
      if (err)
        return res.status(500).json({ message: "Internal server error" });
      if (!isMatch)
        return res.status(400).json({ message: "Incorrect password" });

      // Generate JWT token
      const token = jwt.sign({ id: mentor.id }, "secret_key", {
        expiresIn: "1h",
      });
      res.status(200).json({ message: "Login successful!", token });
    });
  });
});

// Fetch mentors route
app.get("/mentors", (req, res) => {
  const query = "SELECT id, name FROM mentor";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ message: "Database query error" });
    res.json(results);
  });
});

const adminUsername = "admin";
const adminPassword = "admin";

app.post("/admin-login", (req, res) => {
  const { username, password } = req.body;
  if (username === adminUsername && password === adminPassword) {
    const token = jwt.sign({ username }, "secret_key", { expiresIn: "1h" });
    res.status(200).json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "No token provided" });

  jwt.verify(token.split(" ")[1], "secret_key", (err, decoded) => {
    if (err)
      return res.status(500).json({ message: "Failed to authenticate token" });
    req.userId = decoded.id;
    next();
  });
};

// Admin dashboard routes
app.get("/admin-dashboard", verifyToken, (req, res) => {
  const query = `
        SELECT table_name AS name, table_rows AS count
        FROM information_schema.tables
        WHERE table_schema = 'student_db' AND table_name != 'admin';
    `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ message: "Database query error" });
    res.json(results);
  });
});

app.get("/admin-dashboard/:table", verifyToken, (req, res) => {
  const tableName = req.params.table;
  const query = `SELECT * FROM ??`;
  db.query(query, [tableName], (err, results) => {
    if (err) return res.status(500).json({ message: "Database query error" });
    res.json(results);
  });
});

app.post("/admin-dashboard/:table", verifyToken, (req, res) => {
  const tableName = req.params.table;
  const record = req.body;
  const query = `INSERT INTO ?? SET ?`;
  db.query(query, [tableName, record], (err, results) => {
    if (err) return res.status(500).json({ message: "Database query error" });
    res.json({ message: "Record added successfully" });
  });
});

app.put("/admin-dashboard/:table/:id", verifyToken, (req, res) => {
  const tableName = req.params.table;
  const recordId = req.params.id;
  const record = req.body;
  const query = `UPDATE ?? SET ? WHERE id = ?`;
  db.query(query, [tableName, record, recordId], (err, results) => {
    if (err) return res.status(500).json({ message: "Database query error" });
    res.json({ message: "Record updated successfully" });
  });
});

app.delete("/admin-dashboard/:table/:id", verifyToken, (req, res) => {
  const tableName = req.params.table;
  const recordId = req.params.id;
  const query = `DELETE FROM ?? WHERE id = ?`;
  db.query(query, [tableName, recordId], (err, results) => {
    if (err) return res.status(500).json({ message: "Database query error" });
    res.json({ message: "Record deleted successfully" });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
