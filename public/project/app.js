(
  function(){
    $(init);

    function init(){
      $.ajax({
        url:"http://www.omdbapi.com/?s=batman",
        success:renderMovies
      })
    }
    function renderMovies(response){
      var table = $("<table class='table'> ");

      for(m in response.Search){
        var movie = response.Search[m];
        console.log(movie);
        var title= movie.Title;
        var imdbID = movie.imdbID;
        var poster =movie.Poster;

        var tr = $("<tr>");
        var td = $("<td>");

        td.append(imdbID);
        tr.append(td);

        td = $("<td>");
        td.append(title);
        tr.append(td);

        table.append(tr);
      }

      $("body").append(table);
    }
  }
)();
