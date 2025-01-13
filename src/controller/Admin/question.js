const question = require("../../models/Admin/question");

module.exports = {
  // ******************get quetionList**************************
  getQuestionList: (req, res) => {
    question.getQuestionList(req, res, (result) => {
      res.send(result);
    });
  },

   // ****************** Add Quetion **************************
   addQuestion: (req, res) => {
    question.addQuestion(req, res, (result) => {
      res.send(result);
    });
  },

   // ***************** Question Details **********************
  getQuestioDetails: (req, res) => {
    question.getQuestioDetails(req, res, (result) => {
      res.send(result);
    });
  },

  // ***************** Question Delete **********************
  deleteQuestion:(req,res)=>{
    question.deleteQuestion(req,res,(result)=>{
     res.send(result);
    }) 
 },

  // ******************Update quetion**************************
  updatequestion: (req, res) => {
    question.updatequestion(req, res, (result) => {
      res.send(result);
    });
  },
};
