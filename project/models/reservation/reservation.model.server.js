/**
 * Created by subbaraju on 21/6/2016.
 */

module.exports = function() {

  var mongoose = require("mongoose");
  var ReservationSchema = require("./reservation.schema.server")();
  var Reservation = mongoose.model("Reservation",ReservationSchema);

  var api = {
    createReservation:createReservation,
    findReservationsForUserId:findReservationsForUserId
  };
  return api;

  function createReservation(userId,reservation)
  {
    reservation._user=userId;

    return Reservation.create(reservation);
  }

  function findReservationsForUserId(userId)
  {
    return Reservation.find({_user:userId});

  }
};
