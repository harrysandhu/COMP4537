let BASE_URL = "http://localhost:4040/COMP4537/labs/6" 

class AnswerManager {
        constructor(){
        //  let questions = localStorage.getItem("qlist")
        //    if(questions == null){
        //        localStorage.setItem("qlist", JSON.stringify({}))
        //    }
        //    this.qlist = JSON.parse(localStorage.getItem("qlist"));
        this.qlist = {}
        console.log(this.qlist)
      }
       render(){
        let count = 0;
         for(let id in this.qlist){
             count += 1;
             Answer.render(id)
         }
        if (count == 0) {
            alert("NO QUIZ")
        }
        
      }

      async setup(){
        this.qlist = await this.fetch_questions()
        console.log("QLIST", this.qlist)
    }

    fetch_questions(){
        return new Promise(async (resolve, reject) => {
            try{
                let res = await axios({
                    method: 'get',
                    url: BASE_URL + "/questions",
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Max-Age': 2592000, // 30 days
                    }   
                })
                if (res){
                    resolve(res.data.result)
                }
                else throw res
            }catch(e){
                console.log(e)
                reject("Couldn't fetch questions")
            }
        })
    }


       static submit(){

         return async function(){
           let am = new AnswerManager()
           await am.setup()
           console.log("yo")
             let answers = {}
             let total = 0
             let score = 0
               for(let id in am.qlist){
                 total += 1
                 score += 1
                 let data = am.qlist[id]
               console.log("data", data)
                   let qRadio = H.n("radio-"+id)
                   for(let i = 0; i < 4; i++){
                     if(data.options[i] == data.answer){
                       H._(document, ".input-"+id+"-"+i).style.color = "#3EC029"
                     }
                     if (qRadio[i].checked){
                       answers[id] = {"answer": data.options[i], "correct_answer":data.answer}
                     }
                   }
               }
               console.log(answers)

             for (let id in answers){
                 if(answers[id].answer != answers[id].correct_answer){
                   score -= 1
                   H._(document, "#container-"+id).style.backgroundColor = "#F4ACB0"
                 }else{
                    H._(document, "#container-"+id).style.backgroundColor = "#fff"
                 }

               }
               H._(document, "#score").innerHTML = "Your Score " + Number(score) + " / " + Number(total)

           }
       }
     }