(
  function()
  {
    angular
      .module("WebAppMaker")
      .factory("WidgetService",WidgetService)


    function WidgetService($http)
    {
      var api={
        findWidgetsForPageId:findWidgetsForPageId,
        createWidget:createWidget,
        findWidgetById:findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidgets:reorderWidgets
      }
      return api;


      function reorderWidgets(pageId,index1,index2)
      {
        var url = "/api/page/"+pageId+"/widget?start="+index1+"&end="+index2;
        return $http.put(url);
      }

      function deleteWidget(widgetId,pageId,widgetNumber)
      {

        var url= "/api/widget/"+widgetId+"?pageId="+pageId+"&widgetNumber="+widgetNumber;
        return $http.delete(url);


      }

      function updateWidget(widget,widgetId) {

        var url = "/api/widget/"+widgetId;
        return $http.put(url,widget);
      }

      function findWidgetById(widgetId)
      {

        var url="/api/widget/"+widgetId;
        return $http.get(url);


      }

      function createWidget(pageId,newWidget)
      {
        var url="/api/page/"+pageId+"/widget";
        return $http.post(url,newWidget);

      }

      function  findWidgetsForPageId(pageId)
      {

       var url ="/api/page/"+pageId+"/widget";
        return $http.get(url);

      }


    }

  })();
