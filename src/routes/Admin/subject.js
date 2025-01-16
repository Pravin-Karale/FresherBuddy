const validationMiddleware = require("../../middlewere/Admin/subject");
const subject = require("../../controller/Admin/subject");

module.exports = function (app) {

  // ****************** Subject Lists ************************
  app.get("/apis/subject/:pageNo/:pageSize", (req, res) => {
    console.log('iamhere');
    
    subject.getSubjectList(req, res);
  });

  // ****************** Add Subject **************************
  app.post("/apis/subject", validationMiddleware.addSubject, (req, res) => {
    subject.addSubject(req, res);
  });

  // ***************** Subject Details **********************
  app.get("/apis/subject/:id", (req, res) => {
    subject.getSubjectDetails(req, res);
  });

  // ***************** Subject Delete **********************
  app.delete('/apis/admin/subject/:id', validationMiddleware.deleteSubject, (req, res) => {
		subject.deleteSubject(req, res);
	});

  // ****************** Update Subject ***********************
  app.put("/apis/subject/:id", validationMiddleware.updateSubject,(req, res) => {
    subject.updateSubject(req, res);
    }
  );
}


