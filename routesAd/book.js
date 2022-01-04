const express = require("express");
const router = express.Router();
const { tryCatch } = require("../middleware/errorHandle");
const controller = require("../controller/bookAd.controller");

router.post("/data/:idBook", controller.getBook);
router.post("/data", controller.getList);
router.post("/saveBook", controller.saveBook);
router.post("/delBook", controller.delBook);
router.post("/addBook", controller.addBook);
module.exports = router;
