
(function(){
  angular
    .module("RestaurantReservation")
    .controller("LocationController",LocationController);


  function LocationController($routeParams,LocationService) {
    var vm = this;


    vm.findRestaurantsByLocation = findRestaurantsByLocation;

    function findRestaurantsByLocation(searchRestaurant)
    {
      LocationService.findRestaurantsByLocation(searchRestaurant)
        .then(function(response)
        {
          vm.restaurants = response.data;
        })
    }

  }

})();

