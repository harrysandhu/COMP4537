// let BASE_URL = "http://localhost:4040/op/api/v1"
// let BASE_URL = "https://truffen.com/op/api/v1"
// let API_KEY = "e5bG9U2NwD"
class Ledger{

    static async createLedger(ledger_name, users, authToken){
        return new Promise(async (resolve, reject) => {
            try{
                let res = await axios({
                    method: 'POST',
                    url: BASE_URL + "/ledger",
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Max-Age': 2592000,
                        'Authorization': authToken,
                        "x-api-key": API_KEY
                    },
                    data: {
                        ledger_name,
                        users
                    }
                })
                if (res){
                    resolve(res.data)
                }
                else throw res
            
            }catch(e){
                console.log(e)
                reject("Unauthorized")
            }
        })
    }

}