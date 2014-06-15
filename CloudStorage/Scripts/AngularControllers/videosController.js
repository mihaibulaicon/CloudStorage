cloudStorageModule.controller('videosController', ['$scope', '$http', '$timeout', '$upload', 'sessionService','routeService', function ($scope, $http, $timeout, $upload, sessionService, routeService) {
    routeService.setCurrentTab('videos');
    routeService.setCurrentFolder('root');
    routeService.setFolderType(2);

}]);