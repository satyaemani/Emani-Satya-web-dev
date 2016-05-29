(function(){
  angular
    .module("WebAppMaker")
    .controller("WebsiteNewController", WebsiteNewController);

  function WebsiteNewController($routeParams, WebsiteService) {
    var vm = this;
    vm.developerId = $routeParams.userId;
    var developerId =  vm.developerId;

    //function init() {
    //  vm.websites = WebsiteService.findWebsitesForUserId(vm.developerId);
    //}
    //init();
    vm.createWebsite = createWebsite;

    function createWebsite(name,description){
    console.log(developerId);
      var website=WebsiteService.createWebsite(name,description,developerId);

      console.log(website);
      if(website){
      vm.success="New Website created";
    }
    else
      vm.error="Sorry website not created!!";
  }



  }
})();
