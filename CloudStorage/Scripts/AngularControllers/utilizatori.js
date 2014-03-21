angular.module('CloudStorage').controller('utilizatori', ['$scope','$filter', function ($scope, $filter) {
    $scope.utilizatori = [];
    $scope.ranks = [];
    $scope.servicii = [];
    $scope.sectii = [];
    $scope.birouri = [];

    $scope.dropdownRefresh = function () {
        angular.forEach($scope.utilizatori, function (utilizator, index) {
            utilizator.sectii = $filter('filter')($scope.sectii, { ServiciuId: utilizator.ServiciuId },true);
            utilizator.birouri = $filter('filter')($scope.birouri, { SectieId: utilizator.SectieId },true);
        });
    }
    $scope.refresh = function () {
        $.ajax({
            url: "/CloudStorage/api/utilizatori",
            dataType: 'json',
            async: false,
            success: function (data) {
                $scope.utilizatori = data;
            }
        });
        $.ajax({
            url: "/CloudStorage/api/ranks",
            dataType: 'json',
            async: false,
            success: function (data) {
                $scope.ranks = data;
            }
        });

        $.ajax({
            url: "/CloudStorage/api/servicii",
            dataType: 'json',
            async: false,
            success: function (data) {
                $scope.servicii = data;
            }
        });
        $.ajax({
            url: "/CloudStorage/api/sectii",
            dataType: 'json',
            async: false,
            success: function (data) {
                $scope.sectii = data;
            }
        });
        $.ajax({
            url: "/CloudStorage/api/birouri",
            dataType: 'json',
            async: false,
            success: function (data) {
                $scope.birouri = data;
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
        data: 'utilizatori',
        enableCellSelection: true,
        enableRowSelection: false,
        enableCellEditOnFocus: true,
        columnDefs: [{
                        field: 'RankId',
                        displayName: 'Rank',
                        cellTemplate: ' <select ng-model="utilizatori[ row.rowIndex ].RankId" ng-options="rank.Id as rank.Nume for rank in ranks"></select>',
                        enableCellEdit: false },
                     { field: 'Nume', displayName: 'Nume', enableCellEdit: true  },
                     { field: 'Prenume', displayName: 'Prenume', enableCellEdit: true },
                     {
                         field: 'ServiciuId',
                         displayName: 'Serviciu',
                         cellTemplate: ' <select ng-model="utilizatori[ row.rowIndex ].ServiciuId" ng-options="serviciu.Id as serviciu.Nume for serviciu in servicii" ng-change="updateSectii(row)"></select>',
                         enableCellEdit: false,
                     },
                        {
                            field:'SectieId',
                            displayName: 'Sectie',
                            cellTemplate: ' <select ng-model="utilizatori[ row.rowIndex ].SectieId" ng-options="sectie.Id as sectie.Nume for sectie in utilizatori[ row.rowIndex ].sectii" ng-change="updateBirouri(row)"></select>',
                            enableCellEdit: false
                        },
                     {
                         field: 'BirouId',
                         displayName: 'Birou',
                         cellTemplate: ' <select ng-model="utilizatori[ row.rowIndex ].BirouId" ng-options="birou.Id as birou.Nume for birou in utilizatori[ row.rowIndex ].birouri"></select>',
                         enableCellEdit: false,
                     },
                     { field: 'EsteSef', displayName: 'Sef?', enableCellEdit: true },
                      { field: '', displayName: '', width: 30, cellTemplate: '<button ng-click="removeRow(row)"><span class="glyphicon glyphicon-remove"></button>', enableCellEdit: false }]
    };
  
    $scope.SaveChanges= function () {
        $.ajax({
            type: "PUT",
            url: "/CloudStorage/api/utilizatori/",
            data: JSON.stringify($scope.utilizatori),
            dataType: 'json',
            contentType: "application/json"
        });

    };
    $scope.removeRow = function (row) {
        var index = $scope.utilizatori.indexOf(row.entity);
        $.ajax({
            type: "DELETE",
            url: "/CloudStorage/api/utilizatori/" + row.entity.Id,
        });
        $scope.gridOptions.selectItem(index, false);
        $scope.utilizatori.splice(index, 1);
      
    };
    $scope.addRow = function () {
        $scope.utilizatori.push({Nume: '*', Prenume:'*',EsteSef: false });
    };
    $scope.updateSectii = function (row) {
        row.entity.sectii = $filter('filter')($scope.sectii, { ServiciuId: $scope.utilizatori[row.rowIndex].ServiciuId },true);
        row.entity.birouri = [];
        if (!$scope.$$phase)
            $scope.$apply();
    }
    $scope.updateBirouri = function (row) {
        row.entity.birouri = $filter('filter')($scope.birouri, { SectieId: $scope.utilizatori[row.rowIndex].SectieId },true);
        if (!$scope.$$phase)
            $scope.$apply();
    }
}]);


