
    class QuestionManager{
    constructor(){
        let questions = localStorage.getItem("qlist")
        if(questions == null){
            localStorage.setItem("qlist", JSON.stringify({}))
        }
        this.qlist = JSON.parse(localStorage.getItem("qlist"));
    }

    render(){
        for(let id in this.qlist){
            Question.render(id, true)
        }
    }

    count(){
        let count = 0;
        for(let prop in this.qlist){
            if(this.qlist.hasOwnProperty(prop))
                count++
        }
        return count;
    }
}