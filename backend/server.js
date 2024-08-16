require("dotenv").config();
const express = require("express");
const app = express();
const router = express.Router();
const cors = require("cors");

const mainRouter = require("./routes/index.js");
app.use(cors());
app.use(express.json());
require("./db");
app.use("/api/v1", mainRouter);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on ${process.env.PORT}...`);
});
