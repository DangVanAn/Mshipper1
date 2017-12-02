angular.module('mShipperApp')
    .component('preOrderSumShow', {
        templateUrl: './Orders/Pre.Sum.Show.html',
        controller: function DsDonHangController($rootScope, $scope, $http, $filter, ngDialog, $location, $timeout, $parse, modalOrderCreate, NgMap, NgTableParams, $compile, $q) {
            $(document).ready(function () {
                init();
            });

            $scope.listPreOrderSum = [];
            $scope.listPreOrderSumConfirm = [];
            var dataTableVerifyRequest = [];

            function init() {
                var data = {_id: 'xxxx'};
                $urll = $rootScope.api_url.getPreOrderSumShow;
                $http({
                    method: 'POST',
                    url: $urll,
                    headers: {'Content-Type': 'application/json'},
                    data: data
                }).then(function successCallback(response) {

                    console.log($rootScope.globals.currentUser);
                    console.log(response.data);
                    if ($rootScope.globals.currentUser.permission === 'C001') {
                        //chỉ hiển thị những phần cho nhà vận tải thôi.
                        for (var i = 0; i < response.data.length; i++) {
                            console.log('26', response.data[i]._id_delivery_manager, $rootScope.globals.currentUser.id_delivery_manager);
                            if (response.data[i]._id_delivery_manager === $rootScope.globals.currentUser.id_delivery_manager && response.data[i]._is_enabled === true) {
                                response.data[i]._ton_remain = response.data[i]._ton;
                                response.data[i]._ton_action = response.data[i]._ton;
                                response.data[i].showAdd = true;
                                response.data[i].showEdit = false;
                                response.data[i].showAccept = false;
                                response.data[i].showDelete = false;
                                response.data[i].showInsert = false;
                                response.data[i].showSelectVehicle = false;
                                response.data[i].showNoteTrip = false;
                                response.data[i].showSelectDriver = false;
                                response.data[i].showInfo = true;
                                response.data[i].showInfoDetail = false;
                                response.data[i].rowspan = 1;

                                if (response.data[i]._time_accept !== 0) {
                                    //bảng dữ liệu xe chở cho mỗi khối tổng
                                    $scope.listPreOrderSum.push(response.data[i]);
                                    dataTableVerifyRequest.push(response.data[i]);
                                }
                                else {
                                    if(response.data[i]._time_refuse === 0 && response.data[i]._time_accept === 0)
                                    $scope.listPreOrderSumConfirm.push(response.data[i]);
                                }

                            }
                        }
                        console.log($scope.listPreOrderSum);
                        $scope.tableParams = new NgTableParams({}, {
                            filterDelay: 0,
                            dataset: angular.copy($scope.listPreOrderSumConfirm)
                        });
                    }

                    downloadDriver();
                    downloadVehicle();
                    downloadPreSumAssign();

                }, function errorCallback(response) {
                    $scope.statustext = 'error';
                });
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
                        var data = {
                            id: $scope.listDriver[i]._id,
                            label: $scope.listDriver[i]._name,
                            phone: $scope.listDriver[i]._phone
                        };
                        $scope.multiDriverData.push(data);
                    }
                    // $scope.jsonToExport = response.data;
                    // createExportReportPreOrder();

                }, function errorCallback(response) {
                    $scope.statustext = 'error';
                });
            };

            $scope.listVehicle = [];

            function downloadVehicle() {
                $urll = 'http://localhost:9999/vehicles/getbyowner';

                $http({
                    method: 'POST',
                    url: $urll,
                    headers: {'Content-Type': 'application/json'},
                    data: {_owner: $rootScope.globals.currentUser.id_delivery_manager}
                }).then(function successCallback(response) {
                    console.log(response.data);
                    $scope.listVehicle = response.data;
                    for (var i = 0; i < $scope.listVehicle.length; i++) {
                        var data = {
                            id: i,
                            name: $scope.listVehicle[i]._number_plate,
                            _weigh: $scope.listVehicle[i]._weigh,
                            _name_driver: $scope.listVehicle[i]._name_driver,
                            _id_driver: $scope.listVehicle[i]._id_driver
                        };
                        $scope.vehicleSelects.push(data);
                        console.log('184');
                    }

                }, function errorCallback(response) {
                    $scope.statustext = 'error';
                });
            };

            ////////////////////////////////////////////////////////////////////////////////////

            function reloadTable(table) {
                table.reload().then(function (data) {
                    if (data.length === 0 && table.total() > 0) {
                        table.page(table.page() - 1);
                        table.reload();
                    }
                });
            }

            $scope['list1'] = [];
            $scope.list2 = [];

            $scope.listDriver = [];
            $scope.listContainer = [];

            $scope.selectedDriverData = [];
            $scope.multiDriverData = [];
            $scope.multiSelectSettings = {
                showCheckAll: false,
                showUncheckAll: false,
                styleActive: true,
                enableSearch: true,
                keyboardControls: true,
                selectionLimit: 3,
                smartButtonMaxItems: 1
            };
            $scope.multiSelectCustomTexts = {buttonDefaultText: 'Chọn Tài Xế'};

            $scope.vehicleSelects = [];
            $scope.selectedVehicleSelect = [];

            $scope.selectVehicleSelect = function (item, row) {
                console.log(item);
                row.tonPerVehicle = item._weigh;
                row._note_trip = item.name;
                $scope.selectedDriverData = setSelectedDriver(item);
            };

            function setSelectedDriver(data) {
                var selectedDriver = [];
                var listDriver = data._id_driver.split('-');
                if (listDriver.length > 0) {
                    console.log('62', 'lon hon roi', listDriver.length);
                    for (var i = 1; i < listDriver.length; i++) {
                        for (var j = 0; j < $scope.multiDriverData.length; j++) {
                            console.log('67', listDriver[i], $scope.multiDriverData[j].id);
                            if (listDriver[i] == $scope.multiDriverData[j].id) {
                                console.log('69');
                                selectedDriver.push($scope.multiDriverData[j]);
                            }
                        }
                    }
                }

                return selectedDriver;
            }

            $scope.warningWeigh = false;
            $scope.changeTonPerVehicle = function (row) {
                if (row.selectedVehicleSelect.selected !== undefined) {
                    if (row.tonPerVehicle > row.selectedVehicleSelect.selected._weigh) {
                        $scope.warningWeigh = true;
                    }
                    else {
                        $scope.warningWeigh = false;
                    }
                }
            };

            function postPreOrderSumAssign(row, data, dataDriver) {
                $urll = 'http://localhost:9999/preorderssumassign/add';
                $http({
                    method: 'POST',
                    url: $urll,
                    headers: {'Content-Type': 'application/json'},
                    data: data
                }).then(function successCallback(response) {
                    console.log(response.data);
                    if (response.data == 'error!') {
                        $scope.show = response.data;
                        iAlert(ngDialog, $scope);
                    }
                    else {
                        row._pre_sum_assign_time = response.data;
                        for (var i = 0; i < dataDriver.length; i++) {
                            dataDriver[i]._pre_sum_assign_time = response.data;
                            dataDriver[i]._is_enabled = true;
                        }
                        postPreOrderSumAssignDriver(dataDriver);
                        reloadTable($scope.tableVerifyRequest);
                    }
                }, function errorCallback(response) {
                    $scope.statustext = 'error';
                });
            }

            function postPreOrderSumAssignDriver(data) {
                $urll = 'http://localhost:9999/assigndriver/add';
                $http({
                    method: 'POST',
                    url: $urll,
                    headers: {'Content-Type': 'application/json'},
                    data: data
                }).then(function successCallback(response) {
                    console.log(response.data);
                    if (response.data == 'error!') {
                        $scope.show = response.data;
                        iAlert(ngDialog, $scope);
                    }
                }, function errorCallback(response) {
                    $scope.statustext = 'error';
                });
            }

            function downloadPreSumAssign() {
                $urll = 'http://localhost:9999/preorderssumassign/getbypresumtime';
                var listData = [];
                for (var i = 0; i < $scope.listPreOrderSum.length; i++) {
                    var data = {_pre_sum_time: $scope.listPreOrderSum[i]._pre_sum_time};
                    listData.push(data);
                }
                $http({
                    method: 'POST',
                    url: $urll,
                    headers: {'Content-Type': 'application/json'},
                    data: listData
                }).then(function successCallback(response) {
                    console.log('588', response.data);
                    for (var i = 0; i < dataTableVerifyRequest.length; i++) {
                        var indexI = i;
                        for (var j = 0; j < response.data.length; j++) {
                            if (dataTableVerifyRequest[i]._pre_sum_time == response.data[j]._pre_sum_time && response.data[j]._is_enabled === true) {
                                var newRow = JSON.parse(JSON.stringify(dataTableVerifyRequest[i]));
                                newRow.showAdd = false;
                                newRow.showEdit = true;
                                newRow.showInfo = false;
                                newRow.showDelete = false;
                                newRow.showSelectVehicle = false;
                                newRow.showNoteTrip = false;
                                newRow.showSelectDriver = false;
                                newRow.rowspan = 0;
                                newRow.showInfoDetail = true;

                                newRow._number_plate = response.data[j]._number_plate;
                                newRow._ton_for_vehicle = response.data[j]._ton_for_vehicle;
                                newRow._name_drivers = response.data[j]._name_drivers;
                                newRow._id_drivers = response.data[j]._id_drivers;
                                newRow._note_trip = response.data[j]._note_trip;
                                newRow._pre_sum_assign_time = response.data[j]._pre_sum_assign_time;

                                if(response.data[j]._start_pickup !== 0){
                                    newRow.showEdit = false;
                                }

                                dataTableVerifyRequest[indexI]._ton_remain -= response.data[j]._ton_for_vehicle;
                                if(dataTableVerifyRequest[indexI]._ton_remain < 0){
                                    dataTableVerifyRequest[indexI].showAdd = false;
                                    dataTableVerifyRequest[indexI]._ton_remain = 0;
                                }
                                dataTableVerifyRequest[indexI].rowspan++;
                                dataTableVerifyRequest.splice(indexI + 1, 0, newRow);
                                i++;
                            }

                        }
                    }

                    ///////////////////////////////////////////////test trước
                    $scope.tableVerifyRequest = new NgTableParams({}, {
                        filterDelay: 0,
                        dataset: angular.copy(dataTableVerifyRequest)
                    });

                }, function errorCallback(response) {
                    $scope.statustext = 'error';
                });
            }

            /////////////////////////////////////////////////////////////////////////
            $scope.verifyRequest = function () {
                $urll = 'http://localhost:9999/preorderssum/verifyrequest';
                $http({
                    method: 'POST',
                    url: $urll,
                    headers: {'Content-Type': 'application/json'},
                    data: $scope.tableParams.settings().dataset
                }).then(function successCallback(response) {
                    console.log(response.data);
                    if (response.data == 'error!') {
                        $scope.show = response.data;
                        iAlert(ngDialog, $scope);
                    }
                    else {
                        //Tạo một bảng mới, với các dữ liệu được accept
                        for (var i = 0; i < $scope.tableParams.settings().dataset.length; i++) {
                            if ($scope.tableParams.settings().dataset[i]._ton_action >= $scope.tableParams.settings().dataset[i]._ton) {
                                dataTableVerifyRequest.push($scope.tableParams.settings().dataset[i]);
                            }
                        }
                        $scope.tableVerifyRequest = new NgTableParams({}, {
                            filterDelay: 0,
                            dataset: angular.copy(dataTableVerifyRequest)
                        });
                        $scope.tableParams.settings().dataset = [];
                        reloadTable($scope.tableParams);
                    }
                }, function errorCallback(response) {
                    $scope.statustext = 'error';
                });
            };

            $scope.add2 = function (row, index) {
                var boolAdd = true;
                for (var i = 0; i < $scope.tableVerifyRequest.settings().dataset.length; i++) {
                    if ($scope.tableVerifyRequest.settings().dataset[i].showAccept === true) {
                        boolAdd = false;
                        break;
                    }
                }
                if (boolAdd) {
                    console.log(index, row);
                    var newRow = JSON.parse(JSON.stringify(row));
                    $scope.selectedDriverData = [];
                    newRow.showAdd = false;
                    newRow.showAccept = true;
                    newRow.showDelete = true;
                    newRow.showSelectVehicle = true;
                    newRow.showNoteTrip = true;
                    newRow.showSelectDriver = true;
                    newRow.showInfo = false;
                    newRow.rowspan = 0;
                    row.rowspan++;
                    $scope.tableVerifyRequest.settings().dataset.splice(index + 1, 0, newRow);
                    reloadTable($scope.tableVerifyRequest);
                }
            };

            var boolEdited = false;
            var tempRow;
            $scope.edit2 = function (row, index) {
                tempRow = JSON.parse(JSON.stringify(row));
                row.showEdit = false;
                row.showAccept = true;
                row.showDelete = true;
                row.showSelectDriver = true;
                row.showNoteTrip = true;
                row.showInfoDetail = false;
                $scope.selectedDriverData = [];
                var listDriver = row._id_drivers.split("-");
                for(var i = 1; i < listDriver.length; i++)
                {
                    for(var j = 0; j < $scope.multiDriverData.length; j++)
                    {
                        if(listDriver[i] == $scope.multiDriverData[j].id){
                            $scope.selectedDriverData.push($scope.multiDriverData[j]);
                        }
                    }
                }
                console.log(row);
                boolEdited = true;

            };

            $scope.accept2 = function (row, index) {
                //kiểm tra xe trước đó có phải là edited không?
                if(boolEdited){
                    boolEdited = false;
                    row.showEdit = true;
                    row.showAccept = false;
                    row.showDelete = false;
                    row.showNoteTrip = false;
                    row.showSelectDriver = false;
                    row.showInfoDetail = true;

                    row._name_drivers = '';
                    row._id_drivers = '';
                    for(var i = 0; i < $scope.selectedDriverData.length; i++)
                    {
                        row._name_drivers += '-' + $scope.selectedDriverData[i].label;
                        row._id_drivers += '-' + $scope.selectedDriverData[i].id;
                    }

                    if(tempRow._note_trip !== row._note_trip || tempRow._name_drivers !== row._name_drivers)
                    {
                        console.log('có sự khác biệt');
                        $urll = 'http://localhost:9999/preorderssumassign/update';
                        $http({
                            method: 'POST',
                            url: $urll,
                            headers: {'Content-Type': 'application/json'},
                            data: row
                        }).then(function successCallback(response) {
                            console.log(response.data);
                            if (response.data !== 'updated!') {
                                $scope.show = response.data;
                                iAlert(ngDialog, $scope);
                            }
                            else {
                                //nếu như có thay đổi về tài xế xe thì đổi trong dữ liệu luôn
                                if(tempRow._name_drivers !== row._name_drivers){

                                    var dataDriver = [];
                                    for (var i = 0; i < $scope.selectedDriverData.length; i++) {
                                        dataDriver.push(
                                            {
                                                _pre_sum_assign_time: row._pre_sum_assign_time,
                                                _driver: $scope.selectedDriverData[i].id,
                                                _name_driver: $scope.selectedDriverData[i].label,
                                                _phone_driver: $scope.selectedDriverData[i].phone,
                                                _lead_driver: false,
                                                _is_enabled : true
                                            })
                                    }
                                    if(dataDriver.length > 0)
                                        dataDriver[0]._lead_driver = true;
                                    $urll = 'http://localhost:9999/assigndriver/updatebysumassign';
                                    $http({
                                        method: 'POST',
                                        url: $urll,
                                        headers: {'Content-Type': 'application/json'},
                                        data: {data : dataDriver, _pre_sum_assign_time :  row._pre_sum_assign_time}
                                    }).then(function successCallback(response) {
                                        console.log(response.data);
                                        if (response.data !== 'updated!') {
                                            $scope.show = response.data;
                                            iAlert(ngDialog, $scope);
                                        }
                                        else {

                                        }
                                    }, function errorCallback(response) {
                                        $scope.statustext = 'error';
                                    });
                                }
                            }
                        }, function errorCallback(response) {
                            $scope.statustext = 'error';
                        });
                    }
                }
                else {
                    //tạo mới
                    console.log('489', row.tonPerVehicle);
                    if ($scope.selectedDriverData.length == 0) {
                        $scope.show = "Bạn chưa nhập tài xế!";
                        iAlert(ngDialog, $scope);
                        return;
                    }
                    if (row.selectedVehicleSelect.selected == undefined) {
                        console.log(row.selectedVehicleSelect);
                        $scope.show = "Bạn chưa nhập xe!";
                        iAlert(ngDialog, $scope);
                        return;
                    }

                    var _name_drivers = '';
                    var _id_drivers = '';

                    //nếu tonPerVehicle lớn hơn số tấn còn lại, thì là bằng số tấn còn lại.
                    if(row.tonPerVehicle >= $scope.tableVerifyRequest.settings().dataset[index - 1]._ton_remain)
                    {
                        row.tonPerVehicle = $scope.tableVerifyRequest.settings().dataset[index - 1]._ton_remain;
                        $scope.tableVerifyRequest.settings().dataset[index - 1]._ton_remain = 0;
                        $scope.tableVerifyRequest.settings().dataset[index - 1].showAdd = false;
                    }
                    else {
                        $scope.tableVerifyRequest.settings().dataset[index - 1]._ton_remain -= row.tonPerVehicle;
                    }

                    var data = {
                        _pre_sum_time: row._pre_sum_time,
                        _number_plate: row.selectedVehicleSelect.selected.name,
                        _ton_for_vehicle: row.tonPerVehicle,
                        _note_trip: row._note_trip,
                        _weigh_for_vehicle: row.selectedVehicleSelect.selected._weigh,
                        sumWeigh: row.tonPerVehicle,
                        _is_enabled: true
                    };

                    var dataDriver = [];
                    for (var i = 0; i < $scope.selectedDriverData.length; i++) {
                        _name_drivers += '-' + $scope.selectedDriverData[i].label;
                        _id_drivers += '-' + $scope.selectedDriverData[i].id;

                        dataDriver.push(
                            {
                                _driver: $scope.selectedDriverData[i].id,
                                _name_driver: $scope.selectedDriverData[i].label,
                                _phone_driver: $scope.selectedDriverData[i].phone,
                                _lead_driver: false
                            })
                    }
                    if(dataDriver.length > 0)
                        dataDriver[0]._lead_driver = true;

                    data._name_drivers = _name_drivers;
                    data._id_drivers = _id_drivers;

                    row._ton_remain -= data.sumWeigh;

                    // row.dataTable.push(data);
                    row._number_plate = data._number_plate;
                    row._ton_for_vehicle = data._ton_for_vehicle;
                    row._name_drivers = data._name_drivers;
                    row._id_drivers = data._id_drivers;
                    row.showInfoDetail = true;
                    row.showAccept = false;
                    row.showEdit = true;
                    row.showDelete = false;
                    row.showSelectVehicle = false;
                    row.showNoteTrip = false;
                    row.showSelectDriver = false;

                    postPreOrderSumAssign(row, data, dataDriver);
                }
            };

            $scope.delete2 = function (row, index) {
                // kiểm tra trước đó có phải là edit hay không
                if(boolEdited){
                    boolEdited = false;

                    $urll = 'http://localhost:9999/preorderssumassign/cancel';
                    $http({
                        method: 'POST',
                        url: $urll,
                        headers: {'Content-Type': 'application/json'},
                        data: row
                    }).then(function successCallback(response) {
                        console.log(response.data);
                        if (response.data !== 'updated!') {
                            $scope.show = response.data;
                            iAlert(ngDialog, $scope);
                        }
                        else {
                            //tra ngược về, xem gốc là cái nào để cập nhật lại thông tin.
                            for(var i = index; i >= 0; i--)
                            {
                                if($scope.tableVerifyRequest.settings().dataset[i].showInfo == true)
                                {
                                    $scope.tableVerifyRequest.settings().dataset[i]._ton_remain += row._ton_for_vehicle;
                                    $scope.tableVerifyRequest.settings().dataset[i].showAdd = true;
                                    $scope.tableVerifyRequest.settings().dataset[i].rowspan--;
                                    break;
                                }
                            }
                            $scope.tableVerifyRequest.settings().dataset.splice(index, 1);
                            reloadTable($scope.tableVerifyRequest);
                        }
                    }, function errorCallback(response) {
                        $scope.statustext = 'error';
                    });
                }
                else {
                    $scope.tableVerifyRequest.settings().dataset[index - 1].rowspan--;
                    $scope.tableVerifyRequest.settings().dataset.splice(index, 1);
                    reloadTable($scope.tableVerifyRequest);
                }
            };
        }
    });