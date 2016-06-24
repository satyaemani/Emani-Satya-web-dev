
(function(){
  angular
    .module("RestaurantReservation")
    .controller("ProfileController",ProfileController);




  function ProfileController($location,$routeParams,$rootScope,UserService) {

    var vm = this;
    vm.updateUser = updateUser;
    vm.deleteUser = deleteUser;
    vm.logout = logout;



    var userId = $rootScope.currentUser._id;



    function init()
    {

      UserService.findUserById(userId)
        .then(function(response){
          vm.user = response.data;
        })

    }
    init();

    function  logout()
    {
      console.log("in logout");
      UserService.logout()
        .then(function(response)
          {
            console.log(response);
            $rootScope.currentUser=null;
            $location.url("/login");

          },
          function (response) {
            console.log(response);
            $location.url("/login");
          })
    }
    function deleteUser()
    {
      UserService.deleteUser(userId)
        .then(function(response) {
            $rootScope.currentUser=null;
            $location.url("/login");
          },
          function(response) {
            vm.error = "not deleted";

          })

    }


    function updateUser(newUser)
    {

      UserService.updateUser(userId,newUser)
        .then(function(response) {

            vm.success = "Updated";
          },
          function(response) {
            vm.error = "not updated";

          })

    }
  }
})();

