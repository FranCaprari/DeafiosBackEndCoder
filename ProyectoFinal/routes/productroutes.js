const express = require("express");
const { Router } = express;
const router = Router();

const controller = require("../controladores/productcontroller");
const { adminAuth } = require("../middlewar/admin");

router.get("/", adminAuth(true), controller.getAll);
router.get("/:id", adminAuth(true), controller.getById);
router.post("/", adminAuth(true), controller.post);
router.put("/:id", adminAuth(false), controller.put);
router.delete("/:id", adminAuth(false), controller.delete);


module.exports = router;