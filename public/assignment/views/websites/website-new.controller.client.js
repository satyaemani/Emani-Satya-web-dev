(function(){
  angular
    .module("WebAppMaker")
    .controller("WebsiteNewController", WebsiteNewController);

  function WebsiteNewController($location,$routeParams, WebsiteService) {
    var vm = this;
    vm.developerId = $routeParams.userId;

    var developerId =  vm.developerId;

    vm.createWebsite = createWebsite;

    function createWebsite(website){
   // console.log(developerId);
      WebsiteService.createWebsite(website,developerId)
        .then(function(response){
          var website = response.data;
          if(website){
            $location.url("/user/"+vm.developerId+"/website");
          }
          else
            vm.error="Sorry website not created!!";
        })
  }
  }
})();
