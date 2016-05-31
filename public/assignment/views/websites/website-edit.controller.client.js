(function(){
  angular
    .module("WebAppMaker")
    .controller("WebsiteEditController", WebsiteEditController);

  function WebsiteEditController($location,$routeParams, WebsiteService) {
    var vm = this;
     vm.websiteId = $routeParams.websiteId;
    vm.developerId = $routeParams.userId;
   // var developerId =  vm.developerId;
var websiteId = vm.websiteId;


    function init() {
      vm.website = WebsiteService.findWebsiteById(vm.websiteId);
    }
       init();

    vm.deleteWebsite = deleteWebsite;
    vm.updateWebsite= updateWebsite;

    function updateWebsite(website)
    {
      var result = WebsiteService.updateWebsite(websiteId,website);

      if(result)
      {
        $location.url("/user/"+vm.developerId+"/website");

      }

      else
      vm.notSuccess="not updated";
    }

    function deleteWebsite(websiteId){
      //console.log(websiteId);
      var result = WebsiteService.deleteWebsite(websiteId);

      console.log(result);
      if(result){
       $location.url("/user/"+vm.developerId+"/website");
      }
      else
        vm.error="Sorry cannot delete!!";
    }



  }
})();

