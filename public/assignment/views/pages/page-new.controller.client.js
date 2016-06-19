(function(){
  angular
    .module("WebAppMaker")
    .controller("PageNewController",PageNewController);

  function PageNewController($location,$routeParams,PageService) {
    var vm = this;
    vm.websiteId = $routeParams.websiteId;
    var websiteId =  vm.websiteId;
    vm.userId= $routeParams.userId;

    vm.createPage = createPage;

    function createPage(page){
      if(!page||!page.name){
        vm.err="Page Name is Mandatory"
      }
      else {
        PageService.createPage(page, websiteId)
          .then(function (response) {
            var page = response.data;

            if (page) {
              $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            }
            else
              vm.error = "Sorry page not created!!";
          });
      }


    }



  }
})();

