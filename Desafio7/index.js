const express = require("express");
const handlebars = require("express-handlebars");
const app = express();

import DBfunctions from './connectionDatabase/funciones.js';
import mysqlconnection from './connectionDatabase/db.js';
import sqliteConfig from './connectionDatabase/SQLite3.js';
sqliteConfig.connection.filename = "./DB/coderhouse.sqlite";
const DBMensajes = new DBfunctions(sqliteConfig, 'msg');
const DBproductos = new DBfunctions(mysqlconnection, 'productos');

import { productosRouter } from './routes/productos.js';

import { Server } from 'socket.io'
import { createServer } from 'http';

const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("views"));

let mensajes = [];

io.on("connection", async(socket) => {
    console.log("Nuevo cliente conectado");
    socket.emit('new-msg', mensajes);
    socket.on('new-msg', async(data) => {
        await DBMensajes.add(data);
        mensajes.push(data);
        io.sockets.emit('new-msg', mensajes);
    });
    socket.emit('new-product', await DBproductos.getAll());
    socket.on('new-product', async(data)=> {
        await DBproductos.add(data);
        const productos = await DBproductos.getAll();
        io.sockets.emit('new-product', productos);
    });
});
app.engine(
    "hbs",
    handlebars.engine({
      extname: "hbs",
      layoutsDir: "./views",
      defaultLayout: "main",
    })
  );

app.set("views", "./views");
app.set("view engine", "hbs");

app.get("/", async(req, res) =>{
    res.render("root", {
        layout: "root",
        title: "Main",
        Precio: "Precio",
        addProd: "Añadir producto",
        compras: await DBproductos.getAll(),
        noProd: "No hay productos",
        partialsPath: "./views/layouts",
    });
});

app.use("/productos", productosRouter);


httpServer.listen(8080, () => {
    console.log("Conectado");
})