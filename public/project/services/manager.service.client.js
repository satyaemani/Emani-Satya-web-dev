/**
 * Created by subbaraju on 23/6/2016.
 */
(
  function(){
    angular
      .module("RestaurantReservation")
      .factory("ManagerService",ManagerService);


    function ManagerService($http) {
      var api = {
        // createUser:createUser,
        register: register,
        login:login,
        findUserByUsernameAndPassword: findUserByUsernameAndPassword,
        findUserByUsername:findUserByUsername,
        findUserById:findUserById,
        updateUser: updateUser,
        deleteUser:deleteUser,
        loggedIn:loggedIn,
        logout:logout,
        findSlotsByRestId:findSlotsByRestId,
        deleteSlot:deleteSlot,
        insertSlot:insertSlot,
        findDateBySlotId:findDateBySlotId,
        addDate:addDate,
        findTimeByDate:findTimeByDate,
        findManagerByRestId:findManagerByRestID,
        sendMessage:sendMessage,
        deleteMessage:deleteMessage


      };
      return api;

     // function addDate()



      function deleteMessage(userId,messageId)
      {
        var url="/api/manager/"+userId+"/"+messageId;
        return $http.delete(url);


      }

      function sendMessage(message,restId)
      {
        var url = "/api/manager/"+restId;
        return $http.post(url,message);

      }

      function findManagerByRestID(restId)
      {
        var url = "/api/manager/"+restId;
        return $http.get(url);
      }

      function findTimeByDate(date,restId)
      {
        var url = "/api/manager/slots/"+date+"/"+restId;
        return $http.get(url);

      }

      function addDate(slot,restId)
      {
        var url = "/api/manager/slots/"+restId;
        return $http.put(url,slot);
      }

      function findDateBySlotId(date,slotId,restId)
      {
        var url = "/api/manager/slots/"+date+"/"+slotId+"/"+restId;
        return $http.get(url);

      }

      function insertSlot(date,restId,slot)
      {
        console.log(restId);
        console.log(slot);
        var url = "/api/manager/slots/"+restId+"/"+date;
        return $http.post(url,slot);
      }


      function deleteSlot(restId,time,date,slotId)
      {
        var url = "/api/manager/slots/"+restId+"/"+time+"/"+date+"/"+slotId;
        return $http.delete(url);
      }

      function findSlotsByRestId(restId)
      {
        var url = "/api/manager/slots/"+restId;
        return $http.get(url);
      }

      function loggedIn()
      {
        return $http.get("/api/manager/loggedIn");
      }

      function logout()
      {
        return $http.post("/api/manager/logout");
      }

      function login(username,password)
      {
        var user={
          username:username,
          password:password
        }

        return $http.post("/api/manager/login",user);
      }

      function deleteUser(userId)
      {
        var url = "/api/manager/user/"+userId;
        return $http.delete(url);

      }



      function register(user)
      {
        return $http.post("/api/manager/user",user);
        ////console.log(username,password,confPassword);

      }


      function updateUser(userId,newUser) {
        var url = "/api/manager/user/"+userId;
        return $http.put(url,newUser);

      }



      //checking for all the users with the given userID and sending
      // it back to the controller
      function  findUserById(userId) {
      console.log(userId)
        var url ="/api/manager/user/"+userId;
        return $http.get(url);
      }

      function findUserByUsername(username) {
        var url="/api/manager/user?username="+username;
        return $http.get(url);//promise

      }


      function findUserByUsernameAndPassword(username, password) {

        //checking for all the users with the given username and password and sending
        // it back to the controller
        var url="/api/manager/user?username="+username+"&password="+password;
        return $http.get(url);//promise
      }
    }
  })();
