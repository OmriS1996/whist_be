const express = require("express");
const S = require("fluent-json-schema");
const SQL = require("@nearform/sql");
const { query } = require("../data/mysqldb");
const { validationMid } = require("../middlewares/validation");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

router.post("/purchase", async (req, res) => {
  try {
    let itemsProcessed = 0;
    let sum = 0;
    req.body.forEach(async (item) => {
      if (item.price < 0) {
        throw new Error("Price Invalid");
      }
      sum += item.count * item.price;

      await query(
        SQL`UPDATE products SET total_sold = total_sold + ${item.count} WHERE product_id = ${item.id};`
      );

      await query(
        SQL`UPDATE products SET unique_sold = unique_sold + 1 WHERE product_id = ${item.id};`
      );

      itemsProcessed++;
      if (itemsProcessed === req.body.length) {
        const uuid = uuidv4();
        const unixDate = Date.now();
        await query(
          SQL`INSERT INTO transactions SET transaction_id = ${uuid}, unix_date = ${unixDate}, transaction_usd = ${sum};`
        );
        res.send("Transaction succeeded");
      }
    });
  } catch (e) {
    res.send(e);
  }
});

router.get("/fivedays", async (req, res) => {
  try {
    let minusFiveDays = Date.now() - 432000000;

    let transactions = await query(
      SQL`SELECT * FROM transactions WHERE unix_date > ${minusFiveDays};`
    );

    res.send(transactions);
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
