const messages = require("../../messages/commanMessages");
const config = require("../../config/config");
const enums = require("../../utils/enum");
const subject = require("../../services/Admin/subject");
const { errResponse, successResponse } = require("../../messages/Responce");

module.exports = {
  // ****************** Subject Lists ************************
  getSubjectList: async (req, res, result) => {
    var pageNo = req.params.pageNo;
    var pageSize = req.params.pageSize;
    let newPageNo = pageNo * pageSize;

    const getSubjectList = await subject.getSubjectList(
      pageNo,
      pageSize,
      res
    );
    
    if (getSubjectList.length == 0) {
      errResponse(
        res,
        enums.http_codes.BadRequest,
        config.errorCode,
        messages.NoRecordFound,
        messages.emptyString
      );
      return;
    }
    successResponse(
      res,
      enums.http_codes.OK,
      config.successCode,
      messages.getSubjectList,
      getSubjectList
    );
    return;
  },

  // ****************** Add Subject **************************

  addSubject: async (req, res, result) => {

    let title = req.body.title;
  
    const addSubject = await subject.addSubject(
      title
    );
    if (addSubject.length == 0) { 
      errResponse(
        res,
        enums.http_codes.BadRequest,
        config.errorCode,
        messages.NoRecordFound,
        messages.emptyString
      );
      return;
    }
    successResponse(
      res,
      enums.http_codes.OK,
      config.successCode,
      messages.subjectAdded,
      messages.emptyString
    );
    return;
  },

  // ***************** Subject Details **********************
  getSubjectDetails: async (req, res, result) => {
    var id = req.params.id;
    const getSubjectDetails = await subject.getSubjectDetails(id, res);
    if (getSubjectDetails.length == 0) {
      errResponse(
        res,
        enums.http_codes.BadRequest,
        config.errorCode,
        messages.NoRecordFound,
        messages.emptyString
      );
      return;
    }
    successResponse(
      res,
      enums.http_codes.OK,
      config.successCode,
      messages.getSubjectDeatails,
      getSubjectDetails
    );
    return;
  },

  // ***************** Subject Delete **********************

  deleteSubject: async (req, res, result) => {
    const id = req.params.id;

    const selectSubject = await subject.selectSubject(id, res);
    if (selectSubject == 0) {
      errResponse(
        res,
        enums.http_codes.noRecordFound,
        config.errCodeNoRecordFound,
        messages.NoRecordFound,
        messages.emptyString
      );
      return;
    }
    const deleteSubject = await subject.deleteSubject(id, res);
    if (deleteSubject != 0) {
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
      messages.SubjectDeleted,
      messages.emptyString
    );
  },

  // ******************Update Subject**************************
  updateSubject: async (req, res, result) => {
    var id = req.params.id;
    var title = req.body.title;
    const updateSubject = await subject.updateSubject(
      id,title
    );
    
    if (updateSubject.length !== 0) {
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
      updateSubject.rows
    );
    return;
  },
};
