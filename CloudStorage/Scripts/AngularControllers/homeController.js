cloudStorageModule.controller('Home', ['$scope', 'sessionService', '$http', function ($scope, sessionService, $http) {
    $scope.utilizator = {
        Username:'',
        FirstName: '',
        LastName: '',
        BirthDate:null,
        Password: '',
        Email: ''
    };
    $scope.userAuthenticated = false;
    $scope.Register = function () {
        var form = $("#registerForm")[0];
        if (form.checkValidity()) {
            $scope.utilizator.Password = $.md5($scope.utilizator.Password);
            $http.post("/api/utilizatori/", JSON.stringify($scope.utilizator)).
                        success(function (data, status, headers, config) {
                            if (status == 201) {
                                sessionService.setSession($scope.utilizator.Username, $.md5($scope.utilizator.Password));
                                $scope.userAuthenticated = true;
                                sessionService.Authorize();
                            }
                            else {
                                sessionService.Deny();
                                alert('eroare');
                            }
                        });
            $('#register').removeClass('open');
        };
    }
    $scope.Login = function () {
        $http.get("/api/utilizatori/?userName=" + $scope.utilizator.Username + "&password=" + $.md5($scope.utilizator.Password)).
                     then(function (result) {
                         if (result.data == "true")
                         {
                             sessionService.setSession($scope.utilizator.Username, $.md5($scope.utilizator.Password));
                             $scope.userAuthenticated = true;
                             sessionService.Authorize();
                             $('#login').removeClass('open');
                         }
                         else {
                             sessionService.Deny();
                             alert("Credentiale invalide");
                         }
                     });
    }
    $scope.Logout = function () {
        sessionService.setSession('', '');
        sessionService.Deny();
        $scope.userAuthenticated = false;
    }

}]);
cloudStorageModule.service('sessionService', function () {
    var user = '';
    var password = '';
    var isAuthorized = false;
    this.setSession = function(u, p){
        user = u;
        password = p;
    };
    this.getUser = function () {
        return user;
    }
    this.Authorize = function () {
        isAuthorized = true;
    }
    this.Deny = function () {
        isAuthorized = false;
    }
    this.isAuthorized = function () {
        return isAuthorized;
    }
    this.getSession = function(){
        return user+':'+password;
    };
});
cloudStorageModule.factory('sessionInjector', ['sessionService', function (sessionService) {
    var sessionInjector = {
        request: function (config) {
                config.headers['x-session-token'] = sessionService.getSession();
            return config;
        },
        response: function(response) {
        // do something on success
        return response;
      },

      // optional method
     responseError: function(rejection) {
        return rejection;
      }
    };
    return sessionInjector;
}]);
cloudStorageModule.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('sessionInjector');
}]);


cloudStorageModule.config(['$routeProvider',function ($routeProvider) {
    $routeProvider
    .when('/Photos', {
        templateUrl: 'Templates/Photos.html',
        controller: 'photosController'
    })
     .when('/Videos', {
        templateUrl: 'Templates/Videos.html',
        controller: 'videosController'
     })
     .when('/Documents', {
         templateUrl: 'Templates/Documents.html',
         controller: 'documentsController'
     })
     .when('/Files', {
         templateUrl: 'Templates/Files.html',
         controller: 'filesController'
     })
     .when('/Profile', {
         templateUrl: 'Templates/Profile.html',
         controller: 'profileController'
     })
     .when('/Home', {
          templateUrl: 'Templates/Home.html',
          controller: 'Home'
      });
}]);

