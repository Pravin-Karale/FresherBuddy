const Joi = require('joi')
const config=require('../../config/config')
const messages=require('../../messages/commanMessages')
const {errResponce, successResponse}=require('../../messages//Responce')
const enums=require('../../utils/enum')

module.exports={


   // ****************** Add Subject **************************
   addSubject: (req, res, next) => {
        const schema = Joi.object().keys({
            title: Joi.string().min(1).required() 
        });
        if (schema.validate(req.body).error) {
            let error = schema.validate(req.body).error
            console.log(error,"error");
            
            errResponce(res,enums.http_codes.BadRequest,config.errorCode,messages.NoRecordFound,messages.emptyString)
            return;
        } else {
            next();
        }
    },

   // ******************Update Subject**************************
   
   updateSubject:(req,res,next)=>{
        const schema=Joi.object().keys({
            title: Joi.string().min(1).required() 
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

  // ***************** Subject Delete **********************
    deleteSubject:(req,res,next)=>{
        const schema=Joi.object().keys({
            id:Joi.number().integer().min(1).required()
        })
        if (schema.validate(req.params).error) {
            let error = schema.validate(req.params).error
            errResponce(res,enums.http_codes.BadRequest,config.errorCode,messages.NoRecordFound,messages.emptyString)
            return
        } else {
            next();
        }
    },

    
}