(function(){
  angular
    .module("WebAppMaker")
    .controller("EditWidgetController",EditWidgetController);

  function EditWidgetController($location,$routeParams,WidgetService) {
    var vm = this;

    vm.widgetId = $routeParams.widgetId;
    var widgetId=vm.widgetId;
    vm.pageId = $routeParams.pageId;
    var pageId = vm.pageId;
    vm.userId = $routeParams.userId;
    vm.websiteId = $routeParams.websiteId;
    function init()
    {
      WidgetService.findWidgetById(vm.widgetId)
        .then(function(response)
        {
          vm.widget = response.data;
        })
    }
    init();

    vm.updateWidget = updateWidget;
    vm.deleteWidget= deleteWidget;

    function deleteWidget(widgetId)
    {

     WidgetService.deleteWidget(widgetId,pageId, vm.widget.widgetNumber)
       .then(function(response) {
         $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
       },
       function(response)
       {
         vm.error="unable to delete";
       });

    }
    function updateWidget(widget) {
      if(!widget||!widget.name){
        vm.err="widget Name is Mandatory"
      }
      else {
        WidgetService.updateWidget(widget, widgetId)
          .then(function (response) {
              $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
            },
            function (response) {
              vm.error = "unable to update";
            });
      }

    }

  }
})();

