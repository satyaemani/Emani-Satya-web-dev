
(function(){
  angular
    .module("RestaurantReservation")
    .controller("RestaurantController",RestaurantController);


  function RestaurantController($routeParams,$location,RestaurantService) {
    var vm = this;

    var locationId=$routeParams.locationId;

    vm.findRestaurantByLocationId;

    function findRestaurantByLocationId(locationId)
    {
      LocationService.findRestaurantsByLocation(locationId)
        .then(function(response)
        {
          var x = response.data;
        })
    }

  }

})();

