import Result from './Result'

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
            let insert_result = db.insert(admin, ["email", "password", "repeat_password"], Object.values(admin))
            return insert_result
        }catch(e){
            return Result.Error(e)
        }
    }



}