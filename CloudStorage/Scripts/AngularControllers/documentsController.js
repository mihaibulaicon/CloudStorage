cloudStorageModule.controller('documentsController', ['$scope', '$http', '$timeout', '$upload', 'sessionService', 'routeService', '$sce', function ($scope, $http, $timeout, $upload, sessionService, routeService, $sce) {

    routeService.setCurrentTab('documents');
    routeService.setCurrentFolder('root');
    routeService.setFolderType(3);
    var done = false;
    $scope.downloadDocument = function (id,type, $event) {
        $event.preventDefault();
        $http.get("/api/documents/" + id).
                        then(function (result) {
                            if (type == 'pdf' || type == 'txt') {
                                window.open(
                                          'data:' + result.data.Type + ';base64,' + result.data.ByteArray,
                                          '_blank'
                                        );
                            }
                            else
                                location.href = 'data:' + result.data.Type + ';base64,' + result.data.ByteArray;
                        });

    }
}]);