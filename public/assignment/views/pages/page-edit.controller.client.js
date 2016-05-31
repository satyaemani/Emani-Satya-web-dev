(function(){
  angular
    .module("WebAppMaker")
    .controller("PageEditController",PageEditController);

  function PageEditController($location,$routeParams,PageService) {
    var vm = this;
    vm.pageId = $routeParams.pageId;
    var pageId = vm.pageId;
    vm.deletePage= deletePage;
    vm.updatePage = updatePage;
    vm.websiteId=$routeParams.websiteId;
    vm.userId = $routeParams.userId;
    console.log(vm.userId);
    //console.log(pageId);
    function init() {

      //console.log(vm.websiteId);
      vm.page =PageService.findPageById(vm.pageId);

    }
    init();


    function updatePage(newPage)
    {
      console.log("clicked ");
      var result = PageService.updatePage(pageId,newPage);

      if(result)
      {
        vm.success="Updated";
      }

      else
        vm.notSuccess="not updated";
    }
    function deletePage(pageId){
      //console.log(websiteId);
      var result = PageService.deletePage(pageId);

      console.log(result);
      if(result){
        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
      }
      else
        vm.error="Sorry cannot delete!!";
    }

  }
})();
