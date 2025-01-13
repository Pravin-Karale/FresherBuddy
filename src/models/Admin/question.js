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
    var subject_id = req.body.subject_id;
    var chapter_id = req.body.chapter_id;
    var title = req.body.title;
    var description = req.body.description;
    var tags = req.body.tags;

    const questionResponse = await question.addQuestion(
      subject_id,
      chapter_id,
      title,
      description,
      tags
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

    const selecteQuestion = await question.selecteQuestion(id, res);
    if (selecteQuestion == 0) {
      errResponse(
        res,
        enums.http_codes.noRecordFound,
        config.errCodeNoRecordFound,
        messages.NoRecordFound,
        messages.emptyString
      );
      return;
    }
    const deleteQuestion = await question.deleteQuestion(id, res);
    if (deleteQuestion != 0) {
      errResponse(
        res,
        enums.http_codes.InternalServerError,
        config.errCodeNoRecordFound,
        messages.NoRecordFound,
        messages.emptyString
      );
      return;
    }
    successResponse(
      res,
      enums.http_codes.OK,
      config.successCode,
      messages.questionDeleted,
      messages.emptyString
    );
  },

  // ******************Update quetion**************************
  updateQuestion: async (req, res, result) => {
    var id = req.params.id;
    var subject_id = req.body.subject_id;
    var chapter_id = req.body.chapter_id;
    var title = req.body.title;
    var description = req.body.description;
    var tags = req.body.tags;

    const updateQuestion = await question.updateQuestion(
      id,
      subject_id,
      chapter_id,
      title,
      description,
      tags
    );
    if (updateQuestion.length == 0) {
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
      updateQuestion.rows
    );
    return;
  },
};
