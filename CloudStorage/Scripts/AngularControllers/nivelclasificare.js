angular.module('CloudStorage').controller('nivelclasificare', ['$scope', function ($scope) {
    $scope.niveleclasificare = [];
    $scope.refresh = function () {
        $.ajax({
            url: "/CloudStorage/api/niveleclasificare",
            dataType: 'json',
            async: false,
            success: function (data) {
                $scope.niveleclasificare = data;
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
        data: 'niveleclasificare',
        enableCellSelection: true,
        enableRowSelection: false,
        enableCellEditOnFocus: true,
        columnDefs: [{ field: 'Nume', displayName: 'Nume', enableCellEdit: true },
                       { field: '', displayName: '', width: 30, cellTemplate: '<button ng-click="removeRow(row)"><span class="glyphicon glyphicon-remove"></button>', enableCellEdit: false }]
    };


    $scope.SaveChanges = function () {
        $.ajax({
            type: "PUT",
            url: "/CloudStorage/api/niveleclasificare/",
            data: JSON.stringify($scope.niveleclasificare),
            dataType: 'json',
            contentType: "application/json"
        });

    };
    $scope.removeRow = function (row) {
        var index = $scope.niveleclasificare.indexOf(row.entity);
        $.ajax({
            type: "DELETE",
            url: "/CloudStorage/api/niveleclasificare/" + row.entity.Id,
        });
        $scope.gridOptions.selectItem(index, false);
        $scope.niveleclasificare.splice(index, 1);

    };
    $scope.addRow = function () {
        $scope.niveleclasificare.push({ Nume: '*' });
    };
}]);