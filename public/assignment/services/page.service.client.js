(function(){
  angular
    .module("WebAppMaker")
    .factory("PageService",PageService);

  var pages=[
    { "_id": "321", "name": "Post 1", "websiteId": "456" },
    { "_id": "432", "name": "Post 2", "websiteId": "456" },
    { "_id": "543", "name": "Post 3", "websiteId": "456" }
  ];

  function PageService() {

    var api = {
      findPagesForWebsiteId: findPagesForWebsiteId,
      createPage:createPage,
      findPageById:findPageById,
      deletePage:deletePage,
      updatePage:updatePage
    };
    return api;



    function updatePage(pageId,newPage)
    {
      for(var i in pages)
      {
        if(pages[i]._id===pageId)
        {
          pages[i].name = newPage.name;
          pages[i].title = newPage.description;
          return true;
        }

      }
      return false;

    }

    function deletePage(pageId)
    {


      for(var i in pages)
      {
        //console.log(websiteId);
        //console.log(websites[i]._id);
        if(pages[i]._id ===pageId) {

          pages.splice(i,1);
          return true;
        }
      }
      return false;

    }

    function  findPageById(id)
    {

      for(var i in pages){
        if(pages[i]._id === id)
        {
          return pages[i];

        }
      }
      return null;
    }

    function createPage(page,websiteId)
    {
      var newPage = {
        _id: (new Date()).getTime()+"",
        name: page.pageName,
        title: page.title,
        websiteId: websiteId
      };
      pages.push(newPage);
      return newPage;

    }

    function findPagesForWebsiteId(id)
    {
      var resultSet = [];
      for(var i in pages) {
        if(pages[i].websiteId === id) {
          resultSet.push(pages[i]);
        }
      }
      return resultSet;
    }



  }



})();
