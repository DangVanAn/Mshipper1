angular.module('mShipperApp').
component('vehiclesShow',{
    templateUrl: './Vehicles/Show.html',
    controller: function DsDonHangController($rootScope, $scope, $http, ngDialog, $filter,$location, $timeout, NgTableParams){

        $(document).ready(function () {
        });

        $scope.vehicles = [];
        $scope.multiDriverData = [];
        $scope.selectedDriverData = [];
        $scope.multiSelectSettings = {
            showCheckAll: false,
            showUncheckAll: false,
            styleActive: true,
            enableSearch: true,
            keyboardControls: true,
            selectionLimit: 3,
            smartButtonMaxItems: 1,
            smartButtonTextConverter: function (itemText, originalItem) {
                if (itemText === 'Jhon') {
                    return 'Jhonny!';
                }
                return itemText;
            }
        };
        $scope.multiSelectCustomTexts = {buttonDefaultText: 'Chọn Tài Xế'};
        downloadDriver();
        function getVehicles() {
            $scope.vehicles = [];
            var data = {
                _owner : $rootScope.globals.currentUser.id_delivery_manager
            };

            $url = $rootScope.api_url.getVehicleByOwner;

            httpPost($http, $url, data,
                function (response) {
                    for (var i = 0; i < response.data.length; i++) {
                        $scope.vehicles.push(response.data[i]);
                        $scope.vehicles[$scope.vehicles.length - 1].stt = $scope.vehicles.length;
                    }

                    console.log('47');
                    console.log($scope.vehicles);

                    $scope.tableParams = new NgTableParams({}, {
                        filterDelay: 0,
                        dataset: angular.copy($scope.vehicles)
                    });


                }, function (response) {
                    $scope.statustext = 'error';
                });
        };

        function setSelectedDriver(data) {
            var selectedDriver = [];
            var listDriver = data._id_driver.split('-');
            if(listDriver.length > 0){
                console.log('62', 'lon hon roi', listDriver.length);
                for(var i = 1; i < listDriver.length; i++)
                {
                    for(var j = 0; j < $scope.multiDriverData.length; j++)
                    {
                        console.log('67', listDriver[i], $scope.multiDriverData[j].id);
                        if(listDriver[i] == $scope.multiDriverData[j].id){
                            console.log('69');
                            selectedDriver.push($scope.multiDriverData[j]);
                        }
                    }
                }
            }

            return selectedDriver;
        }

        function downloadDriver() {
            $urll = 'http://localhost:9999/users/getbypermissionandidmanager';

            $http({
                method: 'POST',
                url: $urll,
                headers: {'Content-Type': 'application/json'},
                data: {
                    _permission_id: 'C002',
                    _id_delivery_manager: $rootScope.globals.currentUser.id_delivery_manager
                }
            }).then(function successCallback(response) {
                console.log(response.data);
                $scope.listDriver = response.data;
                for (var i = 0; i < $scope.listDriver.length; i++) {
                    $scope.listDriver[i].drag = true;
                    var data = {id: $scope.listDriver[i]._id, label: $scope.listDriver[i]._name, phone: $scope.listDriver[i]._phone};
                    $scope.multiDriverData.push(data);
                }

                console.log('102', $scope.multiDriverData);

                getVehicles();
            }, function errorCallback(response) {
                $scope.statustext = 'error';
            });
        };

        ///////////////////////////////////////////////////////////////////////////////////
        $scope.cancel = cancel;
        $scope.del = del;
        $scope.save = save;
        $scope.edit = edit;

        //////////

        function cancel(row, rowForm) {
            $scope.tableParams.settings().dataset[tempIndex] = tempRow;
            reloadTable();
        }

        function del(row) {
            var index = $scope.tableParams.settings().dataset.indexOf(row);
            if(index > -1)
            {
                var $urll = $rootScope.api_url.postVehicleRemove;
                $http({
                    method: 'POST',
                    url: $urll,
                    headers: {'Content-Type': 'application/json'},
                    data: row
                }).then(function successCallback(response) {
                    if(response.data == 'removed'){
                        $scope.tableParams.settings().dataset.splice(index, 1);
                        reloadTable();
                    }
                    else{
                        $scope.show = response.data;
                        iAlert(ngDialog, $scope);
                    }

                }, function errorCallback(response) {
                    $scope.statustext = 'error';
                });
            }
        }

        function save(row, rowForm) {
            row.isEditing = false;

            console.log($scope.selectedDriverData);
            console.log($scope.multiDriverData);

            var data = {
                _id: row._id,
                _name: row._name,
                _number_plate: row._number_plate,
                _owner: row._owner,
                _weigh: row._weigh,
                _volume: row._volume,
                _name_driver : '',
                _id_driver : '',
                _note: row._note,
                _is_enabled: true,
            };

            for(var i = 0; i < $scope.selectedDriverData.length; i++){
                data._name_driver += "-" + $scope.selectedDriverData[i].label;
                data._id_driver += "-" + $scope.selectedDriverData[i].id;
            }

            $url = $rootScope.api_url.postVehicleUpdate;

            httpPost($http, $url, data,
                function (response) {
                    if(response.data == 'updated'){
                        row._name_driver = data._name_driver;
                        row._id_driver = data._id_driver;
                        reloadTable();
                    }
                    else{
                        $scope.tableParams.settings().dataset[tempIndex] = tempRow;
                        reloadTable();
                        $scope.show = response.data;
                        iAlert(ngDialog, $scope);
                    }
                }, function (response) {
                    $scope.statustext = 'error';
                });
        }

        var tempRow = {};
        var tempIndex = -1;
        function edit(row, rowForm) {
            var boolEdit = false;
            for(var i = 0;i < $scope.tableParams.settings().dataset.length; i++)
            {
                if($scope.tableParams.settings().dataset[i].isEditing === true){
                    boolEdit = true;
                    break;
                }
            }
            if(!boolEdit){
                row.isEditing = true;
                tempRow = JSON.parse(JSON.stringify(row));
                tempRow.isEditing = false;
                tempIndex = $scope.tableParams.settings().dataset.indexOf(row);

                $scope.selectedDriverData = setSelectedDriver(row);
                console.log('190', $scope.selectedDriverData);
            }
        }

        function reloadTable() {
            $scope.tableParams.reload().then(function(data) {
                if (data.length === 0 && $scope.tableParams.total() > 0) {
                    $scope.tableParams.page($scope.tableParams.page() - 1);
                    $scope.tableParams.reload();
                }
            });
        }
        ///////////////////////////////////////////////////////////////////////////////////

    }
});