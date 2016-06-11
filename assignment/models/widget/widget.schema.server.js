
module.exports = function() {
  var mongoose = require("mongoose");

  var WidgetSchema = mongoose.Schema({
    _page:{type:mongoose.Schema.ObjectId,ref:"Page"},
    name:String,
    widgetType:String,
    size:String,
    text:String,
    width:String,
    url:String,
    dateCreated: {type: Date, default: Date.now}
  }, {collection: "assignment.widget"});

  return WidgetSchema;
};
