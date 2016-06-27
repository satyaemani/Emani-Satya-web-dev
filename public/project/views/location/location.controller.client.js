
(function(){
  angular
    .module("RestaurantReservation")
    .controller("LocationController",LocationController);


  function LocationController($routeParams,$location,$rootScope,UserService,LocationService) {
    var vm = this;


    var location = $routeParams.location;
    vm.user = $rootScope.currentUser;
    vm.findRestaurantsByLocation = findRestaurantsByLocation;
    vm.findRestaurantById = findRestaurantById;
    vm.loggedIn=false;
    vm.logout=logout;

    function init() {
      if (vm.user) {
        vm.loggedIn = true;
      }
      LocationService.findRestaurantsByLocation(location)
        .then(function (response) {
          vm.businesses = response.data.businesses;
        }, function (response) {

        });
    }

    init();




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

      $location.url("/location/" + location + "/" + restaurantId);
      //if ($rootScope.currentUser) {
      //  console.log("in user");
      //  $location.url("/location/" + location + "/" + restaurantId);
      //}
      //else {
      //  //if user is not logged in, redirect to login page
      // console.log("in else");
      //  $rootScope.previousUrl = "/location/"+location;
      //  console.log($rootScope.previousUrl);
      //  $location.url('/login');
      //
      //}

    }

    function  logout()
    {
      UserService.logout()
        .then(function(response)
          {
            console.log(response);
            $rootScope.currentUser=null;
            vm.loggedIn=false;
            $location.url("/home");

          },
          function (response) {
            console.log(response);
            $location.url("/home");
          })
    }
  }



})();

