import Helper from './Helper'
import Result from './Result'
let crypto = require('crypto')
let sha256 = require('js-sha256')


const Joi = require('joi')


export default class Admin{
    static schema = Joi.object({
        email:  Joi.string()
        .email({ minDomainSegments: 2 })
        .required(),

        password: Joi.string()
        .min(3)
        .max(30)
        .required(),


        repeat_password: Joi.ref('password'),
    
    }).with("email")
    .with("password", "repeat_password")

    static async create(admin, db){
        try{
            let value = await Admin.schema.validateAsync(admin)
            admin.admin_id = Helper.genId()
            let salt = crypto.randomBytes(20).toString('hex');
            let password_hash = sha256.hmac(salt, password); 
            let insert_result = await db.insert("admin", 
                                                ["admin_id", "email", "password_hash", "salt"], 
                                                [admin.admin_id, admin.email, password_hash, salt])
            return insert_result
        }catch(e){
            return Result.Error(e)
        }
    }



}