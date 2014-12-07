var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');


app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));

// root route
app.get("/", function(req, res) {
    res.render('search')
});

// list route
app.get("/list", function(req, res) {
    var searchURL = 'http://www.omdbapi.com/?s=' + req.query.search;
    request(searchURL, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var results = {
                movies: JSON.parse(body).Search 
            }
            res.render('list', results);
        };
    });
});

// detail route
app.get("/detail/:id", function(req, res) {
    var searchURL = 'http://www.omdbapi.com/?i=' + req.params.id + '&tomatoes=true&plot=full';
    request(searchURL, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var result = {
                movie: JSON.parse(body) 
            }
            // res.send(result.movie);
            res.render('detail', result);
        };
    });
});

// use 'nodemon' in the app dir to start server.
app.listen(3001);