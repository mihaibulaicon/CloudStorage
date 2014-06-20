cloudStorageModule.controller('profileController', ['$scope', 'sessionService', '$http', function ($scope, sessionService, $http) {
    $scope.utilizator = {
        Username: '',
        FirstName: '',
        LastName: '',
        BirthDate: null,
        Password: '',
        Email: '',
        Id:''
    };
    $scope.userAuthenticated = false;
    $scope.update = function () {
        var form = $("#updateForm")[0];
        if (form.checkValidity()) {
            $scope.utilizator.Password = $.md5($scope.utilizator.Password);
            $http.put("/api/utilizatori/", JSON.stringify($scope.utilizator)).
                        success(function (data, status, headers, config) {
                            if (status == 409) {
                                $scope.utilizator.Password = '';
                                alert('Email address already in use');
                            }
                            else {
                               
                                $scope.utilizator.Password = '';
                                sessionService.setSession('', '');
                                sessionService.Deny();
                                $scope.userAuthenticated = false;
                                alert("Personal data update succeeded. Please login again to continue on your storage account!");
                                
                            }
                        });
        };
    }
    $scope.getUser = function () {
        $http.get("/api/utilizatori/" + sessionService.getUser()).
                         then(function (result) {
                             $scope.utilizator = result.data;
                             $scope.utilizator.Password = '';
                             $scope.utilizator.BirthDate = result.data.BirthDate.split('T')[0];
                         });
    }
    if(sessionService.isAuthorized())
             $scope.getUser();
    $scope.$watch(sessionService.isAuthorized, function () {
        if (sessionService.isAuthorized()) {
            $scope.userAuthenticated = true;
            $scope.getUser();
        }
        else {
            $scope.userAuthenticated = false;
        }
    });

}]);

