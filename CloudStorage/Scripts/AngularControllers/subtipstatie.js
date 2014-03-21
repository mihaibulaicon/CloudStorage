angular.module('CloudStorage').controller('subtipstatie', ['$scope', function ($scope) {
    $scope.subtipuristatii = [];
    $scope.tipuristatii = [];
    $scope.refresh = function () {
        $.ajax({
            url: "/CloudStorage/api/subtipuristatii",
            dataType: 'json',
            async: false,
            success: function (data) {
                $scope.subtipuristatii = data;
            }
        });
        $.ajax({
            url: "/CloudStorage/api/tipuristatii",
            dataType: 'json',
            async: false,
            success: function (data) {
                $scope.tipuristatii = data;
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
        data: 'subtipuristatii',
        enableCellSelection: true,
        enableRowSelection: false,
        enableCellEditOnFocus: true,
        columnDefs: [{ field: 'Nume', displayName: 'Nume', enableCellEdit: true },
                        {
                            field: 'TipStatieId',
                            displayName: 'Tip stație',
                            cellTemplate: ' <select ng-model="subtipuristatii[row.rowIndex].TipStatieId" ng-options="tipstatie.Id as tipstatie.Nume for tipstatie in tipuristatii"></select>',
                            enableCellEdit: false
                        },
                       { field: '', displayName: '', width: 30, cellTemplate: '<button ng-click="removeRow(row)"><span class="glyphicon glyphicon-remove"></button>', enableCellEdit: false }]
    };


    $scope.SaveChanges = function () {
        $.ajax({
            type: "PUT",
            url: "/CloudStorage/api/subtipuristatii/",
            data: JSON.stringify($scope.subtipuristatii),
            dataType: 'json',
            contentType: "application/json"
        });

    };
    $scope.removeRow = function (row) {
        var index = $scope.subtipuristatii.indexOf(row.entity);
        $.ajax({
            type: "DELETE",
            url: "/CloudStorage/api/subtipuristatii/" + row.entity.Id,
        });
        $scope.gridOptions.selectItem(index, false);
        $scope.subtipuristatii.splice(index, 1);

    };
    $scope.addRow = function () {
        $scope.subtipuristatii.push({ Nume: '*' });
    };
}]);