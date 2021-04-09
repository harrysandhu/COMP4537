
document.addEventListener("DOMContentLoaded", async (event)=>{
    try{
        let result = await User.verifyLogin()
        console.log(result)
        if(!result.user_id){
            window.location.href = "index.html"
        }
        let authToken = localStorage.getItem("uauthToken")
        let userData = await User.fetch_data(authToken)
        console.log(userData)
        if(userData.user_id){
            H._(document, ".username").textContent = userData.username
        }
    }catch(e){
        // window.location.href = "index.html"
        console.log(e)
        // window.location.href = "auth.html"
    }
    let logoutBtn = H._(document, ".logoutBtn")
    logoutBtn.addEventListener("click", async (event) => {
        try{
            localStorage.setItem("uauthToken", null)
            window.location.href = "index.html"
        }catch(e){
            alert("Unauthorized")
            console.log(e)
        }
    })
    function eventFire(el, etype){
        if (el.fireEvent) {
         (el.fireEvent('on' + etype));
        } else {
          var evObj = document.createEvent('Events');
          evObj.initEvent(etype, true, false);
          el.dispatchEvent(evObj);
        }
      }
    createBtn.addEventListener("click", async (event) =>{
        try{
           var myModal = document.getElementById('newLedgerModal')

            let ledger_name = H.d("#ledger-name").value
            let users = H.d("#ledger-users").value
            users = users.split(",")
            let authToken = localStorage.getItem("uauthToken")
            let create_result = await Ledger.createLedger(ledger_name, users, authToken)
            if(create_result){
                H.d("#ledger-name").value = ""
                H.d("#ledger-users").value = ""
                let tags = Array.from(document.getElementsByClassName("tag"))
                console.log(tags)
                tags.forEach(element => {
                    element.remove()
                });
                let cancelBtn = H.d("#cancelBtn")
                eventFire(cancelBtn,'click');

            }
            
        }catch(e){
            console.log(e)
        }
    })


})


