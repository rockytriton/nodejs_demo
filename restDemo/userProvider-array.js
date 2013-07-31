var nextUserId = 1;

UserProvider = function() {
	this.users = [];
	
	this.fetchAllUsers = function(cb) {
		cb(null, this.users);
	};
	
	this.fetchUserById = function(id, cb) {
		var foundUser = null;
		
		for (var i=0; i<this.users.length; i++) {
			var user = this.users[i];
			
			if (user.id == id) {
				foundUser = user;
				break;
			}
		}
		
		cb(null, foundUser);
	};
	
	this.insertUser = function(user, cb) {
		user.id = nextUserId++;
		this.users.push(user);
	};
	
	this.updateUser = function(user, cb) {
		var retUser = null;
		
		this.fetchUserById(user.id, function(error, _user) {
			retUser = _user;
			retUser.name = user.name;
			retUser.city = user.city;
			retUser.state = user.state;
		});
		
		callback(null, retUser);
	};
	
	this.deleteUser = function(user, cb) {
		var retUser = null;
		
		this.fetchUserById(user.id, function(error, _user) {
			retUser = _user;
		});
		
		callback(null, retUser);
	};
};

exports.UserProvider = UserProvider;
