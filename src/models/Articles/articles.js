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

  const getArticlesListResponce = await articles.getArticlesList(
    pageNo,
    pageSize,
    res
  );

 
  if (getArticlesListResponce.length == 0) {
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
    getArticlesListResponce
  );
  return;
},


// ****************** Add Articles **************************

  addArticles: async (req, res, result) => {
    var article_author_id=req.body.article_author_id;
    var title = req.body.title;
    var description = req.body.description;
    var content= req.body.content;
    var tags = req.body.tags;
    const ArticlesResponse = await articles.addArticles(
      article_author_id,
      title,
      description,
      content,
      tags
    );
    if (ArticlesResponse.length !== 0) {
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
     const ArticlesDetails = await articles.getArticlesDetails(id, res);
     if (ArticlesDetails.length == 0) {
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
       ArticlesDetails
     );
     return;
   },

  // ******************Update Articles**************************
   updatearticle: async (req, res, result) => {
       var id = req.params.id;
       var article_author_id = req.body.article_author_id;
       var title = req.body.title;
       var description = req.body.description;
       var content = req.body.content;
       var tags = req.body.tags;
   
       const updatearticle = await articles.updatearticle(
         id,
         article_author_id,
         title,
         description,
         content,
         tags
       );
       
       if (updatearticle.length !== 0) {
         errResponse(
           res,
           enums.http_codes.BadRequest,
           config.errorCode,
           messages.questionError,
           messages.emptyString
         );
         return;
       }
       successResponse(
         res,
         enums.http_codes.OK,
         config.successCode,
         messages.questionUpdated,
         updatearticle.rows
       );
       return;
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
