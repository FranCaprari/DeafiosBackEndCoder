import * as dotenv from "dotenv";
dotenv.config();
console.log(process.env.TIPO_DB);


const daos = {
    Mongo: async () => {
        const { default: daoMongoProd } = await import("./daoMongoProd.js");
        const {default: daoMongoCart } = await import("./daoMongoCart.js");
        return{ daoProd: new daoMongoProd(),
                daoCart: new daoMongoCart(),
        };
    },
    Firebase: async () => {
        const { default: daoFirebaseProd } = await import("./daoFirebaseProd.js");
        return new daoFirebaseProd();
    },
    Mem: async() =>{
        const { default: daoMemProd} = await import("./daoMemProd");
        const {default: daoMemCart} = await import("./daoMemCart");
        return {
            daoCart: new daoMemCart(),
            daoProd: new daoMemProd(),
        };
    }
}


export default daos[process.env.TIPO_DB]();