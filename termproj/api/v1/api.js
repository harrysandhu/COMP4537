import fs from 'fs'
import express from "express"
import jwt from "jsonwebtoken"

let api = express.Router()



api.get("/test", async (req, res) =>{
    return res.json({"data": "this is a test"})  
})




module.exports = api
