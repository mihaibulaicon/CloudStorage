angular.module('CloudStorage').controller('utilizatori', ['$scope', function ($scope) {
    $scope.myData = [];
    $scope.ranks = [];
    $scope.birouri = [];
    $scope.refresh = function () {
        $.ajax({
            url: "/CloudStorage/api/utilizatori",
            dataType: 'json',
            async: false,
            success: function (data) {
                $scope.myData = data;
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
    }  
    $scope.refresh();
    $scope.gridOptions = {
        data: 'myData',
        enableCellSelection: true,
        enableRowSelection: false,
        enableCellEditOnFocus: true,
        columnDefs: [{
                        field: 'RankId',
                        displayName: 'Rank',
                        cellTemplate: ' <select ng-model="myData[ row.rowIndex ].RankId" ng-options="rank.Id as rank.Nume for rank in ranks"></select>',
                        enableCellEdit: false },
                     { field: 'Nume', displayName: 'Nume', enableCellEdit: true },
                     { field: 'Prenume', displayName: 'Prenume', enableCellEdit: true },
                     { field: 'Birou', displayName: 'Birou', enableCellEdit: true },
                     { field: 'EsteSef', displayName: 'Sef?', enableCellEdit: true },
                     { field: 'deleteButton', displayName: 'Sterge', width: 90, cellTemplate: '<button ng-click="removeRow(row)">Șterge</button>', enableCellEdit: false }]
    };
  
    $scope.SaveChanges= function () {
        $.ajax({
            type: "PUT",
            url: "/CloudStorage/api/utilizatori/",
            data: JSON.stringify($scope.myData),
            dataType: 'json',
            contentType: "application/json"
        });
        $.getJSON("/CloudStorage/api/utilizatori", function (data) {
            $scope.myData = data;
        });
    };
    $scope.removeRow = function (row) {
        var index = $scope.myData.indexOf(row.entity);
        $.ajax({
            type: "DELETE",
            url: "/CloudStorage/api/utilizatori/" + row.entity.Id,
        });
        $scope.gridOptions.selectItem(index, false);
        $scope.myData.splice(index, 1);
      
    };

    $scope.addRow = function () {
        $scope.myData.push({ Rank: '', Nume: '', Prenume:'',EsteSef: false });
    };
}]);


