module.exports=function(app){

  var users=[
    {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
    {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
  ];
  app.get("/api/user/:userId",findUserById);
  app.get("/api/user",getUsers);
  app.post("/api/user",createUser);
  app.put("/api/user/:userId",updateUser);
  app.delete("/api/user/:userId",deleteUser);

  function deleteUser(req,res)
  {
    var userId = req.params.userId;
    for (var i in users) {
      if (users[i]._id === userId)
      {
        users.splice(i,1);
        res.send(200);
        return;
      }
    }
    res.send(400);
  }


  function updateUser(req,res) {

    var userId = req.params.userId;
    var newUser = req.body;
    for (var i in users) {
      if (users[i]._id === userId) {

        users[i].firstName = newUser.firstName;
        users[i].lastName = newUser.lastName;
        res.send(200);
        return;
      }
    }
    res.send(400);
  }



  function createUser(req,res){
    var user = req.body;



    if(user.password===user.confPassword)
    {
      var newUser={_id:(new Date).getTime()+"",
        username:user.username,
        password:user.password}
        //firstName:"",
        //LastName:""};
      users.push(newUser);
      console.log(newUser._id);
    res.send(newUser);
      return;
    }
    else
      res.send({});
  }



function findUserById(req,res)
  {

    var userId = req.params.userId;

    for(var i in users){

      if(users[i]._id ===userId)
      {

        res.send(users[i]);
        return;

      }

    }
    res.send({});
  }


  //---------------------------------------------


  function getUsers(req,res){

   var username = req.query.username;
    var password = req.query.password;

    if(username && password)
    {
      findUserByUsernameAndPassword(username, password,res);
    }
    else if(username)
    {
      findUserByUsername(username,res);
    }
    else rs.send(users);

  }


function findUserByUsername(username,res) {

  //checking for all the users with the given username and sending
  // it back to the controller
  for (var i in users) {
    console.log(users[i].username );
    console.log(username);
    if (users[i].username === username) {
      res.send(users[i]);
      return;
    }
  }
  //if none of them match then all of the records must be exhausted and returned null
  res.send({});

}


function findUserByUsernameAndPassword(username, password,res) {

  //checking for all the users with the given username and password and sending
  // it back to the controller
  for (var i in users) {
    if (users[i].username === username && users[i].password === password) {
      res.send(users[i]);
      return;
    }
  }
  //if none of them match then all of the records must be exhausted and returned null
  res.send({});

}




}

