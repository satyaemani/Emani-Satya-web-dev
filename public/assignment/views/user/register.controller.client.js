(function(){
  angular
    .module("WebAppMaker")
    .controller("RegisterController",RegisterController);

  //importing(injecting) the UserService which means all of its members can be used here in the controller
  function RegisterController($location,UserService) {
    var vm = this;

    vm.register = register;

    function register(user) {

      var person = UserService.findUserByUsername(user.username);
      //if a match occurs then say that the username already exists
      //console.log(person);

      if(person)
      {
        vm.error = "Username already exists";
      }

      //or else update the array
      else
      {
        var createUser= UserService.createUser(user);

        if(createUser)
        {
          $location.url("/user/"+createUser._id);
        }
        else

        {
          vm.error="Passwords don't match";
        }


      }





    }


  }

})();

