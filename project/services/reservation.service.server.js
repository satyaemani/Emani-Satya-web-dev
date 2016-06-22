/**
 * Created by subbaraju on 21/6/2016.
 */
//var passport = require('passport');
//var LocalStrategy = require('passport-local').Strategy;
//var bcrypt = require('bcrypt-nodejs');
//var FacebookStrategy = require('passport-facebook').Strategy;


module.exports=function(app,models) {

  var reservationModel = models.reservationModel;


  app.post("/api/user/:userId/reservation",createReservation);
  app.get("/api/user/:userId/reservation",findReservationsForUserId);


  function createReservation(req, res) {
    var userId = req.params.userId;
    var reservation = req.body;

    reservationModel
      .createReservation(userId, reservation)
      .then(function (reservation) {
          res.send(reservation);
        },
        function (error) {
          res.statusCode(400).send(error);
        });


  };

  function findReservationsForUserId(req,res){
    var userId = req.params.userId;
    reservationModel
      .findReservationsForUserId(userId)
      .then(function (reservations) {
          res.send(reservations);
        },
        function(error)
        {
          res.statusCode(404).send(error);
        });

  }

}
