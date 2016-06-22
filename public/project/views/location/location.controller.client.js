
(function(){
  angular
    .module("RestaurantReservation")
    .controller("LocationController",LocationController);


  function LocationController($routeParams,$location,LocationService,$rootScope) {
    var vm = this;

var location = $routeParams.location;


    function init() {
      LocationService.findRestaurantsByLocation(location)
        .then(function (response) {
          vm.businesses = response.data.businesses;
        }, function (response) {

        });
    }

    init();

    vm.findRestaurantsByLocation = findRestaurantsByLocation;
    vm.findRestaurantById = findRestaurantById;

    function findRestaurantsByLocation(searchRestaurant) {

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
      $location.url("/location/" + searchRestaurant);


    }

    function findRestaurantById(restaurantId) {
    console.log("in finding restaurants");
      if ($rootScope.currentUser) {
        console.log("in user");
        $location.url("/location/" + location + "/" + restaurantId);
      }
      else {
        //if user is not logged in, redirect to login page
       console.log("in else");
        $rootScope.previousUrl = "/location/"+location;
        console.log($rootScope.previousUrl);
        $location.url('/login');

      }

    }
  }

})();

