/**
 * Created by subbaraju on 23/6/2016.
 */
(function(){
  angular
    .module("RestaurantReservation")
    .controller("ManagerRegisterController",ManagerRegisterController);

  //importing(injecting) the UserService which means all of its members can be used here in the controller
  function ManagerRegisterController($location,ManagerService) {
    var vm = this;

    vm.register = register;

    function register(user) {
        console.log(user);
      if(user.password!==user.confPassword)
      {
        vm.passerr="Passwords Do not match";

      }
      else if(!user.password||!user.confPassword)
      {
        vm.passnull="password and verify password are mandatory"
      }
      //UserService.findUserByUsername(user.username)
      //  .then(function(response){
      //    var person = response.data;
      //
      //
      //    if(person._id)
      //    {
      //      vm.error = "Username already exists";
      //    }
      //
      //    //or else update the array
      //    else
      //    {
      //console.log(user);

      else {

        var manager={
          username:user.username,
          password:user.password,
          restaurantId:user.restaurantId
        }

        ManagerService.register(manager)
          .then(
            function (response) {
              var createUser = response.data;
              console.log(createUser);

              if (createUser) {
                console.log("in if");
                $location.url("/manager");
              }
            },
            function (err) {
              console.log(err);
              vm.error = err;
            }



            //if(createUser._id)
            //{
            //  console.log(createUser)
            //  $location.url("/user/"+createUser._id);
            //}
            //else
            //{
            //  console.log(createUser)
            //  vm.error="Passwords don't match";
            //}}
          );

        // }

        //  })

      }
    }
  }
})();


