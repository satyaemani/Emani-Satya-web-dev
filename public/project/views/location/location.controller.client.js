
(function(){
  angular
    .module("RestaurantReservation")
    .controller("LocationController",LocationController);


  function LocationController($routeParams,$location,LocationService) {
    var vm = this;
    var location = $routeParams.location;
    function init()
    {
      LocationService.findRestaurantsByLocation(location)
        .then(function(response)
        {
          console.log(response.data);
          vm.businesses = response.data.businesses;
        },function(response)

        {
          console.log(response);
        });
    }
init();

    vm.findRestaurantsByLocation = findRestaurantsByLocation;
    vm.findRestaurantById = findRestaurantById;

    function findRestaurantsByLocation(searchRestaurant)
    {

      //LocationService.findRestaurantsByLocation(searchRestaurant)
      //  .then(function(response)
      //  {
      //    console.log(response.data);
      //    vm.businesses = response.data.businesses;
      //  },function(response)
      //
      //  {
      //    console.log(response);
      //  });
      $location.url("/location/"+searchRestaurant);

    }

    function findRestaurantById(restaurantId)
    {
      $location.url("/location/"+location+"/"+restaurantId);

    }

  }

})();

