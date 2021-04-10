// TODO : Can we decompose this raw code into functions? not a fan of spaghetti code.

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


    /**
     * Trigger a custom event
     * @param {*} el the element 
     * @param {*} etype event type
     */
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
            // TODO : Ledger form validation and error handling
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
    // TODO : Validate usernames on change
        // let tagInput = H.d(".tag-input")
        // tagInput.addEventListener("DOMNodeInserted", async (event) => {
        //     if(event.srcElement.className == "title"){

        //     }
        // })

        // let usersTF = H.d("#ledger-users")
        // usersTF.addEventListener("change", async (event) =>{
        //     console.log("hello")
        // })


    
})


