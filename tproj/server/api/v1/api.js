import fs from 'fs'
import express from "express"
import jwt from "jsonwebtoken"
import Result from '../../src/Result'
import Admin from '../../src/Admin'
import DBManager from '../../src/DBManager'

let api = express.Router()

let CONFIG = {
    user: "harryx",
    host: "db-mysql-nyc1-53815-do-user-1754324-0.b.db.ondigitalocean.com",
    password: "iz1udqdoydn51yas",
    port:25060,
    insecureAuth : true,
    database: "tproj"
}

/**Admin Resource
 * Endpoints:
 * 1. POST /admin/register
 * 2. POST /admin/login
 * 3. GET /admin
 */
api.post("/admin/register", async(req, res) => {
    try{
        // validate the request
        let {email, password, repeat_password} = req.body
        
        //create a DBManager instance (dependecy injection)
        let db = new DBManager(CONFIG)

        //validate, create, and register admin using db
        let result = await Admin.create({email, password, repeat_password}, db)
        if(result.get().isError){throw result}
        console.log(result)
        //if error result will be thrown as an error
        // by default, its a success.
        return res.status(200).json(result)
        
    }catch(e){
        if("get" in e){
            return res.status(400).json({error: e.get()})    
        }
        console.log(e)
        return res.status(400).json({error: "Invalid Request."})
    }
})

// api.post("/admin/login", async(req, res) =>{
//     try{

//     }catch(e)
// })


api.get("/test", async (req, res) =>{
    return res.json({"data": "this is a test"})  
})




module.exports = api
