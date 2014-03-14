angular.module('CloudStorage').controller('birouri', ['$scope', function ($scope) {
    $scope.birouri = [];
    $scope.servicii = [];
    $scope.dropdownRefresh = function () {
        angular.forEach($scope.birouri, function (birou, index) {
            $.ajax({
                type: "GET",
                async: false,
                url: "/CloudStorage/entitiesservice.svc/Sectii?$format=json&$filter=ServiciuId eq '" + birou.ServiciuId + "'",
                success: function (data) {
                    birou.sectii = data.d.results;
                }
            });
        });
    }
    $scope.refresh = function () {
        $.ajax({
            url: "/CloudStorage/api/birouri",
            dataType: 'json',
            async: false,
            success: function (data) {
                $scope.birouri = data;
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
        $scope.dropdownRefresh();
        if(!$scope.$$phase)
         $scope.$apply();
    }

    $scope.refresh();
  
    $scope.gridOptions = {
        data: 'birouri',
        enableCellSelection: true,
        enableRowSelection: false,
        enableCellEditOnFocus: true,
        columnDefs: [{ field: 'Nume', displayName: 'Nume', enableCellEdit: true },
                        {
                            field: 'ServiciuId',
                            displayName: 'Serviciu',
                            cellTemplate: ' <select ng-model="birouri[ row.rowIndex ].ServiciuId" ng-options="serviciu.Id as serviciu.Nume for serviciu in servicii" ng-change="update(row)"></select>',
                            enableCellEdit: false
                        },
                       {
                           field: 'SectieId',
                           displayName: 'Sectie',
                           cellTemplate: ' <select ng-model="birouri[ row.rowIndex ].SectieId" ng-options="sectie.Id as sectie.Nume for sectie in birouri[ row.rowIndex ].sectii"></select>',
                           enableCellEdit: false
                       },
                     { field: 'deleteButton', displayName: 'Sterge', width: 90, cellTemplate: '<button ng-click="removeRow(row)">Șterge</button>', enableCellEdit: false }]
    };


    $scope.SaveChanges = function () {
        $.ajax({
            type: "PUT",
            url: "/CloudStorage/api/birouri/",
            data: JSON.stringify($scope.birouri),
            dataType: 'json',
            contentType: "application/json"
        });
    };
    $scope.removeRow = function (row) {
        var index = $scope.birouri.indexOf(row.entity);
        $.ajax({
            type: "DELETE",
            url: "/CloudStorage/api/birouri/" + row.entity.Id,
        });
        $scope.gridOptions.selectItem(index, false);
        $scope.birouri.splice(index, 1);

    };
    $scope.addRow = function () {
        $scope.birouri.push({ Nume: '*' });
    };
    $scope.update = function (row) {
        $.ajax({
            type: "GET",
            async: false,
            url: "/CloudStorage/entitiesservice.svc/Sectii?$format=json&$filter=ServiciuId eq '" + $scope.birouri[row.rowIndex].ServiciuId + "'",
            success: function (data) {
                row.entity.sectii = data.d.results;
            }
        });
        if (!$scope.$$phase)
            $scope.$apply();
    }
}]);