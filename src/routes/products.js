const express = require("express");
const S = require("fluent-json-schema");
const SQL = require("@nearform/sql");
const { query } = require("../data/mysqldb");
const { validationMid } = require("../middlewares/validation");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

const postSchema = S.object()
  .prop("name", S.string().minLength(1).required())
  .prop("description", S.string().minLength(1).required())
  .prop("image", S.string().required())
  .prop("price", S.number().required());

router.post("/new", validationMid(postSchema.valueOf()), async (req, res) => {
  try {
    if (req.body.price < 0) {
      throw new Error("Price Invalid");
    }
    const uuid = uuidv4();
    await query(
      SQL`INSERT INTO products (product_id, product_name, product_description, product_price, product_image, total_sold, unique_sold) VALUES (${uuid},${req.body.name},${req.body.description},${req.body.price},${req.body.image},0,0);`
    );
    res.send("Product added");
  } catch (e) {
    res.send(e);
  }
});

router.put(
  "/update/:id",
  validationMid(postSchema.valueOf()),
  async (req, res) => {
    try {
      if (req.body.price < 0) {
        throw new Error("Price Invalid");
      }
      await query(
        SQL`UPDATE products SET product_name = ${req.body.name}, product_description = ${req.body.description}, product_price = ${req.body.price}, product_image = ${req.body.image} WHERE product_id = ${req.params.id};`
      );
      res.send("Product updated");
    } catch (e) {
      res.send(e);
    }
  }
);

router.delete("/delete/:id", async (req, res) => {
  try {
    await query(SQL`DELETE FROM products WHERE product_id=${req.params.id};`);
    res.send("Product deleted");
  } catch (e) {
    res.send(e);
  }
});

router.get("/get", async (req, res) => {
  try {
    let products = await query(
      SQL`SELECT product_id, product_name, product_description, product_price, product_image FROM products;`
    );
    res.send(products);
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
