(function(){
  angular
    .module("WebAppMaker")
    .controller("WebsiteEditController", WebsiteEditController);

  function WebsiteEditController($location,$routeParams, WebsiteService) {
    var vm = this;
     var websiteId = $routeParams.websiteId;
    vm.developerId = $routeParams.userId;
    var developerId =  vm.developerId;

    function init() {
      vm.websites = WebsiteService.findWebsitesForUserId(vm.developerId);
    }
    init();

    vm.deleteWebsite = deleteWebsite;

    function deleteWebsite(){
      console.log(websiteId);
      var website = WebsiteService.deleteWebsite(websiteId);

      console.log(website);
      //if(website){
      //  vm.success="New Website created";
      //}
      //else
      //  vm.error="Sorry website not created!!";
    }



  }
})();

