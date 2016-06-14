
(function(){
  angular
    .module("RestaurantReservation")
    .controller("LocationController",LocationController);


  function LocationController($location,LocationService) {
    var vm = this;


    vm.findRestaurantsByLocation = findRestaurantsByLocation;
    vm.findRestaurantById = findRestaurantById;

    function findRestaurantsByLocation(searchRestaurant)
    {
      console.log("In location controller")
      LocationService.findRestaurantsByLocation(searchRestaurant)
        .then(function(response)
        {
          console.log(response.data.businesses);
          vm.businesses = response.data.businesses;
        },function(response)

        {
          console.log(response);
        });

    }

    function findRestaurantById(restaurantId)
    {
      $location.url("/location/"+restaurantId);

    }

  }

})();

