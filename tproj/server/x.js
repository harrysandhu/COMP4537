
let mysql = require("mysql")
let sql = "INSERT INTO ?? (??) VALUES (?)"
sql = mysql.format(sql, ["admin", ["email", "password_hash"], ["dddd", "fdfd"]])
console.log(sql)