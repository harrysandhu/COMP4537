/*
    S T O N K - a sub 100-line routing library
    You like express?, You like php?, You will love Stonk.
    Stonk's Philosophy: "Let it rip or die a virgin 🌪"
*/
let http = require("http")
let fs = require("fs")
let path = require("path")
let urlLib = require('url');
const delay = ms => new Promise(res => setTimeout(res, ms));
const filetypes = require("./filetypes.js")
class Stonk{
    constructor(){
        this.get_routes = {}
        this.post_routes = {}
        this.res = {}
        this.req = {}
        this.appDir = "/"
        this.query = {}
    }
    get(url, f){
        if(url.includes("/:"))
        this.get_routes[url] = f
    }

    post(url, f){
        this.post_routes[url] = f
    }

    html(content, code){
        this.res.writeHead(200, {'Content-Type': 'text/html'});
        this.res.write(content)
        this.res.end()
    }

    files(appDir){
        this.appDir = appDir
    }

    serveFile(res, file){
        let filename = path.join(this.appDir + file)
            let readStream = fs.createReadStream(filename);
            readStream.on('error', function(error) {
                res.writeHead(404, 'Not Found');
                res.end();
            });
            readStream.pipe(res)
    }
 
    async rip(port, f){
        
        // starting stuff
        for(let i in [3, 2, 1]){
            console.log(3-i+".......")
            await delay(1000);
        }
        console.log("LET IT RIP!!!!!!!")
        console.log("Stonk is now ripping on port: ", port)
        f()
        // -----
        // create a base http server, and load the routes
        http.createServer((req, res)=>{
            // console.log(this)
             console.log(req.method, " :: ", req.url, " :: ", res.statusCode)
            let url = req.url
            this.req = req
            this.res = res
            console.log("URL", urlLib.parse(req.url))
            let pathname = urlLib.parse(req.url).pathname
            if(pathname.length > 1) if(pathname.endsWith("/")) pathname = pathname.slice(0, -1)
            this.query = urlLib.parse(req.url, true).query;
            if(req.method == 'GET'){
                if(this.get_routes.hasOwnProperty(pathname)){
                    this.get_routes[pathname](req, res)   
                }else{
                    this.serveFile(res, pathname)
                }
            }
            else if(req.method == 'POST'){
                if(this.post_routes.hasOwnProperty(pathname)){
                    this.post_routes[pathname](req, res)   
                }
            }else{
                res.end()
            }
            this.query = {}
          }).listen(port)
    }
}
module.exports = Stonk