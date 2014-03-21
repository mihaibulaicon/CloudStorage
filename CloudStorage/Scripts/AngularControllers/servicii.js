angular.module('CloudStorage').controller('servicii', ['$scope', function ($scope) {
    $scope.servicii = [];
    $scope.refresh = function () {
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
    hgtOpts = { minHeight: 200 };
    $scope.gridOptions = {
        plugins: [new ngGridFlexibleHeightPlugin(hgtOpts)],
        showFooter: true,
        data: 'servicii',
        enableCellSelection: true,
        enableRowSelection: false,
        enableCellEditOnFocus: true,
        columnDefs: [{ field: 'Nume', displayName: 'Nume', enableCellEdit: true },
                      { field: '', displayName: '', width: 30, cellTemplate: '<button ng-click="removeRow(row)"><span class="glyphicon glyphicon-remove"></button>', enableCellEdit: false }]
    };


    $scope.SaveChanges = function () {
        $.ajax({
            type: "PUT",
            url: "/CloudStorage/api/servicii/",
            data: JSON.stringify($scope.servicii),
            dataType: 'json',
            contentType: "application/json"
        });
    };
    $scope.removeRow = function (row) {
        var index = $scope.servicii.indexOf(row.entity);
        $.ajax({
            type: "DELETE",
            url: "/CloudStorage/api/servicii/" + row.entity.Id,
        });
        $scope.gridOptions.selectItem(index, false);
        $scope.servicii.splice(index, 1);

    };
    $scope.addRow = function () {
        $scope.servicii.push({ Nume: '*' });
    };
}]);