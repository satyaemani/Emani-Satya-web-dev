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
        controllerAs:"model",
        resolve:
        {
          loggedIn:getLoggedIn
        }

      })

      .when("/loggedIn",{
        templateUrl:"views/user/loggedIn.view.client.html",
        controller:"LoggedInController",
        controllerAs:"model",
        resolve:
        {
          loggedIn:checkLoggedIn
        }
      })
      .when("/home",{
        templateUrl:"views/home.view.client.html",
        controller:"HomeController",
        controllerAs:"model",
        resolve:
        {
          loggedIn:getLoggedIn
        }
      })
      .when("/location/:location",{
        templateUrl:"views/location/location.view.client.html",
        controller:"LocationController",
        controllerAs:"model",
        resolve:
        {
          loggedIn:getLoggedIn
        }
      })
      .when("/location/:location/:restaurantId/reservation",{
        templateUrl:"views/reservation/reservation.view.client.html",
        controller:"ReservationController",
        controllerAs:"model",
        resolve:
        {
          loggedIn:checkLoggedIn
        }
      })
      .when("/location/:location/:restaurantId",{
        templateUrl:"views/restaurant/restaurant.view.client.html",
        controller:"RestaurantController",
        controllerAs:"model",
        resolve:
        {
          loggedIn:getLoggedIn
        }
      })
      .when("/",{

        redirectTo:"/home"
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
      .when("/user/slot",{
        templateUrl:"views/slot/slot.view.client.html",
        controller:"SlotController",
        controllerAs:"model",
        resolve:
        {
          loggedIn:checkLoggedIn
        }
      })
      .when("/user/favourites",{
        templateUrl:"views/favourites/favourites.view.client.html",
        controller:"FavouritesController",
        controllerAs:"model",
        resolve:
        {
          loggedIn:checkLoggedIn
        }
      })
      .when("/managerLogin",{
        templateUrl:"views/manager/manager.login.view.client.html",
        controller:"ManagerLoginController",
        controllerAs:"model",
        resolve:
        {
          loggedIn:getManagerLoggedIn
        }
      })
      .when("/managerRegister",{
        templateUrl:"views/manager/manager.register.view.client.html",
        controller:"ManagerRegisterController",
        controllerAs:"model"
      })
      .when("/manager",{
        templateUrl:"views/manager/manager.dashboard.view.client.html",
        controller:"ManagerDashboardController",
        controllerAs:"model",
        resolve:
        {
          loggedIn:managerCheckLoggedIn
        }

      })
      .when("/manager/reservations",{
        templateUrl:"views/manager/manager.reservations.view.client.html",
        controller:"ManagerReservationsController",
        controllerAs:"model",
        resolve:
        {
          loggedIn:managerCheckLoggedIn
        }

      })
      .when("/manager/slots",{
        templateUrl:"views/manager/slots/manager.slots.view.client.html",
        controller:"ManagerSlotsController",
        controllerAs:"model",
        resolve:
        {
          loggedIn:managerCheckLoggedIn
        }

      })
      .when("/manager/messages",{
        templateUrl:"views/manager/messages/manager.message.view.client.html",
        controller:"ManagerMessageController",
        controllerAs:"model",
        resolve:
        {

          loggedIn:managerCheckLoggedIn
        }

      })
      .otherwise({
        redirectTo:"/home"
      });


    function checkLoggedIn(UserService,$location,$q,$rootScope)
    {

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

  function managerCheckLoggedIn(UserService,$location,$q,$rootScope)
  {
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
            $location.url("/managerLogin");
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



  function getLoggedIn(UserService,$location,$q,$rootScope)
  {

    var deferred = $q.defer();
    UserService.loggedIn()
      .then(function(response)
        {
          var user = response.data;
          console.log(user);
          if(user=='0')
          {
            console.log("reject");
            //$rootScope.currentUser=null;
            deferred.resolve();
          //  $location.url("/login");
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




  function getManagerLoggedIn(UserService,$location,$q,$rootScope)
  {

    var deferred = $q.defer();
    UserService.loggedIn()
      .then(function(response)
        {
          var user = response.data;

          if(user=='0')
          {
            console.log("reject");
            //$rootScope.currentUser=null;
            deferred.resolve();
            //  $location.url("/login");
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


})();

