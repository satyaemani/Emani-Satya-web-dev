
(function(){
  angular
    .module("RestaurantReservation")
    .controller("LocationController",LocationController);


  function LocationController($location,LocationService) {
    var vm = this;
    var index=0;
//    function init()
//    {
//      index=0;
//    }
//init();

    vm.findRestaurantsByLocation = findRestaurantsByLocation;
    vm.findRestaurantById = findRestaurantById;

    function findRestaurantsByLocation(searchRestaurant)
    {

      LocationService.findRestaurantsByLocation(searchRestaurant)
        .then(function(response)
        {
          console.log(response.data);
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

