angular.module('CloudStorage').controller('categorie', ['$scope', function ($scope) {
    $scope.categorii = [];
    $scope.refresh = function () {
        $.ajax({
            url: "/CloudStorage/api/categorii",
            dataType: 'json',
            async: false,
            success: function (data) {
                $scope.categorii = data;
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
        data: 'categorii',
        enableCellSelection: true,
        enableRowSelection: false,
        enableCellEditOnFocus: true,
        columnDefs: [{ field: 'Nume', displayName: 'Nume', enableCellEdit: true },
                       { field: '', displayName: '', width: 30, cellTemplate: '<button ng-click="removeRow(row)"><span class="glyphicon glyphicon-remove"></button>', enableCellEdit: false }]
    };


    $scope.SaveChanges = function () {
        $.ajax({
            type: "PUT",
            url: "/CloudStorage/api/categorii/",
            data: JSON.stringify($scope.categorii),
            dataType: 'json',
            contentType: "application/json"
        });
  
    };
    $scope.removeRow = function (row) {
        var index = $scope.categorii.indexOf(row.entity);
        $.ajax({
            type: "DELETE",
            url: "/CloudStorage/api/categorii/" + row.entity.Id,
        });
        $scope.gridOptions.selectItem(index, false);
        $scope.categorii.splice(index, 1);

    };
    $scope.addRow = function () {
        $scope.categorii.push({ Nume: '*' });
    };
}]);