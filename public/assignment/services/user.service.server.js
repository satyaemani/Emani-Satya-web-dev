module.exports=function(app){



  var users=[
    {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
    {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
  ];

  app.get("/api/user",getUsers);
  app.get("/api/user/:userId",findUserById);

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

