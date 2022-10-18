import knex from "knex";

class DBfunctions {
    constructor(config, tabla){
        this.knex = knex(config);
        this.table = tabla;
    }
    async getAll(){
        try{
            return await this.knex.from(this.table).select("*");
        } catch(e){
            console.log(e)
        }
    }
    async getById(id){
        try{
            return await this.knex.from(this.table).select("*").where("id", id);
        }catch(e){
            console.log(e);
        }
    }
    async add(data){
        try{
            return await this.knex.insert(data).into(this.table);
        } catch(e){
            console.log(e);
        }
    }
    async update(id, data){
        try{
            return await this.knex(this.table).where("id", id).update(data);
        } catch(e){
            console.log(e);
        }
    }
    async delete(id){
        try{
            return await this.knex(this.table).where("id", id).del();
        } catch(e){
            console.log(e);
        }
    }
    async close() {
        try{
            await this.knex.destroy();
        } catch(e){
            console.log(e);
        }
    }
}


export default DBfunctions;