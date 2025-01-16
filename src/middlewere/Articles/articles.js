const Joi = require('joi')
const config=require('../../config/config')
const messages=require('../../messages/commanMessages')

const enums=require('../../utils/enum')
const { errResponse } = require('../../messages/Responce')

module.exports={

    
   // ****************** Add Article **************************
   addArticles: (req, res, next) => {
        const schema = Joi.object().keys({
            article_author_id: Joi.number().min(1).required() ,
            title: Joi.string().min(1).required(),
            description:Joi.string().min(1).required(),
            content:Joi.string().min(1).required(),
            tags:Joi.string().min(1).required()
        });
        if (schema.validate(req.body).error) {
            let error = schema.validate(req.body).error
            console.log(error,"error");
            
            errResponse(res,enums.http_codes.BadRequest,config.errorCode,messages.NoRecordFound,messages.emptyString)
            return;
        } else {
            next();
        }
    },
// ******************Update Article**************************
updatearticle: (req, res, next) => {
    const schema = Joi.object().keys({
       
        article_author_id:Joi.number().min(1).required(),
        title: Joi.string().min(1).required(),
        description: Joi.string().min(1).required(),
        content: Joi.string().min(1).required(),
        tags: Joi.string().min(1).required(),

    });
    if (schema.validate(req.body).error) {
        let error = schema.validate(req.body).error
        console.log(error,"error");
        
        errResponse(res,enums.http_codes.BadRequest,config.errorCode,messages.NoRecordFound,messages.emptyString)
        return
    } else {
        next();
    }
},


// *****************Article  Deleted **********************
deleteArticle:(req,res,next)=>{
        const schema=Joi.object().keys({
            id:Joi.string().min(1).required()
        })
        if (schema.validate(req.params).error) {
            let error = schema.validate(req.params).error
            errResponse(res,enums.http_codes.BadRequest,config.errorCode,messages.NoRecordFound,messages.emptyString)
            return
        } else {
            next();
        }
    },

    
}