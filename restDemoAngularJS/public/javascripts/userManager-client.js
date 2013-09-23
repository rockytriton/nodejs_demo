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
        return $http.get(urlBase);
    };

    dataFactory.getUser = function (id) {
        return $http.get(urlBase + '/' + id);
    };

    dataFactory.insertUser = function (user) {
      console.log('inserting... ' + user["name"])
      console.log(user);
        return $http.post(urlBase, user);
    };

    dataFactory.updateUser = function (user) {
        return $http.put(urlBase + '/' + user._id, user)
    };

    dataFactory.deleteUser = function (id) {
        return $http.delete(urlBase + '/' + id);
    };

    return dataFactory;
}]);

angular.module('userManagerApp')
  .controller('userManagerController', [
    '$scope', 'dataFactory', function ($scope, dataFactory) {

    $scope.status;
    $scope.users;
    $scope.user = {};

    getUsers();

    function getUsers() {
        dataFactory.getUsers()
            .success(function (users) {
                $scope.users = users;
            })
            .error(function (error) {
                $scope.status = 'Unable to load user data: ' + error.message;
            });
    }

    $scope.insertUser = function (user) {
      console.log('calling insert user: ' + $scope.user.name + ', ' + user.name);
        dataFactory.insertUser(user)
            .success(function () {
                $scope.status = 'Inserted User! Refreshing user list.';
                $scope.users.push(user);
            }).
            error(function(error) {
                $scope.status = 'Unable to insert user: ' + error.message;
            });
    };

    $scope.deleteUser = function (index) {
      console.log('calling delete user: ' + $scope.users[index].id + ', ' + $scope.users[index]._id);
        dataFactory.deleteUser($scope.users[index]._id)
            .success(function () {
                $scope.status = 'Deleted User! Refreshing user list.';
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
