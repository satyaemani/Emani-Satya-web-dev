(function()
{
  angular
    .module("WebAppMaker")
    .controller("NewWidgetController", NewWidgetController);

  function NewWidgetController($location,$routeParams,WidgetService) {
    var vm = this;

    vm.pageId = $routeParams.pageId;
    vm.userId = $routeParams.userId;
    vm.websiteId = $routeParams.websiteId;

    vm.createHeaderWidget = createHeaderWidget;
    vm.createImageWidget = createImageWidget;
    vm.createYoutubeWidget = createYoutubeWidget;
    var wHeaderType = "HEADER";
    var wImageType = "IMAGE";
    var wYoutubeType = "YOUTUBE";

    function createHeaderWidget(pageId) {
      var newWidget = WidgetService.createWidget(pageId, wHeaderType);

      if (newWidget) {
        console.log(newWidget._id);
        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/"+newWidget._id);
      }
      else
        vm.error = "cannot add a new widget";

    }


    function createImageWidget(pageId) {
      var newWidget = WidgetService.createWidget(pageId, wImageType);
      if (newWidget) {
        console.log(newWidget._id);
        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + newWidget._id);
      }
      else
        vm.error = "cannot add a new widget";

    }

    function createYoutubeWidget(pageId) {
      var newWidget = WidgetService.createWidget(pageId, wYoutubeType);
      if (newWidget) {
        console.log(newWidget._id);
        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + newWidget._id);
      }
      else
        vm.error = "cannot add a new widget";

    }

  }
})();
