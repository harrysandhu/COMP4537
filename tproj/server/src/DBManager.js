import Result from "./Result";
let mysql = require("mysql")
/**
 * DBManager provides an interface for all use cases.
 * 
 */
export default class DBManager{
    constructor(config){
        this.con = mysql.createConnection(config)
    }
    
    async insert(table, columns, values){
        return new Promise((resolve, reject) => {
            try{
                this.con.connect()
                let sql = "INSERT INTO ?? (??) VALUES (?)"
                sql = mysql.format(sql, [table, columns, values])
                this.con.query(sql, (error, results, fields) =>{
                    if (error) reject(error)
                    else{
                        resolve(results)
                    }
                })

            }catch(e){
                reject("Database error: cannot register admin")
            }finally{
                this.con.end()
            }  
        })
    }

    async select(table, columns, values){
        return new Promise((resolve, reject) => {
            try{
                this.con.connect()
                let sql = "SELECT ?? FROM ?? WHERE ?"
                sql = mysql.format(sql, [columns, table, values])
                this.con.query(sql, (error, results, fields) =>{
                    if (error) reject(error)
                    else{
                        resolve(JSON.parse(JSON.stringify(results)))
                    }
                })

            }catch(e){
                reject("Database error: cannot register admin")
            }finally{
                this.con.end()
            }  
        })
    }

}

