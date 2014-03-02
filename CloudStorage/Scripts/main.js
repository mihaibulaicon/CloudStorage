var app = angular.module('CloudStorage', ['ngGrid']);
app.controller('MyCtrl', function ($scope) {
    $.getJSON("http://localhost/CloudStorage/api/utilizatori", function (data) {
        $scope.myData = data;
    });
    $scope.gridOptions = {
        data: 'myData',
        enableCellSelection: true,
        enableRowSelection: false,
        enableCellEditOnFocus: true,
        columnDefs: [{field: 'Nume', displayName: 'Nume', enableCellEdit: true}, 
                     { field: 'Prenume', displayName: 'Prenume', enableCellEdit: true },
                     { field: 'deleteButton', displayName: 'Sterge', width: 90, cellTemplate: '<button ng-click="DeleteEntity()">Șterge</button>', editable:false }]
    };
    
    $scope.SaveChanges= function () {
        $.ajax({
            type: "PUT",
            url: "/CloudStorage/api/utilizatori/",
            data: JSON.stringify($scope.myData),
            dataType: 'json',
            contentType: "application/json"
        });
    };
    $scope.DeleteEntity = function () {
        var index = this.row.rowIndex;
        $.ajax({
            type: "DELETE",
            url: "/CloudStorage/api/utilizatori/"+$scope.myData[index].Id,
        });
    };
});