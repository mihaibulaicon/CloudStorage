angular.module('CloudStorage').controller('utilizatori', ['$scope', function ($scope) {
    $scope.utilizatori = [];
    $scope.ranks = [];
    $scope.birouri = [];
    $scope.sectii = [];
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
            url: "/CloudStorage/api/birouri",
            dataType: 'json',
            async: false,
            success: function (data) {
                $scope.birouri = data;
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
        if (!$scope.$$phase)
            $scope.$apply();
    }  
    $scope.refresh();
    $scope.gridOptions = {
        data: 'utilizatori',
        enableCellSelection: true,
        enableRowSelection: false,
        enableCellEditOnFocus: true,
        columnDefs: [{
                        field: 'RankId',
                        displayName: 'Rank',
                        cellTemplate: ' <select ng-model="utilizatori[ row.rowIndex ].RankId" ng-options="rank.Id as rank.Nume for rank in ranks"></select>',
                        enableCellEdit: false },
                     { field: 'Nume', displayName: 'Nume', enableCellEdit: true },
                     { field: 'Prenume', displayName: 'Prenume', enableCellEdit: true },
                        {
                            field: 'SectieId',
                            displayName: 'Sectie',
                            cellTemplate: ' <select ng-model="utilizatori[ row.rowIndex ].SectieId" ng-options="sectie.Id as sectie.Nume for sectie in sectii" ng-change="update(row)"></select>',
                            enableCellEdit: false
                        },
                     {
                         field: 'BirouId',
                         displayName: 'Birou',
                         cellTemplate: ' <select ng-model="utilizatori[ row.rowIndex ].BirouId" ng-options="birou.Id as birou.Nume for birou in birouri"></select>',
                         enableCellEdit: false
                     },
                     { field: 'EsteSef', displayName: 'Sef?', enableCellEdit: true },
                     { field: 'deleteButton', displayName: 'Sterge', width: 90, cellTemplate: '<button ng-click="removeRow(row)">Șterge</button>', enableCellEdit: false }]
    };
  
    $scope.SaveChanges= function () {
        $.ajax({
            type: "PUT",
            url: "/CloudStorage/api/utilizatori/",
            data: JSON.stringify($scope.utilizatori),
            dataType: 'json',
            contentType: "application/json"
        });
        $.getJSON("/CloudStorage/api/utilizatori", function (data) {
            $scope.utilizatori = data;
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
        $scope.utilizatori.push({ Rank: '', Nume: '', Prenume:'',EsteSef: false });
    };
    $scope.update = function (row) {
        $.ajax({
            type: "GET",
            async:false,
            url: "/CloudStorage/entitiesservice.svc/Birouri?$format=json&$filter=SectieId eq '" + row.entity.SectieId + "'",
            success: function (data) {
                $scope.birouri = data.d.results;
            }
        });
        if (!$scope.$$phase)
            $scope.$apply();
    }
}]);


