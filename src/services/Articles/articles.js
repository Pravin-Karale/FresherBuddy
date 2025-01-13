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
      var queryStatement = `SELECT id, "title", "description", "tags", "content", "author", "status" FROM fresher_buddy_schema.articles ORDER BY id DESC LIMIT ${pageSize} OFFSET (${pageNo}-1) * ${pageSize};`;
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
  addArticles: (title,description,tags,content,author, res) => {
    var status = 1;
    return new Promise((resolve, reject) => {
      const queryStatment ='INSERT INTO fresher_buddy_schema.articles("title", "description", "tags", "content", "author", "status") VALUES ($1, $2, $3, $4, $5,$6);'
      connection.query(
        queryStatment,
        [title,description,tags,content,author,status],
        (error, articles) => {
          if (error) {
            errResponse(
              res,
              enums.http_codes.BadRequest,
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
      var status = 1;
      var queryStatement ='SELECT id, "title", "description", "tags", "content","author" ,status FROM fresher_buddy_schema.articles WHERE id = $1;'
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
  selectarticle: (id, res) => {
    return new Promise((resolve, reject) => {
      
        var queryStatement =`SELECT id, title, description, tags, content, author, article_id
	FROM fresher_buddy_schema.articles WHERE id=$1 AND status=1;`
       
        connection.query(queryStatement, [id], (error, result) => {

            if (error) {
              console.log(error,"errror");
              
                errResponse(res, enums.http_codes.InternalServerError, config.errCodeNoRecordFound,messages.serverErrorMessage,messages.emptyString)
                return
            } 
            resolve(result)
        })
    })
},

updatearticle: (id,title, description, tags, content,authors, res) => {
    return new Promise((resolve, reject) => {
      var status=1
        var queryStatement =`UPDATE fresher_buddy_schema.articles
	SET id=$1, title=$2, description=$3, tags=$4, content=$5, author=$6, article_id=$7
	WHERE WHERE id=$1 AND status=1;` 
        connection.query(queryStatement, [ id, title, description, tags, content,authors,status], (error, result) => {
            if (error) { 
                errResponse(res, enums.http_codes.InternalServerError, config.errCodeNoRecordFound,messages.NoRecordFound,messages.emptyString)
                return;
            }
            resolve(result.rows);
        });
    })
},


// ***************** Article Deleted **********************
 selecteArticle: (id, res) => {
  return new Promise((resolve, reject) => {
      var queryStatement = `SELECT "title", "description", "tags", "content", status FROM fresher_buddy_schema.articles WHERE id=$1 AND status=1;`

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
