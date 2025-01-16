const database = require("../../../database");
const { errResponse } = require("../../messages/Responce");
const enums = require("../../utils/enum");
const config = require("../../config/config");
const messages = require("../../messages/commanMessages");

const connection = database.db.get;

module.exports = {


// ****************** Article Lists ************************

getArticlesList:(pageNo, pageSize, res) => {
    return new Promise((resolve, reject) => {
      var queryStatement = `SELECT 
      a.id, 
      a.article_author_id, 
      a.title, 
      a.description, 
      a.content, 
      a.tags,
      a.status,
      au.name AS article_author_name, 
      au.email AS article_author_email 
  FROM fresher_buddy_schema.articles AS a
  INNER JOIN fresher_buddy_schema.article_author AS au 
      ON a.article_author_id = au.id
  ORDER BY a.id DESC LIMIT ${pageSize} OFFSET (${pageNo}-1) * ${pageSize};`
      connection.query(queryStatement, (error, result) => {
        if (error) {
          errResponse(
            res,
            enums.http_codes.InternalServerError,
            config.errCodeNoRecordFound,
            messages.NoRecordFound,
            messages.emptyString
          );
          return;
        }
        resolve(result.rows);
      });
    });
  },


  // ****************** Add Article **************************
  addArticles: (article_author_id,title,description,content,tags, res) => {
  
    return new Promise((resolve, reject) => {
      const queryStatment =`INSERT INTO fresher_buddy_schema.articles(
  article_author_id, title, description, content, tags)
	VALUES ($1, $2, $3, $4, $5);`
      connection.query(
        queryStatment,
        [article_author_id,title,description,content,tags],
        (error, articles) => {
          if (error) {
            errResponse(
              res,
              enums.http_codes.InternalServerError,
              config.errorCode,
              messages.serverErrorMessage,
              messages.emptyString
            );
            return;
          }
          resolve(articles.rows);
        }
      );
    });
  },


 // ***************** Article Details **********************
 getArticlesDetails: async (id, res) => {
    return new Promise((resolve, reject) => {
      var queryStatement =`SELECT 
      a.id, 
      a.article_author_id, 
      a.title, 
      a.description, 
      a.content, 
      a.tags,
      au.name AS article_author_name, 
      au.email AS article_author_email 
  FROM fresher_buddy_schema.articles AS a
  INNER JOIN fresher_buddy_schema.article_author AS au ON a.article_author_id = au.id WHERE a.id = $1;`
        connection.query(
        queryStatement,
        [id],
        function (error, result, fields) {
          if (error) {
            console.log(error,"error");
            
            errResponse(
              res,
              enums.http_codes.InternalServerError,
              config.errorCode,
              messages.serverErrorMessage,
              messages.emptyString
            );
            return;
          }

          resolve(result.rows);
        }
      );
    });
  },




 // ****************** Update Article **************************
 updatearticle: (id,article_author_id,title,description,content,tags, res) => {
    return new Promise((resolve, reject) => {
      const queryStatment = `UPDATE fresher_buddy_schema.articles
	SET article_author_id=$2,title=$3, description=$4, content=$5,tags=$6
	WHERE id=$1 AND status=1;`;

      connection.query(
        queryStatment,
        [id,article_author_id,title,description,content,tags],
        (error, updatearticle) => {
          console.log(error, "error");
          if (error) {
            errResponse(
              res,
              enums.http_codes.InternalServerError,
              config.errCodeNoRecordFound,
              messages.NoRecordFound,
              messages.emptyString
            );
            return;
          }
          resolve(updatearticle.rows);
        }
      );
    });
  },


// ***************** Article Deleted **********************
 selecteArticle: (id, res) => {
  return new Promise((resolve, reject) => {
      var queryStatement = `SELECT id, article_author_id, title, description, content, tags, status FROM fresher_buddy_schema.articles WHERE id=$1 AND status=1;`

      connection.query(queryStatement, [id], (error, result) => {
          if (error) {
              errResponse(res, enums.http_codes.InternalServerError, config.errCodeNoRecordFound,messages.NoRecordFound,messages.emptyString)
              return;
          }
          resolve(result.rows);
      });
  })
},

deleteArticle: (id, res) => {
  return new Promise((resolve, reject) => {
      var queryStatement = `UPDATE fresher_buddy_schema.articles SET status=0 WHERE id=$1;`
      connection.query(queryStatement, [id], (error, result) => {
          if (error) {
              errResponse(res, enums.http_codes.InternalServerError, config.errCodeNoRecordFound,messages.ArticleDeleteError,messages.emptyString)
              return
          }
          resolve(result.rows)
      })
  })
},

searchAllArticles:(textForSearch,res) => {
  return new Promise((resolve, reject) => {
    var queryStatement ="SELECT a.id, a.title, a.description, a.tags, a.content FROM fresher_buddy_schema.articles AS a WHERE a.status = 1 AND ((a.title LIKE('%" + textForSearch + "%')))"
    connection.query(queryStatement,[textForSearch], (error, result) => {
      if (error) {
        console.log(error,"error");
        
        errResponse(
          res,
          enums.http_codes.InternalServerError,
          config.errCodeNoRecordFound,
          messages.NoRecordFound,
          messages.emptyString
        );
        return;
      }
      console.log(result,"result");
      
      resolve(result);
    });
  });
},
  





//  searchAllArticles:(req, result) => {
//     var textForSearch = req.params.searchText;
//     var queryStatement =`SELECT id, "Title", "Description", "Tags", "Content" FROM fresher_buddy_schema.articles WHERE status = 1 AND ((Title LIKE('%" + ${textForSearch} + "%')))`
//     connection.query(queryStatement, function (error, article, fields) {
//         if (error) {
//             result({
//                 response_code: config.errorCode, message: "Something went wrong, please try again.", data: error
//             });
//         }
//         if (article.length == 0) {
//             result({
//                 response_code: config.errCodeNoRecordFound, message: "No record found.", data: ""
//             });
//         } else {
//             result({
//                 response_code: config.successCode, message: "", data: article
//             });
//         }
//     });
// }
};
