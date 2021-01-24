document.addEventListener("DOMContentLoaded", function(event) {
    let addBtn = H._(document, "#add-question");
    addBtn.addEventListener("click", Question.handleRender())
    let qm = new QuestionManager();
    qm.render()
})