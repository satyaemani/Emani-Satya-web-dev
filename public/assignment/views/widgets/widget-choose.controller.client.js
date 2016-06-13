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

      WidgetService. findWidgetsForPageId(pageId)
        .then(function(response)
        {
         var length= response.data.length;
          var newWidget={
            widgetType: wHeaderType,
            _page: pageId,
            widgetNumber:length
          }

          WidgetService.createWidget(pageId,newWidget)
            .then(function(response){
              var newWidget =response.data;
              if (newWidget) {

                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/"+newWidget._id);
              }
              else
                vm.error = "cannot add a new widget";
            })
        },function(response)
        {
          console.log(response.data);
        });


    }

//-----------------------------------------create Image-----------------------------

    function createImageWidget(pageId) {
      WidgetService.findWidgetsForPageId(pageId)
        .then(function(response) {

          var length= response.data.length;

          var newWidget = {
            widgetType: wImageType,
            _page: pageId,
            widgetNumber: length
          }

          WidgetService.createWidget(pageId, newWidget)
            .then(function (response) {
              var newWidget = response.data;

              if (newWidget) {

                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + newWidget._id);
              }
              else
                vm.error = "cannot add a new widget";
            })
        },function(response)
        {
          console.log(response);
        });
    }

    //---------------------------create Youtube-----------------------------

    function createYoutubeWidget(pageId) {
      WidgetService. findWidgetsForPageId(pageId)
        .then(function(response) {
          var length= response.data.length;

          var newWidget = {
            widgetType:wYoutubeType,
            _page: pageId,
            widgetNumber:length
          }
          WidgetService.createWidget(pageId, newWidget)
            .then(function (response) {
              var newWidget = response.data;

              if (newWidget) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + newWidget._id);
              }
              else
                vm.error = "cannot add a new widget";

            })

        },function(response)
        {
          console.log(response);
        });
    }
    //---------------------------------create HTML-------------------------------

    function createHTMLWidget(pageId) {
      WidgetService. findWidgetsForPageId(pageId)
        .then(function(response) {
          var length= response.data.length;

          var newWidget = {
            widgetType: wHTMLType,
            _page: pageId,
            widgetNumber: length
          }

          WidgetService.createWidget(pageId, newWidget)
            .then(function (response) {
              var newWidget = response.data;

              if (newWidget) {
                console.log(newWidget._id);
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + newWidget._id);
              }
              else
                vm.error = "cannot add a new widget";

            })
        },function(response)
        {
          console.log(response);
        });


    }
//---------------------------------create TEXT widget------------------------
    function createTEXTWidget(pageId) {
      WidgetService. findWidgetsForPageId(pageId)
          .then(function(response) {
            var length= response.data.length;

          var newWidget = {
            widgetType: wTEXTType,
            _page: pageId,
            widgetNumber: length
          };

          WidgetService.createWidget(pageId, newWidget)
            .then(function (response) {
              var newWidget = response.data;

              if (newWidget) {
                console.log(newWidget._id);
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + newWidget._id);
              }
              else
                vm.error = "cannot add a new widget";

            });
        },
          function(response) {
            console.log(response);
          });


    }

  }
})();
