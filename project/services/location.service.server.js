module.exports=function(app){

  var locations=[
    {_id: "123",location:"Huntington",restaurants:["Subway","Boston House of Pizza","UNO"]},
    {_id: "234",location:"Peterborough",restaurants:["Tasty Burgers","Dominos","Dillons"] },
    {_id: "345", location:"Boylston",restaurants:["Boston Shawarma","Subway","FiveGuys"]},
    {_id: "456", location:"Prudential",restaurants:["Pf Chang's","Pizzera"]}
  ];



  app.get("/api/location",findRestaurantsByLocation);



  function findRestaurantsByLocation(req,res)
  {

    var location = req.query.location;

    for(var i in locations)
    {
     // console.log(locations[i].restaurants);
     // console.log(locations[i].location);

      if(locations[i].location===location)
      {
        res.send(locations[i].restaurants);
        return;
      }
    }
    res.send({});
  }
}


