angular.module('CloudStorage').controller('birouri', ['$scope', function ($scope) {
    $scope.myData = [];
    $scope.sectii = [];
    $scope.refresh = function () {
        $.ajax({
            url: "/CloudStorage/api/birouri",
            dataType: 'json',
            async: false,
            success: function (data) {
                $scope.myData = data;
            }
        });
        $.ajax({
            url: "/CloudStorage/api/sectii",
            dataType: 'json',
            async: false,
            success: function (data) {
                $scope.sectii = data;
            }
        });
        if(!$scope.$$phase)
         $scope.$apply();
    }

    $scope.refresh();

    $scope.gridOptions = {
        data: 'myData',
        enableCellSelection: true,
        enableRowSelection: false,
        enableCellEditOnFocus: true,
        columnDefs: [{ field: 'Nume', displayName: 'Nume', enableCellEdit: true },
                       {
                           field: 'SectieId',
                           displayName: 'Sectie',
                           cellTemplate: ' <select ng-model="myData[ row.rowIndex ].SectieId" ng-options="sectie.Id as sectie.Nume for sectie in sectii"></select>',
                           enableCellEdit: false
                       },
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
        $scope.myData.push({ Nume: '*' });
    };
}]);