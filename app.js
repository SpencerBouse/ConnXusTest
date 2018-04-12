// Requiring server node modules
var express = require('express');
var bodyParser = require('body-parser');
var Twitter = require('twitter');
var app = express();

// Linking Functions
var tools = require('./public/js/tools.js');

// Setting View Engine
app.set('view engine','ejs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setting Twitter API Keys and Tokens
const client = new Twitter({
  consumer_key: '6cdqFG47oFe28k8e7FAG0EI7V',
  consumer_secret: 'pDcdzwZtN66PZBaUXdMVzdjNJDvoVVc3J15SfSTzs20AQWvkyU',
  access_token_key: '362103452-ECJCEcx1MMzwuSLOLoZA1UcHErQY0cqWOAJF4Gyy',
  access_token_secret: '5s2llJRCtTgDSQeGwXi7rZqs8XaGzw48b985j1shmYQIi'
})

// Define variable
var errMsg = null;

// Rendering DOM
app.get('/', function (req, res) {
  res.render('index', {
    errMsg: errMsg,
    tweets: []
    });
});

// Button Action
app.post('/',function(req,res) {
  errMsg = null;
  if(tools.TestIP(req.body.ipInput)){
    tools.getCoordinates(req.body.ipInput).then((response) => {
      client.get('search/tweets', {
        q: req.body.searchTerm,
        geocode:`${response.latitude},${response.longitude},50mi`,
        count: 25
      }).then((response) => {
        // re-render with tweets
        res.render('index',{
          errMsg: errMsg,
          tweets: response.statuses
        });
      })
      // catch errors
      .catch((err) => {
        errMsg = `Twitter Error: ${JSON.stringify(err[0.message])}`;
        console.log(err);
        res.redirect(req.originalUrl);
      });
    }).catch((err) => {
      errMsg = `Coordinates Error: XHR Status of: ${err}`;
      console.log(err);
      res.redirect(req.originalUrl);
    });
  }else{
    errMsg = 'Not a valid IP Address';
    res.redirect(req.originalUrl);
  };
});

app.listen(3000);
