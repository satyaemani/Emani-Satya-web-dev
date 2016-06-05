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


    //---------------------create header----------------------------------
    function createHeaderWidget(pageId) {
      var newWidget={
        _id: (new Date()).getTime()+"",
        widgetType: wHeaderType,
        pageId: pageId,
      }
      WidgetService.createWidget(pageId,newWidget)
        .then(function(response){
          var newWidget =response.data;
          if (newWidget) {
            console.log(newWidget);
            console.log(newWidget._id);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/"+newWidget._id);
          }
          else
            vm.error = "cannot add a new widget";
        })
    }

//-----------------------------------------create Image-----------------------------

    function createImageWidget(pageId) {

      var newWidget={
        _id: (new Date()).getTime()+"",
        widgetType: wImageType,
        pageId: pageId,
      }
       WidgetService.createWidget(pageId,newWidget)
         .then(function(response){
           var newWidget =response.data;

           if (newWidget) {

             $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + newWidget._id);
           }
           else
             vm.error = "cannot add a new widget";
         })
    }

    //---------------------------create Youtube-----------------------------

    function createYoutubeWidget(pageId) {
      var newWidget={
        _id: (new Date()).getTime()+"",
        widgetType: wYoutubeType,
        pageId: pageId,
      }

      WidgetService.createWidget(pageId,newWidget)
        .then(function(response)
        {
          var newWidget = response.data;

          if (newWidget) {
            console.log(newWidget._id);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + newWidget._id);
          }
          else
            vm.error = "cannot add a new widget";

        })
      if (newWidget) {
        console.log(newWidget._id);
        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + newWidget._id);
      }
      else
        vm.error = "cannot add a new widget";

    }

  }
})();
