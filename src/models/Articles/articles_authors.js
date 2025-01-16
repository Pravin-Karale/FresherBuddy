
const messages = require("../../messages/commanMessages");
const config = require("../../config/config");
const enums = require("../../utils/enum");
const author = require("../../services/Articles/article_authors");
const { errResponse, successResponse } = require("../../messages/Responce");

module.exports = {

// ****************** Add Articles **************************

addArticleAuthor: async (req, res, result) => {
    var name = req.body.name;
    var email = req.body.email;
    
    const addArticleAuthor = await author.addArticleAuthor(
        name,
        email
    );
    if (addArticleAuthor.length != 0) {
        console.log(addArticleAuthor,"addArticleAuthor");
        
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

  //
  articleAutherList: async (req, res, result) => {
    var pageNo = req.params.pageNo;
    var pageSize = req.params.pageSize;
    var newPageNo = pageNo * pageSize;
  
    const articleAutherListResponce = await author.articleAutherList(
      pageNo,
      pageSize,
      res
    );

   
    if (articleAutherListResponce.length == 0) {
      console.log(articleAutherListResponce,"articleAutherListResponce");
      
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
      articleAutherListResponce
    );
    return;
  },
};
