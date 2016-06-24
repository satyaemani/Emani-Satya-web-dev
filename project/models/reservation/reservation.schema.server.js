/**
 * Created by subbaraju on 21/6/2016.
 */
module.exports = function() {
  var mongoose = require("mongoose");

  var ReservationSchema = mongoose.Schema({
    _user:{type:mongoose.Schema.ObjectId,ref:"User"},
    username: {type: String, required: true},
    restaurantName: String,
    location:String,
    rId:String,
    noOfPeople:String,
    email:String,
    phone:String,
    date: String,
    time:String,
    //websites:[{type: mongoose.Schema.Types.ObjectId, ref: 'Website'}],
    dateCreated: {type: Date, default: Date.now}
  }, {collection: "project.reservation"});

  return ReservationSchema;
};
