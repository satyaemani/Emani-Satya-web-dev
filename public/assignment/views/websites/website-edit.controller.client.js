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
      WebsiteService.findWebsiteById(vm.websiteId)
        .then(function(response)
        {
          vm.website = response.data;

        })
    }
       init();

    vm.deleteWebsite = deleteWebsite;
    vm.updateWebsite= updateWebsite;

    function updateWebsite(website)
    {if(!website||!website.name){
      vm.err="Website Name is Mandatory"
    }
    else {
      WebsiteService.updateWebsite(websiteId, website)
        .then(function (response) {


            $location.url("/user/" + vm.developerId + "/website");

          },
          function (response) {


            vm.notSuccess = "not updated";
          });
    }

    }

    function deleteWebsite(websiteId){
     WebsiteService.deleteWebsite(websiteId)
       .then(function(response)
       {
         var result =response.data;
        // console.log(result);
         if(result){
           $location.url("/user/"+vm.developerId+"/website");
         }
         else
           vm.error="Sorry cannot delete!!";
       })


    }



  }
})();

