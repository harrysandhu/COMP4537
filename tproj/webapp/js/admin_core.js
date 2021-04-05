document.addEventListener("DOMContentLoaded", async (event)=>{
    try{
        let result = await Admin.verifyLogin()
        if(!result.admin_id){
            window.location.href = "auth.html"
        }
        let authToken = localStorage.getItem("authToken")
        let adminData = await Admin.fetch_data(authToken)
        if(adminData.admin_id){
            H._(document, ".username").textContent = adminData.username
            H._(document, ".api_token").textContent = adminData.admin_id
        }
    }catch(e){
        window.location.href = "auth.html"
    }
    let logoutBtn = H._(document, ".logoutBtn")
    logoutBtn.addEventListener("click", async (event) => {
        try{
            localStorage.setItem("authToken", null)
            window.location.href = "auth.html"
        }catch(e){
            alert("Unauthorized")
            console.log(e)
        }
    })
})


