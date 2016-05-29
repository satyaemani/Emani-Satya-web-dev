(function(){
  angular
    .module("WebAppMaker")
    .controller("PageEditController",PageEditController);

  function PageEditController($location,$routeParams,PageService) {
    var vm = this;
    vm.pageId = $routeParams.pageId;
    var pageId = vm.pageId;
    vm.deletePage= deletePage;
    vm.websiteId=$routeParams.websiteId;
    vm.userId = $routeParams.userId;
    //console.log(vm.pageId);
    //console.log(pageId);
    function init() {

      //console.log(vm.websiteId);
      vm.page =PageService.findPageById(vm.pageId);

    }
    init();


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
