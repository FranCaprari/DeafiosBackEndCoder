const express = require('express');
const { Router } = express;
const router = Router();
const Contenedor = require("./index");
const constructor = new Contenedor("./productos.txt");

router.get('/', async (req, res) => {
    const data = await (constructor.getAll());
    res.status(200).json(data);
});

router.get("/:id", async (req, res) => {
    console.log(req.params.id);
    const data = await constructor.getById(parseInt(req.params.id));
    console.log(data);
    res.send(data);
});

router.post('/', async (req, res) => {
    console.log(req.body)
    const {tittle, price, thumbnail} = req.body;
    const data = await constructor.save({tittle, price, thumbnail});
    data == null ? res.status(404).json({ error: "Los campos ingresados son incorrectos"}): res.status(200).json(data);
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const newObj = req.body;
    const data = await constructor.updateById(parseInt(id), newObj);
    console.log(data)
    data != null ? res.status(200).json({msg: "Se modifico el producto"}) : res.status(404).json({ error: "No se encontro el producto."});
});


router.delete('/:id', async (req, res) => {
    console.log(req.params.id);
    const data = await constructor.deleteById(parseInt(req.params.id));
    data ? res.status(200).send({msg: "Se elimino el producto"}) : res.status(404).send({msg: "Producto inexistente"});
});

module.exports = router; 