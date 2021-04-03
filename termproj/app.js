import express from "express"
import morgan from "morgan"
import bodyParser from "body-parser"
import cors from "cors"
import path from "path"

let app = express()
const PORT = 4040

let server = require("http").Server(app)
let io = require("socket.io")(server)

// api routes
import api from "./api/v1/api.js"

// middleware
app.use(cors())
app.use(morgan("tiny"))
app.use(express.static("private"))
app.use(bodyParser.json({limit: '5mb'}))
app.use(bodyParser.urlencoded({limit: '5mb', extended: false}))
app.set("json spaces", 2)


app.get("/admin", (req, res) =>{
    res.status(200).json({"name": "harry"})
})


// register api routes on app
app.use("/api/v1", api)




server.listen(PORT, async () => {
    console.log("listening on port: ", PORT)
})


