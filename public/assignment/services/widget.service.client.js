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
        deleteWidget: deleteWidget
      }
      return api;

      function deleteWidget(widgetId)
      {
        var url= "/api/widget/"+widgetId;
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
