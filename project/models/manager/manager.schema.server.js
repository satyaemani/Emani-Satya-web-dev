/**
 * Created by subbaraju on 23/6/2016.
 */
module.exports = function() {
  var mongoose = require("mongoose");

  var ManagerSchema = mongoose.Schema({
    username: {type: String, required: true},
    password: String,
    restaurantId:String,
    slots:[
          {date:String,
          time:
            [{slot:String}]}],

    messages:[{
      userId:String,
      username:String,
      message:String
    }],
    dateCreated: {type: Date, default: Date.now}
  }, {collection: "project.manager"});

  return ManagerSchema;
};
