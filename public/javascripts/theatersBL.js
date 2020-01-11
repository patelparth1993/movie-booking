var theaterDAL = require("./theatersDAL");

//get list of movies from location

var theatersBL = {};
theatersBL.getMovies = function(location) {
  //cal DAL
  return theaterDAL
    .getMovies(location)
    .then(data => {
      return data;
    })
    .catch(error => {
      throw new Error(error);
    });
};

module.exports = theatersBL;
