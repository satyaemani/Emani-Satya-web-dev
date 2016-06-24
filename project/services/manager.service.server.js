/**
 * Created by subbaraju on 24/6/2016.
 */
/**
 * Created by subbaraju on 23/6/2016.
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');
var FacebookStrategy = require('passport-facebook').Strategy;


module.exports=function(app,models){



  var managerModel=models.managerModel;


  //app.get("/auth/facebook", passport.authenticate('facebook'));
  //app.get("/auth/facebook/callback", passport.authenticate('facebook', {
  //  successRedirect: '/assignment/#/user',
  //  failureRedirect: '/assignment/#/login'
  //}));
  app.get("/api/manager/user/:userId",findUserById);
  app.get("/api/manager/user",getUsers);
  app.get("/api/manager/loggedIn",loggedIn);
  app.post("/api/manager/logout",logout);
  app.post("/api/manager/user",register);
  app.post("/api/manager/login",passport.authenticate('project'),login);
  app.get("/api/manager/slots/:restId",findSlotsByRestId);
  app.put("/api/manager/user/:userId",updateUser);
  app.delete("/api/manager/user/:userId",deleteUser);
  app.delete("/api/manager/slots/:restId/:slot/:slotId",deleteSlot);
  app.post("/api/manager/slots/:restId",insertSlot);


  passport.use('project',new LocalStrategy(managerlocalStrategy));
  passport.serializeUser(serializeManager);
  passport.deserializeUser(deserializeManager);


  function insertSlot(req,res)
  {
    var restId = req.params.restId;
    var slot = req.body;
    console.log(restId);
    console.log(slot);
    managerModel
      .insertSlot(restId,slot)
      .then(function(stats)
        {
          res.send(200);
        },
        function(error){
          res.statusCode(404).send(error);
        }
      );


  }

  function deleteSlot(req,res)
  {
    var restId = req.params.restId;
    var slot = req.params.slot;
    var slotId = req.params.slotId;

    managerModel.deleteSlot(restId,slotId,slot)
      .then(
        function(stats)
        {
          res.send(200);
        },
        function(error){
          res.statusCode(404).send(error);
        });
  }


  function findSlotsByRestId(req,res){
    var restId = req.params.restId;

    managerModel.findSlotsByRestId(restId)
      .then(function(slots)
        {
          res.send(slots);
        },
        function(error)
        {
          res.statusCode(404).send(error);

        });
  }

  function managerlocalStrategy(username,password,done)
  {
    managerModel
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

  function serializeManager(user, done) {

    done(null, user);
  }

  function deserializeManager(user, done) {

    managerModel
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
   // console.log("loggedIn-"+req.user);
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
    //console.log("login"+user);
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
    managerModel.findUserByUsername(username)
      .then(function(user)
      {
        if(user)
        {
          res.status(400).send("username already in use");
          return;
        }else{
          req.body.password=bcrypt.hashSync(req.body.password);
          return managerModel.createUser(req.body);
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
    managerModel
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

    managerModel
      .updateUser(userId,newUser)
      .then(function(stats)
        {
          res.send(200);
        },
        function(error){
          res.statusCode(404).send(error);
        }
      );

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
      managerModel
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

    managerModel
      .findUserById(userId)
      .then(function(user)
        {
          res.send(user);
        },
        function(error)
        {
          res.statusCode(404).send(error);

        });
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

    managerModel
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
    managerModel
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
        });
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

