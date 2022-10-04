const express = require("express");
const { Router } = express;
const router = Router();

const controller = require("../controladores/cartcontroller");

const { adminAuth } = require("../middlewar/admin");

router.post("/", adminAuth(true), controller.newCart);
router.delete("/:id", adminAuth(true), controller.deleteCart);
router.get("/:id/products", adminAuth(true), controller.getCartProducts);
router.post("/:id/products", adminAuth(true), controller.saveProductsCart);
router.delete("/:id/products/:idProd", adminAuth(true), controller.deleteProductInCart);

module.exports = router;