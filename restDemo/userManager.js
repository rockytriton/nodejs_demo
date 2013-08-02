

UserManager = function(app) {
	var UserProvider = require('./userProvider-array').UserProvider;
	var userProvider = new UserProvider();

	userProvider.insertUser({id:1, name:'Rocky', city:'Omaha', state:'NE'});

	app.get('/userManager', function(req, res) {
		userProvider.fetchAllUsers(function(error, users) {
			res.send(users);
		});
	});

	app.post('/userManager', function(req, res) {
		userProvider.insertUser(req.payload, function(error, user) {

		});
	});

	app.get('/userManager/:id', function(req, res) {
		userProvider.fetchUserById(req.params.id, function(error, user) {
			if (user == null) {
				res.send('User Not Found', 404);
			} else {
				res.send(user);
			}
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
};

exports.UserManager = UserManager;
