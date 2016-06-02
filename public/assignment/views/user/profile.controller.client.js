(function(){
  angular
    .module("WebAppMaker")
    .controller("ProfileController",ProfileController);




  function ProfileController($routeParams,UserService) {

    var vm = this;
    vm.updateUser = updateUser;



    var userId = $routeParams.userId;



    function init()
    {

       UserService.findUserById(userId)
         .then(function(response){
            vm.user = response.data;
         })

    }
    init();


    function updateUser(newUser)
     {

       UserService.updateUser(userId,newUser)
         .then(function(response) {

           vm.success = "Updated";
         },
       function(response) {
       vm.error = "not updated";

     })
       //console.log(valid);

     }

  }
})();

