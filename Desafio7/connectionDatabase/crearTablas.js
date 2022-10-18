import knex from "knex";
import connection from "./db.js";

const knexsql = knex(connection);


knexsql.schema.createTableIfNotExists("mensajes", (table)=>{
    table.increments("id");
    table.string("date");
    table.string("email");
    table.string("msg");
}).then(() => {
    console.log("Tabla creada!");
}).catch((e) => {
    console.log(e);
}).finally(() => {
    knexsql.destroy();
});


knexsql.schema.createTableIfNotExists("productos", (table)=> {
    table.increments("id");
    table.string("tittle");
    table.integer("price");
    table.integer("stock");
    table.string("description");
    table.string("thumbnail");
}).then(() => {
    console.log("Tabla creada!!");
}).catch((e) => {
    console.log(e);
}).finally(() => {
    knexsql.destroy();
})
