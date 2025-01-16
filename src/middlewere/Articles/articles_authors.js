const Joi = require('joi')
const config=require('../../config/config')
const messages=require('../../messages/commanMessages')

const enums=require('../../utils/enum')
const { errResponse } = require('../../messages/Responce')

module.exports={

    
   // ****************** Add Quetion **************************
   addArticleAuthor: (req, res, next) => {
        const schema = Joi.object().keys({
            name: Joi.string().min(1).required() ,
            email: Joi.string().min(1).required()
            
        });
        if (schema.validate(req.body).error) {
            let error = schema.validate(req.body).error
            errResponse(res,enums.http_codes.BadRequest,config.errorCode,messages.NoRecordFound,messages.emptyString)
            return;
        } else {
            next();
        }
    },
    
}