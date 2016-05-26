(function(){
  angular
    .module("WebAppMaker")
    .controller("ProfileController",ProfileController);

  var users =
    [
      {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
      {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
      {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
      {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
    ]


  function ProfileController($routeParams) {

    var vm = this;
    var id = $routeParams.id;
     vm.updateUser = updateUser;



    var index = -1;



    for(var i in users){
      if(users[i]._id === id)
      {
        vm.user = users[i];
        index=i;
      }
    }
    console.log(users[index].firstName);
     function updateUser(newUser){

      console.log(newUser);
    console.log(users[index]);
      users[index].firstName = newUser.firstName;
      users[index].lastName = newUser.lastName;

  if(users[index].firstName === newUser.firstName)
      vm.success="Updated";
      console.log(users[index].firstName);

    }




  }
})();

