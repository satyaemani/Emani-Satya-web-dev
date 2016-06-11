(
  function(){
    angular
      .module("RestaurantReservation")
      .factory("RestaurantService",RestaurantService);


    function RestaurantService($http) {
      var api = {

        findRestaurantById: findRestaurantById
      };

      return api;





      function randomString(length, chars) {
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
        return result;
      }


      function findRestaurantById(restaurantId,callback) {

        var method = 'GET';
        var url = 'http://api.yelp.com/v2/business/'+restaurantId;
        var params = {
          // callback: 'JSONP_CALLBACK',
          callback: 'angular.callbacks._0',
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
        console.log(url);
        return $http.jsonp(url, {params: params});
      //return  $.ajax({
      //    'url': url,
      //    'data':{params: params},
      //    'cache': true,
      //    'dataType': 'jsonp',
      //    'jsonpCallback': 'cb',
      //    success: callback
      //  });
      }

    }
  })();
