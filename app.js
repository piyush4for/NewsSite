//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const request = require("request");

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  const id = req.body.country;
  const api = "5f54eed41d8a41c094b9e19a58b356ca";
  const url = "https://newsapi.org/v2/top-headlines?country=" + id + "&apiKey=" + api+" ";

  request(url,{ json: true }, function(err, response, body){
      res.setHeader("Content-Type", "text/html");
      if(req.body.country == "CN"){ res.send("you are deshdrohi !!!you should not see their news.")}
      if(body.totalResults > 0){
    if(!err && response.statusCode){
      for (var i = 0; i < 12; i++) {
        var image = body.articles[""+i].urlToImage;

      res.write("<h2><b>"+body.articles[""+i].title+"</b></h2><br>");
      res.write(body.articles[""+i].description+"<br>");
      res.write(body.articles[""+i].content+"<br>");
      res.write("<img src ="+image+" width= 500 ><br><br>");
      res.write("<p>Time: "+body.articles[""+i].publishedAt+"</p>");
      res.write('<a href="'+body.articles[""+i].url+'">for more info click here</a>');
      }
    }
      // console.log(json.articles[0].title);

      res.send();
      console.log("status: "+body.status+" total news: "+body.totalResults+"country: "+req.body.country);
    }
    else{
      res.send("Unable to find news from "+req.body.country+" country. Sorry for inconvenience by piyush.");
    }
  });
});






app.listen(process.env.PORT || 3000, function(response) {
  console.log("server is running on port 3000");
});
