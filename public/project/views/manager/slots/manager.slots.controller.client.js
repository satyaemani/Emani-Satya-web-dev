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




  function ManagerSlotsController($location,$routeParams,$rootScope,ReservationService,ManagerService,$filter) {

    var vm = this;
    // vm.updateUser = updateUser;
    // vm.deleteReservation = deleteReservation;
    //vm.logout = logout;


    vm.insertSlot = insertSlot;
    vm.deleteSlot = deleteSlot;
    vm.addDate=addDate;
    var restId = $rootScope.currentUser.restaurantId;

console.log(restId);

    function init()
    {

      ManagerService.findSlotsByRestId(restId)
        .then(function(response)
        {
          //console.log(response);

          //vm.slots=response.data[0].slots[0].time;
          //console.log(vm.slots);

        },function(response)
        {
          console.log( response);
        });

    }
    init();


    function addDate(date,slotId)
    {
      var d=date;
     var a=d+"";
      var flag=0;
      //console.log(slotId);
      //console.log(a);
      ManagerService.findSlotsByRestId(restId)
        .then(function(response)
        {

         // console.log(dates);
          for(var i in response.data[0].slots) {
            var dates= new Date(response.data[0].slots[i].date);
            if (a == dates) {
             // console.log(response);
              flag=flag+1;
              break;
              //find times by date,slotId,restId
          }
          }



              if(flag===0 ) {
            console.log(date);
                if(date) {
                  var slot = {
                    date: a, time: [{slot: "09:00"}, {slot: "09:30"}, {slot: "10:00"}, {slot: "10:30"}, {slot: "11:00"}
                      , {slot: "11:30"}, {slot: "12:00"}, {slot: "12:30"}, {slot: "13:00"}, {slot: "13:30"}, {slot: "14:00"},
                      {slot: "14:30"}, {slot: "15:00"}, {slot: "15:30"}, {slot: "16:00"}, {slot: "16:30"}, {slot: "17:00"}, {slot: "17:30"},
                      {slot: "18:00"}, {slot: "18:30"}, {slot: "19:00"}]
                  };
                  ManagerService
                    .addDate(slot, restId)
                    .then(
                      function (response) {
                        console.log(response);
                        //slots
                        // var newDate=new Date(date);
                        ManagerService
                          .findTimeByDate(a, restId)
                          .then(
                            function (response) {
                              console.log(response);
                              console.log(response.data[0].slots[0].date);
                              for (var i in response.data[0].slots) {
                                if (a == response.data[0].slots[i].date) {
                                  vm.slots = response.data[0].slots[i].time;
                                }
                              }
                            }, function (response) {
                              console.log(response);
                            });
                      }, function (response) {
                        console.log(response);
                      });
                }
                else{
                  vm.dateerr=true;
                }

            }
          else{
                ManagerService
                        .findTimeByDate(a,restId)
                        .then(
                          function (response) {
                            console.log(response);
                            console.log(response.data[0].slots[0].date);
                            for(var i in response.data[0].slots)
                            {
                              if(a==response.data[0].slots[i].date)
                              {
                                vm.slots = response.data[0].slots[i].time;
                              }
                            }
                      // //fetch times by date,restId
                    }, function (response) {
                      console.log(response);
                    });

              }

        },function(response)
        {
          console.log(response);
        });
    }


    function insertSlot(date,time)
    {
      if(date) {
        if (time) {
          var d = date;
          var a = d + "";

          var slots = null;
          var count = 0;
          var flag = 0;
          ManagerService.findTimeByDate(a, restId)
            .then(function (response) {
              //finding the already available slots so that we dont add them again
              for (var i in response.data[0].slots) {
                if (a == response.data[0].slots[i].date) {
                  slots = response.data[0].slots[i].time;
                  count = count + 1;
                }
              }

              if (count === 0) {
                vm.error = true;//please submit date
              }

              console.log(slots);

              for (var i in slots) {
                if (time === slots[i].slot) {
                  vm.match = true;
                  flag = flag + 1;
                  break;
                }

              }

              //if a flag is 1 then the slot is already available so we shouldn't add it again
              console.log("flag" + flag);

              if (flag === 0) {
                //however if the flag is 0 it means the slot is not available so we add the selected one
                console.log(flag);
                console.log(time);
                var slot = {slot: time};
                ManagerService
                  .insertSlot(a, restId, slot)
                  .then(
                    function (response) {
                      //after recieving a success response we can fetch all the slots currently there in the database
                      vm.notMatch = true;
                      vm.match = false;
                      ManagerService
                        .findTimeByDate(a, restId)
                        .then(
                          function (response) {
                            for (var i in response.data[0].slots) {

                              if (a == response.data[0].slots[i].date) {
                                vm.slots = response.data[0].slots[i].time;
                              }

                            }
                            // //fetch times by date,restId
                          }, function (response) {
                            console.log(response);
                          });
                    }
                    , function (response) {
                      console.log(response);
                    })
              }

            }, function (response) {
              console.log(response);
            });
        }
        else{
          vm.timeerr =true;
        }
      }
      else{
        vm.dateerr =true;
      }
    }


    function deleteSlot(slot,date,slotId)
    {
     var time =slot.slot;
      var date = date+"";
      ManagerService
        .deleteSlot(restId,time,date,slotId)
        .then(
          function(response)
        {

          ManagerService
            .findTimeByDate(date,restId)
            .then(
              function (response) {
                for(var i in response.data[0].slots)
                {

                  if(date==response.data[0].slots[i].date)
                  {
                    vm.slots = response.data[0].slots[i].time;
                  }

                }
                // //fetch times by date,restId
              }, function (response) {
                console.log(response);
              });

        },function(response)
          {

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


  }
})();

