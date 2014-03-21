angular.module('CloudStorage').controller('model', ['$scope', function ($scope) {
    $scope.modele = [];
    $scope.firme = [];
    $scope.refresh = function () {
        $.ajax({
            url: "/CloudStorage/api/modele",
            dataType: 'json',
            async: false,
            success: function (data) {
                $scope.modele = data;
            }
        });
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
        data: 'modele',
        enableCellSelection: true,
        enableRowSelection: false,
        enableCellEditOnFocus: true,
        columnDefs: [{ field: 'Nume', displayName: 'Nume', enableCellEdit: true },
                        {
                            field: 'FirmaId',
                            displayName: 'Firmă',
                            cellTemplate: ' <select ng-model="modele[row.rowIndex].FirmaId" ng-options="firma.Id as firma.Nume for firma in firme"></select>',
                            enableCellEdit: false
                        },
                      { field: '', displayName: '', width: 30, cellTemplate: '<button ng-click="removeRow(row)"><span class="glyphicon glyphicon-remove"></button>', enableCellEdit: false }]
    };


    $scope.SaveChanges = function () {
        $.ajax({
            type: "PUT",
            url: "/CloudStorage/api/modele/",
            data: JSON.stringify($scope.modele),
            dataType: 'json',
            contentType: "application/json"
        });
        $.getJSON("/CloudStorage/api/modele", function (data) {
            $scope.modele = data;
        });
    };
    $scope.removeRow = function (row) {
        var index = $scope.modele.indexOf(row.entity);
        $.ajax({
            type: "DELETE",
            url: "/CloudStorage/api/modele/" + row.entity.Id,
        });
        $scope.gridOptions.selectItem(index, false);
        $scope.modele.splice(index, 1);

    };
    $scope.addRow = function () {
        $scope.modele.push({ Nume: '*' });
    };
}]);