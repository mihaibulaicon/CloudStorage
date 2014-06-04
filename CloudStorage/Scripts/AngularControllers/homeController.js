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
                                $scope.showRegister = false;
                                $scope.showLogin = false;
                            }
                            else alert('eroare');
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
                             $('#login').removeClass('open');
                         }
                         else {
                             alert("Credentiale invalide");
                         }
                     });
    }
    $scope.Logout = function () {
        sessionService.setSession('', '');
        $scope.userAuthenticated = false;
    }

}]);
cloudStorageModule.service('sessionService', function () {
    var user = '';
    var password = '';
    this.setSession = function(u, p){
        user = u;
        password = p;
    };
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
cloudStorageModule.directive('fileInput', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, elm, attrs) {
            $parse(attrs.fileInput)
            .assign(scope, elm[0].files)
           // scope.$apply()
        }
    }
}]);
cloudStorageModule.controller('photosController',['$scope','$routeParams','$http', function ($scope, $routeParams,$http) {
    //$scope.filesChanged = function (elm)
    //{
    //    $scope.files = elm.files;
    //    $scope.$apply();
    //}
    $scope.upload = function () {
        $http.post('/api/photos', $scope.files,
            {
                headers: {'Content-Type':'multipart/form-data'}
            })
            .success(function (d) {
                console.log(d);
            });
            };
}]);
cloudStorageModule.config(['$routeProvider',function ($routeProvider) {
    $routeProvider
    .when('/Photos', {
        templateUrl: 'Templates/Photos.html',
        controller: 'photosController'
    });
}]);

