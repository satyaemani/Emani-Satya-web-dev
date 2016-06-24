/**
 * Created by subbaraju on 23/6/2016.
 */

module.exports = function() {

  var mongoose = require("mongoose")
  var ManagerSchema = require("./manager.schema.server")();
  var Manager = mongoose.model("Manager", ManagerSchema);

  var api = {
    createUser: createUser,
    findUserById: findUserById,
    findUserByUsername:findUserByUsername,
    findUserByUsernameAndPassword:findUserByUsernameAndPassword,
    updateUser: updateUser,
    deleteUser: deleteUser,
    //findFaceBookUser:findFaceBookUser,
    findSlotsByRestId:findSlotsByRestId,
    deleteSlot:deleteSlot,
    insertSlot:insertSlot
  };
  return api;

  //.update({tmdbId: id},
  //  {$push: {ratings: ratings,
  //    reviews: reviews}}
  //);



  function insertSlot(restId,slot)
  {
    console.log(restId);
    console.log(slot);
    return Manager
      .update({restaurantId:restId},{$push:{slots:slot} } )
  }

  function deleteSlot(restId,slotId,slot)
  {

    return Manager
      .update({restaurantId:restId},{$pull:{slots:{slot:slot ,_id: slotId } } })

  }


  //function findFaceBookUser(id)
  //{
  //  return Manager.findOne({"facebook.id":id});
  //
  //}





function findSlotsByRestId(restId)
  {
    return Manager.find({restaurantId:restId});
  }


  function updateUser(userId,user)
  {
    delete user._id;
    return Manager
      .update({_id: userId},{
        $set: {
          firstName: user.firstName,
          lastName: user.lastName
        }
      });
  }


  function deleteUser(userId)
  {
    return Manager.remove({_id:userId});
  }

  function createUser(user) {

    return Manager.create(user);
  }

  function findUserById(userId)
  {

    return Manager.findById({_id:userId});
  }

  function findUserByUsername(username)
  {
    return Manager.findOne({username:username});
  }

  function findUserByUsernameAndPassword(username,password)
  {
    return Manager.findOne({username: username,password: password});
  }
}
