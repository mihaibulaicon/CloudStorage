cloudStorageModule.controller('filesController', ['$scope', '$http', '$timeout', '$upload', 'sessionService', 'routeService', '$sce', function ($scope, $http, $timeout, $upload, sessionService, routeService, $sce) {

    routeService.setCurrentTab('files');
    routeService.setCurrentFolder('root');
    routeService.setFolderType(4);
    var done = false;
    $scope.downloadDocument = function (id, $event) {
        $event.preventDefault();
        $http.get("/api/files/" + id).
                        then(function (result) {
                        
                                location.href = 'data:' + result.data.Type + ';base64,' + result.data.ByteArray;
                        });

    }
}]);