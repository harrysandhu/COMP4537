import express from "express"
import morgan from "morgan"
import bodyParser from "body-parser"
import cors from "cors"
const { createProxyMiddleware } = require('http-proxy-middleware');

let app = express()
const PORT = 4040

let server = require("http").Server(app)
let io = require("socket.io")(server)

// api routes
let api = require("./api/v1/api")

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


app.use('/op/api/v1', createProxyMiddleware({ target: 'https://truffen.com', changeOrigin: true }));


// register api routes on app
app.use("/op/api/v1", api)




server.listen(PORT, async () => {
    console.log("listening on port: ", PORT)
})




