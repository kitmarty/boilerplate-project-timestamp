// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//timestamp
app.get("/api/timestamp/:date?", function (req, res) {
  if (req.params.date==null){
    var date = new Date();
    res.json({ unix : date.getTime() , utc : date.toUTCString() });
  } else {
    var date = new Date(Number(req.params.date))
    if (date.toDateString()=="Invalid Date")
      date = new Date(req.params.date)
    else
      res.json({ unix : date.getTime(), utc : date.toUTCString() });
    if (date.toDateString()=="Invalid Date")
      res.json({ error : "Invalid Date" })
    else{
      res.json({ unix : date.getTime(), utc : date.toUTCString() });
    }
  }
});


// listen for requests :)
var port = process.env.PORT || 3000;
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
