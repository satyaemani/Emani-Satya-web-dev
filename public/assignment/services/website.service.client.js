(function(){
  angular
    .module("WebAppMaker")
    .factory("WebsiteService", WebsiteService);


  function WebsiteService($http) {
    var api = {
      createWebsite:createWebsite,
      findWebsitesForUserId: findWebsitesForUserId,
      deleteWebsite: deleteWebsite,
      findWebsiteById:findWebsiteById,
      updateWebsite : updateWebsite

    };
    return api;


    function updateWebsite(websiteId,website) {
      var url = "/api/website/" + websiteId;
      return $http.put(url, website);

    }


    function  findWebsiteById(websiteId) {
      var url = "/api/website/" + websiteId;
      return $http.get(url);
    }
    //--------------------------------
    function deleteWebsite(websiteId)
    {
      var url ="/api/website/"+websiteId;
      return $http.delete(url);

      //for(var i in websites)
      //{
      //  console.log(websiteId);
      //  console.log(websites[i]._id);
      //  if(websites[i]._id ===websiteId) {
      //
      //    websites.splice(i,1);
      //    return true;
      //  }
      //}
      //return false;

    }

    function createWebsite(website,userId){
       // console.log(userId);
        var url="/api/user/"+userId+"/website";
        return $http.post(url,website);
  }


    function findWebsitesForUserId(userId) {
      var url = "/api/user/" + userId + "/website";
      return $http.get(url);
    }
  }
})();
