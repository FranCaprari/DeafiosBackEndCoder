import CRUDMongo from "../constructores/mongocontainer";

class daoMongoCart extends CRUDMongo{
    constructor(){
        super("products", {tittle: String, price: Number, stock: Number,
        description: String, thumbnail: String});
    }
}


export default daoMongoCart;