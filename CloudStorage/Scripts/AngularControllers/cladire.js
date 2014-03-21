angular.module('CloudStorage').controller('cladire', ['$scope', '$filter', function ($scope, $filter) {
    $scope.cladiri = [];
    $scope.localitati = [];
    $scope.toateLocatiile = [];
    $scope.dropdownRefresh = function () {
        angular.forEach($scope.cladiri, function (cladire, index) {
            cladire.locatii = $filter('filter')($scope.toateLocatiile, { LocalitateId: cladire.LocalitateId }, true);
        });
    }
    $scope.refresh = function () {
        $.ajax({
            url: "/CloudStorage/api/cladiri",
            dataType: 'json',
            async: false,
            success: function (data) {
                $scope.cladiri = data;
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
                $scope.toateLocatiile = data;
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
        data: 'cladiri',
        enableCellSelection: true,
        enableRowSelection: false,
        enableCellEditOnFocus: true,
        columnDefs: [{ field: 'Nume', displayName: 'Nume', enableCellEdit: true },
                        {
                            field: 'LocalitateId',
                            displayName: 'Localitate',
                            cellTemplate: ' <select ng-model="cladiri[ row.rowIndex ].LocalitateId" ng-options="localitate.Id as localitate.Nume for localitate in localitati" ng-change="update(row)"></select>',
                            enableCellEdit: false
                        },
                       {
                           field: 'LocatieId',
                           displayName: 'Locatie',
                           cellTemplate: ' <select ng-model="cladiri[ row.rowIndex ].LocatieId" ng-options="locatie.Id as locatie.Nume for locatie in cladiri[ row.rowIndex ].locatii"></select>',
                           enableCellEdit: false
                       },
                       { field: '', displayName: '', width: 30, cellTemplate: '<button ng-click="removeRow(row)"><span class="glyphicon glyphicon-remove"></button>', enableCellEdit: false }]
    };


    $scope.SaveChanges = function () {
        $.ajax({
            type: "PUT",
            url: "/CloudStorage/api/cladiri/",
            data: JSON.stringify($scope.cladiri),
            dataType: 'json',
            contentType: "application/json"
        });
    };
    $scope.removeRow = function (row) {
        var index = $scope.cladiri.indexOf(row.entity);
        $.ajax({
            type: "DELETE",
            url: "/CloudStorage/api/cladiri/" + row.entity.Id,
        });
        $scope.gridOptions.selectItem(index, false);
        $scope.cladiri.splice(index, 1);

    };
    $scope.addRow = function () {
        $scope.cladiri.push({ Nume: '*' });
    };
    $scope.update = function (row) {
        row.entity.locatii = $filter('filter')($scope.toateLocatiile, { LocalitateId: $scope.cladiri[row.rowIndex].LocalitateId }, true);
        if (!$scope.$$phase)
            $scope.$apply();
    }
}]);