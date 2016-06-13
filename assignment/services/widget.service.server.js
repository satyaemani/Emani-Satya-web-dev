module.exports=function(app,models) {

  var widgetModel = models.widgetModel;

  var multer = require('multer'); // npm install multer --save
  var upload = multer({ dest: __dirname+'/../../public/uploads' });
var widgets = [
  { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
  { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
  { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
    "url": "http://lorempixel.com/400/200/"},
  { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
  { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
  { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
    "url": "https://youtu.be/AM2Ivdi9c4E" },
  { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
];

  app.post("/api/page/:pageId/widget", createWidget);
  app.get("/api/page/:pageId/widget",findAllWidgetsForPage);
  app.get("/api/widget/:widgetId",findWidgetById);
  app.put("/api/widget/:widgetId",updateWidget);
  app.delete("/api/widget/:widgetId",deleteWidget);
  app.post("/api/upload", upload.single('myFile'), uploadImage);
  app.put("/api/page/:pageId/widget",reorderWidgets);

  function reorderWidgets(req,res)
  {
    var start = parseInt(req.query.start);
    var stop = parseInt(req.query.end);
    var pageId = req.params.pageId;
    //console.log([start,stop]);
    widgetModel.reorderWidgets(start,stop,pageId)
      .then(function(stats)
        {
          res.send(200);
        },
        function(error)
        {
          res.statusCode.send(404);
        });

  }


  function uploadImage(req, res) {
    var widgetId      = req.body.widgetId;
    var pageId      = req.body.pageId;
    var userId      = req.body.userId;
    var websiteId      = req.body.websiteId;
    var width         = req.body.width;
    var myFile        = req.file;

    if(myFile === null)
    {
      res.redirect("/assignment/#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
      return;
    }

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    var widget =
    {
      url:"/uploads/"+filename
    };

    widgetModel
      .updateWidget(widgetId,widget)
      .then(function(stats)
        {
          res.send(200);
        },
        function(error)
        {
          res.statusCode.send(404);
        })
    //for(var i in widgets)
    //{
    //  if(widgets[i]._id===widgetId)
    //  {
    //    widgets[i].url="/uploads/"+filename;
    //  }
    //}

    res.redirect("/assignment/#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
  }

  //-------------------------delete widget--------------------
  function deleteWidget(req,res)
  {
    var widgetId = req.params.widgetId;
    var pageId=req.query.pageId;
    var widgetNumber=req.query.widgetNumber;
    widgetModel
      .updateDeletedWidget(pageId,widgetNumber)
      .then(function(widgets)
    {

    widgetModel
      .deleteWidget(widgetId,widgets)
      .then(function(stats)
      {
        res.send(200);
      },
      function(error) {
        res.statusCode.send(error);
      });
    },function(error)
      {
        res.statusCode.send(error);
      });




    //for(var i in widgets)
    //{
    //  if(widgetId===widgets[i]._id) {
    //    widgets.splice(i, 1);
    //   res.send(200);
    //  }
    //}
    //res.send(400);
  }

  //---------------update widget----------------------------

  function updateWidget(req,res)
  {
    var widgetId = req.params.widgetId;
    var widget = req.body;

    widgetModel
      .updateWidget(widgetId,widget)
      .then(function(stats)
        {
          res.send(200);
        },
        function(error)
        {
          res.statusCode.send(404);
        })

    //for (var i in widgets) {
    //  if (widgets[i]._id === widgetId ) {
    //    switch (widgets[i].widgetType) {
    //      case "HEADER":
    //        widgets[i].size = widget.size;
    //        widgets[i].text = widget.text;
    //        res.send(200);
    //        break;
    //
    //      case "IMAGE":
    //        console.log("in image");
    //        widgets[i].width = widget.width;
    //        widgets[i].url = widget.url;
    //        res.send(200);
    //        break;
    //      case "YOUTUBE":
    //        widgets[i].width = widget.width;
    //        widgets[i].url = widget.url;
    //        res.send(200);
    //        break;
    //
    //
    //    }
    //
    //  }
    //}
  }



  //---------------------find all widgets for a page-------------------

function findAllWidgetsForPage(req,res)
{
  var pageId = req.params.pageId;

widgetModel
  .findAllWidgetsForPage(pageId)
  .then(function(widgets)
  {
    res.send(widgets);
  },function(error){
    res.statusCode(400).send(error);
  })

 // var resultSet=[];
 // for(var i in widgets)
 // {
 //   if(widgets[i].pageId===pageId)
 //   {
 //     resultSet.push(widgets[i]);
 //   }
 //
 // }
 //res.send(resultSet);

}

  //--------------------create Widget-------------------------

  function createWidget(req,res)
  {
    var widget = req.body;

    widgetModel
      .createWidget(widget)
      .then(function(widget)
        {
          res.send(widget);
        },
        function(error)
        {
          res.statusCode(400).send(error);
        });
    //widgets.push(newWidget);
    //res.send(newWidget);

  }

  //----------------------------find widget by id----------------------

  function findWidgetById(req,res)
  {
    var widgetId = req.params.widgetId;

    widgetModel
      .findWidgetById(widgetId)
      .then(function(widget)
  {
    res.send(widget);
  },
    function(error)
    {
      res.statusCode(400).send(error);
    });
    //for(var i in widgets)
    //{
    //  if(widgets[i]._id===widgetId)
    //  {
    //    res.send(widgets[i]);
    //    return;
    //  }
    //}
    //res.send({});
  }

//--------------------------count widgets------------------------

  function countWidgetByPageId(req,res)
  {
    var pageId = req.params.pageId;

    widgetModel
      .countWidgetByPageId(pageId)
      .then(function(widgets)
      {
        console.log(widgets);
        res.send(widgets);
      },function(error){
        res.statusCode(400).send(error);
      })
  }









}
