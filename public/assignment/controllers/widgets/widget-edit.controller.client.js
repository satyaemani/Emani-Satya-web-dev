(function(){
  angular
    .module("WebAppMaker")
    .controller("EditWidgetController",EditWidgetController);

  function EditWidgetController($location,$routeParams,WidgetService) {
    var vm = this;
    //vm.pageId = $routeParams.pageId;
    //var pageId = vm.pageId;
    //console.log($routeParams.pageId);
    //
    //vm.userId = $routeParams.userId;
    //vm.websiteId = $routeParams.websiteId;
    vm.widgetId = $routeParams.widgetId;
    var widgetId=vm.widgetId;
    vm.pageId = $routeParams.pageId;
    vm.userId = $routeParams.userId;
    vm.websiteId = $routeParams.websiteId;
    function init()
    {
        //console.log(vm.widgetId);
      vm.widget = WidgetService.findWidgetById(vm.widgetId);
    }
    init();

    vm.updateWidget = updateWidget;

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

