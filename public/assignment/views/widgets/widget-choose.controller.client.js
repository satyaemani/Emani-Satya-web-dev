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
    vm.createHTMLWidget = createHTMLWidget;
    vm.createTEXTWidget = createTEXTWidget;
    var wHeaderType = "HEADER";
    var wImageType = "IMAGE";
    var wYoutubeType = "YOUTUBE";
    var wHTMLType = "HTML";
    var wTEXTType = "TEXT";


    //---------------------create header----------------------------------
    function createHeaderWidget(pageId) {
      var newWidget={
        widgetType: wHeaderType,
        _page: pageId,
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
        widgetType: wImageType,
        _page: pageId,
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
        widgetType: wYoutubeType,
       _page: pageId,
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


    }
    //---------------------------------create HTML-------------------------------

    function createHTMLWidget(pageId) {
      var newWidget={
        widgetType: wHTMLType,
        _page: pageId,
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


    }
//---------------------------------create TEXT widget------------------------
    function createTEXTWidget(pageId) {
      var newWidget={
        widgetType: wTEXTType,
        _page: pageId,
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


    }

  }
})();
