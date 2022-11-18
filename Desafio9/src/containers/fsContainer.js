import fs from 'fs';
import { arch } from 'os';
import normalizeData from '../others/data';

export default class fsContainer{
    constructor(ruta) {
        this.ruta = ruta;
    }

    async getArchivo(){
        try {
            const archivo = JSON.parse(await fs.promises.readFile(this.ruta, 'utf-8'));
            return archivo;
        } catch(error){
            console.log(error);
        }
    }

    async getNormalizedMensajes(){
        const archivo = await this.getArchivo();
        return normalizeData(archivo);
    }

    async save(mensaje){
        const archivo = await this.getArchivo();
        const mensajes = archivo.mensajes;
        mensajes.push({...mensaje});
        try{
            await fs.promises.writeFile(this.ruta, JSON.stringify(archivo));
        } catch(error){
            console.log(error);
        }
    }
}