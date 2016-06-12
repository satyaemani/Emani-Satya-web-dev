module.exports = function() {

  var mongoose = require("mongoose");
  var WidgetSchema = require("./widget.schema.server")();
  var Widget = mongoose.model("Widget",WidgetSchema);

  var api = {
    findAllWidgetsForPage:findAllWidgetsForPage,
    createWidget:createWidget,
    findWidgetById:findWidgetById,
    updateWidget: updateWidget,
    deleteWidget: deleteWidget,
    reorderWidgets:reorderWidgets
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


  function reorderWidgets(start,stop,pageId)
  {
   return Widget.find(function(err,widgets)
    {
      widgets.forEach(function(widget)
      {
        if(start > stop)
        {
          if(widget.widgetNumber < start && widget.widgetNumber >= stop) {
            widget.widgetNumber++;
            widget.save(function(){});
          }
          else if(widget.widgetNumber===start) {
            widget.widgetNumber = stop;

            widget.save(function(){});
          }

        }
        else
        {
          if(widget.widgetNumber>start && widget.widgetNumber<=stop)
          {
            widget.widgetNumber--;
            widget.save(function(){});
          }
          else if(widget.widgetNumber===start)
          {
            widget.widgetNumber=stop;
            widget.save(function(){});
          }
        }


      });

    });
  }

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
