const validationMiddleware = require('../../middlewere/Articles/articles_authors')
const author = require('../../controller/Articles/articles_authors')

module.exports= function (app){
     // ****************** Add Articles_Author **************************
      app.post("/apis/articles/article_author", validationMiddleware.addArticleAuthor, (req, res) => {
        author.addArticleAuthor(req, res);
      });


    // ****************** article_author Lists ************************
   app.get("/apis/articles/article_author/:pageNo/:pageSize", (req, res) => {
    author.articleAutherList(req, res);
   });


}
