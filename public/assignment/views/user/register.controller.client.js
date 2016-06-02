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
           var person = response;


           console.log(person);
           if(person._id)
           {
             vm.error = "Username already exists";
           }

           //or else update the array
           else
           {
             console.log(user);
             UserService.createUser(user)
               .then(
                 function (response) {
                 var createUser=response.data;
                   console.log(createUser);
                console.log(createUser._id);

                 if(createUser)
                 {
                   $location.url("/user/"+createUser._id);
                 }
                 else

                 {
                   vm.error="Passwords don't match";
                 }
               })




           }

         })

    }


  }

})();

