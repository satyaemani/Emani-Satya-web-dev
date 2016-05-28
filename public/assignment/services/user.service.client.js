(
  function(){
    angular
      .module("WebAppMaker")
      .factory("UserService",UserService);


    var users =
      [
        {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
        {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
        {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
      ];


    function UserService() {
      var api = {
        createUser:createUser,
        findUserByUsernameAndPassword: findUserByUsernameAndPassword,
        findUserByUsername:findUserByUsername,
        findUserById:findUserById,
        updateUser: updateUser,
        deleteUser:deleteUser

      };
      return api;

      function deleteUser(userId){}
      function createUser(username,password,confPassword)
      {

        //console.log(username,password,confPassword);
        if(password===confPassword)
        {
          users.push({_id: (new Date).getTime()+" ",
                 username:username,
                  password:password,
                  firstName:"",
                  LastName:""});
         //console.log(users);
          return users[users.length-1];
        }
        else
          return null;
      }


      function updateUser(id,newUser) {

        for (var i in users) {
          //console.log(users[i]._id);
          //console.log(id);

          if (users[i]._id === id) {

            users[i].firstName = newUser.firstName;
            users[i].lastName = newUser.lastName;
            return true;
          }
        }
        return false;
      }



    //checking for all the users with the given userID and sending
      // it back to the controller
      function  findUserById(id)
      {
        var index = -1;
        for(var i in users){
          if(users[i]._id === id)
          {
            return users[i];
            index=i;
          }
        }
        return null;
      }

      function findUserByUsername(username) {

        //checking for all the users with the given username and sending
        // it back to the controller
        for (var i in users) {
          if (users[i].username === username) {
            return users[i];
          }
        }
        //if none of them match then all of the records must be exhausted and returned null
        return null;

      }


      function findUserByUsernameAndPassword(username, password) {

        //checking for all the users with the given username and password and sending
        // it back to the controller
        for (var i in users) {
          if (users[i].username === username && users[i].password === password) {
            return users[i];
          }
        }
        //if none of them match then all of the records must be exhausted and returned null
        return null;

      }
    }
})();
