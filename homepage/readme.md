## Stonk

### S T O N K   is a sub-100 line routing library written on top of node.js.


You like express?, You like php?, You will love Stonk.
Stonk's Philosophy: "Let it rip or die a virgin 🌪 


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
   stonk.get("/endpoint, (req, res) => {        
        let params = stonk.query   // stonk keeps track of the latest query params
   })

  // POST
  stonk.post("/resource, (req, res) => {
        let data = stonk.data  
  })


```

#### Serving static files

- In order to serve static files, you need to include the following:

```javascript
let appDir = path.dirname(require.main.filename)+ "/"
stonk.files(appDir)

```


