/**
 * Created by subbaraju on 23/6/2016.
 */
/**
 * Created by subbaraju on 22/6/2016.
 */

(function(){
  angular
    .module("RestaurantReservation")
    .controller("FavouritesController",FavouritesController);




  function FavouritesController($location,$routeParams,$rootScope,RestaurantService,UserService) {

    var vm = this;
    // vm.updateUser = updateUser;
    vm.removeFavourites =removeFavourites ;
    //vm.logout = logout;



    var userId = $rootScope.currentUser._id;



    function init()
    {

      RestaurantService.findFavRestaurantForUserId(userId)
        .then(function(response){
          console.log(response);
          vm.favRestaurants=response.data;

        },function(response)
        {
          console.log(response);
        } );

    }
    init();


    function removeFavourites(favRestaurant)
    {
      RestaurantService.removeFavourites(favRestaurant.rId,userId)
        .then(function(response)
        {

          RestaurantService.findFavRestaurantForUserId(userId)
          .then(function(response){
            console.log(response);
            vm.favRestaurants=response.data;

          },function(response)
          {
            console.log(response);
          } );


        },function(response)
        {
          console.log(response);

        });

    }


    //function updateUser(newUser)
    //{
    //
    //  UserService.updateUser(userId,newUser)
    //    .then(function(response) {
    //
    //        vm.success = "Updated";
    //      },
    //      function(response) {
    //        vm.error = "not updated";
    //
    //      })
    //
    //}
  }
})();

