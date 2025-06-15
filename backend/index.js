const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./db/connect");
const tasks = require("./routes/tasks");
require("dotenv").config();

// db, middleware, controllers

// Middlewares
app.use(express.json());
app.use(cors());
app.use("/api/v1", tasks);

const port = process.env.PORT;
const start = async () => {
  try {
    await connectDB(process.env.CONNECTION_STRING);
    app.listen(port, () => console.log(`Server is listening on port ${port}`));
  } catch (err) {
    console.log(err);
  }
};
start();
