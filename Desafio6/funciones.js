const fs = require('fs');


class Contenedor{
    constructor(file){
        this.file = file;
    }


async save(obj){
    const database = await fs.readFileSync(this.file, "utf-8");
    const databasefinal = JSON.parse(database);
    const buscarproducto = databasefinal.find(({tittle}) => obj.tittle === tittle);
    try{ 
            obj.id = databasefinal.length + 1;
            databasefinal.push(obj);
            const databaseactualizada = JSON.stringify(databasefinal, null, " ");
            fs.writeFileSync(this.file, databaseactualizada);
            return obj.id;    
    }
    catch (error){
        console.log("Se produjo un error.");
    }
}

 async getById(id){
     const database = await fs.readFileSync(this.file, "utf-8");
     const productos = JSON.parse(database);
     const buscarid = productos.find((producto) => producto.id === id);
     try{
         if(buscarid){
             console.log(buscarid);
             return buscarid;
         }
         else{
             console.log("No se encontro el producto buscado.")
             return null;
         }
     }
     catch(error){
         console.log("Se produjo un error al buscar el producto.");
     }
    
    
}
async getAll(){
    const database = await fs.readFileSync(this.file, "utf-8");
    const productos = JSON.parse(database);
    try{
        if(productos.length>0){
            return productos;
        } else{
            console.log("No hay productos para mostrar.");
        }
    }
    catch(error){
        console.log("Se produjo un error al intentar mostrar los productos.")
    }
}

async deleteById(id){
    const database = await fs.readFileSync(this.file, "utf-8");
    const productos = JSON.parse(database);

    const productosrestantes = productos.filter((producto) => producto.id !== id );
    const buscarId = productos.find ((producto) => producto.id === id);
    try{
        if(buscarId){
            console.log(`Se elimino el prodcuto ${buscarId.tittle}`);
            const productosactualizados = JSON.stringify(productosrestantes, null, " ");
            fs.writeFileSync(this.file, productosactualizados);
            return (buscarId);
        }
        else{
            console.log("No se encontro el producto con ese id.");
        }
    }
    catch(error){
        console.log(`Se produjo un error al intentar eliminar el producto, ${error}`);
    }
}

async deleteAll(){
    try{
        console.log(`Se eliminaron todos los productos!`);
        await fs.writeFileSync(this.file, "[]");
    } catch(error){
        console.log(`Se produjo un error al intentar eliminar todos los productos, ${error}`);
    }
}
 async updateById(idIngresada, newObj){
    const database = await fs.readFileSync(this.file, "utf-8");
    let productos = JSON.parse(database);
    try{
        const otrosObj = productos.filter(({ id }) => id !== idIngresada);
        const idBuscado = productos.find(({ id }) => id == idIngresada);

        if(idBuscado){
            const idBuscado = { ...newObj, id: idIngresada};
            otrosObj.push(idBuscado);
            fs.writeFileSync(this.file, JSON.stringify(otrosObj, null, 2));
            return idBuscado; 
        }else{
            return null;
        }
    } catch(err){
        console.log(err);
    }
}
}

const file = "./productos.json";
const contenedor = new Contenedor(file);

let producto1 = {
    tittle: "Regla",
    price: 4000,
    thumbnail: "regla.imagen"
}
let producto2 = {
    tittle: "Libro",
    price: 4500,
    thumbnail: "libro.imagen"
}
let producto3 = {
    tittle: "Escuadra",
    price: 5000,
    thumbnail: "escuadra.imagen"
}


//contenedor.save(producto3);
//contenedor.getById(1);
//contenedor.getAll();
//contenedor.deleteById(1);
//contenedor.deleteAll();

// Dejo todas las ejecuciones comentadas.

module.exports = Contenedor;