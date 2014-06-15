var cloudStorageModule = angular.module('CloudStorage', ['angularFileUpload', 'ngRoute']);
cloudStorageModule.service('sessionService', function () {
    var user = '';
    var password = '';
    var isAuthorized = false;
    this.setSession = function (u, p) {
        user = u;
        password = p;
    };
    this.getUser = function () {
        return user;
    }
    this.Authorize = function () {
        isAuthorized = true;
    }
    this.Deny = function () {
        isAuthorized = false;
    }
    this.isAuthorized = function () {
        return isAuthorized;
    }
    this.getSession = function () {
        return user + ':' + password;
    };
});
cloudStorageModule.service('routeService', function () {
    var currentTab = '';
    var currentFolder = 'root';
    var folderType='';
    this.setCurrentTab = function (t) {
        currentTab = t;
    };
    this.getCurrentTab = function () {
        return currentTab;
    };
    this.setCurrentFolder = function (t) {
        currentFolder = t;
    };
    this.getCurrentFolder = function () {
        return currentFolder;
    };
    this.setFolderType = function (t) {
        folderType = t;
    };
    this.getFolderType = function () {
        return folderType;
    };
});
cloudStorageModule.factory('sessionInjector', ['sessionService', function (sessionService) {
    var sessionInjector = {
        request: function (config) {
            config.headers['x-session-token'] = sessionService.getSession();
            return config;
        },
        response: function (response) {
            // do something on success
            return response;
        },

        // optional method
        responseError: function (rejection) {
            return rejection;
        }
    };
    return sessionInjector;
}]);
cloudStorageModule.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('sessionInjector');
}]);


cloudStorageModule.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
    .when('/Photos', {
        templateUrl: 'Templates/Photos.html',
        controller: 'parentUploadController'
    })
     .when('/Videos', {
         templateUrl: 'Templates/Videos.html',
         controller: 'parentUploadController'
     })
     .when('/Documents', {
         templateUrl: 'Templates/Documents.html',
         controller: 'parentUploadController'
     })
     .when('/Files', {
         templateUrl: 'Templates/Files.html',
         controller: 'parentUploadController'
     })
     .when('/Profile', {
         templateUrl: 'Templates/Profile.html',
         controller: 'parentUploadController'
     })
     .when('/Home', {
         templateUrl: 'Templates/Home.html',
         controller: 'homeController'
     });
}]);
