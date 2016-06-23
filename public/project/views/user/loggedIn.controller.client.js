

(function(){
  angular
    .module("RestaurantReservation")
    .controller("LoggedInController",LoggedInController);


  function LoggedInController($location,$rootScope,UserService) {
    var vm = this;
    var index=0;

    vm.user = $rootScope.currentUser;

    vm.logout=logout;


    vm.findRestaurants=findRestaurants;

    function findRestaurants(location)
    {
      $location.url("/location/"+location);
    }

    function  logout()
    {
      UserService.logout()
        .then(function(response)
          {
            $rootScope.currentUser=null;
            $location.url("/home");
          },
          function (response) {
            $location.url("/home");
          })
    }

  }

})();

