import fs from 'fs'
import express from "express"
import jwt from "jsonwebtoken"
import Result from '../../src/Result'
import Admin from '../../src/Admin'
import DBManager from '../../src/DBManager'
import { verify } from 'crypto'
import Helper from '../../src/Helper'

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

api.get("/admin", Helper.verifyAuthToken, async(req, res)=>{
    try{
        let currentUser = await Helper.jwtVerifyUser(req.token, publicKey)
        // get user data and merge it into user object
        return res.json(currentUser)
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
        Helper.verifyRequest(req, res, next, new DBManager(CONFIG))
    },
    Helper.verifyAuthToken,
    async (req, res) =>{
        try{
            let currentUser = "sample user"
            // get user data -> ledgers and shit and merge it into user object
            return res.json({user: currentUser, ledger: [1, 2, 3, 4]})
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
    async (req, res) =>{
        try{
            console.log("url: ", req.url)
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
