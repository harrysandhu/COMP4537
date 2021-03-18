
let BASE_URL = "http://localhost:4040/COMP4537/labs/6" 

class QuestionManager{
    constructor(){
        // let questions = localStorage.getItem("qlist")
        // if(questions == null){
        //     localStorage.setItem("qlist", JSON.stringify({}))
        // }
        // this.qlist = JSON.parse(localStorage.getItem("qlist"));
        this.qlist = {}
        console.log(this.qlist)
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

    save(question){
        return new Promise(async (resolve, reject) =>{
            console.log(question)
            try{
                let res = await axios({
                    method: 'post',
                    url: BASE_URL + "/question",
                    data: {
                        question: question
                    },
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Max-Age': 2592000, // 30 days
                    }
                })
                if(res)
                    resolve(res)
                else
                    throw res
            }catch(e){
                console.log(e)
                reject("COULDN\'T SAVE THE QUESTION")
            }
        })
    }   

}