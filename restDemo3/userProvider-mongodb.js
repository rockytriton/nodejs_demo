var usersTable = 'users';

var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;

UserProvider = function(host, port) {
	
	this.db = new Db('users', new Server(host, port));
	this.db.open(function(){});

	this.fetchAllUsers = function(cb) {
		this.db.collection(usersTable, function(error, users) {
			if (error) {
				cb(error, null);
			} else {
				users.find().toArray(function(error, results) {
					cb(error, results);
				});
			}
		});
	};
	
	this.fetchUserById = function(id, cb) {
		this.db.collection(usersTable, function(error, users) {
			if (error) {
				cb(error, null);
			} else {
				users.findOne({
					_id:users.db.bson_serializer.ObjectID.createFromHexString(id)
				}, function(error, result) {
					cb(error, result);
				});
			}
		});
	};
	
	this.insertUser = function(user, cb) {
		console.log('inserting user: ' + user);
		this.db.collection(usersTable, function(error, users) {
			if (error) {
				cb(error, null);
			} else {
				users.insert([user], function() {
					cb(null, user);
				});
			}
		});
	};
	
	this.updateUser = function(user, cb) {
		console.log('updateUser');
		this.db.collection(usersTable, function(error, users) {
			if (error) {
				cb(error, null);
			} else {
				users.update({_id:users.db.bson_serializer.ObjectID.createFromHexString(user._id)}, 
					{name:user.name, state:user.state, city:user.city}, 
					function(error, result) {
						cb(error, result);
				});
			}
		});
	};
	
	this.deleteUser = function(id, cb) {
		this.db.collection(usersTable, function(error, users) {
			if (error) {
				cb(error, null);
			} else {
				users.remove({_id:users.db.bson_serializer.ObjectID.createFromHexString(id)}, 
					function(error, result) {
						cb(error, result);
				});
			}
		});
	};
};

exports.UserProvider = UserProvider;
