var fs = require("fs");

var ErrorLogger = function(err, req, res, next) {
  if (err) {
    fs.appendFile("ErrorLog.txt", err.stack + "\n", error => {
      if (error) {
        console.log("Error logging failed");
      }
    });

    res.status(500);
    res.json({ message: err.message });
  }
  next();
};

module.exports = ErrorLogger;
