/**
 * Created by subbaraju on 21/6/2016.
 */
(function(){
  angular
    .module("RestaurantReservation")
    .factory("ReservationService",ReservationService);


  function ReservationService($http) {

    var api = {
      findRestaurantById: findRestaurantById,
      createReservation:createReservation,
      findReservationsForUserId:findReservationsForUserId,
      deleteReservation:deleteReservation,
      findReservationsForRestId:findReservationsForRestId,
      findReservationsForUserAndRestId:findReservationsForUserAndRestId
    };
    return api;


    function randomString(length, chars) {
      var result = '';
      for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
      return result;
    }

    function findRestaurantById(restaurantId,callback) {
      var index = angular.callbacks.counter.toString(36);
      var method = 'GET';
      var url = 'http://api.yelp.com/v2/business/'+restaurantId;
      var params = {
        // callback: 'JSONP_CALLBACK',
        callback: 'angular.callbacks._'+index,
        oauth_consumer_key: '4cRjOPq02CMPLg_MYbgXmg', //Consumer Key
        oauth_token: 'UTzHJtkHrYrVSDmwDNAP8wAkZ1lPYtN6', //Token
        oauth_signature_method: "HMAC-SHA1",
        oauth_timestamp: new Date().getTime(),
        oauth_nonce: randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
        term: 'food'
      };
      var consumerSecret = 's0pmDiSW_9Ud5K3LskFRQr_hpcY'; //Consumer Secret
      var tokenSecret = 'SxoQ7g0RzMMw2eqihgdJiVi4rbU'; //Token Secret
      var signature = oauthSignature.generate(method, url, params, consumerSecret, tokenSecret, {encodeSignature: false});
      params['oauth_signature'] = signature;

      console.log("in ");

      return $http.jsonp(url, {params: params});

    }


    function findReservationsForUserAndRestId(userId,restId)
    {
      var url="/api/user/"+userId+"/"+restId;
      return $http.get(url);


    }


      function createReservation(reservation,userId)
    {
      var url="/api/user/"+userId+"/reservation";
      return $http.post(url,reservation);

    }

    function deleteReservation(reservationId)
    {
      var url = "/api/user/" + reservationId + "/reservation";
      return $http.delete(url);
    }


  function  findReservationsForUserId(reservationId)
  {

    var url = "/api/user/" + reservationId + "/reservation";
    return $http.get(url);
  }

    function findReservationsForRestId(restId)
    {
      var url = "/api/user/manager/" + restId + "/reservation";
      return $http.get(url);
    }

  }

})();



