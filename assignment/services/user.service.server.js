var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');
var FacebookStrategy = require('passport-facebook').Strategy;


module.exports=function(app,models){

  var userModel=models.userModel;


  app.get("/auth/facebook", passport.authenticate('facebook'));
  app.get("/auth/facebook/callback", passport.authenticate('facebook', {
    successRedirect: '/assignment/#/user',
    failureRedirect: '/assignment/#/login'
  }));
  app.get("/api/user/:userId",findUserById);
  app.get("/api/user",getUsers);
  app.get("/api/loggedIn",loggedIn);
  app.post("/api/logout",logout);
  app.post("/api/user",register);
  app.post("/api/login",passport.authenticate('wam'),login);
 // app.post("/api/user",createUser);
  app.put("/api/user/:userId",updateUser);
  app.delete("/api/user/:userId",deleteUser);


  passport.use('wam',new LocalStrategy(localStrategy));
  passport.serializeUser(serializeUser);
  passport.deserializeUser(deserializeUser);


  var facebookConfig = {
    clientID     : process.env.FACEBOOK_CLIENT_ID,
    clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    //FACEBOOK_CALLBACK_URL  : "http://127.0.0.1:3000/auth/facebook/callback",
    //FACEBOOK_CLIENT_ID   : "1812219052343494",
    //FACEBOOK_CLIENT_SECRET : "1003457cecc39def13b74ea952a51bb9",
  };

  passport.use('facebook',new FacebookStrategy(facebookConfig,facebookLogin));

  function facebookLogin(token, refreshToken, profile, done)
  {
    console.log(profile);
    userModel.findFaceBookUser(profile.id)
      .then(function(faceBookUser)
      {
        if(faceBookUser) {
          done(null,faceBookUser);
        }
        else{
          faceBookUser={
            username:profile.displayName.replace(/ /g,''),
          facebook:{
            token:token,
              displayName:profile.displayName,
              id:profile.id
          }
          };
          userModel.createUser(faceBookUser)
            .then(function(user){
              done(null,user);
            })

        }
      });
  }



  function localStrategy(username,password,done)
  {
    userModel
      .findUserByUsername(username)
      .then(
        function(user)
        {

          if(user && bcrypt.compareSync(password,user.password))
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
  function register(req,res)
  {
    var username = req.body.username;
    var password = req.body.password;
    userModel.findUserByUsername(username)
      .then(function(user)
      {
        if(user)
        {
          res.status(400).send("username already in use");
          return;
        }else{
          req.body.password=bcrypt.hashSync(req.body.password);
          return userModel.createUser(req.body);
        }

      },function(err)
      {
        res.statusCode(400).send(err);
      })
      .then(function(user) {
        if(user)
      {
        req.login(user,function(err)
        {
          if(err)
          {
            res.status(400).send(err);
          }else{
            res.json(user);
          }
        })
      }
      },function(err)
      {
        res.statusCode(400).send(err);
      });

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

