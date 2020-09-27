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
    if(!err && response.statusCode){
      for (var i = 0; i < 12; i++) {
        var image = body.articles[""+i].urlToImage;

      res.write("<h2><b>"+body.articles[""+i].title+"</b></h2><br>");
      res.write(body.articles[""+i].description+"<br>");
      res.write(body.articles[""+i].content+"<br>");
      res.write("<img src ="+image+" width= 500 ><br><br>");
      }
      // console.log(json.articles[0].title);

      res.send();
      console.log("status: "+body.status+" total news: "+body.totalResults);
    }
    else{
      res.send(err);
    }
  });
});






app.listen(process.env.PORT || 3000, function(response) {
  console.log("server is running on port 3000");
});
