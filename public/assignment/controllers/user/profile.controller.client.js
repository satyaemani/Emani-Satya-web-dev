(function(){
  angular
    .module("WebAppMaker")
    .controller("ProfileController",ProfileController);




  function ProfileController($routeParams,UserService) {

    var vm = this;
    vm.updateUser = updateUser;


    var id = $routeParams.userId;

    function init()
    {
      vm.user = UserService.findUserById(id);
    }
    init();


    function updateUser(newUser)
     {

      var valid= UserService.updateUser(id,newUser);
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

