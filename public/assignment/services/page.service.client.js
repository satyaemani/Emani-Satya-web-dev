(function(){
  angular
    .module("WebAppMaker")
    .factory("PageService",PageService);

  var pages=[
    { "_id": "321", "name": "Post 1", "websiteId": "456" },
    { "_id": "432", "name": "Post 2", "websiteId": "456" },
    { "_id": "543", "name": "Post 3", "websiteId": "456" }
  ];

  function PageService($http) {

    var api = {
      findPagesForWebsiteId: findPagesForWebsiteId,
      createPage: createPage,
      findPageById: findPageById,
      deletePage: deletePage,
      updatePage: updatePage
    };
    return api;


    function updatePage(pageId, newPage) {
      var url ="/api/page/"+pageId;
     return $http.put(url,newPage);

    }

    function deletePage(pageId) {
  var url= "/api/page/"+pageId;
      return $http.delete(url);

    }

    function findPageById(pageId) {
  var url ="/api/page/"+pageId;
      return $http.get(url);
    }

    function createPage(page, websiteId) {
      var url ="/api/website/"+websiteId+"/page";
      return $http.post(url,page);

    }

    function findPagesForWebsiteId(websiteId) {
      var url = "/api/website/" + websiteId + "/page";
      console.log(url);
      return $http.get(url);
    }


  }
})();
