(function(){
  angular
    .module("WebAppMaker")
    .controller("WidgetListController", WidgetListController);

  function WidgetListController($sce,$routeParams,WidgetService) {
    var vm = this;
    vm.pageId = $routeParams.pageId;
    var pageId = vm.pageId;


    vm.getSafeHtml=getSafeHtml;
    vm.getSafeUrl=getSafeUrl;

    function init() {
      WidgetService.findWidgetsForPageId(pageId)
        .then(function(response)
        {
          console.log(response.data);
          vm.widgets = response.data;
        })
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
