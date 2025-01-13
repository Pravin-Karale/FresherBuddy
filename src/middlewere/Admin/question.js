const Joi = require('joi')
const config=require('../../config/config')
const messages=require('../../messages/commanMessages')
const {errResponce, successResponse}=require('../../messages//Responce')
const enums=require('../../utils/enum')

module.exports={


   // ****************** Add Quetion **************************
   addQuestion: (req, res, next) => {
        const schema = Joi.object().keys({
           Title: Joi.string().min(1).required() ,
            Description: Joi.string().min(1).required(),
            Tags:Joi.string().min(1).required(),
            Subject_id: Joi.number().integer().min(1).required(),
            Chapters:Joi.string().min(1).required()
        });
        if (schema.validate(req.body).error) {
            let error = schema.validate(req.body).error
            errResponce(res,enums.http_codes.BadRequest,config.errorCode,messages.NoRecordFound,messages.emptyString)
            return;
        } else {
            next();
        }
    },

   // ******************Update quetion**************************
   
    updateArticles:(req,res,next)=>{
        const schema=Joi.object().keys({
            id:Joi.number().integer().min(1).required(),
            Title: Joi.string().min(1).required() ,
            Description: Joi.string().min(1).required(),
            Tags:Joi.string().min(1).required(),
            Subject_id: Joi.number().integer().min(1).required(),
            Chapters:Joi.string().min(1).required()
        });
        if(schema.validate(req.body).error){
            let error=schema.validate(req.body).error
            errResponce(res,enums.http_codes.BadRequest,config.errorCode,messages.NoRecordFound,messages.emptyString)
            return
        }else{
            next();
        }
    },

  // ***************** Question Delete **********************
    deleteQuestion:(req,res,next)=>{
        const schema=Joi.object().keys({
            id:Joi.string().min(1).required()
        })
        console.log(req.params,"req.params");
        if (schema.validate(req.params).error) {
            let error = schema.validate(req.params).error
            console.log(error,"error");
            errResponce(res,enums.http_codes.BadRequest,config.errorCode,messages.NoRecordFound,messages.emptyString)
            return
        } else {
            next();
        }
    },

    
}