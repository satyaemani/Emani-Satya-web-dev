//IFFE
(function(){
  angular.module("WebAppMaker")
         .config(Config);

  function Config($routeProvider)
  {
    $routeProvider
      .when("/login",{
     templateUrl:"views/user/login.view.client.html",
        controller:"LoginController"
     })
      .when("/",{
        templateUrl:"views/home.html"
      })
      .when("/register",{
        templateUrl:"views/user/register.view.client.html"
      })
      .when("/profile",{
        templateUrl:"views/user/profile.view.client.html"
      })
      .otherwise({
        redirectTo:"/login"
      });


  }
})();
