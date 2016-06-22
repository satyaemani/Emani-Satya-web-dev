

(function(){
  angular
    .module("RestaurantReservation")
    .controller("HomeController",HomeController);


  function HomeController($location,$rootScope) {
    var vm = this;
    var index=0;

    vm.user = $rootScope.currentUser;

    vm.findRestaurants=findRestaurants;

    function findRestaurants(location)
    {
      $location.url("/location/"+location);
    }



  }

})();

