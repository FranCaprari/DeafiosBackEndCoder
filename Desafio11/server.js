import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import { Server as HttpServer } from "http";
import { Server as Socket } from "socket.io";
import homeRouter from "./routes/home.js";
import { normalize, schema, } from 'normalizr';
import Mensaje from "./constructores/msjConstructor.js";
import Product from "./constructores/productsConstructor.js";
import connection from "./MySql.js";
import randomRouter from "./routes/random.js";
import mainRouter from "./routes/main.js";


const app = express();
const htppServer = new HttpServer(app);
const io = new Socket(htppServer);
const userMensajes = new Mensaje("./db/mensajes.json");
const producto = new Product (connection, "products");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("views", "./views");
app.set("view engine", "ejs");


app.use(
    session({
    
    })
)


io.on("connection", async (socket) => {
    const products = await producto.getAll();
    socket.emit("products", products);

    socket.on("new-product", async data => {
        await producto.save(data.title, data.price, data.thumbnail);
        const products = await producto.getAll();
        io.sockets.emit("products", products);
    })
})


let mensajes = await userMensajes.getAll();
const authorSchema = new schema.Entity("authors", {}, {idAttribute: "email"});
const postSchema = new schema.Entity("post", {author: authorSchema});
const postsSchema = new schema.Entity("posts", {mensajes: [postSchema]})
const normMensajes = normalize(mensajes, postsSchema);


socket.emit("mensajes", normMensajes);


socket.on("newMsj", async(data) => {
    const date = new Date().toLocaleString();
    await userMensajes.save(
        date,
        data.text,
        data.email,
        data.lastName,
        data.name,
        data.age,
        data.alias
    );

    mensajes = await userMensajes.getAll();
    const authorSchema = new schema.Entity("authors", {}, {idAttribute: "email"});
    const postSchema = new schema.Entity("post", {author: authorSchema});
    const postsSchema = new schema.Entity("posts", {mensajes: [postSchema]})
    const normMensajes = normalize(mensajes, postsSchema);

    io.sockets.emit("mensajes", normMensajes);
})

app.use(mainRouter);
app.use(randomRouter);

const conServer = htppServer.listen(8080, () => {
    console.log("conectado");
});
conServer.on("error", (error) => {
    console.log(error);
});