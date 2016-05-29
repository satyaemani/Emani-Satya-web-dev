(
  function()
  {
    angular
      .module("WebAppMaker")
      .factory("WidgetService",WidgetService)
     var widgets= [
      { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
      { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
      { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        "url": "http://lorempixel.com/400/200/"},
      { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
      { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
      { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        "url": "https://youtu.be/AM2Ivdi9c4E" },
      { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
      ];

    function WidgetService()
    {
      var api={
        findWidgetsForPageId:findWidgetsForPageId,
          createWidget:createWidget,
        findWidgetById:findWidgetById,
        updateWidget: updateWidget
      }
      return api;

      function updateWidget(widget,id) {
        for (var i in widgets) {
          console.log(id);
          console.log(widgets[i]._id);
          if (widgets[i]._id === id ) {
            console.log(widgets[i].widgetType);
            switch (widgets[i].widgetType) {
              case "HEADER":
                widgets[i].size = widget.size;
                widgets[i].text = widget.text;
                return true
                break;


            }

          }

        }
      }

      function findWidgetById(id)
      {
        for(var i in widgets)
        {
          if(widgets[i]._id===id)
          {
            return widgets[i];
          }
        }
        return null;
      }

      function createWidget(pageId,wType)
      {
        var newWidget={
          _id: (new Date()).getTime()+"",
          widgetType: wType,
          pageId: pageId,
          }
        widgets.push(newWidget);
        return newWidget;
      }

      function  findWidgetsForPageId(pageId)
      {
        var resultSet=[];
        for(var i in widgets)
        {
          //console.log(widgets[i].pageId);
          //console.log(pageId);
          if(widgets[i].pageId===pageId)
          {
            resultSet.push(widgets[i]);
          }

        }
        return resultSet;
      }


    }

  })();
