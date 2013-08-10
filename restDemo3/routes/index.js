
exports.index = function(req, res){
	var userProvider = req.app.get('userProvider');

	userProvider.fetchAllUsers(function(error, users) {
		if (error) {
			res.send(error, 500);
		} else {
			res.render('index', { title: 'User Manager', users:users });
		}
	});
};