module.exports = function() {

  var mongoose = require("mongoose");
  var PageSchema = require("./page.schema.server")();
  var Page = mongoose.model("Page", PageSchema);

  var api = {
    findAllPagesForWebsite: findAllPagesForWebsite,
    createPage: createPage,
    findPageById: findPageById,
    deletePage: deletePage,
    updatePage: updatePage
  };
  return api;

  function updatePage(pageId,page)
  {
    delete page._id;
    return Page.update({_id:pageId},{
      $set:{name:page.name,
        title:page.title}
    });

  }

  function findAllPagesForWebsite(websiteId)
  {
    return Page.find({_website:websiteId});
  }

  function createPage(websiteId,page)
  {
    page._website=websiteId;

    return Page.create(page);
  }

  function findPageById(pageId)
  {
    return Page.findById(pageId);
  }
  function deletePage(pageId)
  {
    return Page.remove({_id:pageId});
  }




}
