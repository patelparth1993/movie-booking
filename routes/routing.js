var express = require("express");
var routing = express.Router();

var theaterBL = require("../public/javascripts/theatersBL");
var userBL = require("../public/javascripts/userBL");

//user signup
routing.post("/signup", function(req, res, next) {
  userBL
    .createUser(req.body)
    .then(user => {
      res.json({ message: "User Created" });
    })
    .catch(error => {
      if (error.message === "EmailId already registered") {
        res.json({ message: error.message });
      } else {
        next(error);
      }
    });
});

//user login
routing.post("/login", function(req, res, next) {
  userBL
    .userLogin(req.body)
    .then(result => {
      if (result.UserFound) {
        res.json(result);
      } else {
        res.json({ UserFound: false });
      }
    })
    .catch(error => {
      if (error.message === "User not available. Please regiser") {
        res.json({ UserFound: false });
      } else {
        next(error);
      }
    });
});

//get all Movies of location
routing.get("/movies/:location", (req, res, next) => {
  var place = req.params.location;
  theaterBL
    .getMovies(place)
    .then(movies => {
      res.json(movies);
    })
    .catch(error => {
      //console.log('inside route catch error')
      next(error);
    });
});

routing.all("**", function(req, res, next) {
  let error = new Error("Requested page does not exists");
  next(error);
});

module.exports = routing;
