import mongoose from "mongoose";
import config from "../config";


await mongoose.connect(config.Mongo.uri, config.Mongo.options);

class CRUDMongo {
    constructor(coleccion, esquema){
        this.db = mongoose.model(coleccion, esquema);
    }
    async save(elem){
        try{
            const data = await this.db.insertMany(elem);
            return data;
        } catch(e){
            console.log(e);
        }
    }

    async show(){
        try{
            const data = await this.db.find({});
            return data;
        } catch(e){
            console.log(e);
        }
    }
    async showById(id){
        try{
            const data = await this.db.findOne({ _id: id});
            return data;
        } catch(e){
            console.log(e);
        }
    }
    async update( elem){
        try{
            await this.db.replaceOne({_id: elem._id}, elem);
            return elem;
        } catch (e){
            console.log(e);
        }
    }
    async deleteById(id){
        try{
            const data = await this.db.deleteOne({_id: id});
            return data;
        }catch(e){
            console.log(e);
        }
    }
    async deleteAll(){
        try{
            const data = await this.db.deleteMany({});
            return data;
        } catch(e){
            console.log(e);
        }
    }
}


export default CRUDMongo;