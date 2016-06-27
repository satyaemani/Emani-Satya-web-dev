module.exports = function() {
  var mongoose = require("mongoose");

  var UserSchema = mongoose.Schema({
    username: {type: String, required: true},
    password: String,
    firstName: String,
    lastName: String,
      google: {
        id:    String,
        token: String
      },
    email:String,
    phone:String,
    dob: Date,
    dateCreated: {type: Date, default: Date.now}
  }, {collection: "project.user"});

  return UserSchema;
};
