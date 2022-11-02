import admin from "firebase-admin";
import config from "../config";

admin.initializeApp({
    credential: admin.credential.cert(config.Firebase),
    databaseURL: ""
});
const db = admin.firestore();

class CRUDFireBase {
    constructor() {
        this.db = db;
        this.colllection = db.collection("carrito");
    }  
    async save(elem){
        try{
            const data = await this.colllection.add(elem);
            return data;
        } catch(e){
            console.log(e);
        }
    }

    async showAll(){
        try{
            const data = await this.colllection.get();
            const docs = data.docs;
            const salida = docs.map((doc) => ({
                id: doc.id, ...doc.data() 
            }));
            return salida;
        } catch(e){
            console.log(e);
        }
    }

    async showById(id){
        try{
            const data = await this.colllection.doc(id).get();
            return data.data();
        } catch(e){
            console.log(e);
        }
    }
    async update(id, elem){
        try{
            const data = await this.colllection.doc(id).update(elem);
            return data;
        } catch(e){
            console.log(e);
        }
    }

    async deleteById(id){
        try{
            const data = await this.colllection.doc(id).delete();
            return data;
        }catch(e){
            console.log(e);
        }
    }
}

export default CRUDFireBase;