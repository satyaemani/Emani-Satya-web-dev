(function(){
  angular
    .module("WebAppMaker")
    .controller("PageNewController",PageNewController);

  function PageNewController($routeParams,PageService) {
    var vm = this;
    vm.websiteId = $routeParams.websiteId;
    var websiteId =  vm.websiteId;
    vm.userId= $routeParams.userId;

    vm.createPage = createPage;

    function createPage(pageName,title){
      console.log(websiteId);
      var page=PageService.createPage(pageName,title,websiteId);

      console.log(page);
      if(page){
        vm.success="New page created";
      }
      else
        vm.error="Sorry page not created!!";
    }



  }
})();

