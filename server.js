var express = require("express");
var path = require("path");
var request = require("request");
var app = express();
var env = require("node-env-file");

const port = 3001;

env(path.join(__dirname, ".env"));
app.use(express.static("public"));
app.use("/static", express.static(path.join(__dirname, "public")));

// respond with "hello world" when a GET request is made to the homepage
app.get("/", function(req, res) {
  console.log("hello");
  res.sendFile(path.join(__dirname, "public/index.html"));
});

const url = "https://sandbox.iexapis.com";
const api = "stable/stock/market/batch";
const token = process.env.iexcloudToken;

function getData(url) {
  return new Promise((resolve, reject) => {
    var options = {
      method: "GET",
      url: url
    };
    request(options, function(error, response) {
      if (error) reject(error);
      return resolve(response.body);
    });
  });
}
app.get("/search", function(req, res) {
  //todo
  let types = req.query.types;
  if (types == undefined) {
    types = "quote";
  }
  let range = req.query.range;
  if (range == undefined) {
    range = "1m";
  }
  let last = req.query.last;
  if (last == undefined) {
    last = "5";
  }
  let symbol = req.query.symbol;
  console.log(symbol);
  getData(
    "https://sandbox.iexapis.com/stable/stock/market/batch?symbols=" +
      symbol +
      "&types=quote&range=1m&last=5&token=" +
      token
  ).then(response => {
    res.json(response);
  });
});

app.get("/list", function(req, res) {
  //todo
  res.send("list:");
});

app.get("/share", function(req, res) {
  //todo
  res.send("share:");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
