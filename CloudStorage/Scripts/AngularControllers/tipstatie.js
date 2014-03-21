angular.module('CloudStorage').controller('tipstatie', ['$scope', function ($scope) {
    $scope.tipuristatii = [];
    $scope.refresh = function () {
        $.ajax({
            url: "/CloudStorage/api/tipuristatii",
            dataType: 'json',
            async: false,
            success: function (data) {
                $scope.tipuristatii = data;
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
        data: 'tipuristatii',
        enableCellSelection: true,
        enableRowSelection: false,
        enableCellEditOnFocus: true,
        columnDefs: [{ field: 'Nume', displayName: 'Nume', enableCellEdit: true },
                      { field: '', displayName: '', width: 30, cellTemplate: '<button ng-click="removeRow(row)"><span class="glyphicon glyphicon-remove"></button>', enableCellEdit: false }]
    };


    $scope.SaveChanges = function () {
        $.ajax({
            type: "PUT",
            url: "/CloudStorage/api/tipuristatii/",
            data: JSON.stringify($scope.tipuristatii),
            dataType: 'json',
            contentType: "application/json"
        });

    };
    $scope.removeRow = function (row) {
        var index = $scope.tipuristatii.indexOf(row.entity);
        $.ajax({
            type: "DELETE",
            url: "/CloudStorage/api/tipuristatii/" + row.entity.Id,
        });
        $scope.gridOptions.selectItem(index, false);
        $scope.tipuristatii.splice(index, 1);

    };
    $scope.addRow = function () {
        $scope.tipuristatii.push({ Nume: '*' });
    };
}]);