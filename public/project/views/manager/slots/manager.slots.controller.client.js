/**
 * Created by subbaraju on 24/6/2016.
 */
/**
 * Created by subbaraju on 23/6/2016.
 */
/**
 * Created by subbaraju on 22/6/2016.
 */

(function(){
  angular
    .module("RestaurantReservation")
    .controller("ManagerSlotsController",ManagerSlotsController);




  function ManagerSlotsController($location,$routeParams,$rootScope,ReservationService,ManagerService) {

    var vm = this;
    // vm.updateUser = updateUser;
    // vm.deleteReservation = deleteReservation;
    //vm.logout = logout;


    vm.insertSlot = insertSlot;
    vm.deleteSlot = deleteSlot;
    var restId = $rootScope.currentUser.restaurantId;

console.log(restId);

    function init()
    {

      ManagerService.findSlotsByRestId(restId)
        .then(function(response)
        {
          vm.slots=response.data[0].slots;


        },function(response)
        {
          console.log( response);
        });

    }
    init();


    function insertSlot(time)
    {var flag = 0;

      ManagerService.findSlotsByRestId(restId)
        .then(function(response)
        {
          slots=response.data[0].slots;

          console.log(slots);

          for(var i in slots)
          {
            if(time === slots[i].slot)
            {
              vm.match=true;
              flag= flag+1;
              break;
            }

          }

          console.log("flag"+flag);

          if(flag===0)
          {

            console.log(flag);
            var slot={slot:time};
            ManagerService
              .insertSlot(restId,slot)
              .then(
                function(response)
                {
                  vm.notMatch=true;
                  vm.match=false;
                  ManagerService.findSlotsByRestId(restId)
                    .then(function(response)
                    {
                      vm.slots=response.data[0].slots;


                    },function(response)
                    {
                      console.log( response);
                    });

                }
                ,function(response){
                  console.log(response);
                })
          }

        },function(response)
        {
          console.log(response);
        });

    }


    function deleteSlot(slot)
    {
     var time =slot.slot;
      var slotId = slot._id;
      ManagerService
        .deleteSlot(restId,time,slotId)
        .then(
          function(response)
        {
          ManagerService.findSlotsByRestId(restId)
            .then(function(response)
            {
              vm.slots=response.data[0].slots;


            },function(response)
            {
              console.log( response);
            });


        },function(response)
          {
            console.log(response);
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

