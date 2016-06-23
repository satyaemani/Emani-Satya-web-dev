/**
 * Created by subbaraju on 22/6/2016.
 */
/**
 * Created by subbaraju on 21/6/2016.
 */

module.exports = function() {

  var mongoose = require("mongoose");
  var RestaurantSchema = require("./restaurant.schema.server")();
  var Restaurant = mongoose.model("Restaurant",RestaurantSchema);

  var api = {
    addToFavourites:addToFavourites,
    findFavRestaurantForUserId:findFavRestaurantForUserId,
    removeFavourites:removeFavourites,
    findFavRestaurantById:findFavRestaurantById
  };
  return api;

  function removeFavourites(restaurantId,userId)
  {
    return Restaurant.remove({rId:restaurantId,_user:userId});

  }

  function addToFavourites(userId,restaurant)
  {
    restaurant._user=userId;

    return Restaurant.create(restaurant);
  }
  function findFavRestaurantById(favRestaurantId,userId){

    return Restaurant.findOne({rId:favRestaurantId,_user:userId});
  }
  function findFavRestaurantForUserId(userId)
  {
    return Restaurant.find({_user:userId});

  }
};
