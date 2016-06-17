
(function(){
  angular
    .module("RestaurantReservation")
    .controller("RestaurantController",RestaurantController);


  function RestaurantController($routeParams,$location,RestaurantService) {
    var vm = this;

    var restaurantId=$routeParams.restaurantId;

    vm.date=date;

    function init()
    {
      console.log(restaurantId);
      RestaurantService.findRestaurantById(restaurantId)
        .then(function(response)
        {
          vm.restaurant = response.data;

          console.log( vm.restaurant);
        },function(response)
        {
          console.log( response);
        })

    }
init();


    function date(date)
    {
      console.log(date);

    }


  }

})();

