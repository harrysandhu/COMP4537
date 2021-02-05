let http = require("http")
let fs = require("fs")
let path = require("path")
let appDir = path.dirname(require.main.filename)+ "/"
let Stonk = require("./stonk.js")
const L4 = "/COMP4537/labs/4";
const utils = require('./' + L4 + '/modules/utils');

let stonk = new Stonk()

// serve static content
stonk.files(appDir)

// routes
stonk.get("/", (req, res) => {
    stonk.serveFile(res, "index.html")
})

stonk.get("/ptest", (req, res) =>{
    stonk.html("<h1>Hello, world!!</h1>", 200)
})

stonk.get(path.join(L4 + "/getDate"), (req, res) => {
    try{
        let name = stonk.query.name
        stonk.html("Hello " + name + ", here is the server's current date and time: " + utils.getDate(), 200)
    }catch(e){
        console.log(e)
        stonk.html("Invalid Request: You need to provide your name", 400)
    }
})

stonk.get(path.join(L4 + "/writeFile"), (req, res) => {
    try{
        let content = stonk.query.text;
        fs.appendFile('file.txt', content, function (err) {
            if (err) throw err;
            stonk.html("<h1>SAVED!</h1>", 200)
            console.log("Saved!");
        });
    }
    catch(e){
        console.log(e)
        stonk.html("Invalid Request: You need to provide content", 400)
    }
})

// let it rip
stonk.rip(4040, () => {
    console.log("my 2 cents")
})

