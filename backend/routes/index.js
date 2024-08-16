const express = require("express");
const userRouter = require("./user.js");
const taskRouter = require("./task.js");
const router = express.Router();

router.use("/user", userRouter);
router.use("/task", taskRouter);
module.exports = router;
