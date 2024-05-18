const express = require("express");
const fs = require("fs");

let loggingMiddleware = (req, res, next) => {
  fs.appendFileSync(
    "request.log",
    `Request received in ${req.url} with ${req.method} method from ${
      req.ip
    } at ${new Date()} \n`
  );
  next();
};

const app = express();

app.use(loggingMiddleware);

app.get("/products", (req, res) => {
  res.status(200).json({
    message: "Dummy product json data",
  });
});

app.use("/*", (req, res) => {
  res.status(400).json({
    error: "Path not found",
  });
});

app.listen(8080, () => {
  console.log("Server is running at port -", 8080);
});
