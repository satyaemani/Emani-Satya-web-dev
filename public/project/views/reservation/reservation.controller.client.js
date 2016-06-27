/**
 * Created by subbaraju on 21/6/2016.
 */

(function(){
  angular
    .module("RestaurantReservation")
    .controller("ReservationController",ReservationController);


  function ReservationController($routeParams,$location,ReservationService,UserService,$rootScope,ManagerService) {
    var vm = this;

    var restaurantId = $routeParams.restaurantId;
    vm.restaurantId = restaurantId;
    var location = $routeParams.location;
    vm.location = location;
    vm.loggedIn =false;
    vm.user = $rootScope.currentUser;
    var user = vm.user;
    var time = vm.time;
    var people = vm.people;
    vm.reserve = reserve;
    vm.fetchSlots=fetchSlots;
    var Ndate =new Date();
    vm.date=false;
    vm.logout=logout;


    function init()
    {
      console.log(Ndate);
      if (vm.user) {
        vm.loggedIn = true;
      }
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

    function  logout()
    {
      UserService.logout()
        .then(function(response)
          {
            $rootScope.currentUser=null;
            loggedIn=false;
            $location.url("/home");
          },
          function (response) {
            $location.url("/home");
          })
    }



    function fetchSlots(date) {
      if (date < Ndate) {
        console.log(date);
        console.log(Ndate);
        vm.date = true;
        vm.dateAvailable = false;
        vm.dateNotAvailable = false;
      }
      else {
        vm.date=false;
        vm.dateAvailable = false;
        vm.dateNotAvailable = false;
        var date = date + "";
        console.log(date);
        var flag = 0;
        ManagerService
          .findTimeByDate(date, restaurantId)
          .then(
            function (response) {
              for (var i in response.data[0].slots) {

                if (date == response.data[0].slots[i].date) {
                  vm.slots = response.data[0].slots[i].time;
                  vm.dateAvailable = true;
                  flag = flag + 1;
                  break;
                }

              }
              console.log(flag);

              if (flag == 0) {
                vm.dateNotAvailable = true;
                vm.slots = {
                  slot: [{slot: "09:00"}, {slot: "09:30"}, {slot: "10:00"}, {slot: "10:30"}, {slot: "11:00"}
                    , {slot: "11:30"}, {slot: "12:00"}, {slot: "12:30"}, {slot: "13:00"}, {slot: "13:30"}, {slot: "14:00"},
                    {slot: "14:30"}, {slot: "15:00"}, {slot: "15:30"}, {slot: "16:00"}, {slot: "16:30"}, {slot: "17:00"}, {slot: "17:30"},
                    {slot: "18:00"}, {slot: "18:30"}, {slot: "19:00"}]
                };

                console.log(vm.slots.slot);
              }
              // //fetch times by date,restId
            }, function (response) {
              console.log(response);
            });

    }

    }

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
        date: reservation.date,
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

