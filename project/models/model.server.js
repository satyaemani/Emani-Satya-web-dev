module.exports = function() {

  //var mongoose = require('mongoose');
  //mongoose.connect('mongodb://localhost/cs5610summer1');

  var models = {
    userModel: require("./user/user.model.server")(),
    reservationModel: require("./reservation/reservation.model.server")(),
    restaurantModel: require("./restaurant/restaurant.model.server")(),
    managerModel: require("./manager/manager.model.server")(),
    //pageModel: require("./page/page.model.server")(),
    //widgetModel: require("./widget/widget.model.server")()
  };
  return models;
};
