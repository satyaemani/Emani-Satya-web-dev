/**
 * Created by subbaraju on 22/6/2016.
 */

(function(){
  angular
    .module("RestaurantReservation")
    .controller("SlotController",SlotController);




  function SlotController($location,$routeParams,$rootScope,$window,ReservationService,UserService) {

    var vm = this;
   // vm.updateUser = updateUser;
    vm.deleteReservation = deleteReservation;
    vm.logout = logout;
    vm.back=back;



    var userId = $rootScope.currentUser._id;



    function init()
    {

     ReservationService.findReservationsForUserId(userId)
        .then(function(response){

          vm.reservations=response.data;
          vm.reservations.phone= parseInt(vm.reservations.phone);
        },function(response)
        {
          console.log(response);
        } );

    }
    init();

    function back(){
      $window.history.back();
    }

    function  logout()
    {
      UserService.logout()
        .then(function(response)
          {
            $location.url("/login");
          },
          function (response) {
            $location.url("/login");
          })
    }
    function deleteReservation(reservationId)
    {
      ReservationService.deleteReservation(reservationId)
        .then(function(response)
        {
          var result =response.data;
          ReservationService.findReservationsForUserId(userId)
            .then(function(response){
              console.log(response);
              vm.reservations=response.data;

            },function(response)
            {
              console.log(response);
            } );

          },function(){

        });


    }


    //function updateUser(newUser)
    //{
    //
    //  UserService.updateUser(userId,newUser)
    //    .then(function(response) {
    //
    //        vm.success = "Updated";
    //      },
    //      function(response) {
    //        vm.error = "not updated";
    //
    //      })
    //
    //}
  }
})();

