const Container = require("../constructores/container");
const contenedor = new Container("db/productos.json");

const controller = {};

controller.getAll = async (req, res) => {
    const data = await contenedor.getAll();
    res.status(200).json(data);
};

controller.getById = async (req, res) =>{
    const data = await contenedor.getById(req.params.id);
    data ? res.status(200).json(data) : res.status(404).json({error: "Producto no encontrado"});
};

controller.post = async (req, res) =>{
    const newObjeto = req.body;
    const data = await contenedor.save(newObjeto);
    data == null ? 
    res.status(500).json({msg: "Ya existe!"}) :
    res.status(200).json({
        msg: `Se agrego el producto ${data.tittle}`,
        "new product": data,
    });
};

controller.put = async(req, res) => {
    const { id } = req.params;
    const newObjeto = req.body;
    const data = await contenedor.updateById(+id, newObjeto);
    data != null ? 
    res.status(200).json({
        msg: `Producto numero ${id} modificado!`,
        "new product": newObjeto,
    }) : res.status(404).json({error: "No existe el producto!"});
};

controller.delete = async(req, res) =>{
    const data = await contenedor.deleteById(req.params.id);
    data ? 
    res.status(200).send({
        msg: `Se elimino el producto`,
        "product deleted": data,
    }) : res.status(404).send({ msg: `No existe el producto.`});
};

module.exports = controller;

