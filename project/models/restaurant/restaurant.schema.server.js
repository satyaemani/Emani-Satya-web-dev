
module.exports = function() {
  var mongoose = require("mongoose");

  var RestaurantSchema = mongoose.Schema({
    _user:{type:mongoose.Schema.ObjectId,ref:"User"},
    restaurantName: String,
    rId:String,
    like:Boolean,
    location:String,
    //websites:[{type: mongoose.Schema.Types.ObjectId, ref: 'Website'}],
    dateCreated: {type: Date, default: Date.now}
  }, {collection: "project.restaurant"});

  return RestaurantSchema;
};
