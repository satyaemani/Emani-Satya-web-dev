(function(){
  angular
    .module("WebAppMaker")
    .controller("LoginController",LoginController);

  //importing(injecting) the UserService which means all of its members can be used here in the controller
  function LoginController($location,UserService) {
    var vm = this;

    vm.login = function (username,password) {
   UserService.login(username,password)
     .then(function(response) {

       var user = response.data;

       //if a mathces then navigate to that url
       if (user._id) {
         $location.url("/user" );
       }
     },function(err){


       //or else print out error message
       vm.error = err;


     });



    }


    }

})();
