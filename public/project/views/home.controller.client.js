

(function(){
  angular
    .module("RestaurantReservation")
    .controller("HomeController",HomeController);


  function HomeController($location) {
    var vm = this;
    var index=0;

    vm.findRestaurants=findRestaurants;

    function findRestaurants(location)
    {
      $location.url("/location/"+location);
    }



  }

})();

