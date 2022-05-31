const express = require("express");
const SQL = require("@nearform/sql");
const { query } = require("../data/mysqldb");

const router = express.Router();

router.get("/gettopunique", async (req, res) => {
  try {
    let uniqueProducts = await query(
      SQL`SELECT * FROM products ORDER BY unique_sold DESC LIMIT 5;`
    );
    res.send(uniqueProducts);
  } catch (e) {
    res.send(e);
  }
});

router.get("/gettoptotal", async (req, res) => {
  try {
    let totalProducts = await query(
      SQL`SELECT * FROM products ORDER BY total_sold DESC LIMIT 5;`
    );
    res.send(totalProducts);
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
