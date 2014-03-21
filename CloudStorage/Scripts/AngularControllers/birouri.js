angular.module('CloudStorage').controller('birouri', ['$scope', '$filter', function ($scope, $filter) {
    $scope.birouri = [];
    $scope.servicii = [];
    $scope.toateSectiile = [];
    $scope.dropdownRefresh = function () {
        angular.forEach($scope.birouri, function (birou, index) {
            //$.ajax({
            //    type: "GET",
            //    async: false,
            //    url: "/CloudStorage/entitiesservice.svc/Sectii?$format=json&$filter=ServiciuId eq '" + birou.ServiciuId + "'",
            //    success: function (data) {
            //        birou.sectii = data.d.results;
            //    }
            //});
            birou.sectii = $filter('filter')($scope.toateSectiile, {ServiciuId : birou.ServiciuId},true);
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
        $.ajax({
            url: "/CloudStorage/api/sectii",
            dataType: 'json',
            async: false,
            success: function (data) {
                $scope.toateSectiile = data;
            }
        });
        $scope.dropdownRefresh();
        if(!$scope.$$phase)
         $scope.$apply();
    }

    $scope.refresh();
  
    hgtOpts = { minHeight: 200 };
    $scope.gridOptions = {
        plugins: [new ngGridFlexibleHeightPlugin(hgtOpts)],
        showFooter: true,
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
                       { field: '', displayName: '', width: 30, cellTemplate: '<button ng-click="removeRow(row)"><span class="glyphicon glyphicon-remove"></button>', enableCellEdit: false }]
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
        row.entity.sectii = $filter('filter')($scope.toateSectiile, { ServiciuId: $scope.birouri[row.rowIndex].ServiciuId },true);
        if (!$scope.$$phase)
            $scope.$apply();
    }
}]);