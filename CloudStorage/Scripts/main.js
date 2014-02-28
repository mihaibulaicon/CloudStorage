var app = angular.module('CloudStorage', ['ngGrid']);
app.controller('MyCtrl', function ($scope) {
    $.getJSON("http://localhost/CloudStorage/api/utilizatori", function (data) {
        $scope.myData = data;
        $scope.gridOptions.ngGrid.buildColumns();
    });
    $scope.gridOptions = {
        data: 'myData',
        enableCellSelection: true,
        enableRowSelection: false,
        enableCellEditOnFocus: true,
        columnDefs: [{field: 'Nume', displayName: 'Nume', enableCellEdit: true}, 
                     {field:'Prenume', displayName:'Prenume', enableCellEdit: true}]
    };
    
    $scope.SaveChanges= function (name) {
        $.ajax({
            type: "POST",
            url: "http://localhost/CloudStorage/api/utilizatori",
            data: $scope.gridOptions.selectRow(0, true),
            success: success,
            dataType: 'application/JSON'
        });
    };
});