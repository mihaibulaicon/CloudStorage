﻿cloudStorageModule.controller('parentUploadController', ['$scope', '$http', '$timeout', '$upload', 'sessionService','routeService', function ($scope, $http, $timeout, $upload, sessionService, routeService) {
    $scope.fileReaderSupported = window.FileReader != null;
    $scope.uploadRightAway = true;

    $scope.files = [];
    $scope.folders = [];
    $scope.currentFolder = routeService.getCurrentFolder();

    $scope.hasUploader = function (index) {
        return $scope.upload[index] != null;
    };
    $scope.abort = function (index) {
        $scope.upload[index].abort();
        $scope.upload[index] = null;
    };

    $scope.onFileSelect = function ($files) {
        if (sessionService.isAuthorized()) {
            $scope.selectedFiles = [];
            $scope.progress = [];
            if ($scope.upload && $scope.upload.length > 0) {
                for (var i = 0; i < $scope.upload.length; i++) {
                    if ($scope.upload[i] != null) {
                        $scope.upload[i].abort();
                    }
                }
            }
            $scope.upload = [];
            $scope.uploadResult = [];
            $scope.selectedFiles = $files;
            $scope.dataUrls = [];
            for (var i = 0; i < $files.length; i++) {
                var $file = $files[i];
                if (window.FileReader && $file.type.indexOf('image') > -1) {
                    var fileReader = new FileReader();
                    fileReader.readAsDataURL($files[i]);
                    var loadFile = function (fileReader, index) {
                        fileReader.onload = function (e) {
                            $timeout(function () {
                                $scope.dataUrls[index] = e.target.result;
                            });
                        }
                    }(fileReader, i);
                }
                $scope.progress[i] = -1;
                if ($scope.uploadRightAway) {
                    $scope.start(i);
                }
            }
        }
        else
            alert('you must login to upload files');
    };
    $scope.start = function (index) {
        $scope.progress[index] = 0;
        $scope.errorMsg = null;
        $scope.upload[index] = $upload.upload({
            url: 'api/'+routeService.getCurrentTab(),
            method: 'POST',
            file: $scope.selectedFiles[index],
            fileFormDataName: routeService.getCurrentFolder()
        }).then(function (response) {
            $scope.uploadResult.push(response.data);
        }, function (response) {
            if (response.status > 0) $scope.errorMsg = response.status + ': ' + response.data;
        }, function (evt) {
            // Math.min is to fix IE which reports 200% sometimes
            $scope.progress[index] = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        }).xhr(function (xhr) {
            xhr.upload.addEventListener('abort', function () { console.log('abort complete') }, false);
        });
    };
    $scope.resetInputFile = function () {
        var elems = document.getElementsByTagName('input');
        for (var i = 0; i < elems.length; i++) {
            if (elems[i].type == 'file') {
                elems[i].value = null;
            }
        }
    };

   
    $scope.getFilesForUser = function () {
        if (sessionService.isAuthorized()) {
            $http.get("/api/"+routeService.getCurrentTab()+"/" + routeService.getCurrentFolder() + "/" + 'user').
                        then(function (result) {
                            $scope.files = result.data;
                        });
        }
        else alert("please Log in");
    }
    $scope.getFolders = function () {
        if (sessionService.isAuthorized()) {
            $http.get("/api/folder/"+routeService.getFolderType()).
                        then(function (result) {
                            $scope.folders = result.data;
                        });
        }
        else alert("please Log in");
    }
    $scope.setCurrentFolder = function (id) {
        routeService.setCurrentFolder(id);
        $scope.currentFolder = routeService.getCurrentFolder();
        $scope.getFilesForUser();
        $scope.folders = [];
    }
    $scope.createFolder = function () {
        if (sessionService.isAuthorized()) {
            var folder = {
                Name: $scope.folderName,
                Username: sessionService.getUser(),
                FolderType: routeService.getFolderType()
            };
            $http.post("/api/folder/", JSON.stringify(folder)).
                       success(function (data, status, headers, config) {
                           if (status == 201) {
                               alert('Folder creat');
                               $scope.getFolders();
                           }
                           else {
                               alert('Eroare');
                           }
                       });
        }
        else alert("please Log in");
    }
    $scope.upFolder = function () {
        routeService.setCurrentFolder('root');
        $scope.currentFolder = routeService.getCurrentFolder();
        $scope.getFilesForUser();
        $scope.getFolders();
    }
    $scope.refresh = function () {
        $scope.getFilesForUser();
    }
    $scope.$watch(sessionService.isAuthorized, function () {
        if (sessionService.isAuthorized()) {
            $scope.getFilesForUser();
            $scope.getFolders();
        }
        else {
            $scope.files = [];
            $scope.folders = [];
        }
    });
}]);