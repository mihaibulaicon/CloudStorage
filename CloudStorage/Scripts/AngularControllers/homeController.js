cloudStorageModule.controller('Home', ['$scope', 'sessionService', '$http', function ($scope, sessionService, $http) {
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
                                sessionService.setSession($scope.utilizator.Username, $.md5($scope.utilizator.Password));
                                $scope.userAuthenticated = true;
                            }
                            else alert('eroare');
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
                             $('#login').removeClass('open');
                         }
                         else {
                             alert("Credentiale invalide");
                         }
                     });
    }
    $scope.Logout = function () {
        sessionService.setSession('', '');
        $scope.userAuthenticated = false;
    }

}]);
cloudStorageModule.service('sessionService', function () {
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
        return rejection;
      }
    };
    return sessionInjector;
}]);
cloudStorageModule.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('sessionInjector');
}]);

cloudStorageModule.controller('photosController',[ '$scope', '$http', '$timeout', '$upload',  function($scope, $http, $timeout, $upload) {
	$scope.fileReaderSupported = window.FileReader != null;
	$scope.uploadRightAway = true;
	
	$scope.hasUploader = function(index) {
		return $scope.upload[index] != null;
	};
	$scope.abort = function(index) {
		$scope.upload[index].abort(); 
		$scope.upload[index] = null;
	};
	
	$scope.onFileSelect = function($files) {
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
		for ( var i = 0; i < $files.length; i++) {
			var $file = $files[i];
			if (window.FileReader && $file.type.indexOf('image') > -1) {
				var fileReader = new FileReader();
				fileReader.readAsDataURL($files[i]);
				var loadFile = function(fileReader, index) {
					fileReader.onload = function(e) {
						$timeout(function() {
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
	};
	
	$scope.start = function(index) {
		$scope.progress[index] = 0;
		$scope.errorMsg = null;
			$scope.upload[index] = $upload.upload({
				url : 'api/photos',
				method: 'POST',
				file: $scope.selectedFiles[index],
				fileFormDataName: 'myFile'
			}).then(function(response) {
				$scope.uploadResult.push(response.data);
			}, function(response) {
				if (response.status > 0) $scope.errorMsg = response.status + ': ' + response.data;
			}, function(evt) {
				// Math.min is to fix IE which reports 200% sometimes
				$scope.progress[index] = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
			}).xhr(function(xhr){
				xhr.upload.addEventListener('abort', function() {console.log('abort complete')}, false);
			});
	};	
	$scope.resetInputFile = function() {
		var elems = document.getElementsByTagName('input');
		for (var i = 0; i < elems.length; i++) {
			if (elems[i].type == 'file') {
				elems[i].value = null;
			}
		}
	};
} ]);
cloudStorageModule.config(['$routeProvider',function ($routeProvider) {
    $routeProvider
    .when('/Photos', {
        templateUrl: 'Templates/Photos.html',
        controller: 'photosController'
    });
}]);

