angular.module('CloudStorage').controller('destinatie', ['$scope', function ($scope) {
    $scope.destinatii = [];
    $scope.refresh = function () {
        $.ajax({
            url: "/CloudStorage/api/destinatii",
            dataType: 'json',
            async: false,
            success: function (data) {
                $scope.destinatii = data;
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
        data: 'destinatii',
        enableCellSelection: true,
        enableRowSelection: false,
        enableCellEditOnFocus: true,
        columnDefs: [{ field: 'Nume', displayName: 'Nume', enableCellEdit: true },
                       { field: '', displayName: '', width: 30, cellTemplate: '<button ng-click="removeRow(row)"><span class="glyphicon glyphicon-remove"></button>', enableCellEdit: false }]
    };


    $scope.SaveChanges = function () {
        $.ajax({
            type: "PUT",
            url: "/CloudStorage/api/destinatii/",
            data: JSON.stringify($scope.destinatii),
            dataType: 'json',
            contentType: "application/json"
        });

    };
    $scope.removeRow = function (row) {
        var index = $scope.destinatii.indexOf(row.entity);
        $.ajax({
            type: "DELETE",
            url: "/CloudStorage/api/destinatii/" + row.entity.Id,
        });
        $scope.gridOptions.selectItem(index, false);
        $scope.destinatii.splice(index, 1);

    };
    $scope.addRow = function () {
        $scope.destinatii.push({ Nume: '*' });
    };
}]);