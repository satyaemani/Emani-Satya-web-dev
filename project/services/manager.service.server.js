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


  app.get("/api/manager/user/:userId",findUserById);
  app.get("/api/manager/user",getUsers);
  app.get("/api/manager/loggedIn",loggedIn);
  app.post("/api/manager/logout",logout);
  app.post("/api/manager/user",register);
  app.post("/api/manager/login",passport.authenticate('project'),login);
  app.get("/api/manager/slots/:restId",findSlotsByRestId);
  app.put("/api/manager/user/:userId",updateUser);
  app.delete("/api/manager/user/:userId",deleteUser);
  app.delete("/api/manager/slots/:restId/:time/:date/:slotId",deleteSlot);
  app.post("/api/manager/slots/:restId/:date",insertSlot);
  app.get("/api/manager/slots/:date/:slotId/:restId",findDateBySlotId),
    app.put("/api/manager/slots/:restId",addDate),
    app.get("/api/manager/slots/:date/:restId",findTimeByDate),
    app.get("/api/manager/:restId",findManagerByRestID),
    app.post("/api/manager/:restId",sendMessage),
    app.delete("/api/manager/:userId/:messageId",deleteMessage),




  passport.use('project',new LocalStrategy(managerlocalStrategy));
  passport.serializeUser(serializeManager);
  passport.deserializeUser(deserializeManager);




  function deleteMessage(req,res)
  {
    var userId = req.params.userId;
    var messageId= req.params.messageId;
    managerModel
      .deleteMessage(userId,messageId)
      .then(
        function(stats)
        {
          res.send(200);
        },
        function(error){
          res.statusCode(404).send(error);
        });

  }


  function sendMessage(req,res)
  {
    var restId = req.params.restId;
    var message = req.body;
    console.log(message);
    managerModel
      .sendMessage(restId,message)
      .then(function(message)
      {
        res.send(message);
      },function(response)
      {
        res.statusCode(404).send(error);
      });
  }

  function findManagerByRestID(req,res)
  {
    var restId = req.params.restId;
    managerModel
      .findManagerByRestID(restId)
      .then(function(manager)
      {
        res.send(manager);
      },function(response){
        res.statusCode(404).send(error);
      })
  }


  function findTimeByDate(req,res)
  {
    var date = req.params.date;
    var restId = req.params.restId;
    managerModel
      .findTimeByDate(restId,date)
      .then(function(times)
        {
          res.send(times);
        },
        function(error)
        {
          res.statusCode(404).send(error);
        });
  }

  function addDate(req,res)
  {
    var restId = req.params.restId;
    var slot= req.body;
    managerModel
      .addDate(restId,slot)
      .then(function(manager)
      {
        res.send(manager);
      },
      function(error)
      {
        res.statusCode(404).send(error);
      });
  }

  function findDateBySlotId(req,res)
  {
    var slotId=req.params.slotId;
    var date = req.params.date;
    var restId = req.params.restId;
    managerModel
      .findDateBySlotId(restId,slotId,date)
      .then(function(slots)
        {
          res.send(slots);
        },
        function(error){
          res.statusCode(404).send(error);
        }
      );

  }

  function inserAAAAAtSlot(req,res)
  {
    var restId = req.params.restId;
    var date = req.params.date;
    var slot = req.body;
    managerModel
      .findTimeByDate(restId,date)
      .then(function(times)
        {
          var i = null;
          var j=null;

          for( i in times[0].slots) {
            if(times[0].slots[i].date==date){
              console.log(times[0].slots[i].time);
              times[0].slots[i].time.push(slot);
            }
          }
          return times[0]
            .save()


        }
      )
      .then(function(times){
        res.json(times);})



  }



  function insertSlot(req,res)
  {
    var restId = req.params.restId;
    var date = req.params.date;
    var slot = req.body;
    managerModel
      .findManagerByRestID(restId)
      .then(function(times)
        {
          var i = null;
          var j=null;
          for( i in times.slots) {
            if (date == times.slots[i].date) {
              console.log(times.slots[i].time);
              times.slots[i].time.push(slot);
            }
          }
          return times
            .save()


        }
      )
      .then(function(times){
        res.json(times);});



  }

 function deleteSlot(req,res){

   var restId = req.params.restId;
   var time = req.params.time;
   var date = req.params.date;

   managerModel
     .findManagerByRestID(restId)
     .then(function(times)
       {
         var i = null;
         var j=null;
         for( i in times.slots) {
           if (date == times.slots[i].date) {
             for (j in times.slots[i].time) {
               if (time == times.slots[i].time[j].slot) {
                 times.slots[i].time.splice(j, 1);
                 console.log("in if"+times);

               }

             }
           }
         }
           return times
             .save()


       }
     )
     .then(function(times){
       res.json(times);});


 }

  function deleteAAAASlot(req,res)
  {
    var restId = req.params.restId;
    var time = req.params.time;
    var date = req.params.date;

    managerModel
      .findTimeByDate(restId,date)
      .then(function(times)
        {
          console.log(times);
          var i = null;
          var j=null;
          for( i in times[0].slots) {
            for( j in times[0].slots[i].time) {
             if(time==times[0].slots[i].time[j].slot)
             {
               times[0].slots[i].time.splice(j,1);

             }

            }}
         return times[0]
            .save()


      }
      )
      .then(function(times){
        res.json(times);})


    //var restId = req.params.restId;
    //var time = req.params.time;
    //var date = req.params.date;
    //var slotId = req.params.slotId;
    //
    //managerModel.deleteSlot(restId,time,date,slotId)
    //  .then(
    //    function(stats)
    //    {
    //      res.send(200);
    //    },
    //    function(error){
    //      res.statusCode(404).send(error);
    //    });
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

