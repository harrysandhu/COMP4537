
class Answer{
    static render(qid){

        let qm = new AnswerManager()
        console.log(qm.qlist)
        let template = H._(document, "#new-question");
        let c = document.importNode(template.content, true);
    
        c.id ="new-question-" + qid
        // ------- identify by qids ----------
        H._(c, ".container").id = "container-" + qid;

        H._(c, ".box").id = "box-" + qid

        for(let i = 0; i < 4; i++){
            H._(c, ".input-"+i).className = "input-" + qid + "-" + i;
            H._(c, ".radio-"+i).name = "radio-"+ qid;
        }

        // -----------------------------------
        H._(c, ".title").textContent = "Question " + Number(active_questions+1);
        document.body.appendChild(c)
        let data = qm.qlist[qid];
        console.log(data)
        active_questions += 1
        H._(document, "#box-"+qid).value = data.question
        let radios = H.n("radio-"+qid)
        let inputs = H._(document, ".input-"+qid)
        console.log(inputs)
        for(let i = 0; i < 4; i++){
        H._(document, ".input-"+qid+"-"+i).innerHTML = data.options[i]
        //if(data.options[i] == data.answer){
            //  radios[i].checked = true
        //}
    }
    }
}
