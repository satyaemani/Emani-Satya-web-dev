(function(){
  angular
    .module("WebAppMaker")
    .controller("WidgetListController", WidgetListController);

  function WidgetListController($sce,$routeParams,WidgetService) {
    var vm = this;
    vm.pageId = $routeParams.pageId;
    var pageId = vm.pageId;
    console.log($routeParams.pageId);

    vm.getSafeHtml=getSafeHtml;
    vm.getSafeUrl=getSafeUrl;

    function init() {
      vm.widgets = WidgetService.findWidgetsForPageId(pageId);
      console.log(vm.widgets.length);

     console.log(vm.widgets);
    }

    init();

    vm.userId = $routeParams.userId;
    vm.pageId = $routeParams.pageId;
    vm.websiteId = $routeParams.websiteId;

    function getSafeHtml(widget)
  {
     return $sce.trustAsHtml(widget.text);
  }
    function getSafeUrl(widget)
    {
      var urlParts=widget.url.split("/");
      var id=urlParts[urlParts.length-1];
      var url = "https://www.youtube.com/embed/" + id;
      return $sce.trustAsResourceUrl(url);

    }

  }
})();
