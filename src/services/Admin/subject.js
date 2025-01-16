const database = require("../../../database");
const { errResponse } = require("../../messages/Responce");
const enums = require("../../utils/enum");
const config = require("../../config/config");
const messages = require("../../messages/commanMessages");

const connection = database.db.get;

module.exports = {
  // ****************** Subject Lists ************************

  getSubjectList: (pageNo, pageSize, res) => {
    return new Promise((resolve, reject) => {
      var queryStatement = `SELECT id, title, status FROM fresher_buddy_schema.subjects ORDER BY id DESC LIMIT ${pageSize} OFFSET (${pageNo}-1) * ${pageSize};`;
      console.log('queryStatement', queryStatement);
      
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

  // ****************** Add Subject **************************

  addSubject: (title,status,res) => {
    return new Promise((resolve, reject) => {
      const queryStatment =`INSERT INTO fresher_buddy_schema.subjects(title,status) VALUES ($1,$2)RETURNING id ;`
     
      connection.query(
        queryStatment,
        [title,status],
        (error, subject) => {
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
          resolve(subject.rows);
        }
      );
    });
  },

  // ***************** Subject Details **********************

  getSubjectDetails: async (id, res) => {
    return new Promise((resolve, reject) => {
      var status = 1;
      var queryStatement =
        `SELECT title
	FROM fresher_buddy_schema.subjects WHERE id = $1 AND status = $2`;
      connection.query(
        queryStatement,
        [id, status],
        function (error, result, fields) {
          if (error) {
            errResponse(
              res,
              statusCode.Internal_Server_Error,
              config.errCodeError,
              messages.serverErrorMessage,
              ""
            );
            return;
          }
          resolve(result.rows);
        }
      );
    });
  },

  // ***************** Subject Delete **********************
  selectSubject: (id, res) => {
    return new Promise((resolve, reject) => {
      var queryStatement = `SELECT title FROM fresher_buddy_schema.subjects WHERE id=$1 AND status=1;`;

      connection.query(queryStatement, [id], (error, result) => {
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
  deleteSubject: (id, res) => {
    return new Promise((resolve, reject) => {
      var queryStatement = `UPDATE fresher_buddy_schema.subjects SET status=0 WHERE id=$1;`;
      connection.query(queryStatement, [id], (error, result) => {
        if (error) {
          errResponse(
            res,
            enums.http_codes.InternalServerError,
            config.errCodeNoRecordFound,
            messages.questionDeleteError,
            messages.emptyString
          );
          return;
        }
        resolve(result.rows);
      });
    });
  },

  // ******************Update Subject**************************
  updateSubject: (id, subject_id, chapter_id, title, description, tags, res) => {
    return new Promise((resolve, reject) => {
      const queryStatment =`UPDATE fresher_buddy_schema.subjects SET  title=$2 WHERE id = $1 AND status = 1;`
      connection.query(
        queryStatment,
        [id, subject_id, chapter_id, title, description, tags ],
        (error, updateQuestion) => {
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
          resolve(updateSubject.rows);
        }
      );
    });
  },
};
