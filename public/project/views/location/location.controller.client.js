
(function(){
  angular
    .module("RestaurantReservation")
    .controller("LocationController",LocationController);


  function LocationController($routeParams,LocationService) {
    var vm = this;


    vm.findRestaurantsByLocation = findRestaurantsByLocation;

    function findRestaurantsByLocation(searchRestaurant)
    {
      set_parameters={location:searchRestaurant};

      LocationService.findRestaurantsByLocation(set_parameters)
        .then(function(response)
        {
          vm.restaurants = response.data;
        })


      //LocationService.findRestaurantsByLocation(searchRestaurant)
      //  .then(function(response)
      //  {
      //    vm.restaurants = response.data;
      //  })
    }

  }

})();

