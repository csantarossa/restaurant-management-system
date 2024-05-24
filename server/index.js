const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// Connect to MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "restaurant_management",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL");
});

// Define API endpoints
app.post("/api/reservations", (req, res) => {
  const { customerName, customerContact, date, time, guests, tableNumber } =
    req.body;
  const sql =
    "INSERT INTO reservations (customerName, customerContact, date, time, guests, tableNumber) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [customerName, customerContact, date, time, guests, tableNumber],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(200).send(result);
    }
  );
});

app.get("/api/reservations", (req, res) => {
  const sql = "SELECT * FROM reservations";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(results);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
