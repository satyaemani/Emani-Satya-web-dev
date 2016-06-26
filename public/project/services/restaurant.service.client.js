(
  function(){
    angular
      .module("RestaurantReservation")
      .factory("RestaurantService",RestaurantService);



    function RestaurantService($http) {
      var j=1;
      var api = {

        findRestaurantById: findRestaurantById,
        addToFavourites:addToFavourites,
        findFavRestaurantById:findFavRestaurantById,
        findFavRestaurantForUserId:findFavRestaurantForUserId,
        removeFavourites: removeFavourites,
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
       j++;
        console.log("in ");

        return $http.jsonp(url, {params: params});
        //.then(function (response) {
        //  // this callback will be called asynchronously
        //  // when the response is available
        //
        //  console.log(response);
        //
        //}, function (response) {
        //  // called asynchronously if an error occurs
        //  // or server returns response with an error status.
        //
        //  console.log(response);
        //
        //});


      }




      function addToFavourites(favRestaurant,userId)
      {
        var url="/api/user/"+userId+"/restaurant";
        return $http.post(url,favRestaurant);
      }


      function findFavRestaurantById(favRestaurantId,userId)
      {
        var url="/api/restaurant/"+favRestaurantId+"/"+userId;
        return $http.get(url);
      }

      function removeFavourites(restaurantId,userId)
      {
        var url="/api/restaurant/"+restaurantId+"/"+userId;
        return $http.delete(url);
      }

      function  findFavRestaurantForUserId(userId)
      {
        console.log("in service");
        var url = "/api/user/" + userId + "/restaurant";
        return $http.get(url);
      }
    }
  })();
