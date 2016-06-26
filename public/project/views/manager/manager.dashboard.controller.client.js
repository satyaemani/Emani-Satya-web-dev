/**
 * Created by subbaraju on 24/6/2016.
 */

(function(){
  angular
    .module("RestaurantReservation")
    .controller("ManagerDashboardController",ManagerDashboardController);




  function ManagerDashboardController($location,$routeParams,$rootScope,ReservationService,UserService,ManagerService) {

    var vm = this;
    //vm.updateUser = updateUser;
    //vm.deleteUser = deleteUser;
    vm.logout = logout;

//here user is manager




    var userId = $rootScope.currentUser._id;
    var restId = $rootScope.currentUser.restaurantId;


    function init()
    {

      ManagerService.findUserById(userId)
        .then(function(response){
          vm.user = response.data;
          vm.messageNumber=vm.user.messages.length;
        })


      ReservationService.findReservationsForRestId(restId)
        .then(function(response){
          console.log(response);
          vm.reservations=response.data;
          vm.reservationsLength=vm.reservations.length;

        },function(response)
        {
          console.log(response);
        } );
    }
    init();



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

