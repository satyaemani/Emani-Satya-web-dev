(function(){
  angular
    .module("WebAppMaker")
    .controller("LoginController",LoginController);

  function LoginController($scope){


    //var vm = this;
    $scope.hello="hello from login controller";
  }
})();
