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
    deleteReservation:deleteReservation,
    findReservationsForRestId:findReservationsForRestId,
    findReservationsForUserAndRestId:findReservationsForUserAndRestId

  };
  return api;

  function findReservationsForUserAndRestId(userId,restId){
    console.log(restId);
    console.log(userId);
    return Reservation.find({_user:userId,rId:restId});
  }

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

  function findReservationsForRestId(restId)
  {
    return Reservation.find({rId:restId});
  }
};
