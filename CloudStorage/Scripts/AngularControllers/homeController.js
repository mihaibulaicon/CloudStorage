cloudStorageModule.controller('homeController', ['$scope', 'sessionService', '$http', function ($scope, sessionService, $http) {
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
                                sessionService.setSession($scope.utilizator.Username, $scope.utilizator.Password);
                                $scope.userAuthenticated = true;
                                sessionService.Authorize();
                            }
                            else {
                                sessionService.Deny();
                                alert('Email or username already in use!');
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
    $scope.$watch(sessionService.isAuthorized, function () {
        if (sessionService.isAuthorized()) {
            $scope.userAuthenticated = true;
        }
        else {
            $scope.userAuthenticated = false;
        }
    });

}]);

