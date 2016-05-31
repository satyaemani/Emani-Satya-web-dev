(function(){
  angular
    .module("WebAppMaker")
    .factory("WebsiteService", WebsiteService);

  var websites = [
    { "_id": "123", "name": "Facebook",    "developerId": "456" },
    { "_id": "234", "name": "Tweeter",     "developerId": "456" },
    { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
    { "_id": "678", "name": "Checkers",    "developerId": "123" },
    { "_id": "789", "name": "Chess",       "developerId": "234" }
  ];

  function WebsiteService() {
    var api = {
      createWebsite:createWebsite,
      findWebsitesForUserId: findWebsitesForUserId,
      deleteWebsite: deleteWebsite,
      findWebsiteById:findWebsiteById,
      updateWebsite : updateWebsite

    };
    return api;


    function updateWebsite(websiteId,website)
    {
      for(var i in websites)
      {
        if(websites[i]._id===websiteId)
        {
          websites[i].name = website.name;
          websites[i].description = website.description;
          return true;
        }

      }
      return false;

    }


    function  findWebsiteById(websiteId)
    {
      //var index = -1;
      for(var i in websites){
        if(websites[i]._id === websiteId)
        {
          return websites[i];

        }
      }
      return null;
    }

    function deleteWebsite(websiteId)
    {


      for(var i in websites)
      {
        console.log(websiteId);
        console.log(websites[i]._id);
        if(websites[i]._id ===websiteId) {

          websites.splice(i,1);
          return true;
        }
      }
      return false;

    }

      function createWebsite(website,developerId){
      //websites.push({_id:(new Date).getTime()+" ",
      //                name:name,
      //                developerId:developerId});
      //  return websites[websites.length-1];
      console.log(website.appliationName);
        var newWebsite = {
          _id: (new Date()).getTime()+"",
          name: website.applicationName,
          description: website.description,
          developerId: developerId
        };
        websites.push(newWebsite);
        return newWebsite;
         }


    function findWebsitesForUserId(userId) {
        var resultSet = [];
        for(var i in websites) {
          if(websites[i].developerId === userId) {
            resultSet.push(websites[i]);
          }
        }
        return resultSet;
    }
  }
})();
