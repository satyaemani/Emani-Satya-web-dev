
(function(){
  angular
    .module("RestaurantReservation")
    .controller("RestaurantController",RestaurantController);


  function RestaurantController($routeParams,$rootScope,$location,RestaurantService,UserService) {
    var vm = this;

    vm.location=$routeParams.location;

    vm.user = $rootScope.currentUser;

   var user = vm.user;
    var restaurantId=$routeParams.restaurantId;
    vm.restaurantId = restaurantId;


    //vm.date=date;
    vm.logout=logout;
    vm.addToFavourites=addToFavourites;
    vm.makeReservation = makeReservation;
    vm.removeFavourites = removeFavourites;

    function init()
    {

      RestaurantService.findRestaurantById(restaurantId)
        .then(function(response)
        {
          vm.restaurant = response.data;
          console.log( vm.restaurant.id);
          RestaurantService.findFavRestaurantById(vm.restaurant.id,vm.user._id)
            .then(function(response)
            {
              console.log(response.data);
              if(response.data.length!==0 && user) {
                vm.favRestaurant = true;
                console.log(vm.favRestaurant);
              }
              else {
                vm.favRestaurant = false;
                console.log(vm.favRestaurant);
              }

            },function(response)
            {
              console.log(response);

            });
        },function(response)
        {
          //console.log( response);
        });

    }
init();

    function  logout()
    {
      UserService.logout()
        .then(function(response)
          {
            $rootScope.currentUser=null;
           // $rootScope.restaurant=null;
            $location.url("/home");
          },
          function (response) {
            $location.url("/home");
          })
    }

    function  addToFavourites(restaurant)
    {
      if ($rootScope.currentUser) {
        console.log("in user");
        var favRestaurant=
        {
          rId:restaurant.id,
          restaurantName:restaurant.name,
          like:true,
          location:vm.location
        }

        RestaurantService.addToFavourites(favRestaurant,user._id)
          .then(function(response)
          {
            console.log(response.data);
            vm.favRestaurant = true;
            vm.added = true;


          },function(err)
          {
            console.log(err);
          })

      }
      else {
        //if user is not logged in, redirect to login page
        console.log("in else");
        $rootScope.previousUrl = $location.path();
        console.log($rootScope.previousUrl);
        $location.url('/login');

      }



    }

    function makeReservation()
    {
      if ($rootScope.currentUser) {
        console.log("in user");
        $location.url("/location/"+vm.location+"/"+vm.restaurantId+"/reservation");
      }
      else {
        //if user is not logged in, redirect to login page
        console.log("in else");
        $rootScope.previousUrl = $location.path();
        console.log($rootScope.previousUrl);
        $location.url('/login');

      }



    }

    function removeFavourites(restaurant)
    {
      RestaurantService.removeFavourites(vm.restaurant.id,vm.user._id)
        .then(function(response)
        {
          console.log(response.data);
          vm.favRestaurant = false;
          vm.remove = true;
            console.log(vm.favRestaurant);
        },function(response)
        {
          console.log(response);

        });

    }


  }

})();

