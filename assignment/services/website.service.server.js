module.exports=function(app,models) {

  var websiteModel = models.websiteModel;
  //var websites = [
  //  {"_id": "123", "name": "Facebook", "developerId": "456"},
  //  {"_id": "234", "name": "Tweeter", "developerId": "456"},
  //  {"_id": "456", "name": "Gizmodo", "developerId": "456"},
  //  {"_id": "567", "name": "Tic Tac Toe", "developerId": "123"},
  //  {"_id": "678", "name": "Checkers", "developerId": "123"},
  //  {"_id": "789", "name": "Chess", "developerId": "234"}
  //];

  app.post("/api/user/:userId/website", createWebsite);
  app.get("/api/user/:userId/website", findAllWebsitesForUser);
  app.get("/api/website/:websiteId", findWebsiteById);
  app.put("/api/website/:websiteId", updateWebsite);
  app.delete("/api/website/:websiteId",deleteWebsite);
//---------------------------createWebsite---------------------------------------
  function createWebsite(req, res) {
    var userId = req.params.userId;
    var website = req.body;

websiteModel
  .createWebsite(userId,website)
  .then(function(website)
  {
    res.send(website);
  },
  function(error)
  {
    res.statusCode(400).send(error);
  });

    //var newWebsite = {
    //  _id: (new Date()).getTime() + "",
    //  name: website.applicationName,
    //  description: website.description,
    //  developerId: developerId
    //};
    //websites.push(newWebsite);
    ////console.log(newWebsite);
    //res.send(newWebsite);
  }

//-------------------------findAllWebsitesForUser----------------------------

  function findAllWebsitesForUser(req, res) {
    var userId = req.params.userId;
    websiteModel
      .findAllWebsitesForUser(userId)
      .then(function (websites) {
        res.send(websites);
      },
      function(error)
      {
        res.statusCode(404).send(error);
      })
    //var resultSet = [];
    //for (var i in websites) {
    //  if (websites[i].developerId === userId) {
    //    resultSet.push(websites[i]);
    //  }
    //}
    //res.send(resultSet);
  }

//---------------------updateWebsite---------------------------

  function updateWebsite(req, res) {
    var websiteId = req.params.websiteId
    var website = req.body;

    websiteModel
      .updateWebsite(websiteId,website)
      .then(function(stats)
      {
        res.send(200);
      },
      function(error)
      {
        res.statusCode.send(404);
      })
    //for (var i in websites) {
    //  if (websites[i]._id === websiteId) {
    //    websites[i].name = website.name;
    //    websites[i].description = website.description;
    //    res.send(200);
    //  }
    //
    //}
    //res.send(400);

  }

  function  findWebsiteById(req,res)
  {
var websiteId =req.params.websiteId;

    websiteModel
      .findWebsiteById(websiteId)
      .then(function(website)
      {
        res.send(website);
      },function(error){
        res.statusCode(400).send(error);
      })
    //for(var i in websites){
    //  if(websites[i]._id === websiteId)
    //  {
    //    res.send(websites[i]);
    //    return;
    //  }
    //}
    //res.send({});
  }

//---------------------------------deleteWebsite----------------

  function deleteWebsite(req,res)
  {

    var websiteId = req.params.websiteId;
    websiteModel
      .deleteWebsite(websiteId)
      .then(function(stats)
      {
        res.send(200)
      },function(error)
      {
        res.statusCode(400).send(error);
      });


    //for(var i in websites)
    //{
    //  console.log(websiteId);
    //  console.log(websites[i]._id);
    //  if(websites[i]._id ===websiteId) {
    //
    //    websites.splice(i,1);
    //   res.send(200);
    //    return;
    //  }
    //}
    //res.send({});

  }


}

