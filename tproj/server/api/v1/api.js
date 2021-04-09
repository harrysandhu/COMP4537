import fs from 'fs'
import express from "express"
import jwt from "jsonwebtoken"
import Result from '../../src/Result'
import Admin from '../../src/Admin'
import DBManager from '../../src/DBManager'
import { verify } from 'crypto'
import Helper from '../../src/Helper'
import User from '../../src/User'
let path = require("path")
let api = express.Router()
let privateKey = fs.readFileSync("./src/security/private.key", "utf8");
let publicKey = fs.readFileSync("./src/security/public.key", "utf8");

let CONFIG = {
    user: "harryx",
    host: "db-mysql-nyc1-53815-do-user-1754324-0.b.db.ondigitalocean.com",
    password: "iz1udqdoydn51yas",
    port:25060,
    insecureAuth : true,
    database: "tproj"
}

api.use(express.static(__dirname))

/**Admin Resource
* Endpoints:
* 1. POST /admin/register
* 2. POST /admin/login
* 3. GET /admin
*/
api.post("/admin/register", async(req, res) => {
    try{
        // validate the request
        let {username, password, repeat_password} = req.body
        
        //create a DBManager instance (dependecy injection)
        let db = new DBManager(CONFIG)
        
        //validate, create, and register admin using db
        let result = await Admin.create({username, password, repeat_password}, db)
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



api.post("/user/register", async(req, res) => {
    try{
        // validate the request
        let {username, password, repeat_password} = req.body
        
        //create a DBManager instance (dependecy injection)
        let db = new DBManager(CONFIG)
        
        //validate, create, and register admin using db
        let result = await User.create({username, password, repeat_password}, db)
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

api.post("/admin/login", async(req, res) =>{
    try{
        let {username, password} = req.body
        let db = new DBManager(CONFIG)
        let result = await Admin.login({username, password}, db)
        return res.status(200).json(result)
    }catch(e){
        if("get" in e){
            return res.status(400).json({error: e.get()})    
        }
        console.log(e)
        return res.status(400).json({error: "Invalid Request."})
    }
})

api.post("/user/login", async(req, res) =>{
    try{
        let {username, password} = req.body
        let db = new DBManager(CONFIG)
        let result = await User.login({username, password}, db)
        return res.status(200).json(result)
    }catch(e){
        if("get" in e){
            return res.status(400).json({error: e.get()})    
        }
        console.log(e)
        return res.status(400).json({error: "Invalid Request."})
    }
})

api.get("/admin", Helper.verifyAuthToken, async(req, res)=>{
    try{
        let currentUser = await Helper.jwtVerifyUser(req.token, publicKey)
        // get user data and merge it into user object
        let db = new DBManager(CONFIG)
        let api_data = await Admin.fetch_endpoint_data(currentUser.admin_id, db)
        console.log("api_data", api_data.get())
        return res.json({...currentUser, "api_data":api_data.get()})
    }catch(e){
        if("get" in e){
            return res.status(400).json({error: e.get()})    
        }
        console.log(e)
        return res.status(400).json({error: "Invalid Request."})
    }
})

api.get("/user", 
async (req, res, next) =>{
    await Helper.verifyRequest(req, res, next, new DBManager(CONFIG))
},
Helper.verifyAuthToken,
async (req, res) =>{
    try{
        let currentUser = await Helper.jwtVerifyUser(req.token, publicKey)
        // get user data -> ledgers and shit and merge it into user object
        return res.json({...currentUser})
    }catch(e){
        if("get" in e){
            return res.status(400).json({error: e.get()})    
        }
        console.log(e)
        return res.status(400).json({error: "Invalid Request."})
    }
}
)


api.get("/ledgers", 
async (req, res, next) =>{
    await Helper.verifyRequest(req, res, next, new DBManager(CONFIG))
},
Helper.verifyAuthToken, 
async (req, res) =>{
    try{
        let currentUser = await Helper.jwtVerifyUser(req.token, publicKey)
        let db = new DBManager(CONFIG)
        // let ledgers = await User.get_all_ledgers(currentUser.user_id, db)
        let ledgers = [1, 2, 3]
        // get user data -> ledgers and shit and merge it into user object
        return res.json(ledgers)
    }catch(e){
        if("get" in e){
            return res.status(400).json({error: e.get()})    
        }
        console.log(e)
        return res.status(400).json({error: "Invalid Request."})
    }
}
)



// create a new ledger
api.post("/ledger", 
async (req, res, next) =>{
    await Helper.verifyRequest(req, res, next, new DBManager(CONFIG))
},
Helper.verifyAuthToken, 
async (req, res) =>{
    try{
        let currentUser = await Helper.jwtVerifyUser(req.token, publicKey)
        let db = new DBManager(CONFIG)
        let {user_id} = currentUser
        let {ledger_name, users} = req.body


        // get user data -> ledgers and shit and merge it into user object
        return res.json({ledger_name, users})
    }catch(e){
        if("get" in e){
            return res.status(400).json({error: e.get()})    
        }
        console.log(e)
        return res.status(400).json({error: "Invalid Request."})
    }
}
)



api.get("/ledger/:id", 
async (req, res, next) =>{
    let r = req
    r.url = "/ledger/:id"
    await Helper.verifyRequest(r, res, next, new DBManager(CONFIG))
},
Helper.verifyAuthToken,
async (req, res) =>{
    try{
        let ledger = "sample ledger"
        // get user data and merge it into user object
        return res.json({ledger})
    }catch(e){
        if("get" in e){
            return res.status(400).json({error: e.get()})    
        }
        console.log(e)
        return res.status(400).json({error: "Invalid Request."})
    }
}
)







module.exports = api
