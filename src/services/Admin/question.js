const database = require("../../../database");
const { errResponse } = require("../../messages/Responce");
const enums = require("../../utils/enum");
const config = require("../../config/config");
const messages = require("../../messages/commanMessages");

const connection = database.db.get;

module.exports = {
  // ****************** Quetion Lists ************************

  getQuestionList: (pageNo, pageSize, res) => {
    return new Promise((resolve, reject) => {
      var queryStatement = `SELECT q.id,q.subject_id,q.chapter_id,q.title,q.description,q.tags,q.status,s.title AS subject_title
FROM 
    fresher_buddy_schema.questions AS q
INNER JOIN 
    fresher_buddy_schema.subjects AS s
ON 
    q.subject_id = s.id
ORDER BY 
    q.id DESC
LIMIT ${pageSize} OFFSET (${pageNo}-1) * ${pageSize};`;

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

  // ****************** Add Quetion **************************

  addQuestion: (subject_id, chapter_id, title, description, tags, res) => {
    return new Promise((resolve, reject) => {
      const queryStatment =
        'INSERT INTO "fresher_buddy_schema"."questions"("subject_id", "chapter_id", "title", "description", "tags") VALUES ( $1, $2, $3, $4, $5);';
      connection.query(
        queryStatment,
        [subject_id, chapter_id, title, description, tags],
        (error, question) => {
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
          resolve(question.rows);
        }
      );
    });
  },

  // ***************** Question Details **********************

  getQuestioDetails: async (id, res) => {
    return new Promise((resolve, reject) => {
      var status = 1;
      var queryStatement =
        'SELECT id, subject_id, chapter_id, title, description, tags, status FROM "fresher_buddy_schema"."questions" WHERE id = $1 AND status = $2';
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

  // ***************** Question Delete **********************
  selecteQuestion: (id, res) => {
    return new Promise((resolve, reject) => {
      var queryStatement = `SELECT id, "title", "description", "tags", "subject_id", "chapter_id", status FROM fresher_buddy_schema.questions WHERE id=$1 AND status=1;`;

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
  deleteQuestion: (id, res) => {
    return new Promise((resolve, reject) => {
      var queryStatement = `UPDATE fresher_buddy_schema.questions SET status=0 WHERE id=$1;`;
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

  // ******************Update quetion**************************
  updateQuestion: (id, subject_id, chapter_id, title, description, tags, res) => {
    return new Promise((resolve, reject) => {
      const queryStatment = `UPDATE fresher_buddy_schema.questions SET "subject_id"=$2, "chapter_id"=$3,"title"=$4, "description"=$5, "tags"=$6 WHERE id = $1 AND status = 1;`;

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
          resolve(updateQuestion.rows);
        }
      );
    });
  },
};
