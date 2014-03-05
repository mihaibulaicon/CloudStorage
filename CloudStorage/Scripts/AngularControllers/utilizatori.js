var app = angular.module('CloudStorage', ['ngGrid']);

app.controller('utilizatori', function ($scope) {
    $scope.myData = [];
    $scope.ranks = [];
    $scope.refresh = function () {
        $.getJSON("http://localhost/CloudStorage/api/utilizatori", function (data) {
            $scope.myData = data;
        });
        $.getJSON("http://localhost/CloudStorage/api/ranks", function (data) {
            $scope.ranks = data;
        });
    }
    $.ajax({ async: false })
    $scope.refresh();
    $.ajax({ async: true })
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
        $.getJSON("http://localhost/CloudStorage/api/utilizatori", function (data) {
            $scope.myData = data;
        });
    };
    $scope.removeRow = function (row) {
        var index = $scope.myData.indexOf(row.entity);
        $.ajax({
            type: "DELETE",
            url: "/CloudStorage/api/utilizatori/" + $scope.myData[index].Id,
        });
        $scope.gridOptions.selectItem(index, false);
        $scope.myData.splice(index, 1);
      
    };

    $scope.addRow = function () {
        $scope.myData.push({ Rank: 'Empty', Nume: 'mihai', Prenume:'mihai',EsteSef: false });
    };
});


app.controller('ranks', function ($scope) {
    $scope.myData = [];
    $scope.refresh = function () {
        $.getJSON("http://localhost/CloudStorage/api/ranks", function (data) {
            $scope.myData = data;
        });
    }
    $.ajax({ async: false })
    $scope.refresh();
    $.ajax({ async: true })
    $scope.gridOptions = {
        data: 'myData',
        enableCellSelection: true,
        enableRowSelection: false,
        enableCellEditOnFocus: true,
        columnDefs: [{ field: 'Nume', displayName: 'Nume', enableCellEdit: true },
                     { field: 'deleteButton', displayName: 'Sterge', width: 90, cellTemplate: '<button ng-click="removeRow(row)">Șterge</button>', enableCellEdit: false }]
    };

    
    $scope.SaveChanges = function () {
        $.ajax({
            type: "PUT",
            url: "/CloudStorage/api/ranks/",
            data: JSON.stringify($scope.myData),
            dataType: 'json',
            contentType: "application/json"
        });
        $.getJSON("http://localhost/CloudStorage/api/ranks", function (data) {
            $scope.myData = data;
        });
    };
    $scope.removeRow = function (row) {
        var index = $scope.myData.indexOf(row.entity);
        $.ajax({
            type: "DELETE",
            url: "/CloudStorage/api/ranks/" + $scope.myData[index].Id,
        });
        $scope.gridOptions.selectItem(index, false);
        $scope.myData.splice(index, 1);
      
    };
    $scope.addRow = function () {
        $scope.myData.push({ Nume: 'programmer' });
    };
});