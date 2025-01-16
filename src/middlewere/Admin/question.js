const Joi = require('joi')
const config=require('../../config/config')
const messages=require('../../messages/commanMessages')
const {errResponce, successResponse}=require('../../messages//Responce')
const enums=require('../../utils/enum')

module.exports={


   // ****************** Add Quetion **************************
   addQuestion: (req, res, next) => {
        const schema = Joi.object().keys({
            subject_id: Joi.number().integer().min(1).required(),
            chapter_id:Joi.number().min(1).required(),
            title: Joi.string().min(1).required(),
            description: Joi.string().min(1).required(),
            tags:Joi.string().min(1).allow("",null),
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
   
   updateQuestion:(req,res,next)=>{
        const schema=Joi.object().keys({
            subject_id: Joi.number().integer().min(1).required(),
            chapter_id:Joi.number().min(1).required(),
            title: Joi.string().min(1).required(),
            description: Joi.string().min(1).required(),
            tags:Joi.string().min(1).allow("",null),
        });
        if(schema.validate(req.body).error){
            console.log(error,"error");
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
            id:Joi.number().integer().min(1).required()
        })
        if (schema.validate(req.params).error) {
            console.log(error,"error");
            
            let error = schema.validate(req.params).error
            errResponce(res,enums.http_codes.BadRequest,config.errorCode,messages.NoRecordFound,messages.emptyString)
            return
        } else {
            next();
        }
    },

    
}