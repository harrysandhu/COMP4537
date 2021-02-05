/*
    S T O N K
        - a sub 100-line routing library
    You like express?, 
    You like php?,
    You will love Stonk.

    Stonk's Philosophy: "Let it rip or die a virgin 🌪"
*/
let http = require("http")
let fs = require("fs")
let path = require("path")
let urlLib = require('url');

const delay = ms => new Promise(res => setTimeout(res, ms));

class Stonk{
    constructor(){
        this.get_routes = {}
        this.post_routes = {}
        this.res = {}
        this.req = {}
        this.appDir = "/"
    }

    get(url, f){
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

    serveFile(file){
        fs.readFile(this.appDir + "/" + file, (err, dat) => {
            if (err){
                this.res.writeHead(404)
                this.res.end(JSON.stringify(err))
                return
            }
            this.res.writeHead(200)
            this.res.end(dat)
        })
    }

    async rip(port, f){
        
        // starting shit
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
            console.log(req.method, " :: ", req.url, " :: ", res.statusCode)
            let url = req.url
            this.req = req
            this.res = res
            if(req.method == 'GET'){
                if(this.get_routes.hasOwnProperty(url)){
                    this.get_routes[url](req, res)   
                }else{
                    fs.readFile(this.appDir + url, (err, dat) => {
                        if (err){
                            this.res.writeHead(404)
                            this.res.end(JSON.stringify(err))
                            return
                        }
                        this.res.writeHead(200)
                        this.res.end(dat)
                    })
                }
            }
            else if(req.method == 'POST'){
                if(this.post_routes.hasOwnProperty(url)){
                    this.post_routes[url](req, res)   
                }
            }else{
                res.end()
            }
          }).listen(port)
    }

    
}

module.exports = Stonk


