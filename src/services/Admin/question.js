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
      var queryStatement = `SELECT id, subject_id, chapter_id, title, description, tags, status FROM fresher_buddy_schema.questions
       ORDER BY id DESC LIMIT ${pageSize} OFFSET (${pageNo}-1) * ${pageSize};`;
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
  addQuestion: (Title, Description, Tags, Subject_id, Chapters, res) => {
    var status = 1;
    return new Promise((resolve, reject) => {
      const queryStatment =
        'INSERT INTO "fresher_buddy_schema"."questions"( "Title", "Description", "Tags", "Subject_id", "Chapters", status) VALUES ( $1, $2, $3, $4, $5, $6);';
      connection.query(
        queryStatment,
        [Title, Description, Tags, Subject_id, Chapters, status],
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
        'SELECT id, "Title", "Description", "Tags", "Subject_id", "Chapters", status FROM "fresher_buddy_schema"."questions" WHERE id = $1 AND status = $2';
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
      var queryStatement = `SELECT id, "Title", "Description", "Tags", "Subject_id", "Chapters", status FROM fresher_buddy_schema.questions WHERE id=$1 AND status=1;`

      connection.query(queryStatement, [id], (error, result) => {
          if (error) {
              errResponse(res, enums.http_codes.InternalServerError, config.errCodeNoRecordFound,messages.NoRecordFound,messages.emptyString)
              return;
          }
          resolve(result.rows);
      });
  })
},
deleteQuestion: (id, res) => {
  return new Promise((resolve, reject) => {
      var queryStatement = `UPDATE fresher_buddy_schema.questions SET status=0 WHERE id=$1;`
      connection.query(queryStatement, [id], (error, result) => {
          if (error) {
              errResponse(res, enums.http_codes.InternalServerError, config.errCodeNoRecordFound,messages.questionDeleteError,messages.emptyString)
              return
          }
          resolve(result.rows)
      })
  })
},




  // ******************Update quetion**************************
  updatequestion: (id, Title, Description, Tags, Subject_id, Chapters, res) => {
    return new Promise((resolve, reject) => {
      const queryStatment = `UPDATE fresher_buddy_schema.questions SET id=$1, "Title"=$2, "Description"=$3, "Tags"=$4, "Subject_id"=$5, "Chapters"=$6, status=$7S WHERE id=$1 AND status=1;`

  //     `UPDATE "fresher_buddy_schema"."questions"
	// SET  "Title"=$2, "Description"=$3, "Tags"=$4, "Subject_id"=$5, "Chapters"=$6
	// WHERE "id"= $1 AND status=1;`
      connection.query(
        queryStatment,
        [id, Title, Description, Tags, Subject_id, Chapters],
        (error, updatequestion) => {
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
          resolve(updatequestion.rows);
        }
      );
    });
  },

};
