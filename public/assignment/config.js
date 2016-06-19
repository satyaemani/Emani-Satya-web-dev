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

        redirectTo:"/login"
      })
      .when("/register",{
        templateUrl:"views/user/register.view.client.html",
        controller:"RegisterController",
        controllerAs:"model"
      })
      .when("/user",{
        templateUrl:"views/user/profile.view.client.html",
        controller:"ProfileController",
        controllerAs:"model",
        resolve:
        {
          loggedIn:checkLoggedIn
        }
      })
      .when("/user/:userId/website",{
        templateUrl:"views/websites/website-list.view.client.html",
        controller:"WebsiteListController",
        controllerAs:"model"
      })
      .when("/user/:userId/website/new",{
        templateUrl:"views/websites/website-new.view.client.html",
        controller:"WebsiteNewController",
        controllerAs:"model"
      })
      .when("/user/:userId/website/:websiteId",{
        templateUrl:"views/websites/website-edit.view.client.html",
       controller:"WebsiteEditController",
        controllerAs:"model"
      })
      .when("/user/:userId/website/:websiteId/page",{
        templateUrl:"views/pages/page-list.view.client.html",
        controller:"PageListController",
        controllerAs:"model"
      })
      .when("/user/:userId/website/:websiteId/page/new",{
        templateUrl:"views/pages/page-new.view.client.html",
        controller:"PageNewController",
        controllerAs:"model"
      })
      .when("/user/:userId/website/:websiteId/page/:pageId",{
        templateUrl:"views/pages/page-edit.view.client.html",
        controller:"PageEditController",
        controllerAs:"model"
      })
      .when("/user/:userId/website/:websiteId/page/:pageId/widget",{
        templateUrl:"views/widgets/widget-list.view.client.html",
        controller:"WidgetListController",
        controllerAs:"model"
      })
      .when("/user/:userId/website/:websiteId/page/:pageId/widget/new",{
        templateUrl:"views/widgets/widget-choose.view.client.html",
        controller:"NewWidgetController",
        controllerAs:"model"
      })
      .when("/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId",{
        templateUrl:"views/widgets/widget-edit.view.client.html",
        controller:"EditWidgetController",
        controllerAs:"model"
      })
      .when("/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId/flickr",{
        templateUrl:"views/widgets/widget-flickr-search.view.client.html",
        controller:"FlickrImageSearchController",
        controllerAs:"model"
      })
      .otherwise({
        redirectTo:"/login"
      });


    function checkLoggedIn(UserService,$location,$q,$rootScope)
    {
      console.log("in check logged in");
      var deferred = $q.defer();
       UserService.loggedIn()
        .then(function(response)
        {
          var user = response.data;
          console.log(user);
          if(user=='0')
          {
            console.log("reject");
            $rootScope.currentUser=null;
            deferred.reject();
            $location.url("/login");
          }
          else{
            console.log("resolved");
            $rootScope.currentUser=user;
            deferred.resolve();
          }
        },
        function(err)
        {
          $location.url("/login");
        });
      return deferred.promise;
    }

  }
})();
