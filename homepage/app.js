let http = require("http")
let fs = require("fs")
let path = require("path")
let appDir = path.dirname(require.main.filename)+ "/"
let Stonk = require("./stonk.js")
const L4 = "/COMP4537/labs/4";
const utils = require('./' + L4 + '/modules/utils');
const L = (n) => {return "/COMP4537/labs/" + String(n)}


let stonk = new Stonk()

// serve static content
stonk.files(appDir)

// routes
stonk.get("/", (req, res) => {
    stonk.serveFile(res, "index.html")
})


stonk.get(path.join(L(4), "getDate"), (req, res) => {
    try{
        let name = stonk.query.name
        stonk.html("Hello " + name + ", here is the server's current date and \
                    time: " + utils.getDate(), 200)
    }catch(e){
        console.log(e)
        stonk.html("Invalid Request: You need to provide your name", 400)
    }
})

stonk.get(path.join(L(4), "writeFile"), (req, res) => {
    try{
        let content = " " + stonk.query.text + " ";
        if(stonk.query.text == "undefined" || stonk.query.text.length == 0){
            throw "ERROR"
        }
        fs.appendFile('./COMP4537/labs/4/readFile/file.txt', content, function (err) {
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


stonk.get(path.join(L(5), "readDB"), (req, res) => {
    try{
        console.log("jel")
        
        stonk.json(JSON.stringify(s), 200)
    }catch(e){
        stonk.html("400", 400)
    }
})

stonk.get(path.join(L(5), "writeDB"), (req, res) => {
    try{
        stonk.json(JSON.stringify({"message": "it worked!!"}), 200)
    }catch(e){  
        stonk.html("404", 400)
    }
})


// let it rip
stonk.rip(4040, () => {
    console.log("my 2 cents")
})

