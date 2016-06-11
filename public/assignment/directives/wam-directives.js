(function(){
  angular.module("wamDirectives",[])
    .directive("wamSortable",wamSortable)

  function wamSortable()
  {
    return {
      template:"this is my app"
    }
  }

})();
