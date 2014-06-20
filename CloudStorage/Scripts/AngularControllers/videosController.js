cloudStorageModule.controller('videosController', ['$scope', '$http', '$timeout', '$upload', 'sessionService', 'routeService', '$sce', function ($scope, $http, $timeout, $upload, sessionService, routeService, $sce) {
    routeService.setCurrentTab('videos');
    routeService.setCurrentFolder('root');
    routeService.setFolderType(2);
    $scope.setCurrentVideo = function (id) {
        if (sessionService.isAuthorized()) {
            // $sce.trustAsResourceUrl("/api/videos/" + id);
            $http.get("/api/videos/" + id).
                        then(function (result) {
                            //  myVideo.currentVideo = '';
                            $scope.videoType = result.data.Type;
                            var myVideo = document.getElementsByTagName('video')[0];
                            $scope.currentVideo = $sce.trustAsResourceUrl("data:" + result.data.Type + ";base64," + result.data.ByteArray);
                            myVideo.load();
                            myVideo.play();
                        });
        }
        else alert("please Log in");
    }
 
}]);