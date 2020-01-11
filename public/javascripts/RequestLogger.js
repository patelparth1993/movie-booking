var fs = require("fs");

var RequestLogger = function(req, res, next) {
  var data = "" + new Date() + " " + req.method + " " + req.url + "\n";
  fs.appendFile("RequestLog.txt", data, error => {
    if (error) {
      return next(error);
    }
  });

  next();
};

module.exports = RequestLogger;
