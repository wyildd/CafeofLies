var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var reservations = [];
var waitlist = [];

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "add.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "table.html"));
});

app.get("/api/tables", function(req, res) {
  res.json(reservations);
});

app.get("/api/waitlist", function(req, res) {
  res.json(waitlist);
});

app.post("/reserve", function(req, res) {
  
  var newReservation = req.body;
 
  newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();

  console.log(newReservation);
    if (reservations.length === 5){
        waitlist.push(newReservation);
        res.send(false)
    }
    else {
      reservations.push(newReservation)
      res.send(true)
    }

});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});