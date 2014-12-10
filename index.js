var express     = require('express')
  , bodyParser  = require('body-parser')
  , request     = require('request');

app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));

var db = require("./models/index.js");

// RootRoute!
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

// 'saved' route
app.get("/saved", function(req, res) {
    db.Favorite.findAll().done(function(err, returnData) {
        // res.send({'returnData':returnData});
        res.render('saved', {'returnData':returnData});
    })
})

app.post("/addToFavorites", function(req, res) {
    db.Favorite.create({ 
        title: req.body.title, 
        year: req.body.year, 
        imdbCode: req.body.imdbID 
    }).done(function(err, newDbRecord){
        if (err) {
            throw err;
        }
        res.redirect("saved");
    })
})

app.delete("/saved", functions(req,res) {
    db.Favorite.destroy({where:{id:req.params.id}}).then(function(deleteCount){
        res.send(deleteCount);
    })
};

// use 'nodemon' in the app dir to start server.
app.listen(3001);