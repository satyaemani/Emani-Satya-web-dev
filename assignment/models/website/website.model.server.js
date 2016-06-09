module.exports = function() {

  var mongoose = require("mongoose");
  var WebsiteSchema = require("./website.schema.server")();
  var Website = mongoose.model("Website", WebsiteSchema);

  var api = {
    findAllWebsitesForUser:findAllWebsitesForUser,
    createWebsite:createWebsite,
    findWebsiteById:findWebsiteById
  };
  return api;

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




}
