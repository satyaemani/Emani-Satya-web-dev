/**
 * Created by subbaraju on 24/6/2016.
 */

(function(){
  angular
    .module("RestaurantReservation")
    .controller("ManagerDashboardController",ManagerDashboardController);




  function ManagerDashboardController($location,$routeParams,$rootScope,UserService,ManagerService) {

    var vm = this;
    //vm.updateUser = updateUser;
    //vm.deleteUser = deleteUser;
    vm.logout = logout;






    var userId = $rootScope.currentUser._id;



    function init()
    {

      ManagerService.findUserById(userId)
        .then(function(response){
          vm.user = response.data;
          vm.messageNumber=vm.user.messages.length;
        })

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

