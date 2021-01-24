let active_questions = 0
class Question{

    constructor(id, question, options, answer){
        this.id = id;
        this.question = question;
        this.options = options;
        this.answer = answer;
    }
    
    static parse(json_str){
        let o = JSON.parse(json_str);
        return new Question(o.id, o.question, o.options, o.answer)
    }

    static handleRender(){
        return function(){
            let qid = H.genid()
            Question.render(qid, false)
            active_questions += 1
        }
    }    

    static render(qid, exists){
        let qm = new QuestionManager();

        let template = H._(document, "#new-question");
        
        // template.id = 
        let c = document.importNode(template.content, true);
            
            c.id ="new-question-" + qid
        // ------- identify by qids ----------
        H._(c, ".container").id = "container-" + qid;

        H._(c, ".box").id = "box-" + qid

        for(let i = 0; i < 4; i++){
            H._(c, ".input-"+i).name = "input-" + qid;
            H._(c, ".radio-"+i).name = "radio-" + qid;
        }
        H._(c, ".submit").id = "submit-" + qid;
        H._(c, ".delete").id = "delete-" + qid
        // -----------------------------------
        H._(c, ".title").textContent = "Question " + Number(active_questions+1);
        H._(c, ".submit").addEventListener("click", Question.save(qid))
        H._(c, ".delete").addEventListener("click", Question.delete(qid))
        document.body.appendChild(c)

        if(exists){
            active_questions += 1
            let data = qm.qlist[qid];
            console.log(data)
            H._(document, "#box-"+qid).value = data.question
            let radios = H.n("radio-"+qid)
            let inputs = H.n("input-"+qid)

            for(let i = 0; i < 4; i++){
                inputs[i].value = data.options[i]
                if(data.options[i] == data.answer){
                    radios[i].checked = true
                }
            }
        }
    }



    static delete(id){
        return function(){
            let qm = new QuestionManager()
            if(qm.qlist.hasOwnProperty(id)){
                delete qm.qlist[id];
            }
            localStorage.setItem("qlist", JSON.stringify(qm.qlist))
            document.body.removeChild(H._(document, "#container-"+id))
            location.reload();
        }
    }


    static save(id){
        return function(){
            let question = H._(document, "#box-"+id).value;
            let radios = H.n("radio-"+id)
            let inputs = H.n("input-"+id) 
            let answer = null
            let input_values = []

            for(let i = 0; i < 4; i++){
                if(radios[i].checked){
                    answer = inputs[i].value;
                }
                input_values.push(inputs[i].value);
            }
            let q = new Question(id, question, input_values, answer);
            console.log(q)
            let qm = new QuestionManager()
            qm.qlist[id] = q
            console.log("new list", qm.qlist)
            localStorage.setItem("qlist", JSON.stringify(qm.qlist));
        }
    }
}


