var app = angular.module('userManagerApp', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        controller: 'userManagerController',
        templateUrl: '/'
    })
    .otherwise({ redirectTo: '/' });
}]);

angular.module('userManagerApp').factory('dataFactory', ['$http', function($http) {
    var urlBase = '/users';
    var dataFactory = {};

    dataFactory.getUsers = function () {
        return $http.get('/users');
    };

    dataFactory.getUser = function (id) {
        return $http.get('/users/' + id);
    };

    dataFactory.insertUser = function (user) {
        return $http.post('/users', user);
    };

    dataFactory.updateUser = function (user) {
        return $http.post('/users/' + user._id, user)
    };

    dataFactory.deleteUser = function (id) {
        return $http.delete('/users/' + id);
    };

    return dataFactory;
}]);

angular.module('userManagerApp')
  .controller('userManagerController', [
    '$scope', 'dataFactory', function ($scope, dataFactory) {

    $scope.users;
    $scope.user = {};

    getUsers();

    function getUsers() {
        dataFactory.getUsers()
            .success(function (users) {
                $scope.users = users;
            })
            .error(function (error) {
                alert('Unable to load user data: ' + error.message);
            });
    }

    $scope.insertUser = function (user) {
        dataFactory.insertUser(user)
            .success(function () {
                $scope.status = 'Inserted User! Refreshing user list.';
                $scope.users.push(user);
                window.location.href = "/";
            }).
            error(function(error) {
                alert('Unable to insert user: ' + error);
            });
    };

    $scope.deleteUser = function (userId) {
        dataFactory.deleteUser(userId)
            .success(function () {
                $scope.status = 'Deleted User! Refreshing user list.';
                window.location.href = "/";
            }).
            error(function(error) {
                $scope.status = 'Unable to insert user: ' + error.message;
            });
    };

    $scope.updateUser = function (user) {
        console.log('updating user');
        console.log($scope.user);
        console.log(user);

        dataFactory.updateUser(user)
            .success(function () {
                $scope.status = 'Updated User! Refreshing user list.';
                window.location.href = "/";
            }).
            error(function(error) {
                $scope.status = 'Unable to insert user: ' + error.message;
            });
    };
}]);


function onDelete(id) {
  sel = '#id_' + id;
  userId = $(sel).find('td:eq(0)').text();

  $.ajax({url:'/users/' + userId,type:'DELETE'}).done(function() {
    window.location.href = "/";
  });
}

function onUpdate(id) {
  sel = '#id_' + id;
  user = {};
  user._id = $(sel).find('td:eq(0)').text();
  user.name = $(sel).find('td:eq(1) input').val();
  user.city = $(sel).find('td:eq(2) input').val();
  user.state = $(sel).find('td:eq(3) input').val();

  request = $.ajax({url:'/users/' + user._id,type:'POST', data:user});

  request.done(function() {
    alert('user updated');
    window.location.href = "/";
  });

  request.fail(function(jqXHR, textStatus) {
    alert( "Request failed: " + textStatus );
  });
}

function onAdd() {
  user = {};
  user.name = $('#txtName').val();
  user.city = $('#txtCity').val();
  user.state = $('#txtState').val();

  request = $.ajax({url:'/users', type:'POST', data:user});

  request.done(function(msg) {
    window.location.href = "/";
  });
  request.fail(function(jqXHR, textStatus) {
    alert( "Request failed: " + textStatus );
  });
}
