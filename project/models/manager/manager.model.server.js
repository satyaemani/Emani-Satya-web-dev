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
    insertSlot:insertSlot,
    findDateBySlotId:findDateBySlotId,
    addDate:addDate,
    findTimeByDate:findTimeByDate,
    findManagerByRestID:findManagerByRestID,
    sendMessage:sendMessage,
    deleteMessage:deleteMessage,

  };
  return api;



  function sendMessage(restId,message)
  {
  return Manager.update({restaurantId:restId},{$push:{messages:message} } )
  }

  function deleteMessage(userId,messageId)
  {
    return Manager.update({_id:userId},{$pull:{messages:{_id:messageId}} } )
  }

  function  findManagerByRestID(restId){

    return Manager.findOne({restaurantId:restId});
  }

  function findTimeByDate(restId,date)
  {

    return Manager.find({restaurantId:restId},{slots:[{date:date}]});
  }

  function addDate(restId,slot)
  {


    return Manager
      .update({restaurantId:restId},{$push:{slots:slot} } )
  }

function findDateBySlotId(restId,slotId,date)
{


  return Manager.findOne({restaurantId:restId,slots:[{_id:slotId,date:date}]})
}

  function insertSlot(restId,slot)
  {

    return Manager
      .update({restaurantId:restId},{$push:{slots:slot} } )
  }

  function deleteSlot(restId,time,date,slotId)
  {

console.log(time);
    console.log(date);
    console.log(slotId);
    //return Manager
    //  .update({restaurantId:restId},{slots:[{date:date}]},{$pull:{time:{slot:time,_id:slotId}}})
    return Manager
    .update({restaurantId:restId},{slots:[{date:date}]},{$pull:{'slots.$.time':{slot:time,_id:slotId}}})

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
