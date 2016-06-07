(
  function(){
    angular
      .module("RestaurantReservation")
      .factory("LocationService",LocationService);


    function LocationService($http) {
      var api = {
        findRestaurantsByLocation: findRestaurantsByLocation

      };
      return api;


      function findRestaurantsByLocation(searchRestaurant)
      {
        var url = "/api/location?location="+searchRestaurant;
        return $http.get(url);
      }


    }
  })();
