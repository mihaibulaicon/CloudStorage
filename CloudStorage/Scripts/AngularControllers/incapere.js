angular.module('CloudStorage').controller('incapere', ['$scope', '$filter', function ($scope, $filter) {
    $scope.incaperi = [];
    $scope.localitati = [];
    $scope.locatii = [];
    $scope.cladiri = [];

    $scope.dropdownRefresh = function () {
        angular.forEach($scope.incaperi, function (incapere, index) {
            incapere.locatii = $filter('filter')($scope.locatii, { LocalitateId: incapere.LocalitateId }, true);
            incapere.cladiri = $filter('filter')($scope.cladiri, { LocatieId: incapere.LocatieId }, true);
        });
    }
    $scope.refresh = function () {
        $.ajax({
            url: "/CloudStorage/api/incaperi",
            dataType: 'json',
            async: false,
            success: function (data) {
                $scope.incaperi = data;
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
        $.ajax({
            url: "/CloudStorage/api/locatii",
            dataType: 'json',
            async: false,
            success: function (data) {
                $scope.locatii = data;
            }
        });
        $.ajax({
            url: "/CloudStorage/api/cladiri",
            dataType: 'json',
            async: false,
            success: function (data) {
                $scope.cladiri = data;
            }
        });
        $scope.dropdownRefresh();
        if (!$scope.$$phase)
            $scope.$apply();
    }
    $scope.refresh();
    hgtOpts = { minHeight: 200 };
    $scope.gridOptions = {
        plugins: [new ngGridFlexibleHeightPlugin(hgtOpts)],
        showFooter: true,
        data: 'incaperi',
        enableCellSelection: true,
        enableRowSelection: false,
        enableCellEditOnFocus: true,
        columnDefs: [
                     { field: 'Nume', displayName: 'Nume', enableCellEdit: true },
                     {
                         field: 'LocalitateId',
                         displayName: 'Localitate',
                         cellTemplate: ' <select ng-model="incaperi[ row.rowIndex ].LocalitateId" ng-options="Localitate.Id as Localitate.Nume for Localitate in localitati" ng-change="updatelocatii(row)"></select>',
                         enableCellEdit: false
                     },
                        {
                            field: 'LocatieId',
                            displayName: 'Locatie',
                            cellTemplate: ' <select ng-model="incaperi[ row.rowIndex ].LocatieId" ng-options="Locatie.Id as Locatie.Nume for Locatie in incaperi[ row.rowIndex ].locatii" ng-change="updatecladiri(row)"></select>',
                            enableCellEdit: false
                        },
                     {
                         field: 'CladireId',
                         displayName: 'Cladire',
                         cellTemplate: ' <select ng-model="incaperi[ row.rowIndex ].CladireId" ng-options="cladire.Id as cladire.Nume for cladire in incaperi[ row.rowIndex ].cladiri"></select>',
                         enableCellEdit: false
                     },
                      { field: '', displayName: '', width: 30, cellTemplate: '<button ng-click="removeRow(row)"><span class="glyphicon glyphicon-remove"></button>', enableCellEdit: false }]
    };

    $scope.SaveChanges = function () {
        $.ajax({
            type: "PUT",
            url: "/CloudStorage/api/incaperi/",
            data: JSON.stringify($scope.incaperi),
            dataType: 'json',
            contentType: "application/json"
        });

    };
    $scope.removeRow = function (row) {
        var index = $scope.incaperi.indexOf(row.entity);
        $.ajax({
            type: "DELETE",
            url: "/CloudStorage/api/incaperi/" + row.entity.Id,
        });
        $scope.gridOptions.selectItem(index, false);
        $scope.incaperi.splice(index, 1);

    };
    $scope.addRow = function () {
        $scope.incaperi.push({ Nume: '*'});
    };
    $scope.updatelocatii = function (row) {
        row.entity.locatii = $filter('filter')($scope.locatii, { LocalitateId: $scope.incaperi[row.rowIndex].LocalitateId }, true);
        row.entity.cladiri = [];
        if (!$scope.$$phase)
            $scope.$apply();
    }
    $scope.updatecladiri = function (row) {
        row.entity.cladiri = $filter('filter')($scope.cladiri, { LocatieId: $scope.incaperi[row.rowIndex].LocatieId }, true);
        if (!$scope.$$phase)
            $scope.$apply();
    }
}]);


