const database = require("../../../database");
const { errResponse } = require("../../messages/Responce");
const enums = require("../../utils/enum");
const config = require("../../config/config");
const messages = require("../../messages/commanMessages");

const connection = database.db.get;

module.exports = {
  // ****************** Add Article **************************
  addArticleAuthor: (author_name,author_email, res) => {
    var status = 1;
    return new Promise((resolve, reject) => {
      const queryStatment ='INSERT INTO fresher_buddy_schema.article_authors( author_name, author_email, status) VALUES ( $1, $2, $3);'

      connection.query(
        queryStatment,
        [author_name,author_email,status],
        (error, author) => {
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
          console.log(author,"author");
          resolve(author.rowCount);
        }
      )
    });
  },

  articleAutherList:(pageNo, pageSize, res) => {
      return new Promise((resolve, reject) => {
        var queryStatement = `SELECT author_name, author_email, status FROM fresher_buddy_schema.article_authors ORDER BY id DESC LIMIT ${pageSize} OFFSET (${pageNo}-1) * ${pageSize};`
        connection.query(queryStatement, (error, result) => {
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
          console.log(result);
          
          resolve(result.rows);
        });
      });
    },
};
