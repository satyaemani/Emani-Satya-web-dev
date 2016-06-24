(function(){
  angular
    .module("RestaurantReservation")
    .controller("LoginController",LoginController);

  //importing(injecting) the UserService which means all of its members can be used here in the controller
  function LoginController($location,UserService,$routeParams,$rootScope) {
    var vm = this;

    var location=$routeParams.location;

    console.log($rootScope.previousUrl);

    vm.login = function (username,password) {
      UserService.login(username,password)
        .then(function(response) {

          var user = response.data;
          $rootScope.currentUser=user;
          //if a mathces then navigate to that url
          if (user._id) {
            if(!$rootScope.previousUrl){
              //if $rootScope.previousUrl is null, which means the user was not redirected to login page from other pages,
              // direct to profile page after login
              $location.url('/user');
          }
            else
            {
              //if $rootScope.previousUrl is not null, which means the user was redirected to login page from a previous url,
              // then direct back to that page;
              //the replace() is for using previousUrl to replace the last history url,(which is the login url), so that
              //when user hit the back button it won't come back to login, instead, it stays at the same page(the previousUrl page).

              $location.url($rootScope.previousUrl).replace();
              $rootScope.previousUrl = null;
            }
          }
        },function(err){
          //or else print out error message
          vm.error = err;
          console.log(err);


        });



    }

  }

})();

