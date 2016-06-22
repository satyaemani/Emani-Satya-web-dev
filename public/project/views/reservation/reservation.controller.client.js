/**
 * Created by subbaraju on 21/6/2016.
 */

(function(){
  angular
    .module("RestaurantReservation")
    .controller("ReservationController",ReservationController);


  function ReservationController($routeParams,$location,ReservationService,$rootScope) {
    var vm = this;

    var restaurantId = $routeParams.restaurantId;
    console.log(restaurantId);

    function init()
    {
     ReservationService.findRestaurantById(restaurantId)
        .then(function(response)
        {
          vm.restaurant = response.data;
        console.log(vm.restaurant);


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
    vm.date=date;

    function date(date)
    {
      console.log(date);

    }
    vm.reserve = reserve;

    function reserve(reservation,restaurant)
    {
    console.log(reservation);
      console.log(restaurant);
      console.log(user);

      var reservation=
      {
        username:user.username,
        rId:restaurant.id,
        restaurantName:restaurant.name,
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

