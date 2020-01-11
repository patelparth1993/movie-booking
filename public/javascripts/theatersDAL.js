var mongojs = require("mongojs");
var dbConnect = mongojs("MovieBookingDB");

var theatersDAL = {};

theatersDAL.getMovies = function(location) {
  return new Promise((resolved, rejected) => {
    dbConnect.Theaters.find(
      { city: { $regex: location.toLowerCase(), $options: "i" } },
      { theaterId: 0, _id: 0 },
      function(err, result) {
        if (err) {
          rejected(err);
        } else if (result.length === 0) {
          rejected("No movies for selected region");
        } else {
          resolved(result);
        }
      }
    );
  });
};

module.exports = theatersDAL;
