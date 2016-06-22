/**
 * Created by subbaraju on 22/6/2016.
 */

(function(){
  angular
    .module("RestaurantReservation")
    .controller("SlotController",SlotController);




  function SlotController($location,$routeParams,$rootScope,ReservationService) {

    var vm = this;
   // vm.updateUser = updateUser;
    vm.deleteReservation = deleteReservation;
    vm.logout = logout;



    var userId = $rootScope.currentUser._id;



    function init()
    {
console.log("slot controller");
     ReservationService.findReservationsForUserId(userId)
        .then(function(response){
          console.log(response);
          vm.reservations=response.data;

        console.log(vm.reservations);
        },function(response)
        {
          console.log(response);
        } )

    }
    init();

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
    function deleteReservation()
    {


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

