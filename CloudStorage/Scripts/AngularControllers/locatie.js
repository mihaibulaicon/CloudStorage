angular.module('CloudStorage').controller('locatie', ['$scope', function ($scope) {
    $scope.locatii = [];
    $scope.localitati = [];
    $scope.refresh = function () {
        $.ajax({
            url: "/CloudStorage/api/locatii",
            dataType: 'json',
            async: false,
            success: function (data) {
                $scope.locatii = data;
            }
        });

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
        data: 'locatii',
        enableCellSelection: true,
        enableRowSelection: false,
        enableCellEditOnFocus: true,
        columnDefs: [{ field: 'Nume', displayName: 'Nume', enableCellEdit: true },
            {
                field: 'LocalitateId',
                displayName: 'Localitate',
                cellTemplate: ' <select ng-model="locatii[row.rowIndex].LocalitateId" ng-options="Localitate.Id as Localitate.Nume for Localitate in localitati"></select>',
                enableCellEdit: false
            },
                      { field: '', displayName: '', width: 30, cellTemplate: '<button ng-click="removeRow(row)"><span class="glyphicon glyphicon-remove"></button>', enableCellEdit: false }]
    };


    $scope.SaveChanges = function () {
        $.ajax({
            type: "PUT",
            url: "/CloudStorage/api/locatii/",
            data: JSON.stringify($scope.locatii),
            dataType: 'json',
            contentType: "application/json"
        });

    };
    $scope.removeRow = function (row) {
        var index = $scope.locatii.indexOf(row.entity);
        $.ajax({
            type: "DELETE",
            url: "/CloudStorage/api/locatii/" + row.entity.Id,
        });
        $scope.gridOptions.selectItem(index, false);
        $scope.locatii.splice(index, 1);

    };
    $scope.addRow = function () {
        $scope.locatii.push({ Nume: '*' });
    };
}]);