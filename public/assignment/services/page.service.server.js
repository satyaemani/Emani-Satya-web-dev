module.exports=function(app) {


  var pages = [
    { "_id": "321", "name": "Post 1", "websiteId": "456" },
    { "_id": "432", "name": "Post 2", "websiteId": "456" },
    { "_id": "543", "name": "Post 3", "websiteId": "456" }
  ];

  app.post("/api/website/:websiteId/page", createPage);
  app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
  app.get("/api/page/:pageId",findPageById);
  app.put("/api/page/:pageId", updatePage);
  app.delete("/api/page/:pageId", deletePage);

  function  findAllPagesForWebsite(req,res)
  {
   var websiteId = req.params.websiteId;

    var resultSet = [];
    for(var i in pages) {
      if(pages[i].websiteId === websiteId) {
        resultSet.push(pages[i]);
      }
    }

   res.send(resultSet);
  }


//---------------create page---------------------------------

  function createPage(req,res) {
   var websiteId =req.params.websiteId;
    var page = req.body;
    var newPage = {
      _id: (new Date()).getTime() + "",
      name: page.pageName,
      title: page.title,
      websiteId: websiteId
    };
    pages.push(newPage);
    res.send(newPage);

  }

  //---------------------update page-----------------------

  function updatePage(req,res) {
    var pageId = req.params.pageId;
    var newPage = req.body;
    for (var i in pages) {
      if (pages[i]._id === pageId) {
        pages[i].name = newPage.name;
        pages[i].title = newPage.title;
        res.send(200);
      }

    }
    res.send(400);

  }
//--------------find page by id---------------------
  function findPageById(req,res) {
  var pageId = req.params.pageId;
    for (var i in pages) {
      if (pages[i]._id === pageId) {
        res.send(pages[i]);
        return;

      }
    }
    res.send({});
  }

  //------------------------------delete Page---------------------------------

  function deletePage(req,res) {
    var pageId = req.params.pageId;
    for (var i in pages) {
      //console.log(websiteId);
      //console.log(websites[i]._id);
      if (pages[i]._id === pageId) {

        pages.splice(i, 1);
      res.send(200);
        return;
      }
    }
    res.send(400);

  }


}
