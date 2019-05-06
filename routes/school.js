var express = require("express");
var router = express.Router();
var School = require("../models/School");
var config = require("../config/dbconnection");

//Company for registration
router.post("/newschool", (req, res, next) => {
  let newSchool = new School({
    schoolName: req.body.schoolName
  });

  School.addSchool(newSchool, (err, school) => {
    if (err) {
      console.log(err);
      res.json({
        success: false,
        msg: "Failed to Add school",
        Error: err.errmsg
      });
    }

    if (school) {
      res.json({ success: true, msg: "school registered" });
    }
  });
});

//get list of registerd company// no token is used for auth
router.get("/getschool", function(err, res) {
  School.getSchool(function(err, school) {
    if (err) {
      console.log(err);
      return res.json({ status: false, message: "No school found" });
    }
    res.json({
      success: true,
      schoolies: { school }
      // authData
    });
  });
});

// //FindOneCompany by COMPANY ID
router.post("/findSchool", (req, res, next) => {
  let id = req.body.id;

  School.getUserByID(id, (err, school) => {
    if (err) {
      res.json({ success: false, msg: "Failed load company" });
    }
    if (school) {
      res.json({
        success: true,
        msg: "school found successfully",
        school
      });
    }
  });
});

router.put("/updateSchool", (req, res, next) => {
  var schoolName = req.body.schoolName;

  var id = req.body.id;

  School.updateSchool(id, schoolName, (err, school) => {
    if (err) {
      console.log("The error is", err);
    }
    if (!school) {
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

  School.deleteSchool(id, (err, school) => {
    if (err) {
      res.json({ success: false, msg: "Failed to delete company" });
    }
    if (school) {
      res.json({ success: true, msg: "company deleted successfully" });
    }
  });
});
module.exports = router;
