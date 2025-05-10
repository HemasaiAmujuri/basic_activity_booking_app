const mongoose = require("mongoose");
require("dotenv").config();
const connectdb = async () => {
  const dburi = `${process.env.DB_CONNECTION_STRING}`;
  mongoose
    .connect(dburi, {
    })
    .then((result) => console.log("mongodb connected 🚀"))
    .catch((err) => console.log(err));
};

module.exports = connectdb;
