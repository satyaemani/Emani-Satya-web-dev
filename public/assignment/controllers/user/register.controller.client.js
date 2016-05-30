(function(){
  angular
    .module("WebAppMaker")
    .controller("RegisterController",RegisterController);

  //importing(injecting) the UserService which means all of its members can be used here in the controller
  function RegisterController($location,UserService) {
    var vm = this;

    vm.register = function (username,password,confPassword) {

      var user = UserService.findUserByUsername(username);
      //if a match occurs then say that the username already exists
      if(user)
      {
        vm.error = "Username already exists";
      }

      //or else update the array
      else
      {
        var createUser= UserService.createUser(username,password,confPassword);

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

