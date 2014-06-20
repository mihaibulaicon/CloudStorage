cloudStorageModule.controller('photosController', ['$scope', '$http', '$timeout', '$upload', 'sessionService','routeService', function ($scope, $http, $timeout, $upload, sessionService,routeService) {
    routeService.setCurrentTab('photos');
    routeService.setCurrentFolder('root');
    routeService.setFolderType(1);
    $scope.setCurrentImage = function (id) {
        if (sessionService.isAuthorized()) {
            $http.get("/api/photos/"+id).
                        then(function (result) {
                            $scope.currentImage = result.data;
                        });
        }
        else alert("please Log in");
    }
 
}]);