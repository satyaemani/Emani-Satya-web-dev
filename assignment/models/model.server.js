module.exports = function() {

  var mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost/cs5610summer1');

  var models = {
    userModel: require("./user/user.model.server")(),
    websiteModel: require("./website/website.model.server")()
    // TODO: add all the other models: websiteModel, pageModel, widgetModel
  };
  return models;
};
