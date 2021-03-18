var mysql = require('mysql');

var con = mysql.createConnection({
  user: "harryx",
  host: "db-mysql-nyc1-53815-do-user-1754324-0.b.db.ondigitalocean.com",
  password: "iz1udqdoydn51yas",
  port:25060,
  insecureAuth : true,
  database: "quiz"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("Select now()",  function (err, result, fields) {
    if (result) console.log(result)
    if (err) throw err;
    console.log(err);
  });
});