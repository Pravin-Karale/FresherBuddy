const messages = require("../../messages/commanMessages");
const config = require("../../config/config");
const enums = require("../../utils/enum");
const question = require("../../services/Admin/question");
const { errResponse, successResponse } = require("../../messages/Responce");

module.exports = {

// ****************** Quetion Lists ************************
getQuestionList: async (req, res, result) => {
  var pageNo = req.params.pageNo;
  var pageSize = req.params.pageSize;
  let newPageNo = pageNo * pageSize;

  const getQuestionList = await question.getQuestionList(
    pageNo,
    pageSize,
    res
  );

 
  if (getQuestionList.length == 0) {
    errResponse(
      res,
      enums.http_codes.BadRequest,
      config.errorCode,
      messages.questionError,
      messages.NoRecordFound
    );
    return;
  }
  successResponse(
    res,
    enums.http_codes.OK,
    config.successCode,
    messages.getquestionList,
    getQuestionList
  );
  return;
},


// ****************** Add Quetion **************************

addQuestion: async (req, res, result) => {
    var Title = req.body.Title;
    var Description = req.body.Description;
    var Tags = req.body.Tags;
    var Subject_id = req.body.Subject_id;
    var Chapters = req.body.Chapters;

    const questionResponse = await question.addQuestion(
      Title,
      Description,
      Tags,
      Subject_id,
      Chapters
    );
    if (questionResponse.length !== 0) {
      errResponse(
        res,
        enums.http_codes.BadRequest,
        config.errorCode,
        messages.questionError,
        messages.authenticationFeild
      );
      return;
    }
    successResponse(
      res,
      enums.http_codes.OK,
      config.successCode,
      messages.questionAdded,
      messages.emptyString
    );
    return;
  },

  
   // ***************** Question Details **********************
  getQuestioDetails: async (req, res, result) => {
    var id = req.params.id;
    const getquestion = await question.getQuestioDetails(id, res);
    if (getquestion.length == 0) {
      errResponse(
        res,
        enums.http_codes.BadRequest,
        config.errorCode,
        messages.questionError,
        messages.NoRecordFound
      );
      return;
    }
    successResponse(
      res,
      enums.http_codes.OK,
      config.successCode,
      messages.getQuestionDeatails,
      getquestion
    );
    return;
  },

    // ***************** Question Delete **********************

  deleteQuestion: async (req, res, result) => {
    const id = req.params.id;

    const selecteQuestion = await question.selecteQuestion(id, res)
    if (selecteQuestion == 0) {
        errResponse(res, enums.http_codes.noRecordFound, config.errCodeNoRecordFound,messages.NoRecordFound,messages.emptyString)
        return
    }
    const deleteQuestion= await question.deleteQuestion(id, res)
    if (deleteQuestion != 0) {
        errResponse(res, enums.http_codes.InternalServerError, config.errCodeNoRecordFound,messages.NoRecordFound,messages.emptyString)
        return
    }
    successResponse(res, enums.http_codes.OK, config.successCode,messages.questionDeleted,messages.emptyString)
},










  // ******************Update quetion**************************
  updatequestion: async (req, res, result) => {
    var id = req.params.id;
    var Title = req.body.Title;
    var Description = req.body.Description;
    var Tags = req.body.Tags;
    var Subject_id = req.body.Subject_id;
    var Chapters = req.body.Chapters;

    const updatequestion = await question.updatequestion(
      id,
      Title,
      Description,
      Tags,
      Subject_id,
      Chapters
    );
    if (updatequestion.length == 0) {
      errResponse(
        res,
        enums.http_codes.BadRequest,
        config.errorCode,
        messages.questionError,
        messages.emptyString
      );
      return;
    }
    successResponse(
      res,
      enums.http_codes.OK,
      config.successCode,
      messages.questionUpdated,
      updatequestion.rows
    );
    return;
  },
};
