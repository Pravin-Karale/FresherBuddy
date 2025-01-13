const validationMiddleware = require("../../middlewere/Admin/question");
const question = require("../../controller/Admin/question");

module.exports = function (app) {

  // ****************** Quetion Lists ************************
  app.get("/apis/question/:pageNo/:pageSize", (req, res) => {
    question.getQuestionList(req, res);
  });

  // ****************** Add Quetion **************************
  app.post("/apis/question", validationMiddleware.addQuestion, (req, res) => {
    question.addQuestion(req, res);
  });

  // ***************** Question Details **********************
  app.get("/apis/question/:id", (req, res) => {
    question.getQuestioDetails(req, res);
  });

  // ***************** Question Delete **********************
  app.delete('/apis/admin/question/:id', validationMiddleware.deleteQuestion, (req, res) => {
		question.deleteQuestion(req, res);
	});
}

  // ****************** Update quetion ***********************
  app.put("/apis/question/:id", validationMiddleware.updatequestion,(req, res) => {
    question.updatequestion(req, res);
    }
  );

