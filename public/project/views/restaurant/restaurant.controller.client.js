
(function(){
  angular
    .module("RestaurantReservation")
    .controller("RestaurantController",RestaurantController);


  function RestaurantController($routeParams,$rootScope,$location,RestaurantService,UserService) {
    var vm = this;

    vm.location=$routeParams.location;

    vm.user = $rootScope.currentUser;
    if(vm.user)
    {
      vm.logout;
    }
    console.log(vm.user);
    var restaurantId=$routeParams.restaurantId;
    vm.restaurantId = restaurantId;
    vm.location=$routeParams.location;

    vm.date=date;
    vm.logout=logout;

    function init()
    {
      console.log(restaurantId);
      RestaurantService.findRestaurantById(restaurantId)
        .then(function(response)
        {
          vm.restaurant = response.data;

        },function(response)
        {
          //console.log( response);
        });

    }
init();

    function  logout()
    {
      UserService.logout()
        .then(function(response)
          {
            $rootScope.currentUser=null;
           // $rootScope.restaurant=null;
            $location.url("/home");
          },
          function (response) {
            $location.url("/home");
          })
    }

    function date(date)
    {
      console.log(date);

    }


  }

})();

