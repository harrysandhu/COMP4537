var mysql = require('mysql');

var con = mysql.createConnection({
  user: "doadmin",
  host: "db-mysql-nyc1-53815-do-user-1754324-0.b.db.ondigitalocean.com",
  password: "x4eggesk315ahf8c",
  port:25060,
  insecureAuth : true,
  database: "defaultdb"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});