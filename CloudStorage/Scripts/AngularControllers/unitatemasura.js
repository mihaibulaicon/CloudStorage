angular.module('CloudStorage').controller('unitatemasura', ['$scope', function ($scope) {
    $scope.unitatimasura = [];
    $scope.refresh = function () {
        $.ajax({
            url: "/CloudStorage/api/unitatimasura",
            dataType: 'json',
            async: false,
            success: function (data) {
                $scope.unitatimasura = data;
            }
        });
        if (!$scope.$$phase)
            $scope.$apply();
    }

    $scope.refresh();

    hgtOpts = { minHeight: 200 };
    $scope.gridOptions = {
        plugins: [new ngGridFlexibleHeightPlugin(hgtOpts)],
        showFooter: true,
        data: 'unitatimasura',
        enableCellSelection: true,
        enableRowSelection: false,
        enableCellEditOnFocus: true,
        columnDefs: [{ field: 'Nume', displayName: 'Nume', enableCellEdit: true },
                      { field: '', displayName: '', width: 30, cellTemplate: '<button ng-click="removeRow(row)"><span class="glyphicon glyphicon-remove"></button>', enableCellEdit: false }]
    };


    $scope.SaveChanges = function () {
        $.ajax({
            type: "PUT",
            url: "/CloudStorage/api/unitatimasura/",
            data: JSON.stringify($scope.unitatimasura),
            dataType: 'json',
            contentType: "application/json"
        });

    };
    $scope.removeRow = function (row) {
        var index = $scope.unitatimasura.indexOf(row.entity);
        $.ajax({
            type: "DELETE",
            url: "/CloudStorage/api/unitatimasura/" + row.entity.Id,
        });
        $scope.gridOptions.selectItem(index, false);
        $scope.unitatimasura.splice(index, 1);

    };
    $scope.addRow = function () {
        $scope.unitatimasura.push({ Nume: '*' });
    };
}]);