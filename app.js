var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");

var routing = require("./routes/routing");
var myRequestLogger = require("./public/javascripts/RequestLogger");
var myErrorLogger = require("./public/javascripts/ErrorLogger");

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(myRequestLogger);

app.use("/", routing);

app.use(myErrorLogger);

const PORT = process.env.PORT || 1020;
app.listen(PORT);
console.log("server listening in port 1020");
