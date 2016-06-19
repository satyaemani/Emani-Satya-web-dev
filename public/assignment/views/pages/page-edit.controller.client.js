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

    //console.log(pageId);
    function init() {


      PageService.findPageById(vm.pageId)
        .then(function(response){
          vm.page =response.data;
        })

    }
    init();


    function updatePage(newPage)
    {

        if(!newPage||!newPage.name){
          vm.err="Page Name is Mandatory"
        }
        else {
          PageService.updatePage(pageId, newPage)
            .then(function (response) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
              },

              function (response) {
                vm.notSuccess = "not updated";

              });
        }


    }
    function deletePage(pageId){
      //console.log(websiteId);
       PageService.deletePage(pageId)
         .then(function(response)
         {
           $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
           },
           function(){

             vm.error="Sorry cannot delete!!";
         })



    }

  }
})();
