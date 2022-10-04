const Container = require("../constructores/container");
const contenedor = new Container("db/productos.json");

const Cart = require("../constructores/cartconstructor");
const cart = new Cart("db/cart.json");

const controller = {};

controller.newCart = async (req, res) => {
    const data = await cart.newCart();
    res.status(200).json({
        date: `${data.timestamp}`,
        msg: "Nuevo carrito generado con exito!",
        id: `${data.id}`,
    });
};

controller.deleteCart = async(req, res) =>{
    const data = await cart.deleteCartById(req.params.id);
    data ? res.status(200).json({
        msg: `Se elimino el carrito`,
        "cart eliminado": `${req.params.id}`,
    }) : res.status(404).json({ msg: "No existe el carrito!"});
};

controller.getCartProducts = async(req, res) => {
    const data = await cart.getCartById(req.params.id);
    if(data === null) {
        res.status(200).json({
            msg: "No se encontro",
        });
    } else if (data.products.length > 0){
        res.status(200).json({
            msg: "Carrito",
            "cart id": data.id,
            products: data.products,
        });
    } else {
        res.status(200).json({
            msg: "No encontrado",
            "cart id": data.id,
            products: "Carrito vacio",
        });
    }
};

controller.saveProductsCart = async(req, res ) => {
    const newProduct = await contenedor.getById(req.body.id);
    const data = await cart.addProductToCart(req.params.id, newProduct);
    data != null ? res.status(200).json({
        msg: "Se agrego el producto",
        "products in cart": data,
    }) : res.status(200).json({
        error: "Error al agregar el producto",
        msg: "El carrito no existe",
    });
};

controller.deleteProductInCart = async(req, res) => {
    const {id, idProd} = req.params;
    const data = await cart.deleteProductInCartById(id, idProd);
    console.log("eliminado!");
    data != undefined ? res.status(200).json({
        msg: `Se elimino ${data.tittle} del carrito numero ${id}`,
    }) : res.status(200).json({
        error: "No existe el producto"
    });
};

module.exports = controller;