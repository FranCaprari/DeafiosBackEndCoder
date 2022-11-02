const express = require("express");
const app = express();
const fs = require("fs");
const productosRouter = require("./routes/productroutes");
const cartRouter = require("./routes/cartroutes");
import daos from './daos/indexdaos.js';

const {daoCart, daoProd} = await daos();

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use("/api/productos", productosRouter);
app.use("/api/carrito", cartRouter);

app.listen(8080, ()=> {
    console.log("Servidor encendido!")
});