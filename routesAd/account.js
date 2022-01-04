const express = require("express");
const router = express.Router();
const { tryCatch } = require("../middleware/errorHandle");
const controller = require("../controller/user.controller");

router.post("/data", tryCatch(controller.getList));
router.post("/delUser", tryCatch(controller.delUser));

module.exports = router;
