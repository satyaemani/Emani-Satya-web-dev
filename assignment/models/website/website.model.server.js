module.exports = function() {

  var mongoose = require("mongoose");
  var WebsiteSchema = require("./website.schema.server")();
  var Website = mongoose.model("Website", WebsiteSchema);

  var api = {
    findAllWebsitesForUser:findAllWebsitesForUser,
    createWebsite:createWebsite,
    findWebsiteById:findWebsiteById,
    updateWebsite:updateWebsite,
    deleteWebsite:deleteWebsite
  };
  return api;

  function updateWebsite(websiteId,website)
  {
    delete website._id;
    return Website.update({_id:websiteId},{
      $set:{name:website.name,
            description:website.description}
    });

  }

function findAllWebsitesForUser(userId)
{
return Website.find({_user:userId});
}

  function createWebsite(userId,website)
  {
    website._user=userId;

    return Website.create(website);
  }

  function findWebsiteById(websiteId)
  {
    return Website.findById(websiteId);
  }

  function deleteWebsite(websiteId)
  {
    return Website.remove({_id:websiteId});
  }



}
