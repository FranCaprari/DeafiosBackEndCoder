import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

export const DBConnect = (cb) => {
    mongoose.connect(`mongodb+srv://${process.env.DB_USER_MONGO}:${process.env.DB_PASS_MONGO}@ecommerce.gvjrdow.mongodb.net/${process.env.DB_NAME_MONGO}`,
    {useNewUrlParser: true},
    (error) =>{
        console.log("Conectado con exito.");
        if(error){
            console.log(error);
        }
        cb();
    }
     )
}


export const Users = mongoose.model("users", {
    username: String,
    password: String,
    email: String,
});