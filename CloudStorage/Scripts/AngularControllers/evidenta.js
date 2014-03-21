angular.module('CloudStorage').controller('evidenta', ['$scope', '$filter', '$modal', function ($scope, $filter, $modal) {
    $scope.materiale = [];
    $scope.originalData = [];

    $scope.tipuristatii = [];
    $scope.subtipuristatii = [];
    $scope.firme = [];
    $scope.modele = [];

    $scope.servicii = [];
    $scope.sectii = [];
    $scope.birouri = [];
    $scope.utilizatori = [];

    $scope.localitati = [];
    $scope.locatii = [];
    $scope.cladiri = [];
    $scope.incaperi = [];

    $scope.niveleclasificare = [];
    $scope.clasificari = [];
    $scope.categorii = [];
    $scope.destinatii = [];
    $scope.unitatimasura = [];

    hgtOpts = { minHeight: 200 };

    $scope.dropdownRefresh = function () {
        angular.forEach($scope.materiale, function (material, index) {
            material.sectii = $filter('filter')($scope.sectii, { ServiciuId: material.ServiciuId }, true);
            material.birouri = $filter('filter')($scope.birouri, { SectieId: material.SectieId }, true);
            material.utilizatori = $filter('filter')($scope.utilizatori, { BirouId: material.BirouId }, true);
            material.locatii = $filter('filter')($scope.locatii, { LocalitateId: material.LocalitateId }, true);
            material.cladiri = $filter('filter')($scope.cladiri, { LocatieId: material.LocatieId }, true);
            material.incaperi = $filter('filter')($scope.incaperi, { CladireId: material.CladireId }, true);

            material.subtipuristatii = $filter('filter')($scope.subtipuristatii, { TipStatieId: material.TipStatieId }, true);
            material.modeleHDD = $filter('filter')($scope.modele, { FirmaId: material.FirmahddId }, true);
            material.modele = $filter('filter')($scope.modele, { FirmaId: material.FirmaId }, true);
           
        });
    }
    $scope.refresh = function () {
        $.ajax({
            url: "/CloudStorage/api/materiale",
            dataType: 'json',
            async: false,
            success: function (data) {
                $scope.materiale = data;
                $scope.originalData = JSON.parse(JSON.stringify($scope.materiale));
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
        $.ajax({
            url: "/CloudStorage/api/utilizatori",
            dataType: 'json',
            async: false,
            success: function (data) {
                $scope.utilizatori = data;
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
        $.ajax({
            url: "/CloudStorage/api/incaperi",
            dataType: 'json',
            async: false,
            success: function (data) {
                $scope.incaperi = data;
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
        $.ajax({
            url: "/CloudStorage/api/subtipuristatii",
            dataType: 'json',
            async: false,
            success: function (data) {
                $scope.subtipuristatii = data;
            }
        });
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


        $.ajax({
            url: "/CloudStorage/api/niveleclasificare",
            dataType: 'json',
            async: false,
            success: function (data) {
                $scope.niveleclasificare = data;
            }
        });
        $.ajax({
            url: "/CloudStorage/api/clasificari",
            dataType: 'json',
            async: false,
            success: function (data) {
                $scope.clasificari = data;
            }
        });
        $.ajax({
            url: "/CloudStorage/api/categorii",
            dataType: 'json',
            async: false,
            success: function (data) {
                $scope.categorii = data;
            }
        });
        $.ajax({
            url: "/CloudStorage/api/destinatii",
            dataType: 'json',
            async: false,
            success: function (data) {
                $scope.destinatii = data;
            }
        });
        $.ajax({
            url: "/CloudStorage/api/unitatimasura",
            dataType: 'json',
            async: false,
            success: function (data) {
                $scope.unitatimasura = data;
            }
        });


        $scope.dropdownRefresh();
        if (!$scope.$$phase)
            $scope.$apply();
    }
    $scope.refresh();


    $scope.filterOptions = {
        filterText: "",
        useExternalFilter: true
    };
    //$scope.totalServerItems = 0;
    //$scope.pagingOptions = {
    //    pageSizes: [15, 30, 50, 100],
    //    pageSize: 15,
    //    currentPage: 1
    //};
    //$scope.setPagingData = function (data, page, pageSize) {
    //    var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
    //    $scope.materiale = pagedData;
    //    $scope.totalServerItems = data.length;
    //    if (!$scope.$$phase) {
    //        $scope.$apply();
    //    }
    //};
    //$scope.getPagedData = function (pageSize, page) {
    //    setTimeout(function () {
    //          var data = $scope.originalData;
    //          $scope.setPagingData(data, page, pageSize);
    //    }, 100);
    //};

    //$scope.getPagedData($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

    //$scope.$watch('pagingOptions', function (newVal, oldVal) {
    //    if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
    //        $scope.getPagedData($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
    //    }
    //}, true);
    $scope.gridOptions = {
        data: 'materiale',
        enableCellSelection: true,
        enableRowSelection: false,
        enableCellEditOnFocus: true,
        enableColumnResize: true,
        multiSelect:true,
        showColumnMenu: true,
        plugins: [new ngGridFlexibleHeightPlugin(hgtOpts)],
        showFooter: true,
        //totalServerItems: 'totalServerItems',
        //pagingOptions: $scope.pagingOptions,
        columnDefs: [
                         { field: '', displayName: '', width: 30, cellTemplate: '<button class="detalii" ng-click="openDetalii(row)"><span class="glyphicon glyphicon-zoom-in"></button>', enableCellEdit: false },
                        {
                            field: 'Denumire', displayName: 'Denumire', enableCellEdit: true, width: 150,
                        },
                        {
                            field: 'TipStatieId',
                            displayName: 'Tip',
                            cellTemplate: ' <select ng-model="materiale[ row.rowIndex ].TipStatieId" ng-options="tipStatie.Id as tipStatie.Nume for tipStatie in tipuristatii" ng-change="updateSubtipuristatii(row)"></select>',
                            enableCellEdit: false,
                        },
                        {
                            field: 'SubTipStatieId',
                            displayName: 'Subtip',
                            cellTemplate: ' <select ng-model="materiale[ row.rowIndex ].SubTipStatieId" ng-options="subtipStatie.Id as subtipStatie.Nume for subtipStatie in materiale[ row.rowIndex ].subtipuristatii"></select>',
                            enableCellEdit: false,
                            visible: false,
                        },
                        {
                            field: 'FirmaId',
                            displayName: 'Firma',
                            cellTemplate: ' <select ng-model="materiale[ row.rowIndex ].FirmaId" ng-options="firma.Id as firma.Nume for firma in firme" ng-change="updateModele(row)"></select>',
                            enableCellEdit: false,
                            visible:false
                        },
                        {
                            field: 'ModelId',
                            displayName: 'Model',
                            cellTemplate: ' <select ng-model="materiale[ row.rowIndex ].ModelId" ng-options="model.Id as model.Nume for model in materiale[ row.rowIndex ].modele"></select>',
                            enableCellEdit: false,
                            visible: false
                        },
                            {
                                field: 'UnitateMasuraId',
                                displayName: 'UM',
                                cellTemplate: ' <select ng-model="materiale[ row.rowIndex ].UnitateMasuraId" ng-options="unitatemasura.Id as unitatemasura.Nume for unitatemasura in unitatimasura"></select>',
                                enableCellEdit: false,
                                visible: false
                            },
                    {
                        field: 'NumarInventar', displayName: 'Nr. inv.', enableCellEdit: true
                    },
                      {
                          field: 'ClasificareId',
                          displayName: 'Clasificare',
                          cellTemplate: ' <select ng-model="materiale[ row.rowIndex ].ClasificareId" ng-options="clasificare.Id as clasificare.Nume for clasificare in clasificari"></select>',
                          enableCellEdit: false,
                      },
                       {
                           field: 'Serie', displayName: 'Serie', enableCellEdit: true
                       },
                        {
                            field: 'DenumireRetea', displayName: 'Nume retea', enableCellEdit: true, visible: false
                        },
                         {
                             field: 'NumarDS', displayName: 'Nr. DS', enableCellEdit: true
                         },
                           {
                               field: 'NivelClasificareId',
                               displayName: 'Clasificare',
                               cellTemplate: ' <select ng-model="materiale[ row.rowIndex ].NivelClasificareId" ng-options="nivelclasificare.Id as nivelclasificare.Nume for nivelclasificare in niveleclasificare"></select>',
                               enableCellEdit: false,
                           },
                        {
                                field: 'FirmahddId',
                                displayName: 'Firma HDD',
                                cellTemplate: ' <select ng-model="materiale[ row.rowIndex ].FirmahddId" ng-options="firmaHDD.Id as firmaHDD.Nume for firmaHDD in firme" ng-change="updateModeleHDD(row)"></select>',
                                enableCellEdit: false,
                                visible: false
                            },
                        {
                            field: 'ModelHDDId',
                            displayName: 'Model HDD',
                            cellTemplate: ' <select ng-model="materiale[ row.rowIndex ].ModelHDDId" ng-options="modelHDD.Id as modelHDD.Nume for modelHDD in materiale[ row.rowIndex ].modeleHDD"></select>',
                            enableCellEdit: false,
                            visible: false
                        },
                          {
                              field: 'SeriaHDD', displayName: 'Serie HDD', enableCellEdit: true
                          },
                         {
                             field: 'CapacitateHDD', displayName: 'Capacitate HDD', enableCellEdit: true
                         },
                     {
                         field: 'Serviciu',
                         displayName: 'Serviciu',
                         cellTemplate: ' <select ng-model="materiale[ row.rowIndex ].ServiciuId" ng-options="serviciu.Id as serviciu.Nume for serviciu in servicii" ng-change="updateSectii(row)"></select>',
                         enableCellEdit: false,
                     },
                        {
                            field: 'SectieId',
                            displayName: 'Sectie',
                            cellTemplate: ' <select ng-model="materiale[ row.rowIndex ].SectieId" ng-options="sectie.Id as sectie.Nume for sectie in materiale[ row.rowIndex ].sectii" ng-change="updateBirouri(row)"></select>',
                            enableCellEdit: false,
                        },
                     {
                         field: 'BirouId',
                         displayName: 'Birou',
                         cellTemplate: ' <select ng-model="materiale[ row.rowIndex ].BirouId" ng-options="birou.Id as birou.Nume for birou in materiale[ row.rowIndex ].birouri" ng-change = "updateUtilizatori(row)"></select>',
                         enableCellEdit: false,
                     },
                       {
                           field: 'UtilizatorId',
                           displayName: 'Utilizator',
                           cellTemplate: ' <select ng-model="materiale[ row.rowIndex ].UtilizatorId" ng-options="utilizator.Id as utilizator.Nume +\' \'+ utilizator.Prenume for utilizator in materiale[ row.rowIndex ].utilizatori"></select>',
                           enableCellEdit: false,
                       },
                        {
                            field: 'LocalitateId',
                            displayName: 'Localitate',
                            cellTemplate: ' <select ng-model="materiale[ row.rowIndex ].LocalitateId" ng-options="Localitate.Id as Localitate.Nume for Localitate in localitati" ng-change="updateLocatii(row)"></select>',
                            enableCellEdit: false,
                        },
                        {
                            field: 'LocatieId',
                            displayName: 'Locatie',
                            cellTemplate: ' <select ng-model="materiale[ row.rowIndex ].LocatieId" ng-options="Locatie.Id as Locatie.Nume for Locatie in materiale[ row.rowIndex ].locatii" ng-change="updateCladiri(row)"></select>',
                            enableCellEdit: false,
                            visible: false
                        },
                     {
                         field: 'CladireId',
                         displayName: 'Cladire',
                         cellTemplate: ' <select ng-model="materiale[ row.rowIndex ].CladireId" ng-options="Cladire.Id as Cladire.Nume for Cladire in materiale[ row.rowIndex ].cladiri" ng-change = "updateIncaperi(row)"></select>',
                         enableCellEdit: false,
                         visible: false
                     },
                       {
                           field: 'IncapereId',
                           displayName: 'Incapere',
                           cellTemplate: ' <select ng-model="materiale[ row.rowIndex ].IncapereId" ng-options="Incapere.Id as Incapere.Nume for Incapere in materiale[ row.rowIndex ].incaperi"></select>',
                           enableCellEdit: false,
                           visible: false
                       },
                        {
                            field: 'DestinatieId',
                            displayName: 'Destinatie',
                            cellTemplate: ' <select ng-model="materiale[ row.rowIndex ].DestinatieId" ng-options="destinatie.Id as destinatie.Nume for destinatie in destinatii"></select>',
                            enableCellEdit: false,
                        },
                         {
                             field: 'Observatii', displayName: 'Observatii', enableCellEdit: true, visible: false
                         },
                         {
                             field: 'CategorieId',
                             displayName: 'Categorie',
                             cellTemplate: ' <select ng-model="materiale[ row.rowIndex ].CategorieId" ng-options="Categorie.Id as Categorie.Nume for Categorie in categorii"></select>',
                             enableCellEdit: false,
                         },
                          {
                              field: 'Cantitate', displayName: 'Cantitate', enableCellEdit: true, visible: false
                          },
                          {
                              field: 'Telefon', displayName: 'Telefon', enableCellEdit: true, visible: false
                          },
                     { field: '', displayName: '', width: 30, cellTemplate: '<button ng-click="removeRow(row)"><span class="glyphicon glyphicon-remove"></button>', enableCellEdit: false }]
    };

    $scope.SaveChanges = function () {
        $.ajax({
            type: "PUT",
            url: "/CloudStorage/api/materiale/",
            data: JSON.stringify($scope.materiale),
            dataType: 'json',
            contentType: "application/json"
        });

    };
    $scope.removeRow = function (row) {
        var index = $scope.materiale.indexOf(row.entity);
        $.ajax({
            type: "DELETE",
            url: "/CloudStorage/api/materiale/" + row.entity.Id,
        });
        $scope.gridOptions.selectItem(index, false);
        $scope.materiale.splice(index, 1);

    };
    $scope.addRow = function () {
        $scope.materiale.push({ Denumire: '*' });
        $scope.originalData = JSON.parse(JSON.stringify($scope.materiale));
    };
    $scope.updateSectii = function (row) {
        row.entity.sectii = $filter('filter')($scope.sectii, { ServiciuId: $scope.materiale[row.rowIndex].ServiciuId }, true);
        row.entity.birouri = [];
        row.entity.utilizatori = [];
        if (!$scope.$$phase)
            $scope.$apply();
    }
    $scope.updateBirouri = function (row) {
        row.entity.birouri = $filter('filter')($scope.birouri, { SectieId: $scope.materiale[row.rowIndex].SectieId }, true);
        row.entity.utilizatori = [];
        if (!$scope.$$phase)
            $scope.$apply();
    }
    $scope.updateUtilizatori = function (row) {
        row.entity.utilizatori = $filter('filter')($scope.utilizatori, { BirouId: $scope.materiale[row.rowIndex].BirouId }, true);
        if (!$scope.$$phase)
            $scope.$apply();
    }
    $scope.updateLocatii = function (row) {
        row.entity.locatii = $filter('filter')($scope.locatii, { LocalitateId: $scope.materiale[row.rowIndex].LocalitateId }, true);
        row.entity.cladiri = [];
        row.entity.incaperi = [];
        if (!$scope.$$phase)
            $scope.$apply();
    }
    $scope.updateCladiri = function (row) {
        row.entity.cladiri = $filter('filter')($scope.cladiri, { LocatieId: $scope.materiale[row.rowIndex].LocatieId }, true);
        row.entity.incaperi = [];
        if (!$scope.$$phase)
            $scope.$apply();
    }
    $scope.updateIncaperi = function (row) {
        row.entity.incaperi = $filter('filter')($scope.incaperi, { CladireId: $scope.materiale[row.rowIndex].CladireId }, true);
        if (!$scope.$$phase)
            $scope.$apply();
    }

    $scope.updateSubtipuristatii = function (row) {
        row.entity.subtipuristatii = $filter('filter')($scope.subtipuristatii, { TipStatieId: $scope.materiale[row.rowIndex].TipStatieId }, true);
        if (!$scope.$$phase)
            $scope.$apply();
    }
    $scope.updateModele = function (row) {
        row.entity.modele = $filter('filter')($scope.modele, { FirmaId: $scope.materiale[row.rowIndex].FirmaId }, true);
        if (!$scope.$$phase)
            $scope.$apply();
    }
    $scope.updateModeleHDD = function (row) {
        row.entity.modeleHDD = $filter('filter')($scope.modele, { FirmaId: $scope.materiale[row.rowIndex].FirmahddId }, true);
        if (!$scope.$$phase)
            $scope.$apply();
    }
    $scope.open = function () {
        var modalInstance = $modal.open({
            templateUrl: 'detalii',
            controller: ModalInstanceCtrl,
            resolve: {
                materialeScope: function () {
                    return $scope;
                }
            }
        });
    };
    $scope.openDetalii = function (row) {
        var modalInstance = $modal.open({
            templateUrl: 'detalii',
            controller: ModalDetalii,
            resolve: {
                material: function () {
                    return $scope.materiale[row.rowIndex];
                },
                materialeScope: function () {
                    return $scope;
                }
            }
        });
    };
    $scope.Export = function () {
        var array = typeof $scope.materiale != 'object' ? JSON.parse($scope.materiale) : $scope.materiale;

        var str = '';

        for (var i = 0; i < array.length; i++) {
            var line = '';

            for (var index in array[i]) {
                line += array[i][index] + ',';
            }
            line.slice(0, line.Length - 1);

            str += line + '\r\n';
        }
        var csvDataLinkHtml = "data:text/csv;charset=UTF-8,";
        csvDataLinkHtml += encodeURIComponent(str);

        var link = document.createElement("a");
        link.setAttribute("href", csvDataLinkHtml);
        link.setAttribute("download", "Export.csv");
        link.click();
    }
}]);

var ModalInstanceCtrl = function ($scope, $filter, $modalInstance, materialeScope) {
    $scope.materialeScope = materialeScope;
    materialeScope.materiale = materialeScope.originalData;
    $scope.material = {};
    $scope.ok = function () {
        materialeScope.materiale = $filter('filter')(materialeScope.materiale, { Denumire: $scope.material.Denumire }, false);


        if ($scope.material.TipStatieId != 'undefined')
            materialeScope.materiale = $filter('filter')(materialeScope.materiale, { TipStatieId: $scope.material.TipStatieId }, true);
        if ($scope.material.SubTipStatieId != 'undefined')
            materialeScope.materiale = $filter('filter')(materialeScope.materiale, { SubTipStatieId: $scope.material.SubTipStatieId }, true);

        if ($scope.material.FirmaId != 'undefined')
            materialeScope.materiale = $filter('filter')(materialeScope.materiale, { FirmaId: $scope.material.FirmaId }, true);
        if ($scope.material.ModelId != 'undefined')
            materialeScope.materiale = $filter('filter')(materialeScope.materiale, { ModelId: $scope.material.ModelId }, true);
        if ($scope.material.UnitateMasuraId != 'undefined')
            materialeScope.materiale = $filter('filter')(materialeScope.materiale, { UnitateMasuraId: $scope.material.UnitateMasuraId }, true);

        materialeScope.materiale = $filter('filter')(materialeScope.materiale, { NumarInventar: $scope.material.NumarInventar }, false);

        if ($scope.material.ClasificareId != 'undefined')
            materialeScope.materiale = $filter('filter')(materialeScope.materiale, { ClasificareId: $scope.material.ClasificareId }, true);

        materialeScope.materiale = $filter('filter')(materialeScope.materiale, { Serie: $scope.material.Serie }, false);
        materialeScope.materiale = $filter('filter')(materialeScope.materiale, { DenumireRetea: $scope.material.DenumireRetea }, false);
        materialeScope.materiale = $filter('filter')(materialeScope.materiale, { NumarDS: $scope.material.NumarDS }, false);

        if ($scope.material.NivelClasificareId != 'undefined')
            materialeScope.materiale = $filter('filter')(materialeScope.materiale, { NivelClasificareId: $scope.material.NivelClasificareId }, true);
        if ($scope.material.FirmahddId != 'undefined')
            materialeScope.materiale = $filter('filter')(materialeScope.materiale, { FirmahddId: $scope.material.FirmahddId }, true);
        if ($scope.material.ModelHDDId != 'undefined')
            materialeScope.materiale = $filter('filter')(materialeScope.materiale, { ModelHDDId: $scope.material.ModelHDDId }, true);

        materialeScope.materiale = $filter('filter')(materialeScope.materiale, { SeriaHDD: $scope.material.SeriaHDD }, false);
        materialeScope.materiale = $filter('filter')(materialeScope.materiale, { CapacitateHDD: $scope.material.CapacitateHDD }, false);

        if ($scope.material.ServiciuId != 'undefined')
            materialeScope.materiale = $filter('filter')(materialeScope.materiale, { ServiciuId: $scope.material.ServiciuId }, true);
        if ($scope.material.SectieId != 'undefined')
            materialeScope.materiale = $filter('filter')(materialeScope.materiale, { SectieId: $scope.material.SectieId }, true);
        if ($scope.material.BirouId != 'undefined')
            materialeScope.materiale = $filter('filter')(materialeScope.materiale, { BirouId: $scope.material.BirouId }, true);
        if ($scope.material.UtilizatorId != 'undefined')
            materialeScope.materiale = $filter('filter')(materialeScope.materiale, { UtilizatorId: $scope.material.UtilizatorId }, true);
 
        if ($scope.material.LocalitateId != 'undefined')
            materialeScope.materiale = $filter('filter')(materialeScope.materiale, { LocalitateId: $scope.material.LocalitateId }, true);
        if ($scope.material.LocatieId != 'undefined')
            materialeScope.materiale = $filter('filter')(materialeScope.materiale, { LocatieId: $scope.material.LocatieId }, true);
        if ($scope.material.CladireId != 'undefined')
            materialeScope.materiale = $filter('filter')(materialeScope.materiale, { CladireId: $scope.material.CladireId }, true);
        if ($scope.material.IncapereId != 'undefined')
            materialeScope.materiale = $filter('filter')(materialeScope.materiale, { IncapereId: $scope.material.IncapereId }, true);


        if ($scope.material.DestinatieId != 'undefined')
            materialeScope.materiale = $filter('filter')(materialeScope.materiale, { DestinatieId: $scope.material.DestinatieId }, true);

        materialeScope.materiale = $filter('filter')(materialeScope.materiale, { Observatii: $scope.material.Observatii }, false);

        if ($scope.material.CategorieId != 'undefined')
            materialeScope.materiale = $filter('filter')(materialeScope.materiale, { CategorieId: $scope.material.CategorieId }, true);

        materialeScope.materiale = $filter('filter')(materialeScope.materiale, { Cantitate: $scope.material.Cantitate }, false);
        materialeScope.materiale = $filter('filter')(materialeScope.materiale, { Telefon: $scope.material.Telefon }, false);


        $modalInstance.close();
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
    $scope.updateSectii = function (row) {
        $scope.material.sectii = $filter('filter')($scope.materialeScope.sectii, { ServiciuId: $scope.material.ServiciuId }, true);
        $scope.material.birouri = [];
        $scope.material.utilizatori = [];
        if (!$scope.$$phase)
            $scope.$apply();
    }
    $scope.updateBirouri = function (row) {
        $scope.material.birouri = $filter('filter')($scope.materialeScope.birouri, { SectieId: $scope.material.SectieId }, true);
        $scope.material.utilizatori = [];
        if (!$scope.$$phase)
            $scope.$apply();
    }
    $scope.updateUtilizatori = function (row) {
        $scope.material.utilizatori = $filter('filter')($scope.materialeScope.utilizatori, { BirouId: $scope.material.BirouId }, true);
        if (!$scope.$$phase)
            $scope.$apply();
    }
    $scope.updateLocatii = function (row) {
        $scope.material.locatii = $filter('filter')($scope.materialeScope.locatii, { LocalitateId: $scope.material.LocalitateId }, true);
        $scope.material.cladiri = [];
        $scope.material.incaperi = [];
        if (!$scope.$$phase)
            $scope.$apply();
    }
    $scope.updateCladiri = function (row) {
        $scope.material.cladiri = $filter('filter')($scope.materialeScope.cladiri, { LocatieId: $scope.material.LocatieId }, true);
        $scope.material.incaperi = [];
        if (!$scope.$$phase)
            $scope.$apply();
    }
    $scope.updateIncaperi = function (row) {
        $scope.material.incaperi = $filter('filter')($scope.materialeScope.incaperi, { CladireId: $scope.material.CladireId }, true);
        if (!$scope.$$phase)
            $scope.$apply();
    }

    $scope.updateSubtipuristatii = function (row) {
        $scope.material.subtipuristatii = $filter('filter')($scope.materialeScope.subtipuristatii, { TipStatieId: $scope.material.TipStatieId }, true);
        if (!$scope.$$phase)
            $scope.$apply();
    }
    $scope.updateModele = function (row) {
        $scope.material.modele = $filter('filter')($scope.materialeScope.modele, { FirmaId: $scope.material.FirmaId }, true);
        if (!$scope.$$phase)
            $scope.$apply();
    }
    $scope.updateModeleHDD = function (row) {
        $scope.material.modeleHDD = $filter('filter')($scope.materialeScope.modele, { FirmaId: $scope.material.FirmahddId }, true);
        if (!$scope.$$phase)
            $scope.$apply();
    }
};
var ModalDetalii = function ($scope, $filter, $modalInstance, material, materialeScope) {
    $scope.material = material;
    $scope.materialeScope = materialeScope;
    $scope.ok = function () {
        $modalInstance.close();
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.updateSectii = function (row) {
        $scope.material.sectii = $filter('filter')($scope.materialeScope.sectii, { ServiciuId: $scope.material.ServiciuId }, true);
        $scope.material.birouri = [];
        $scope.material.utilizatori = [];
        if (!$scope.$$phase)
            $scope.$apply();
    }
    $scope.updateBirouri = function (row) {
        $scope.material.birouri = $filter('filter')($scope.materialeScope.birouri, { SectieId: $scope.material.SectieId }, true);
        $scope.material.utilizatori = [];
        if (!$scope.$$phase)
            $scope.$apply();
    }
    $scope.updateUtilizatori = function (row) {
        $scope.material.utilizatori = $filter('filter')($scope.materialeScope.utilizatori, { BirouId: $scope.material.BirouId }, true);
        if (!$scope.$$phase)
            $scope.$apply();
    }
    $scope.updateLocatii = function (row) {
        $scope.material.locatii = $filter('filter')($scope.materialeScope.locatii, { LocalitateId: $scope.material.LocalitateId }, true);
        $scope.material.cladiri = [];
        $scope.material.incaperi = [];
        if (!$scope.$$phase)
            $scope.$apply();
    }
    $scope.updateCladiri = function (row) {
        $scope.material.cladiri = $filter('filter')($scope.materialeScope.cladiri, { LocatieId: $scope.material.LocatieId }, true);
        $scope.material.incaperi = [];
        if (!$scope.$$phase)
            $scope.$apply();
    }
    $scope.updateIncaperi = function (row) {
        $scope.material.incaperi = $filter('filter')($scope.materialeScope.incaperi, { CladireId: $scope.material.CladireId }, true);
        if (!$scope.$$phase)
            $scope.$apply();
    }

    $scope.updateSubtipuristatii = function (row) {
        $scope.material.subtipuristatii = $filter('filter')($scope.materialeScope.subtipuristatii, { TipStatieId: $scope.material.TipStatieId }, true);
        if (!$scope.$$phase)
            $scope.$apply();
    }
    $scope.updateModele = function (row) {
        $scope.material.modele = $filter('filter')($scope.materialeScope.modele, { FirmaId: $scope.material.FirmaId }, true);
        if (!$scope.$$phase)
            $scope.$apply();
    }
    $scope.updateModeleHDD = function (row) {
        $scope.material.modeleHDD = $filter('filter')($scope.materialeScope.modele, { FirmaId: $scope.material.FirmahddId }, true);
        if (!$scope.$$phase)
            $scope.$apply();
    }
};






//$scope.$watch('gridOptions.$gridScope.filterText', function (newVal, oldVal) {
//    if (newVal !== oldVal) {
//        if ($scope.gridOptions.$gridScope.filterText.indexOf(':') != -1)
//        {
//            var res = $scope.gridOptions.$gridScope.filterText.split(':');
//            var field = res[0];
//            var filter = res[1];

//            var fieldWithName = field + 'Nume';
//            if ($scope.originalData[0].hasOwnProperty(fieldWithName))
//                $scope.materiale = $filter('filter')($scope.originalData, JSON.parse('{"' + fieldWithName + '":"' + filter + '"}'), false);
//            else
//                $scope.materiale = $filter('filter')($scope.originalData, JSON.parse('{"'+field+'":"'+filter+'"}'), false);
//        }
//    }
//}, true);