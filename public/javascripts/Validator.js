var validateUser = userData => {
  //validate emailid and password
  var emailPattern = /^\w+([\.-]?\w+)*@([\.-]?\w+)*(\.\w{2,3})+$/i;
  var passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&])(?=.{8,})/;

  if (!emailPattern.test(userData.emailid)) {
    throw new Error("Email id format is invalid");
  } else if (!passwordPattern.test(userData.password)) {
    throw new Error("Password format is invalid");
  } else {
    return true;
  }
};

module.exports = validateUser;
