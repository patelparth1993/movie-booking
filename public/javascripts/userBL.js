var validateUser = require("./Validator");
var userDAL = require("./userDAL");
var userBL = {};

userBL.createUser = data => {
  return new Promise((resolved, rejected) => {
    let userData = {
      firstname: data.firstname,
      lastname: data.lastname,
      emailid: data.emailid,
      password: data.password
    };

    //validate userData
    try {
      if (validateUser(userData)) {
        //call DAL to insert user
        userDAL
          .createUser(userData)
          .then(result => {
            // console.log(result)
            resolved();
          })
          .catch(err => {
            rejected(err);
          });
      } else {
        rejected("Invalid emailid or password");
      }
    } catch (error) {
      rejected(error);
    }
  });
};

userBL.userLogin = data => {
  return new Promise((resolved, rejected) => {
    let userData = {
      emailid: data.emailid,
      password: data.password
    };

    userDAL
      .userLogin(userData)
      .then(result => {
        if (result.UserFound) {
          resolved(result);
        }
      })
      .catch(error => {
        rejected(error);
      });
  });
};

module.exports = userBL;
