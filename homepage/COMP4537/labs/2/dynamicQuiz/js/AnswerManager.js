
      class AnswerManager {
        constructor(){
         let questions = localStorage.getItem("qlist")
           if(questions == null){
               localStorage.setItem("qlist", JSON.stringify({}))
           }
           this.qlist = JSON.parse(localStorage.getItem("qlist"));
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


       static submit(){

         return function(){
           let am = new AnswerManager()
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