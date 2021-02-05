const http = require('http');
const utils = require('./modules/utils');
const url = require('url');

http.createServer(function(req, res) {
    let adr = url.parse(req.url, true);
    let name = adr.query.name;
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("Hello " + name + ", here is the server's current date and time: " + utils.getDate())
    res.end();
}).listen(8080);

console.log("LISTENING ON 8080");
// server.listen();