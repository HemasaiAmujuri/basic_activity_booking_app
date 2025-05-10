const express = require("express");
const connectdb = require("./src/config/db");
const mainRouter = require("./src/routes/router");
const https = require("https");
var cors = require("cors");

var PORT = process.env.PORT || 5000;
connectdb();
const app = express();
const server = require("http").createServer(app);

// process.on("uncaughtException", function (err) {
//   console.error(err);
//   console.log("Node NOT Exiting...");
// });

app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  next();
});


// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use("/api", mainRouter);

server.listen(PORT, () => {
  console.log(`app running on portt ${PORT}`);
});
