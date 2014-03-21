angular.module('CloudStorage').controller('clasificare', ['$scope', function ($scope) {
    $scope.clasificari = [];
    $scope.refresh = function () {
        $.ajax({
            url: "/CloudStorage/api/clasificari",
            dataType: 'json',
            async: false,
            success: function (data) {
                $scope.clasificari = data;
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
        data: 'clasificari',
        enableCellSelection: true,
        enableRowSelection: false,
        enableCellEditOnFocus: true,
        columnDefs: [{ field: 'Nume', displayName: 'Nume', enableCellEdit: true },
                       { field: '', displayName: '', width: 30, cellTemplate: '<button ng-click="removeRow(row)"><span class="glyphicon glyphicon-remove"></button>', enableCellEdit: false }]
    };


    $scope.SaveChanges = function () {
        $.ajax({
            type: "PUT",
            url: "/CloudStorage/api/clasificari/",
            data: JSON.stringify($scope.clasificari),
            dataType: 'json',
            contentType: "application/json"
        });

    };
    $scope.removeRow = function (row) {
        var index = $scope.clasificari.indexOf(row.entity);
        $.ajax({
            type: "DELETE",
            url: "/CloudStorage/api/clasificari/" + row.entity.Id,
        });
        $scope.gridOptions.selectItem(index, false);
        $scope.clasificari.splice(index, 1);

    };
    $scope.addRow = function () {
        $scope.clasificari.push({ Nume: '*' });
    };
}]);