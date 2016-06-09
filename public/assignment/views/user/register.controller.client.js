(function(){
  angular
    .module("WebAppMaker")
    .controller("RegisterController",RegisterController);

  //importing(injecting) the UserService which means all of its members can be used here in the controller
  function RegisterController($location,UserService) {
    var vm = this;

    vm.register = register;

    function register(user) {

       UserService.findUserByUsername(user.username)
         .then(function(response){
           var person = response.data;


           if(person._id)
           {
             vm.error = "Username already exists";
           }

           //or else update the array
           else
           {
             console.log("in else");

             UserService.createUser(user)
               .then(
                 function (response) {
                 var createUser = response.data;
                   console.log(response);
                 if(createUser._id)
                 {
                   console.log(createUser)
                   $location.url("/user/"+createUser._id);
                 }
                 else
                 {
                   console.log(createUser)
                   vm.error="Passwords don't match";
                 }
               })

           }

         })

    }


  }

})();

