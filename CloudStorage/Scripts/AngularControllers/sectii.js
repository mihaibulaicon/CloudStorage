angular.module('CloudStorage').controller('sectii', ['$scope', function ($scope) {
    $scope.sectii = [];
    $scope.servicii = [];
    $scope.refresh = function () {
        $.ajax({
            url: "/CloudStorage/api/sectii",
            dataType: 'json',
            async: false,
            success: function (data) {
                $scope.sectii = data;
            }
        });

        $.ajax({
            url: "/CloudStorage/api/servicii",
            dataType: 'json',
            async: false,
            success: function (data) {
                $scope.servicii = data;
            }
        });
        if (!$scope.$$phase)
            $scope.$apply();
    }

    $scope.refresh();

    $scope.gridOptions = {
        data: 'sectii',
        enableCellSelection: true,
        enableRowSelection: false,
        enableCellEditOnFocus: true,
        columnDefs: [{ field: 'Nume', displayName: 'Nume', enableCellEdit: true },
            {
                field: 'ServiciuId',
                displayName: 'Serviciu',
                cellTemplate: ' <select ng-model="sectii[row.rowIndex].ServiciuId" ng-options="serviciu.Id as serviciu.Nume for serviciu in servicii"></select>',
                enableCellEdit: false
            },
                     { field: 'deleteButton', displayName: 'Sterge', width: 90, cellTemplate: '<button ng-click="removeRow(row)">Șterge</button>', enableCellEdit: false }]
    };


    $scope.SaveChanges = function () {
        $.ajax({
            type: "PUT",
            url: "/CloudStorage/api/sectii/",
            data: JSON.stringify($scope.sectii),
            dataType: 'json',
            contentType: "application/json"
        });
        $.getJSON("/CloudStorage/api/sectii", function (data) {
            $scope.sectii = data;
        });
    };
    $scope.removeRow = function (row) {
        var index = $scope.sectii.indexOf(row.entity);
        $.ajax({
            type: "DELETE",
            url: "/CloudStorage/api/sectii/" + row.entity.Id,
        });
        $scope.gridOptions.selectItem(index, false);
        $scope.sectii.splice(index, 1);

    };
    $scope.addRow = function () {
        $scope.sectii.push({ Nume: '*' });
    };
}]);