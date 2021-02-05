let http = require("http")
let fs = require("fs")
let path = require("path")
let appDir = path.dirname(require.main.filename)



http.createServer((req, res) => {

    let url = req.url == "/" ? "/index.html" : req.url
    fs.readFile(appDir + url, (err, dat) => {
        if (err){
            res.writeHead(404)
            res.end(JSON.stringify(err))
            return
        }
        res.writeHead(200)
        res.end(dat)
    })
}).listen(4040)
