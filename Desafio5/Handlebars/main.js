const express = require('express');
const app = express();
const fs = require('fs');
const handlebars = require('express-handlebars')
const productosRouter = require('./productos');
const Contenedor = require("./index");
const constructor = new Contenedor("./productos.txt");


app.use(express.urlencoded({ extended: true}));
app.use(express.json());

const hbs = handlebars.engine({
    extname: '.hbs',
    layoutsDir: __dirname + "/views",

});
app.engine("hbs", hbs);

app.set("views", "./views");
app.set("view engine", "hbs");

app.get("/form", (req, res) => {
    res.render("main", { layout: "form" });
});
app.get("/table", async (req, res) => {
    const productos = await (constructor.getAll());
    res.render("main", { layout: "table", productos });
});

app.use("/api/productos", productosRouter);


app.listen(8080, () => {
    console.log("Servidor encendido.")
});
