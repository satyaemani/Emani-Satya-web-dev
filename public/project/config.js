//IFFE
(function(){
  angular.module("RestaurantReservation")
    .config(Config);

  function Config($routeProvider)
  {
    $routeProvider
      .when("/login",{
        templateUrl:"views/user/login.view.client.html",
        controller:"LoginController",
        controllerAs:"model"
      })
      .when("/home",{
        templateUrl:"views/home.view.client.html"
      })
      .when("/location",{
        templateUrl:"views/location/location.view.client.html",
        controller:"LocationController",
        controllerAs:"model"
      })
      .when("/",{

        redirectTo:"/home"
      })
      .when("/register",{
        templateUrl:"views/user/register.view.client.html",
       controller:"RegisterController",
        controllerAs:"model"
      })
      .when("/user/:userId",{
        templateUrl:"views/user/profile.view.client.html",
        controller:"ProfileController",
        controllerAs:"model"
      })
      .otherwise({
        redirectTo:"/home"
      });


  }
})();

