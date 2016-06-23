/**
 * Created by subbaraju on 21/6/2016.
 */

module.exports = function() {

  var mongoose = require("mongoose");
  var ReservationSchema = require("./reservation.schema.server")();
  var Reservation = mongoose.model("Reservation",ReservationSchema);

  var api = {
    createReservation:createReservation,
    findReservationsForUserId:findReservationsForUserId,
    deleteReservation:deleteReservation
  };
  return api;

  function deleteReservation(reservationId)
  {
    return Reservation.remove({_id:reservationId});

  }

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
