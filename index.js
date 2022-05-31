const express = require("express");
const cors = require("cors");
const { postgrator } = require("./src/data/mysqldb");
const app = express();
app.use(cors());
app.use(express.json({ limit: 10000000 }));
const port = process.env.PORT;
const host = process.env.HOST;

app.use("/products", require("./src/routes/products"));
app.use("/transactions", require("./src/routes/transactions"));
app.use("/stats", require("./src/routes/stats"));

postgrator
  .migrate()
  .then((result) => {
    console.log("migaration completed");
    app.listen(port, host, () => {
      console.log(`server started http://${host}:${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
