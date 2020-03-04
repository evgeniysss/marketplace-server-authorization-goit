const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config");
let app = express();

let home = require("./src/routes/home");
let products = require("./src/routes/products");
let users = require("./src/routes/users");
let orders = require("./src/routes/orders");

if (require.main === module) {
  main();
} else {
  module.exports = main;
}

async function main() {
  app.use(bodyParser());
  app.use("/", home);
  app.use("/products", products);
  app.use("/users", users);
  app.use("/orders", orders);

  await mongoose.connect(config.mongodb_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  console.log("attaching server to port");
  const server = app.listen(config.port, () => {
    console.log("☆☆☆ Server listening on port", config.port, "☆☆☆");
  });

  return { app, server };
}
