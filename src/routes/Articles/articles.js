const validationMiddleware = require("../../middlewere/Articles/articles");
const articles = require("../../controller/Articles/articles");

module.exports = function (app) {

  // ****************** Articles Lists ************************
  app.get("/apis/articles/:pageNo/:pageSize", (req, res) => {
    articles.getArticlesList(req, res);
  });


  // ****************** Add Articles **************************
  app.post("/apis/articles", validationMiddleware.addArticles, (req, res) => {
    articles.addArticles(req, res);
  });

  // ***************** Articles Details **********************
  app.get("/apis/articles/:id", (req, res) => {
    articles.getArticlesDetails(req, res);
  });

// ******************Update Article**************************
  app.put("/apis/article/update/:id",validationMiddleware.updatearticle, (req, res) => {
    articles.updatearticle(req, res);
  });


 // ***************** Articles Deleted **********************
   app.delete('/apis/article/:id', validationMiddleware.deleteArticle, (req, res) => {
    articles.deleteArticle(req, res);
  });




// ****************Search Articles***********************
app.get('/apis/article/search/:searchText', (req, res) => {
  articles.searchAllArticles(req, res);
});
 
 
}
