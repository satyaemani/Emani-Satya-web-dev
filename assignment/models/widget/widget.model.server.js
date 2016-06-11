module.exports = function() {

  var mongoose = require("mongoose");
  var WidgetSchema = require("./widget.schema.server")();
  var Widget = mongoose.model("Widget",WidgetSchema);

  var api = {
    findAllWidgetsForPage:findAllWidgetsForPage,
    createWidget:createWidget,
    findWidgetById:findWidgetById,
    updateWidget: updateWidget,
    deleteWidget: deleteWidget
  };
  return api;
  //$set:{//widget:widget
  ////  name:widget.name,
  ////  size:widget.size,
  ////text:widget.text,
  ////width:widget.width,
  ////url:widget.url,
  ////  widgetType:widget.widgetType
  //  }

  function updateWidget(widgetId,widget)
  {
    delete widget._id;
    return Widget.update({_id:widgetId},{
      $set: widget
    });

  }

  function findAllWidgetsForPage(pageId)
  {
    return Widget.find({_page:pageId});
  }

  function createWidget(widget)
  {
    return Widget.create(widget);
  }

  function findWidgetById(widgetId)
  {
    return Widget.findById(widgetId);
  }
  function deleteWidget(widgetId)
  {
    return Widget.remove({_id:widgetId});
  }





}
