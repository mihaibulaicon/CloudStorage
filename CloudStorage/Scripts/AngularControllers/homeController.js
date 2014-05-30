cloudStorageModule.controller('Home', function ($scope) {
    $scope.utilizator = {
        Username:'',
        FirstName: '',
        LastName: '',
        BirthDate:null,
        Password: '',
        Email: ''
    };
    $scope.Register = function () {
        $scope.utilizator.Password = $.md5($scope.utilizator.Password);
        $.ajax({
            type: "PUT",
            url: "/api/utilizatori/",
            data: JSON.stringify($scope.utilizator),
            dataType: 'json',
            contentType: "application/json"
        });
        $('#register').removeClass('open');
    };
});