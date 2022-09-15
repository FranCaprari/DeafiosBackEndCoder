const express = require('express');
const app = express();
const fs = require('fs');
const productosRouter = require('./productos');
const Contenedor = require("./index");
const constructor = new Contenedor("./productos.txt");


app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.set("view engine", "pug");
app.get("/form", (req, res) => {
    res.render("form")
});
app.get("/table", (req, res) => {
    const productos = await (constructor.getAll());
    res.render("table", productos)
});

app.use("/api/productos", productosRouter);


app.listen(8080, () => {
    console.log("Servidor encendido.")
});
