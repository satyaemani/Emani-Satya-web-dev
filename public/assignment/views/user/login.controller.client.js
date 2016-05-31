(function(){
  angular
    .module("WebAppMaker")
    .controller("LoginController",LoginController);

  //importing(injecting) the UserService which means all of its members can be used here in the controller
  function LoginController($location,UserService) {
    var vm = this;

    vm.login = function (username,password) {
  var user = UserService.findUserByUsernameAndPassword(username,password);

      //if a mathces then navigate to that url
      if(user)
      {
        $location.url("/user/"+user._id);
      }


    //or else print out error message
      else
      {
        vm.error = "Incorrect Username or Password";
      }

    }


    }

})();
