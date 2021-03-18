let active_questions = 0
document.addEventListener("DOMContentLoaded", async function(event){
    let qm = new AnswerManager()
    await qm.setup()
    qm.render()
    H._(document, "#submit-answers").addEventListener("click", AnswerManager.submit())
})
