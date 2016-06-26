/**
 * Created by subbaraju on 25/6/2016.
 */
/**
 * Created by subbaraju on 24/6/2016.
 */

(function(){
  angular
    .module("RestaurantReservation")
    .controller("ManagerMessageController",ManagerMessageController);




  function ManagerMessageController($location,$routeParams,$rootScope,UserService,ManagerService) {

    var vm = this;

    vm.logout = logout;
    vm.deleteMessage = deleteMessage;
    vm.searchUser=searchUser;

    var userId = $rootScope.currentUser._id;


    vm.messageShow = false;

    function init()
    {
      console.log(userId);
      ManagerService.findUserById(userId)
      .then(function(response){
        vm.user = response.data;

      });



    }
    init();

    function searchUser(username)
    {
        vm.messageShow=true;
         vm.username=username;


    }

    function deleteMessage(message,userId)
    {
      console.log(message._id);
      console.log(userId);
      ManagerService.deleteMessage(userId,message._id)
        .then(function(response){
          ManagerService.findUserById(userId)
            .then(function(response){
              vm.user = response.data;
              console.log(vm.user);
            });
        });
    }

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

