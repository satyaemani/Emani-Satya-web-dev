(function(){
  angular
    .module("WebAppMaker")
    .controller("ProfileController",ProfileController);




  function ProfileController($location,$routeParams,$rootScope,UserService) {

    var vm = this;
    vm.updateUser = updateUser;
    vm.deleteUser = deleteUser;
    vm.logout = logout;



    var userId = $rootScope.currentUser._id;

console.log(userId);

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
    UserService.logout()
      .then(function(response)
      {
          $location.url("/login");
      },
        function (response) {
          $location.url("/login");
        })
    }
    function deleteUser()
    {
      UserService.deleteUser(userId)
        .then(function(response) {

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

