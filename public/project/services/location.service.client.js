(
  function(){
    angular
      .module("RestaurantReservation")
      .factory("LocationService",LocationService);


    function LocationService($http) {
      var api = {
        findRestaurantsByLocation: findRestaurantsByLocation
        //request_yelp:request_yelp

      };
      return api;

      function findRestaurantsByLocation(location,callback)
      {
        var accessor = {
          consumerSecret: 's0pmDiSW_9Ud5K3LskFRQr_hpcY',
          tokenSecret: 'SxoQ7g0RzMMw2eqihgdJiVi4rbU'
        };

        var parameters = [];

        parameters.push(['location', location]);
        parameters.push(['limit', 10]);
        parameters.push(['category_filter', 'restaurants']);
        parameters.push(['callback', 'angular.callbacks._0']);
        parameters.push(['oauth_consumer_key', '4cRjOPq02CMPLg_MYbgXmg']);
        parameters.push(['oauth_consumer_secret', 's0pmDiSW_9Ud5K3LskFRQr_hpcY']);
        parameters.push(['oauth_token', 'UTzHJtkHrYrVSDmwDNAP8wAkZ1lPYtN6']);
        parameters.push(['oauth_signature_method', 'HMAC-SHA1']);
        var message = {
          'action': 'http://api.yelp.com/v2/search',
          'method': 'GET',
          'parameters': parameters
        };

        OAuth.setTimestampAndNonce(message);
        OAuth.SignatureMethod.sign(message, accessor);
        var parameterMap = OAuth.getParameterMap(message.parameters);
        parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature);

        $http.jsonp(message.action, {params: parameterMap}).success(callback);

      }

           //function findRestaurantsByLocation(searchRestaurant)
      //{
      //  var url = "/api/location?location="+searchRestaurant;
      //  return $http.get(url);
      //}


    }
  })();
