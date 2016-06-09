(
  function(){
    angular
      .module("RestaurantReservation")
      .factory("UserService",UserService);


    function UserService($http) {
      var api = {
        createUser:createUser,
        findUserByUsernameAndPassword: findUserByUsernameAndPassword,
        findUserByUsername:findUserByUsername,
        findUserById:findUserById,
        updateUser: updateUser,
        deleteUser:deleteUser

      };
      return api;

      function deleteUser(userId)
      {
        var url = "/api/user/"+userId;
        return $http.delete(url);

      }



      function createUser(user)
      {

        return $http.post("/api/user",user);
        ////console.log(username,password,confPassword);

      }


      function updateUser(userId,newUser) {
        var url = "/api/user/"+userId;
        return $http.put(url,newUser);

      }



      //checking for all the users with the given userID and sending
      // it back to the controller
      function  findUserById(userId) {

        var url ="/api/user/"+userId;
        console.log(userId);
        return $http.get(url);
      }

      function findUserByUsername(username) {
        var url="/api/user?username="+username;
        return $http.get(url);//promise

      }


      function findUserByUsernameAndPassword(username, password) {

        //checking for all the users with the given username and password and sending
        // it back to the controller
        var url="/api/user?username="+username+"&password="+password;
        return $http.get(url);//promise
      }
    }
  })();