const fs = require("fs");

class Cart {
    constructor(file){
        this.file = file;
        this.products = [];
        this.date = new Date().toLocaleString()
    }

    async newCart(){
        try{
            const dataAParsear = await fs.promises.readFile(this.file, "utf-8");
            const dataParseada = JSON.parse(dataAParsear);
            const newCart = {
                id: dataParseada.length + 1,
                timestamp: this.date,
                products: this.products,
                total: 0,
            };
            dataParseada.push(newCart);
            const updatedFile = JSON.stringify(dataParseada, null, " ");
            fs.promises.writeFile(this.file, updatedFile);
            return newCart;
        } catch(error){
            console.log(error);
        }
    }
    async deleteCartById(idIngresado){
        try{
            const dataAParsear = await fs.promises.readFile(this.file, "utf-8");
            const dataParseada = JSON.parse(dataAParsear);
            const cartId = dataParseada.filter(({ id }) => id == idIngresado);
            const cartEncontrado = dataParseada.find(({ id }) => id == idIngresado);
            if(cartEncontrado){
                console.log(`Se elimino el carrito numero ${idIngresado}`);
                const updatedFile = JSON.stringify(cartId, null, " ");
                fs.promises.writeFile(this.file, updatedFile);
                return cartEncontrado;
            } else{
                console.log(`El carrito numero ${idIngresado} no existe!`);
            } 
        } catch(error){
            console.log(error);
        }
    }
    async getCartById(idIngresada){
        try{
            const dataAParsear = await fs.promises.readFile(this.file, "utf-8");
            const dataParseada = JSON.parse(dataAParsear);
            const cartEncontrado = dataParseada.find(({ id }) => id == idIngresada);
            if(cartEncontrado){
                console.log(`Carrito numero ${idIngresada} mostrandose`);
                return cartEncontrado;
            } else{
                console.log(`No existe el carrito numero ${idIngresada}`);
                return null;
            }
        } catch(error){
            console.log(error);
        }
    }
    async addProductToCart(idIngresado, objeto){
        try{
            const dataAParsear = await fs.promises.readFile(this.file, "utf-8");
            const dataParseada = JSON.parse(dataAParsear);
            const cartId = dataParseada.filter(({ id }) => id != idIngresado);
            const cartEncontrado = dataParseada.find(({ id }) => id == idIngresado);
            if(cartEncontrado){
                cartEncontrado.products.push(objeto);
                cartEncontrado.products.sort((a, b) => a.id - b.id);
                cartId.push(cartEncontrado);
                cartId.sort((a, b) => a.id - b.id);
                const updatedFile = JSON.stringify(cartId, null, " ");
                fs.promises.writeFile(this.file, updatedFile);
                console.log(`Se agrego el producto ${objeto.tittle} al carrito ${idIngresado}`);
                return cartEncontrado;
            } else{
                return null;
            }   
        } catch(error){
            console.log(error);
        }
    }
    async deleteProductInCartById(idCart, idProduct){
        try{
            const dataAParsear = await fs.promises.readFile(this.file, "utf-8");
            const dataParseada = JSON.parse(dataAParsear);
            const cartsId = dataParseada.filter(({ id }) => id != idCart);
            const cartEncontrado = dataParseada.find(({ id }) => id == idCart);

            const productosRestantes = cartEncontrado.products.filter(
                ({ id }) => id != idProduct
            );
            const productoEncontrado = cartEncontrado.products.find(({ id }) => id == idProduct);

            cartEncontrado.products = productosRestantes;
            cartEncontrado.products.sort((a, b) => a.id - b.id);
            cartsId.push(cartEncontrado);
            cartsId.sort((a, b) => a.id - b.id);
            const updatedFile = JSON.stringify(cartsId, null, " ");
            fs.promises.writeFile(this.file, updatedFile);
            return productoEncontrado;
        } catch(error){
            console.log(error);
        }
    }
}

module.exports = Cart;