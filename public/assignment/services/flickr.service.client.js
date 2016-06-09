(function(){
  angular
    .module("WebAppMaker")
    .factory("FlickrService",FlickrService);



  var key = "5d2061b7ce007524ed59f58ab5dcc4c3";
  var secret = "";
  var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

  function FlickrService($http) {
    var api = {
      searchPhotos:searchPhotos,
      selectPhoto:selectPhoto
    };
    return api;

  function searchPhotos(searchTerm)
  {
    var url = urlBase
      .replace("API_KEY", key)
      .replace("TEXT", searchTerm);
    return $http.get(url);

  }

    function selectPhoto(widgetId,newWidget)
    {
      var url = "/api/widget/"+widgetId;
      return $http.put(url,newWidget);

    }



  }
})();

