const articles = require("../../models/Articles/articles");

module.exports = {
  // ******************get quetionList**************************
  getArticlesList: (req, res) => {
    articles.getArticlesList(req, res, (result) => {
      res.send(result);
    });
  },

   // ****************** Add Quetion **************************
  addArticles: (req, res) => {
    articles.addArticles(req, res, (result) => {
      res.send(result);
    });
  },

   // ***************** Question Details **********************
  getArticlesDetails: (req, res) => {
    articles.getArticlesDetails(req, res, (result) => {
      res.send(result);
    });
  },

  // ******************Update Article**************************
  updatearticle:(req,res)=>{
    articles.updatearticle(req,res,(result)=>{
     res.send(result);
    }) 
 },
  

     // ***************** Article Deleted **********************
    deleteArticle:(req,res)=>{
      articles.deleteArticle(req,res,(result)=>{
       res.send(result);
      }) 
   },



   // ****************Search Articles***********************
   searchAllArticles:(req,res)=>{
    articles.searchAllArticles(req,res,(result)=>{
     res.send(result);
    }) 
 },

};
