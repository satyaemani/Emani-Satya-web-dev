(function(){
  angular
    .module("WebAppMaker")
    .controller("EditWidgetController",EditWidgetController);

  function EditWidgetController($location,$routeParams,WidgetService) {
    var vm = this;

    vm.widgetId = $routeParams.widgetId;
    var widgetId=vm.widgetId;
    vm.pageId = $routeParams.pageId;
    vm.userId = $routeParams.userId;
    vm.websiteId = $routeParams.websiteId;
    function init()
    {
      vm.widget = WidgetService.findWidgetById(vm.widgetId);
    }
    init();

    vm.updateWidget = updateWidget;
    vm.deleteWidget= deleteWidget;

    function deleteWidget(widgetId)
    {
      var result = WidgetService.deleteWidget(widgetId);
      if(result)
      {
        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
      }
      else
        vm.error="unable to delete";

    }
    function updateWidget(widget)
    {
      var result = WidgetService.updateWidget(widget,widgetId);

      if(result)
      {
      $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
      }
      else
      vm.error="unable to update";

    }






  }
})();

