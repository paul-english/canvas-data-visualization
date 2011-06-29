var express = require('express');
var app = express.createServer();
var formidable = require('formidable');
var fs = require('fs');
var csv = require(__dirname + '/lib/csv');

app.configure(function() {

		  app.use(express.bodyParser());
		  app.use(express.static(__dirname + '/public'));
		  
		  app.set('views', __dirname + '/views');
		  app.register('.html', require('ejs'));
		  app.set('view engine', 'html');

});

app.get('/', function(req, res) {

	    res.render('index', {
			   locals: {}
		       });

});

app.get('/csv', function(req, res) {
	    res.redirect('/');
});

app.post('/csv', function(req, res) {

	     var form = new formidable.IncomingForm();
	     form.encoding = 'utf-8';
	     form.parse(req, function(err, fields, files) {
			    if (files.csv) {
				fs.readFile(files.csv.path, 'utf-8', function(err, file) {
						var parsed_csv = csv(file);
						res.send(JSON.stringify(parsed_csv));
					    });
			    } else {
				res.send({error:'CSV file not found.'});
			    }
			});
	     
});



app.listen(80);