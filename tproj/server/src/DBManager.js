import Result from "./Result";

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
                sql = mysql.format(sql, table, columns, values)
                this.con.query(sql, (error, results, fields) =>{
                    if (error) reject(Result.Error(error))
                    else{
                        resolve(Result.Success(results))
                    }
                })

            }catch(e){
                reject(Result.Error("Database error: cannot register admin"))
            }finally{
                this.con.end()
            }  
        })
    }


}

