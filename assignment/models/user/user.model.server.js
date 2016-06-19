
module.exports = function() {

  var mongoose = require("mongoose")
  var UserSchema = require("./user.schema.server")();
  var User = mongoose.model("User", UserSchema);

  var api = {
    createUser: createUser,
   findUserById: findUserById,
    findUserByUsername:findUserByUsername,
    findUserByUsernameAndPassword:findUserByUsernameAndPassword,
    updateUser: updateUser,
    deleteUser: deleteUser,
    findFaceBookUser:findFaceBookUser
  };
  return api;

  function findFaceBookUser(id)
  {
    return User.findOne({"facebook.id":id});

  }

  function updateUser(userId,user)
  {
    delete user._id;
    return User
      .update({_id: userId},{
        $set: {
          firstName: user.firstName,
          lastName: user.lastName
        }
      });
  }


  function deleteUser(userId)
  {
    return User.remove({_id:userId});
  }

  function createUser(user) {

    return User.create(user);
  }

  function findUserById(userId)
  {
  return User.findById({_id:userId});
  }

  function findUserByUsername(username)
  {
    return User.findOne({username:username});
  }

  function findUserByUsernameAndPassword(username,password)
  {
    return User.findOne({username: username,password: password});
  }
}
