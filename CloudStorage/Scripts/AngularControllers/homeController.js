cloudStorageModule.controller('Home', ['$scope', 'sessionService', '$http', function ($scope, sessionService, $http) {
    $scope.utilizator = {
        Username:'',
        FirstName: '',
        LastName: '',
        BirthDate:null,
        Password: '',
        Email: ''
    };
    $scope.Register = function () {
        var form = $("#registerForm")[0];
       // form.validate();
        if (form.checkValidity()) {
            $scope.utilizator.Password = $.md5($scope.utilizator.Password);
            //$.ajax({
            //    type: "POST",
            //    url: "/api/utilizatori/",
            //    data: JSON.stringify($scope.utilizator),
            //    dataType: 'json',
            //    contentType: "application/json",
            //    statusCode: {
            //        409: function () {
            //            alert("Username or email already in use!");
            //        }
            //    }
            //});
            $http.post("/api/utilizatori/", JSON.stringify($scope.utilizator)).
                        success(function (data, status, headers, config) {
                            alert(status);
                        }).
                        error(function (data, status, headers, config) {
                            alert(status);
                        });
            $('#register').removeClass('open');
        };
    }
    $scope.Login = function () {
        sessionService.setSession($scope.utilizator.Username, $.md5($scope.utilizator.Password));
        $('#login').removeClass('open');
    }

}]);
cloudStorageModule.service('sessionService', function(){
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
        // do something on error
        if (canRecover(rejection)) {
          return responseOrNewPromise
        }
        return $q.reject(rejection);
      }
    };
    return sessionInjector;
}]);
cloudStorageModule.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('sessionInjector');
}]);