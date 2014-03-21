angular.module('CloudStorage').controller('firma', ['$scope', function ($scope) {
    $scope.firme = [];
    $scope.refresh = function () {
        $.ajax({
            url: "/CloudStorage/api/firme",
            dataType: 'json',
            async: false,
            success: function (data) {
                $scope.firme = data;
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
        data: 'firme',
        enableCellSelection: true,
        enableRowSelection: false,
        enableCellEditOnFocus: true,
        columnDefs: [{ field: 'Nume', displayName: 'Nume', enableCellEdit: true },
                       { field: '', displayName: '', width: 30, cellTemplate: '<button ng-click="removeRow(row)"><span class="glyphicon glyphicon-remove"></button>', enableCellEdit: false }]
    };


    $scope.SaveChanges = function () {
        $.ajax({
            type: "PUT",
            url: "/CloudStorage/api/firme/",
            data: JSON.stringify($scope.firme),
            dataType: 'json',
            contentType: "application/json"
        });

    };
    $scope.removeRow = function (row) {
        var index = $scope.firme.indexOf(row.entity);
        $.ajax({
            type: "DELETE",
            url: "/CloudStorage/api/firme/" + row.entity.Id,
        });
        $scope.gridOptions.selectItem(index, false);
        $scope.firme.splice(index, 1);

    };
    $scope.addRow = function () {
        $scope.firme.push({ Nume: '*' });
    };
}]);