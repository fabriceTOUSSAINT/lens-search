//grab express
var express = require('express');
var app = express();


app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');


//Flickr api config will go here
var Flickr = require("flickrapi"),
	flickrOptions = {
		api_key: "939e7eb1ad2816f83a49704e83678490",
		secret: "7b36b492264f2519"
	};

	//
	// Flickr.authenticate(flickerOptions, function(error, flickr) {
	// 	//we can now use "flickr" as our API object
	//
	// });

	Flickr.tokenOnly(flickrOptions, function(error, flickr) {
	  // we can now use "flickr" as our API object,
	  // but we can only call public methods and access public data
	});

app.get('/', function(req,res){
	//render the home page and pass in the popular images
	res.render('pages/index');

});

app.listen(8080);
console.log('App started, http://localhost:8080');
