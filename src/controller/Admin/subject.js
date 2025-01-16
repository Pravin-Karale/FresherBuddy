

const subject = require("../../models/Admin/subject");

module.exports = {
  // ******************get SubjectList**************************
  getSubjectList: (req, res) => {
    subject.getSubjectList(req, res, (result) => {
      res.send(result);
    });
  },

   // ****************** Add Subject **************************
   addSubject: (req, res) => {
    subject.addSubject(req, res, (result) => {
      res.send(result);
    });
  },

   // ***************** Subject Details **********************
   getSubjectDetails: (req, res) => {
    subject.getSubjectDetails(req, res, (result) => {
      res.send(result);
    });
  },

  // ***************** Subject Delete **********************
  deleteSubject:(req,res)=>{
    subject.deleteSubject(req,res,(result)=>{
     res.send(result);
    }) 
 },

  // ******************Update Subject**************************
  updateSubject: (req, res) => {
    subject.updateSubject(req, res, (result) => {
      res.send(result);
    });
  },
};
