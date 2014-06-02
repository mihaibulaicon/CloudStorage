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
        var form = $("#registerForm")[0];
       // form.validate();
        if (form.checkValidity()) {
            $scope.utilizator.Password = $.md5($scope.utilizator.Password);
            $.ajax({
                type: "POST",
                url: "/api/utilizatori/",
                data: JSON.stringify($scope.utilizator),
                dataType: 'json',
                contentType: "application/json",
                statusCode: {
                    409: function () {
                        alert("Username or email already in use!");
                    }
                }
            });
            $('#register').removeClass('open');
        };
    }
});