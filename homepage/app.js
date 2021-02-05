let http = require("http")
let fs = require("fs")
let path = require("path")
let appDir = path.dirname(require.main.filename)
let Stonk = require("./stonk.js")


const l4 = "COMP4537/labs/4";

let stonk = new Stonk()

// serve static content
stonk.files(appDir)


// routes
stonk.get("/", (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("Hello, world")
    res.end()
})

stonk.get("/ptest", (req, res) =>{
    stonk.html("Hello, world!!", 200)
})

// let it rip
stonk.rip(4444, () => {
    console.log("my 2 cents")
})





// http.createServer((req, res) => {

//     let url = req.url == "/" ? "/index.html" : req.url
//     console.log(url)
//     // switch(url){
        
//     //     case l4 + "/getDate":{

//     //         break;
//     //     }
//     //     case l4 + "/writei"
//     // }

//     // if(url == l4 + "/getDate")

//     fs.readFile(appDir + url, (err, dat) => {
//         if (err){
//             res.writeHead(404)
//             res.end(JSON.stringify(err))
//             return
//         }
//         res.writeHead(200)
//         res.end(dat)
//     })
// }).listen(4040)
