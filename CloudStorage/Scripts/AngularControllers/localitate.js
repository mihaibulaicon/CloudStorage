angular.module('CloudStorage').controller('localitate', ['$scope', function ($scope) {
    $scope.localitati = [];
    $scope.refresh = function () {
        $.ajax({
            url: "/CloudStorage/api/localitati",
            dataType: 'json',
            async: false,
            success: function (data) {
                $scope.localitati = data;
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
        data: 'localitati',
        enableCellSelection: true,
        enableRowSelection: false,
        enableCellEditOnFocus: true,
        columnDefs: [{ field: 'Nume', displayName: 'Nume', enableCellEdit: true },
                       { field: '', displayName: '', width: 30, cellTemplate: '<button ng-click="removeRow(row)"><span class="glyphicon glyphicon-remove"></button>', enableCellEdit: false }]
    };


    $scope.SaveChanges = function () {
        $.ajax({
            type: "PUT",
            url: "/CloudStorage/api/localitati/",
            data: JSON.stringify($scope.localitati),
            dataType: 'json',
            contentType: "application/json"
        });
    };
    $scope.removeRow = function (row) {
        var index = $scope.localitati.indexOf(row.entity);
        $.ajax({
            type: "DELETE",
            url: "/CloudStorage/api/localitati/" + row.entity.Id,
        });
        $scope.gridOptions.selectItem(index, false);
        $scope.localitati.splice(index, 1);

    };
    $scope.addRow = function () {
        $scope.localitati.push({ Nume: '*' });
    };
}]);