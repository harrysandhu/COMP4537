// const http = require('http');
// const url = require('url');
// const fs = require('fs');
// const utils = require('./modules/utils');


// http.createServer(function(req, res) {
//     let adr = url.parse(req.url, true);
    
//     if (adr.pathname == "/getDate") {
//         let name = adr.query.name;
//         res.writeHead(200, {'Content-Type': 'text/html'});
//         res.write("Hello " + name + ", here is the server's current date and time: " + utils.getDate())
//         res.end();
//     }

//     else if (adr.pathname == "/writeFile") {
//         let content = adr.query.text;
//         fs.appendFile('file.txt', content, function (err) {
//             if (err) throw err;
//             console.log("Saved!");
//         });
//     }

//     else if (adr.pathname == "/readFile/file.txt") {
//         fs.readFile("file.txt", function (err, data) {
//             if (err) {
//                 res.writeHead(404, {'Content-Type': 'text/html'});
//                 return res.end(adr.pathname + "404 Not Found!");
//             }

//             res.writeHead(200, {'Content-Type': 'text/html'});
//             res.write(date);
//             return res.end();
//         });
//     }
// }).listen(8080);

// console.log("LISTENING ON 8080");