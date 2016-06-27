

(function(){
  angular
    .module("RestaurantReservation")
    .controller("HomeController",HomeController);


  function HomeController($location,$rootScope,UserService) {
    var vm = this;
    var index=0;
    vm.findRestaurants=findRestaurants;
    vm.user = $rootScope.currentUser;
    vm.logout=logout;

    vm.loggedIn=false;

    function init() {
      if (vm.user) {
        vm.loggedIn = true;
      }
    }

    init();


    function findRestaurants(location)
    {
      $location.url("/location/"+location);
    }

    function  logout()
    {
      console.log("in logout");
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

