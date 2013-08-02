UserManager = function(app) {
	var UserProvider = require('./userProvider-array').UserProvider;
	var userProvider = new UserProvider();

	userProvider.insertUser({_id:1, name:'Rocky', city:'Omaha', state:'NE'}, function(a,b){});
	userProvider.insertUser({_id:2, name:'Dave', city:'Stafford', state:'VA'}, function(a,b){});

	app.get('/users', function(req, res) {
		userProvider.fetchAllUsers(function(error, users) {
			res.send(users);
		});
	});

	app.post('/users', function(req, res) {
		userProvider.insertUser(req.body, function(error, user) {
			if (error) {
				res.send(error, 500);
			} else {
				res.send(user);
			}
		});
	});

	app.get('/users/:id', function(req, res) {
		userProvider.fetchUserById(req.params.id, function(error, user) {
			if (user == null) {
				res.send(error, 404);
			} else {
				res.send(user);
			}
		});
	});

	app.post('/users/:id', function(req, res) {
		var _user = req.body;
		_user._id = req.params.id;

		userProvider.updateUser(_user, function(error, user) {
			if (user == null) {
				res.send(error, 404);
			} else {
				res.send(user);
			}
		});
	});

	app.delete('/users/:id', function(req, res) {
		userProvider.deleteUser(req.params.id, function(error, user) {
			if (user == null) {
				res.send(error, 404);
			} else {
				res.send(user);
			}
		});
	});
};

exports.UserManager = UserManager;
