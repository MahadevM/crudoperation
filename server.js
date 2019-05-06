var express = require("express");
var path = require("path");
// var cors = require("cors");
var mongoose = require("mongoose");
var bodyparser = require("body-parser");
var config = require("./config/dbconnection");

// const logger = require("morgan");

//connected to mongo database
mongoose.connect(config.database);
mongoose.connection.on("connected", () => {
  console.log("connected to database");
});

//Set gridfs-stream connection
//Grid.mongo = mongoose.mongo;
//var gfs = Grid(mongoose.connection);
var app = express();

//import routes
// const users = require('./routes/users');
const school = require("./routes/school");
const student = require("./routes/student");



//app.use(logger("dev"));

const port = 9000;

//CORS middleware
//app.use(cors());

app.use(express.static(path.join(__dirname, "public")));

//body parser
app.use(bodyparser.json({ limit: "50mb" }));
app.use(bodyparser.urlencoded({ limit: "50mb" }));

// routes for all;
app.use("/school", school);
app.use("/student",student);


//app.use("/files", files);

// index route
app.get("/", (req, res) => {
  res.send("add ' /employe or /company' to get response");
});

app.listen(port, () => {
  console.log("Welcome to PRP server 9000");
});
