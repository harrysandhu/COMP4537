let http = require("http")
let fs = require("fs")
let path = require("path")
let appDir = path.join(path.dirname(require.main.filename), "/")
let Stonk = require("./stonk.js")
const L4 = "/COMP4537/labs/4";
const utils = require('./' + L4 + '/modules/utils');
const L = (n) => {return "/COMP4537/labs/" + String(n)}
const mysql = require('mysql');

const con = mysql.createConnection({
  user: "harryx",
  host: "db-mysql-nyc1-53815-do-user-1754324-0.b.db.ondigitalocean.com",
  password: "iz1udqdoydn51yas",
  port:25060,
  insecureAuth : true,
  database: "quiz"
});



const dbConnection = mysql.createConnection({
  host: "s11.fcomet.com",
  user: "harryx",
  password: "thisisapassword",
  database: "sarahesl_isa-quiz"
});



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

        let sql = "SELECT * FROM score"
        con.query(sql, function(err,  result, fields){
            if (err) throw err;
            stonk.json(JSON.stringify(result), 200)

        })
    
    }catch(e){
        stonk.html("400", 400)
    }
})

stonk.get(path.join(L(5), "writeDB"), (req, res) => {
    try{
        let {name, score} = stonk.query
        let sql = "INSERT INTO score (name, score) VALUES ('"+name+"','"+score+"')"
        con.query(sql, function(err,  result){
            if (err) throw err;
            console.log("record"+ JSON.stringify(result))
        })
        stonk.json(JSON.stringify({"message": "it worked!!"}), 200)
    }catch(e){  
        stonk.html("404", 400)
    }
})


stonk.post(path.join(L(6), "question"), (req, res) => {
    try{
        let {question} = stonk.data
        console.log(question)
        let sql = "SELECT * FROM questions WHERE id = ? "
        con.query(sql,[question.id], function(err,  result){
            if (err) throw 'error2';
            console.log("RESULT QUES", result)
       
            if(result.length == 0){
                let sql = "INSERT INTO questions (id, question) VALUES ('"+question.id+"','"+question['question']+"')"
      
                con.query(sql, function(err,  result){
                    if (err) throw 'error1';
                    console.log("record"+ JSON.stringify(result))
                })
              
                console.log("THIS IS COOL")
                sql = "SELECT * FROM options WHERE questionId = ? "
                con.query(sql,[question.id], function(err,  result){
                    if (err) throw 'error2';
                    console.log("RESULT QUES", result)
                        if(result.length == 0){
                            let sql = "INSERT INTO options (questionID, answer, isCorrect) VALUES ?";
                            let values = []
                            let {id, options, answer} = question
                            let isCorrect = 0
                            for(let i = 0; i < 4; i++){
                                let f = []
                                isCorrect = 0
                                if(answer == options[i]){
                                    isCorrect = 1
                                }
                                f.push(id)
                                f.push(options[i])
                                f.push(isCorrect)
                                values.push(f)
                            }
                            console.log(values)
                            con.query(sql, [values], function(err,  result){
                                if (err) throw 'err2';
                                console.log("record"+ JSON.stringify(result))
                            })
                            stonk.json(JSON.stringify({"message": "it worked!!"}), 200)
                        }else{
                            throw 'error: duplicate question 1'
                        }
            })  
            }else{
               stonk.json(JSON.stringify({"message": "it worked!!"}), 200)
            }
            
        })
        
    }catch(e){
        stonk.json(JSON.stringify({"error": e}), 400)
    }
})


stonk.get(path.join(L(6), "questions"), (req, res) => {
    let sql = "SELECT * FROM options JOIN questions ON questions.id = options.questionID"
    con.query(sql, function(err,  result){
        if (err) throw 'error2';
        console.log("RESULT QUES", result)
        let res = JSON.parse(JSON.stringify(result))
        console.log(res)
        let data = {}
        let i = 0
        while(i < res.length){
            let cid = res[i]['questionID']
            data[cid] = {"id": cid, 
                        "question": res[i]["question"], 
                        "options":[], 
                        "answer": ""}
            for(let j = 0; j < 4; j++){
                data[cid]["options"].push(res[i+j]["answer"])
                if(res[i+j]["isCorrect"]["data"][0] == 1){
                    data[cid]["answer"] = res[i+j]["answer"]
                } 
            }
            i += 4
        }
        stonk.json(JSON.stringify({"result": data}), 200)
    })
})



stonk.get("/s/questions", (req, res) => {
  try {
    let query = "SELECT * FROM questions JOIN options ON questions.id = options.questionID";
    dbConnection.query(query, function(err, result, fields) {
      console.log(result);
      stonk.json(JSON.stringify(result), 200);
    });
  }

  catch(e) {
    stonk.html("400", 400);
  }
});

stonk.post("/s/addQuestion", (req, res) => {
  try {
    let data = stonk.data;
    console.log(data);
    let addQuestion = "INSERT INTO questions (id, question) VALUES ('"+data.id+"', '"+data.question+"')";
    dbConnection.query(addQuestion, function(err, result, fields) {
      let addOptions = "INSERT INTO options (questionID, answer, isCorrect) VALUES ?";
      let values = []
      let {id, options, isCorrect} = data
      for(let i = 0; i < 2; i++){
          let f = []
          f.push(id)
          f.push(options[i])
          f.push(isCorrect[i])
          values.push(f)
      }
      console.log(values)
      dbConnection.query(addOptions, [values], function(err,  result){
          if (err) throw 'err2';
          console.log("record"+ JSON.stringify(result))
      })
      stonk.json(JSON.stringify(result), 200);
    });
  }

  catch(e) {
    stonk.html("400", 400);
  }
})

dbConnection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


// let it rip
stonk.rip(4040, () => {
    console.log("my 2 cents")
})

