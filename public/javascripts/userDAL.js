var mongojs = require("mongojs");
var dbConnect = mongojs("MovieBookingDB");

var userDAL = {};

userDAL.checkUserExists = emailid => {
  return new Promise((resolved, rejected) => {
    dbConnect.Users.find({ emailid: emailid }, function(err, result) {
      if (err) {
        console.log(err);
        rejected(new Error("Error while checking existing users"));
      } else if (result.length > 0) {
        rejected(new Error("EmailId already registered"));
      } else resolved();
    });
  });
};

userDAL.createUser = userData => {
  return new Promise((resolved, rejected) => {
    userDAL
      .checkUserExists(userData.emailid)
      .then(result => {
        //insert user as it doesn't exists
        dbConnect.Users.insertOne(
          {
            firstname: userData.firstname,
            lastname: userData.lastname,
            emailid: userData.emailid,
            password: userData.password
          },
          function(err, inserted) {
            //console.log('Inside function')
            if (err) {
              rejected(err);
            } else {
              // console.log('user inserted')
              resolved();
            }
          }
        );
      })
      .catch(error => {
        rejected(error);
      });
  });
};

userDAL.userLogin = userData => {
  return new Promise((resolved, rejected) => {
    dbConnect.Users.find(
      {
        emailid: userData.emailid,
        password: userData.password
      },
      { _id: 0 },
      function(err, result) {
        //console.log(result)
        if (err) {
          rejected(err);
        } else if (result.length === 0) {
          rejected(new Error("User not available. Please regiser"));
        } else {
          resolved({
            UserFound: true,
            UserData: result[0]
          });
        }
      }
    );
  });
};

module.exports = userDAL;
