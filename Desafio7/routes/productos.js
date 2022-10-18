import express from 'express';
import { Router } from 'express';
import connection from '../connectionDatabase/db.js';
import DBfunctions from '../connectionDatabase/funciones.js';
const DB = new DBfunctions(connection, 'productos');
const router = Router();
const app = express();

app.use(express.json());

router.get("/", async(req, res) => {
    try{
        const data = await DB.getAll();
        res.send(data);
    } catch(e){
        res.status(404).send(e);
    }
});

router.get("/:id", async(req, res) => {
    try{
        const { id } = req.params;
        const data = await DB.getById(id);
        res.send(data);
    }catch(e){
        res.status(404).send(e);
    }
});

router.post("/", async(req, res) => {
    try{
        const data = req.body;
        await DB.add(data);
        res.send(data);
    } catch(e){
        res.status(404).send(e);
    }  
});

router.put("/:id", async(req, res) => {
    try{
        const { id } = req.params;
        const prodNuevo = req.body;
        const idEntera = parseInt(id);
        await DB.update(idEntera, prodNuevo)
        res.send(`Se actualizo el producto numero ${id}`);
    } catch(e){
        res.status(404).send(e);
    }
});
router.delete("/:id", async(req, res) => {
    try{
        const { id } = req.params;
        await DB.delete(id);
        res.send(`Se elimino el producto numero ${id}`);
    } catch(e){
        res.status(404).send(e);
    }
});


export { router as productosRouter }