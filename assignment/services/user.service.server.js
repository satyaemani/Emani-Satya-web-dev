var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports=function(app,models){

  var userModel=models.userModel;

  var users=[
    {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
    {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
  ];
  app.get("/api/user/:userId",findUserById);
  app.get("/api/user",getUsers);
  app.get("/api/loggedIn",loggedIn);
  app.post("/api/logout",logout);
  app.post("/api/login",passport.authenticate('wam'),login);
  app.post("/api/user",createUser);
  app.put("/api/user/:userId",updateUser);
  app.delete("/api/user/:userId",deleteUser);

  passport.use('wam',new LocalStrategy(localStrategy));
  passport.serializeUser(serializeUser);
  passport.deserializeUser(deserializeUser);



  function localStrategy(username,password,done)
  {
    userModel
      .findUserByUsernameAndPassword(username,password)
      .then(
        function(user)
        {
          if(user)
          {
            done(null,user);
          }else
          {
            done(null,false);
          }

        },
        function(error)
        {
          done(null,error);
        });
  }

  function serializeUser(user, done) {
    done(null, user);
  }

  function deserializeUser(user, done) {
    userModel
      .findUserById(user._id)
      .then(
        function(user){
          done(null, user);
        },
        function(err){
          done(err, null);
        }
      );
  }

  function loggedIn(req,res)
  {
    if(req.isAuthenticated())
    {
      res.json(req.user);
    }
    else
    {
      res.send('0');
    }
  }
  function login(req,res)
  {
    var user = req.user;
    res.send(user);
  }

  function logout(req,res)
  {
    req.logout();
    res.send(200);
  }

  function deleteUser(req,res)
  {
    var userId = req.params.userId;
    userModel
      .deleteUser(userId)
      .then(
      function(stats)
      {
        res.send(200);
      },
      function(error){
        res.statusCode(404).send(error);
      });
    //for (var i in users) {
    //  if (users[i]._id === userId)
    //  {
    //    users.splice(i,1);
    //    res.send(200);
    //    return;
    //  }
    //}
    //res.send(400);
  }


  function updateUser(req,res) {

    var userId = req.params.userId;
    var newUser = req.body;

    userModel
      .updateUser(userId,newUser)
      .then(function(stats)
      {
        res.send(200);
      },
        function(error){
          res.statusCode(404).send(error);
        }
      )

    //for (var i in users) {
    //  if (users[i]._id === userId) {
    //
    //    users[i].firstName = newUser.firstName;
    //    users[i].lastName = newUser.lastName;
    //    users[i].email = newUser.email;
    //    res.send(200);
    //    return;
    //  }
    //}
    //res.send(400);
  }



  function createUser(req,res){
    var user = req.body;
    console.log("conf password  "+user.confPassword);

    if(user.password===user.confPassword)
    {
      userModel
        .createUser(user)
        .then(
          function(user)
          {
            console.log(user);
            res.send(user);
          },
          function(error){
            res.statusCode(404).send(error);
          });
    }
    else {
      res.send({});
      return;
    }

    //  var newUser={_id:(new Date).getTime()+"",
    //    username:user.username,
    //    password:user.password}
    //    //firstName:"",
    //    //LastName:""};
    //  users.push(newUser);
    //
    //res.send(newUser);
    //  return;
  }



function findUserById(req,res)
  {

    var userId = req.params.userId;

    userModel
      .findUserById(userId)
      .then(function(user)
        {
          res.send(user);
        },
        function(error)
        {
          res.statusCode(404).send(error);

        })
    //for(var i in users){
    //
    //  if(users[i]._id ===userId)
    //  {
    //
    //    res.send(users[i]);
    //    return;
    //
    //  }
    //
    //}
    //res.send({});
  }


  //---------------------------------------------


  function getUsers(req,res){

   var username = req.query.username;
    var password = req.query.password;

    if(username && password)
    {
      findUserByUsernameAndPassword(username, password,req,res);
    }
    else if(username)
    {
      findUserByUsername(username,res);
    }
    else rs.send(users);

  }


function findUserByUsername(username,res) {

  userModel
    .findUserByUsername(username)
    .then(function(users)
    {
      res.send(users[0]);
    },
    function(error){
      res.statusCode(404).send(error);
    })

  //checking for all the users with the given username and sending
  // it back to the controller
  //for (var i in users) {
  //
  //  if (users[i].username === username) {
  //    res.send(users[i]);
  //    return;
  //  }
  //}
  ////if none of them match then all of the records must be exhausted and returned null
  //res.send({});

}


function findUserByUsernameAndPassword(username, password,req,res) {

  //checking for all the users with the given username and password and sending
  // it back to the controller
  userModel
    .findUserByUsernameAndPassword(username,password)
    .then(function(user)
    {
      console.log(req.session);
      req.session.currentUser=user;
      res.send(user);
    },
    function(error)
    {
      res.statusCode(404).send(error);
    })
  //for (var i in users) {
  //  if (users[i].username === username && users[i].password === password) {
  //    res.send(users[i]);
  //    return;
  //  }
  //}
  ////if none of them match then all of the records must be exhausted and returned null
  //res.send({});

}





}

