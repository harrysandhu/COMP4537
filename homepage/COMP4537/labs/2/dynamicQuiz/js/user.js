let active_questions = 0
document.addEventListener("DOMContentLoaded", function(event){
    let qm = new AnswerManager()
    
    qm.render()
    H._(document, "#submit-answers").addEventListener("click", AnswerManager.submit())
})
