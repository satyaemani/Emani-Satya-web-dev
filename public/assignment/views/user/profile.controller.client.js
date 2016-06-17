(function(){
  angular
    .module("WebAppMaker")
    .controller("ProfileController",ProfileController);




  function ProfileController($location,$routeParams,UserService) {

    var vm = this;
    vm.updateUser = updateUser;
    vm.deleteUser = deleteUser;
    vm.logout = logout;



    vm.userId = $routeParams.userId;
    var userId = vm.userId;


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

