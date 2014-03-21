angular.module('CloudStorage').controller('ranks', ['$scope', function ($scope) {
    $scope.myData = [];
    $scope.refresh = function () {
        $.ajax({
            url: "/CloudStorage/api/ranks",
            dataType: 'json',
            async: false,
            success: function (data) {
                $scope.myData = data;
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
        data: 'myData',
        enableCellSelection: true,
        enableRowSelection: false,
        enableCellEditOnFocus: true,
        enablePaging:true,
        pagingOptions:{ pageSizes: [10, 15, 20], pageSize: 10, totalServerItems: 0, currentPage: 1 },
        columnDefs: [{ field: 'Nume', displayName: 'Nume', enableCellEdit: true },
                     { field: '', displayName: '', width: 30, cellTemplate: '<button ng-click="removeRow(row)"><span class="glyphicon glyphicon-remove"></button>', enableCellEdit: false }]
    };


    $scope.SaveChanges = function () {
        $.ajax({
            type: "PUT",
            async:false,
            url: "/CloudStorage/api/ranks/",
            data: JSON.stringify($scope.myData),
            dataType: 'json',
            contentType: "application/json"
        });
    };
    $scope.removeRow = function (row) {
        var index = $scope.myData.indexOf(row.entity);
        $.ajax({
            type: "DELETE",
            url: "/CloudStorage/api/ranks/" + row.entity.Id,
        });
        $scope.gridOptions.selectItem(index, false);
        $scope.myData.splice(index, 1);

    };
    $scope.addRow = function () {
        $scope.myData.push({ Nume: '*' });
    };
}]);