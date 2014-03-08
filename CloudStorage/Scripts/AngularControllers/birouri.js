﻿angular.module('CloudStorage').controller('birouri', ['$scope', function ($scope) {
    $scope.myData = [];
    $scope.refresh = function () {
        $.ajax({
            url: "/CloudStorage/api/birouri",
            dataType: 'json',
            async: false,
            success: function (data) {
                $scope.myData = data;
            }
        });
    }

    $scope.refresh();

    $scope.gridOptions = {
        data: 'myData',
        enableCellSelection: true,
        enableRowSelection: false,
        enableCellEditOnFocus: true,
        columnDefs: [{ field: 'Nume', displayName: 'Nume', enableCellEdit: true },
                     { field: 'deleteButton', displayName: 'Sterge', width: 90, cellTemplate: '<button ng-click="removeRow(row)">Șterge</button>', enableCellEdit: false }]
    };


    $scope.SaveChanges = function () {
        $.ajax({
            type: "PUT",
            url: "/CloudStorage/api/birouri/",
            data: JSON.stringify($scope.myData),
            dataType: 'json',
            contentType: "application/json"
        });
        $.getJSON("/CloudStorage/api/birouri", function (data) {
            $scope.myData = data;
        });
    };
    $scope.removeRow = function (row) {
        var index = $scope.myData.indexOf(row.entity);
        $.ajax({
            type: "DELETE",
            url: "/CloudStorage/api/birouri/" + row.entity.Id,
        });
        $scope.gridOptions.selectItem(index, false);
        $scope.myData.splice(index, 1);

    };
    $scope.addRow = function () {
        $scope.myData.push({ Nume: '' });
    };
}]);