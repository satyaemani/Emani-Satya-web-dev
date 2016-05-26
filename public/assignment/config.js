//IFFE
(function(){
  angular.module("WebAppMaker")
         .config(Config);

  function Config($routeProvider)
  {
    $routeProvider
      .when("/login",{
     templateUrl:"views/user/login.view.client.html",
        controller:"LoginController",
        controllerAs:"model"
     })
      .when("/",{
        templateUrl:"views/home.html"
      })
      .when("/register",{
        templateUrl:"views/user/register.view.client.html"
      })
      .when("/profile/:id",{
        templateUrl:"views/user/profile.view.client.html",
        controller:"ProfileController",
        controllerAs:"model"
      })
      .when("/website-list",{
        templateUrl:"views/websites/website-list.view.client.html"
      })
      .when("/website-new",{
        templateUrl:"views/websites/website-new.view.client.html"
      })
      .when("/website-edit",{
        templateUrl:"views/websites/website-edit.view.client.html"
      })
      .when("/page-list",{
        templateUrl:"views/pages/page-list.view.client.html"
      })
      .otherwise({
        redirectTo:"/login"
      });


  }
})();
