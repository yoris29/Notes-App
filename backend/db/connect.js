const mongoose = require("mongoose");

const connectDB = (connStr) => {
  return mongoose.connect(connStr);
};

module.exports = connectDB;
