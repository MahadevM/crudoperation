var mongoose = require("mongoose");
var config = require("../config/dbconnection");

//Company Schema
var SchoolSchema = mongoose.Schema({
  schoolName: { type: String, required: true }
});

var School = (module.exports = mongoose.model("School", SchoolSchema));

// add new company
module.exports.addSchool = function(newSchool, callback) {
  newSchool.save(callback);
};

//get company list
module.exports.getSchool = function(callback, limit) {
  School.find(callback).limit(limit);
};

module.exports.deleteSchool = function(id, callback) {
  School.remove({ _id: id }, callback);
};

//update company with id,ComanyUserName, ComanyPassword,  StatusId,
module.exports.updateSchool = function(id, schoolName, callback) {
  School.findOneAndUpdate(
    { _id: id },
    {
      schoolName: schoolName
    },
    callback
  );
};

//get company by user ID
module.exports.getUserByID = function(id, callback) {
  var query = {
    _id: id
  };
  School.findOne(query, callback);
};
