
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , UserProvider = require('./userProvider-array').UserProvider;

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var userProvider = new UserProvider();

userProvider.insertUser({id:1, name:'Rocky', city:'Omaha', state:'NE'});

app.get('/userManager', function(req, res) {
	userProvider.fetchAllUsers(function(error, users) {
		res.send(users);
	});
});

app.get('/userManager/:id', function(req, res) {
	userProvider.fetchUserById(req.params.id, function(error, users) {
		res.send(users);
	});
});


app.get('/', function(req, res) {
	userProvider.fetchAllUsers(function(error, users) {
		res.render('index.jade', {
			title: 'User Manager',
			users:users
		});
	});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
