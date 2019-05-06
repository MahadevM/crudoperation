var mongoose = require("mongoose");
var config = require("../config/dbconnection");

//Company Schema
var StudentSchema = mongoose.Schema({
  studentName: { type: String, required: true },
  schoolId: { type: mongoose.Schema.ObjectId, required: false }
});

var Student = (module.exports = mongoose.model("Student", StudentSchema));

// add new company
module.exports.addStudent = function(newStudent, callback) {
  newStudent.save(callback);
};

// //get company list
// module.exports.getStudent = function(callback, limit) {
//    Student.find(callback).limit(limit);
// };

module.exports.getStudent = function(callback, limit) {
  Student.aggregate(
    [
      //  { $match: { typet: "Req" } },
      {
        $lookup: {
          from: "schools",
          localField: "schoolId",
          foreignField: "_id",
          as: "SchoolDetails"
        }
      }
    ],
    callback
  );
  // { $unwind: "$StatusId" }
};

module.exports.deleteStudent = function(id, callback) {
  Student.remove({ _id: id }, callback);
};

//update company with id,ComanyUserName, ComanyPassword,  StatusId,
module.exports.updateStudent = function(id, studentName, studentId, callback) {
  Student.findOneAndUpdate(
    { _id: id },
    {
      studentName: studentName,
      studentId: studentId
    },
    callback
  );
};

//get company by user ID
module.exports.getUserByID = function(id, callback) {
  // var query = {
  //   _id: id
  // };
  var newid = mongoose.mongo.ObjectId(id);
  Student.aggregate(
    [
      { $match: { _id: newid } },
      {
        $lookup: {
          from: "schools",
          localField: "schoolId",
          foreignField: "_id",
          as: "SchoolDetails"
        }
      }
    ],
    callback
  );
  //Student.findOne(query, callback);
};
