/**
 * Created by subbaraju on 7/6/2016.
 */
/**
 * Created by subbaraju on 21/6/2016.
 */
//var passport = require('passport');
//var LocalStrategy = require('passport-local').Strategy;
//var bcrypt = require('bcrypt-nodejs');
//var FacebookStrategy = require('passport-facebook').Strategy;


module.exports=function(app,models) {

  var restaurantModel= models.restaurantModel;


  app.post("/api/user/:userId/restaurant",addToFavourites);
  app.get("/api/user/:userId/restaurant",findFavRestaurantForUserId);
  app.get("/api/restaurant/:favRestaurantId/:userId",findFavRestaurantById);
  app.delete("/api/restaurant/:restaurantId/:userId",removeFavourites);


  function addToFavourites(req, res) {
    var userId = req.params.userId;
    var restaurant = req.body;

    restaurantModel
      .addToFavourites(userId, restaurant)
      .then(function (restaurant) {
          res.send(restaurant);
        },
        function (error) {
          res.statusCode(400).send(error);
        });


  }

  function findFavRestaurantById(req,res) {
    var favRestaurantId = req.params.favRestaurantId;
    var userId = req.params.userId;
    restaurantModel
      .findFavRestaurantById(favRestaurantId,userId)
      .then(function (restaurant) {
          res.send(restaurant);
        },
        function (error) {
          res.statusCode(404).send(error);
        });


  }


  function findFavRestaurantForUserId(req,res) {
    var userId = req.params.userId;
    console.log("server"+userId);
    restaurantModel
      .findFavRestaurantForUserId(userId)
      .then(function (restaurants) {
        console.log(restaurants);
          res.send(restaurants);
        },
        function (error) {
          res.statusCode(404).send(error);
        });


  }



  function removeFavourites(req, res) {

    var restaurantId = req.params.restaurantId;
    var userId = req.params.userId;
    restaurantModel
      .removeFavourites(restaurantId,userId)
      .then(function (stats) {
        res.send(200)
      }, function (error) {
        res.statusCode(400).send(error);
      });

  }

}
