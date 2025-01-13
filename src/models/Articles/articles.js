const messages = require("../../messages/commanMessages");
const config = require("../../config/config");
const enums = require("../../utils/enum");
const articles = require("../../services/Articles/articles");
const { errResponse, successResponse } = require("../../messages/Responce");

module.exports = {

// ****************** Articles Lists ************************
getArticlesList: async (req, res, result) => {
  var pageNo = req.params.pageNo;
  var pageSize = req.params.pageSize;
  let newPageNo = pageNo * pageSize;

  const getArticlesList = await articles.getArticlesList(
    pageNo,
    pageSize,
    res
  );

 
  if (getArticlesList.length == 0) {
    errResponse(
      res,
      enums.http_codes.BadRequest,
      config.errorCode,
      messages.ArticleError,
      messages.NoRecordFound
    );
    return;
  }
  successResponse(
    res,
    enums.http_codes.OK,
    config.successCode,
    messages.getArticlesList,
    getArticlesList
  );
  return;
},


// ****************** Add Articles **************************

  addArticles: async (req, res, result) => {
    var title = req.body.title;
    var description = req.body.description;
    var tags = req.body.tags;
    var content= req.body.content;
    var author = req.body.author;
    const ArticlesResponse = await articles.addArticles(
      title,
      description,
      tags,
      content,
      author
    );
    if (ArticlesResponse.length != 0) {
      errResponse(
        res,
        enums.http_codes.BadRequest,
        config.errorCode,
        messages.ArticleError,
        messages.authenticationFeild
      );
      return;
    }
    successResponse(
      res,
      enums.http_codes.OK,
      config.successCode,
      messages.ArticleAdded,
      messages.emptyString
    );
    return;
  },

  
   // ***************** Articles Details **********************
   getArticlesDetails: async (req, res, result) => {
     var id = req.params.id;
     const getArticlesDetails = await articles.getArticlesDetails(id, res);
     if (getArticlesDetails.length == 0) {
       errResponse(
         res,
         enums.http_codes.BadRequest,
         config.errorCode,
         messages.questionError,
         messages.NoRecordFound
       );
       return;
     }
     successResponse(
       res,
       enums.http_codes.OK,
       config.successCode,
       messages.getQuestionDeatails,
       getArticlesDetails
     );
     return;
   },

  // ******************Update Articles**************************
   updatearticle: async (req, res, result) => {

    var id = req.params.id;
    var title = req.body.title;
    var description = req.body.description;
    var tags = req.body.tags;
    var content = req.body.content;
    var authors = req.body.authors;

    const selectarticleResponce = await articles.selectarticle(id, res);
    console.log(selectarticleResponce,"selectarticleResponce");
     
    if (selectarticleResponce.length == 0) {
        errResponse(res, enums.http_codes.BadRequest, config.errCodeNoRecordFound,messages.NoRecordFound,messages.emptyString )
        return
    }
    const updatearticleResponce = await articles.updatearticle(id,title,description,tags,content,authors,res);
    console.log(updatearticleResponce, "updatearticleResponce");
    if (updatearticleResponce.length != 0) {
        errResponse(res, enums.http_codes.InternalServerError, config.errorCode,messages.ArticleUpdateError,messages.emptyString)
        return
    }
    successResponse(res, enums.http_codes.OK, config.successCode, messages.ArticleUpdate,updatearticleResponce)
},


  
 // ***************** Article Deleted **********************
   
   deleteArticle: async (req, res, result) => {
       const id = req.params.id;
   
       const selecteArticle = await articles.selecteArticle(id, res)
       if (selecteArticle == 0) {
           errResponse(res, enums.http_codes.noRecordFound, config.errCodeNoRecordFound,messages.NoRecordFound,messages.emptyString)
           return
       }
       const deleteArticle= await articles.deleteArticle(id, res)
       if (deleteArticle != 0) {
           errResponse(res, enums.http_codes.InternalServerError, config.errCodeNoRecordFound,messages.NoRecordFound,messages.emptyString)
           return
       }
       successResponse(res, enums.http_codes.OK, config.successCode,messages.questionDeleted,messages.emptyString)
   },
 




   // ****************Search Articles***********************
   searchAllArticles:   async (req, res, result) => {
		var textForSearch = req.query.search_text;

		const searchArticles = await articles.searchAllArticles(textForSearch, res)
		if (searchArticles.length == 0) {
			errResponse(res,enums.http_codes.BadRequest,config.errorCode,messages.NoRecordFound, "")
			return;
		}
		successResponse(res,enums.http_codes.OK, config.successCode,messages.getArticleDeatails, searchArticles)
		return;
	},

  
};
