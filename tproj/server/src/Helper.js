export default class Helper{

    constructor(){}


static genId(){
        const length = 10;
        let seedText = "newUser";
        let chars =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
		seedText.toUpperCase() +
		"abcdefghijklmnopqrstuvwxyz" +
		seedText +
		"123456789";
	    let charLength = chars.length;
	    var result = "";
	    for (var i = 0; i < length; i++) {
		    result += chars[Math.floor(Math.random() * charLength)];
	    }   

    return result;

    }

}