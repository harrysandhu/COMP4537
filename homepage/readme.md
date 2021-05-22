## Stonk

### S T O N K ----- is a sub-100 line routing library written on top of Node.js.


You like express?, You like php?, You will love Stonk.
Stonk's Philosophy: "Let it rip or die a virgin 🌪 


- prof didnt allow express. so we made one. cuz we can.


### Docs

* Stonk currently supports 2 request methods, GET and POST.


#### Import and initialize

```javascript

const Stonk = require('stonk')
let stonk = new Stonk()
```

- This instance of stonk manages:
    - requests
    - responses
    - parameters
    - static file server
    - 404 page
    - !!COMING SOON: dynamic url

 

#### Routing and Parameters

- Stonk's routing API is very similar to express.

```javascript
  
  // GET
  stonk.get("/endpoint", (req, res) => {        
        let params = stonk.query   // stonk keeps track of the latest query params
   })

  // POST
  stonk.post("/resource", (req, res) => {
        let data = stonk.data  
  })

```

#### Serving static files

- In order to serve static files, you need to include the following:

```javascript
let appDir = path.dirname(require.main.filename)+ "/"
stonk.files(appDir)

```

#### Serving raw HTML

- Stonk allows you to serve raw html as a string

```javascript
stonk.html("<h3>Hello, world</h3>", <STATUS_CODE>)

```

#### Serving custom static files

- Stonk uses node.js's fs.createReadStream to create a readstream and then sends it through a 
pipline using readstream.pipe(res), so that you dont have any errors with loading large files.


- This gives stonk a full file server capability.

```javascript
stonk.serveFile(res, "myFile.txt")
```



#### TO RUN

- Stonk doesn't really run, it RIPS.

- To rip stonk,

```javascript
stonk.rip(PORT, ()=>{
    console.log("Stonk is ripping now.")
})
```

-----

### TODOs:

- Testing
- Clean-up some of the string processing code
- Support for dynamic URLs
- Even simpler API and tighter code
- Performance








