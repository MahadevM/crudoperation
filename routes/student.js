var express = require("express");
var router = express.Router();
var Student = require("../models/Student");
var config = require("../config/dbconnection");

//Company for registration
router.post("/newstudent", (req, res, next) => {
  let newStudent = new Student({
    studentName: req.body.studentName,
    schoolId: req.body.schoolId
  });

  Student.addStudent(newStudent, (err, student) => {
    if (err) {
      console.log(err);
      res.json({
        success: false,
        msg: "Failed to Add school",
        Error: err.errmsg
      });
    }

    if (student) {
      res.json({ success: true, msg: "student registered" });
    }
  });
});

//get list of registerd company// no token is used for auth
router.get("/getstudent", function(err, res) {
  Student.getStudent(function(err, student) {
    if (err) {
      console.log(err);
      return res.json({ status: false, message: "No school found" });
    }
    res.json({
      success: true,
      students: { student }
      // authData
    });
  });
});

// //FindOneCompany by COMPANY ID
router.post("/findstudentbyId", (req, res, next) => {
  let id = req.body.id;

  Student.getUserByID(id, (err, student) => {
    if (err) {
      res.json({ success: false, msg: "Failed load company" });
    }
    if (student) {
      res.json({
        success: true,
        msg: "student found successfully",
        student
      });
    }
  });
});

router.put("/updateStudent", (req, res, next) => {
  var studentName = req.body.studentName;
  var studentId = req.body.studentId;
  var id = req.body.id;

  Student.updateStudent(id, studentName, studentId, (err, student) => {
    if (err) {
      console.log("The error is", err);
    }
    if (!student) {
      return res.json({ success: false, msg: "no company found" });
    } else {
      res.json({
        success: true,
        msg: "updated succeessfully"
        //student:{students}
      });
    }
  });
});

// delete project skills based on companyId
router.post("/delete", (req, res, next) => {
  let id = req.body.id;

  Student.deleteStudent(id, (err, student) => {
    if (err) {
      res.json({ success: false, msg: "Failed to delete company" });
    }
    if (student) {
      res.json({ success: true, msg: "student deleted successfully" });
    }
  });
});
module.exports = router;
