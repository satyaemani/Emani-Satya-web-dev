
module.exports=function(app) {
  require("./services/user.service.server.js")(app);
  require("./services/website.service.server.js")(app);
  var users=[
    {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
    {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
  ];
app.get("/say/:something",function(req,res){
 var msg= req.params.something;
  res.send({messsage:msg});
  });

  app.get("/users",function(req,res){
    res.send(users);
  });
};
