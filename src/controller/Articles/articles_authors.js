 
const author = require("../../models/Articles/articles_authors");

module.exports = {
 
   // ****************** Add Article Author **************************
   addArticleAuthor: (req, res) => {
    author.addArticleAuthor(req, res, (result) => {
      res.send(result);
    });
  },

  articleAutherList: (req, res) => {
    author.articleAutherList(req, res, (result) => {
      res.send(result);
    });
  },
}
 

 

