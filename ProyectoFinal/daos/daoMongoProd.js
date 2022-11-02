import CRUDMongo from "../constructores/mongocontainer";

class daoMongoProd extends CRUDMongo{
    constructor(){
        super("products", {tittle: String, price: Number, stock: Number,
        description: String, thumbnail: String});
    }
}


export default daoMongoProd;