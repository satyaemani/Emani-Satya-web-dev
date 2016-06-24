/**
 * Created by subbaraju on 21/6/2016.
 */

(function(){
  angular
    .module("RestaurantReservation")
    .controller("ReservationController",ReservationController);


  function ReservationController($routeParams,$location,ReservationService,$rootScope,ManagerService) {
    var vm = this;

    var restaurantId = $routeParams.restaurantId;
    console.log(restaurantId);

      var location = $routeParams.location;
    function init()
    {
     ReservationService.findRestaurantById(restaurantId)
        .then(function(response)
        {
          vm.restaurant = response.data;
        console.log(vm.restaurant);
        ManagerService.findSlotsByRestId(restaurantId)
          .then(function(response)
          {
            vm.slots=response.data[0].slots;
            console.log(vm.slots);

          },function(response)
          {
            console.log( response);
          });


        },function(response)
        {
          //console.log( response);
        });

    }
init();



    vm.user = $rootScope.currentUser;
    var user = vm.user;


    var time = vm.time;
    var people = vm.people;


    vm.reserve = reserve;

    function reserve(reservation,slot,restaurant)
    {
      console.log(slot);
      var reservation=
      {
        username:user.username,
        rId:restaurant.id,
        restaurantName:restaurant.name,
        location:location,
        noOfPeople:reservation.people,
        email:user.email,
        phone:user.phone,
        date: reservation.date1,
        time:reservation.time
      }

      ReservationService
        .createReservation(reservation,user._id)
        .then(
          function(response)
        {
         $location.url("/user/slot");

        },function(err)
          {
            console.log(err);
            vm.err=err;
          });

    }

  }

})();

