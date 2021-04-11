// TODO : Can we decompose this raw code into functions? not a fan of spaghetti code.
function render(l) {
    let id = l.ledger_id
        // H.d(".ledger_template").className = id
    H.d(".ledger_template").id = "ledger_template-" + id
    let t = H.d("#ledger_template-" + id)
    let c = document.importNode(t.content, true)
    c.id = "ledger-" + id

    H._(c, ".card-title").id = "card-title-" + id
    H._(c, "#card-title-" + id).innerHTML = l.ledger_name

    H._(c, ".card-subtitle").id = "card-subtitle-" + id
    let subtitle = H._(c, "#card-subtitle-" + id)
   
   
    for (let u of l.users) {
        let utag = document.createElement("span")
        utag.className = "tag-" + id + "-" + u.username
        let tagt = document.createElement("span")
        tagt.className = "title-" + id
        tagt.textContent = "@" + u.username
        utag.appendChild(tagt)
        console.log(utag)
        subtitle.appendChild(utag)

        if (u.user_id == l.created_by) {
            utag.style.cssText = "display:-webkit-inline-box;display:inline-flex;-webkit-box-pack:justify;justify-content:space-between;-webkit-box-align:start;align-items:flex-start;position:relative;margin:2px;padding:0;height:26px;line-height:26px;background-color:#7a7a7a;cursor:default"
            tagt.style.cssText = "color:#fff; display:block;position:relative;font-size:14px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;margin:0 8px"
        } else {
            utag.style.cssText = "display:-webkit-inline-box;display:inline-flex;-webkit-box-pack:justify;justify-content:space-between;-webkit-box-align:start;align-items:flex-start;position:relative;margin:2px;padding:0;height:26px;line-height:26px;background-color:#c4c4c4;cursor:default"
            tagt.style.cssText = "color:#000; display:block;position:relative;font-size:14px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;margin:0 8px"
        }

    }
    document.body.appendChild(c)
}

document.addEventListener("DOMContentLoaded", async(event) => {
    try {
        let result = await User.verifyLogin()
        console.log(result)
        if (!result.user_id) {
            window.location.href = "index.html"
        }

        let authToken = localStorage.getItem("uauthToken")
         let userData = await User.fetch_data(authToken)
        console.log(userData)
        if (userData.user_id) {
            H._(document, ".username").textContent = userData.username
        }
        let url = new URL(window.location.href)
        console.log(url)
        let lid = url.search.split("&")[0].split("?id=")[1]
        if(lid != null){
            console.log(lid)
            let ledger = await Ledger.get_by_id(lid, authToken)
            render(ledger[0])
            console.log(ledger)
        }else{
            H.d(".page_code").textContent = "404"
            H.d(".page_status").textContent = "Page Not Found"
            H.d(".page_status").style.cssText = "font-size:30px"
            H.d(".page_code").style.cssText = "font-size:80px"
        }
        
        // let userData = await Ledger.get(authToken)

        // if (userData.user_id) {
        //     H._(document, ".username").textContent = userData.username
        // }
    } catch (e) {
        // window.location.href = "index.html"
        console.log(e)
            // window.location.href = "auth.html"
    }
     let logoutBtn = H._(document, ".logoutBtn")
    logoutBtn.addEventListener("click", async(event) => {
        try {
            localStorage.setItem("uauthToken", null)
            window.location.href = "index.html"
        } catch (e) {
            alert("Unauthorized")
            console.log(e)
        }
    })



    /**
     * Trigger a custom event
     * @param {*} el the element 
     * @param {*} etype event type
     */
    function eventFire(el, etype) {
        if (el.fireEvent) {
            (el.fireEvent('on' + etype));
        } else {
            var evObj = document.createEvent('Events');
            evObj.initEvent(etype, true, false);
            el.dispatchEvent(evObj);
        }
    }
})