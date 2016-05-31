(function(){
  angular
    .module("WebAppMaker")
    .controller("ProfileController",ProfileController);




  function ProfileController($routeParams,UserService) {

    var vm = this;
    vm.updateUser = updateUser;


    var userId = $routeParams.userId;

    vm.userId = $routeParams.userId;



    function init()
    {
     // console.log(vm.userId);
      vm.user = UserService.findUserById(vm.userId);
      //console.log(vm.user);
    }
    init();


    function updateUser(newUser)
     {

      var valid= UserService.updateUser(userId,newUser);
       //console.log(valid);
       if(valid)
       {
         vm.success="Updated";
       }
       else
       {
         vm.error="not updated";
       }
     }

  }
})();

