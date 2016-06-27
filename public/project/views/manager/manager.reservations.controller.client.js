/**
 * Created by subbaraju on 23/6/2016.
 */
/**
 * Created by subbaraju on 22/6/2016.
 */

(function(){
  angular
    .module("RestaurantReservation")
    .controller("ManagerReservationsController",ManagerReservationsController);




  function ManagerReservationsController($location,$routeParams,$rootScope,ReservationService,UserService) {

    var vm = this;
    // vm.updateUser = updateUser;
   // vm.deleteReservation = deleteReservation;
    //vm.logout = logout;

    vm.deleteReservation = deleteReservation;
    vm.searchUser=searchUser;

    var restId = $rootScope.currentUser.restaurantId;



    function init()
    {

      ReservationService.findReservationsForRestId(restId)
        .then(function(response){
          console.log(response);
          vm.reservations=response.data;
          vm.reservations.phone= parseInt(vm.reservations.phone);
        },function(response)
        {
          console.log(response);
        } );

    }
    init();

    function searchUser(username)
    {
      ReservationService.findReservationsForRestId(restId)
      .then(function(response){
        console.log(response);
        vm.reservations=response.data;


        for(var i in vm.reservations){

          if(vm.reservations[i].username==username)
          {
            ReservationService.findReservationsForUserAndRestId(vm.reservations[i]._user,restId)
              .then(function(response){
                console.log(response);
                vm.reservations=response.data;

              },function(response)
              {
                console.log(response);
              } );
            break;
          }
        }

      },function(response)
      {
        console.log(response);
      } );



    }


    function deleteReservation(reservationId)
    {
      ReservationService.deleteReservation(reservationId)
        .then(function(response)
        {
          var result =response.data;
          ReservationService.findReservationsForRestId(restId)
            .then(function(response){
              console.log(response);
              vm.reservations=response.data;
              //vm.reservationsLength=vm.reservations.length;

            },function(response)
            {
              console.log(response);
            } );
        },function(){

        });


    }


    //function  logout()
    //{
    //  UserService.logout()
    //    .then(function(response)
    //      {
    //        $location.url("/login");
    //      },
    //      function (response) {
    //        $location.url("/login");
    //      })
    //}
    //function deleteReservation(reservationId)
    //{
    //  ReservationService.deleteReservation(reservationId)
    //    .then(function(response)
    //    {
    //      var result =response.data;
    //      ReservationService.findReservationsForUserId(userId)
    //        .then(function(response){
    //          console.log(response);
    //          vm.reservations=response.data;
    //
    //        },function(response)
    //        {
    //          console.log(response);
    //        } );
    //
    //    },function(){
    //
    //    });
    //
    //
    //}

  }
})();

