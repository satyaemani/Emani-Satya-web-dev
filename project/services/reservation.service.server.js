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
  app.delete("/api/user/:reservationId/reservation",deleteReservation);
  app.get("/api/user/manager/:restId/reservation",findReservationsForRestId);
  app.get("/api/user/:userId/:restId",findReservationsForUserAndRestId);

  function findReservationsForUserAndRestId(req,res){

    var userId = req.params.userId;
    var restId= req.params.restId;

    reservationModel
      .findReservationsForUserAndRestId(userId,restId)
      .then(
        function(user)
        {
          res.send(user);
        },
        function(error){
          res.statusCode(404).send(error);
        });
  }


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


  }

  function findReservationsForUserId(req,res) {
    var userId = req.params.userId;
    reservationModel
      .findReservationsForUserId(userId)
      .then(function (reservations) {
          res.send(reservations);
        },
        function (error) {
          res.statusCode(404).send(error);
        });


  }


  function deleteReservation(req, res) {

    var reservationId = req.params.reservationId;
    reservationModel
      .deleteReservation(reservationId)
      .then(function (stats) {
        res.send(200)
      }, function (error) {
        res.statusCode(400).send(error);
      });

  }

  function findReservationsForRestId(req,res)
  {
    var restId = req.params.restId;
    reservationModel
      .findReservationsForRestId(restId)
      .then(function (reservations) {
          res.send(reservations);
        },
        function (error) {
          res.statusCode(404).send(error);
        });

  }

}
