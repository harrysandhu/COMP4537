document.addEventListener("DOMContentLoaded", async function(event) {
    let addBtn = H._(document, "#add-question");
    addBtn.addEventListener("click", Question.handleRender())
    let qm = new QuestionManager();
    await qm.setup()
    qm.render()
})