
(function(){
  angular
    .module("RestaurantReservation")
    .controller("RestaurantController",RestaurantController);


  function RestaurantController($routeParams,$location,RestaurantService) {
    var vm = this;

    var restaurantId=$routeParams.restaurantId;


    function init()
    {
      console.log(restaurantId);
      RestaurantService.findRestaurantById(restaurantId)
        .then(function(response)
        {
          vm.restaurant = response.data;
          $('.datetimepicker').datetimepicker();
        })

    }
init();


  }

})();

