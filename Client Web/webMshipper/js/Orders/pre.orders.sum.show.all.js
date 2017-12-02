angular.module('mShipperApp')
    .component('preOrderSumShowAll', {
        templateUrl: './Orders/Pre.Sum.Show.All.html',
        controller: function DsDonHangController($rootScope, $scope, $http, $filter, ngDialog, $location, $timeout, $parse, modalOrderCreate, NgMap, NgTableParams, $compile, $q) {
            $(document).ready(function () {
            });

            init();
            $scope.listPreOrderSum = [];
            $scope.listPreOrderSumConfirm = [];
            $scope.listPreOrderSumRefuse = [];

            function init() {
                var data = {_id: 'xxxx'};
                $urll = $rootScope.api_url.getPreOrderSumShow;
                $http({
                    method: 'POST',
                    url: $urll,
                    headers: {'Content-Type': 'application/json'},
                    data: data
                }).then(function successCallback(response) {
                    if ($rootScope.globals.currentUser.permission === 'C001') {
                        //chỉ hiển thị những phần cho nhà vận tải thôi.
                        for (var i = 0; i < response.data.length; i++) {
                            console.log('26', response.data[i]._id_delivery_manager, $rootScope.globals.currentUser.id_delivery_manager);
                            response.data[i]._ton_assign = 0;
                            response.data[i].showCancel = (response.data[i]._is_enabled === true);
                            $scope.listPreOrderSumConfirm.push(response.data[i]);
                        }
                    }

                    downloadPreSumAssign();

                }, function errorCallback(response) {
                    $scope.statustext = 'error';
                });
            }

            /////////////////////////////////////////////////////////////////////////////////////

            function downloadPreSumAssign() {
                $urll = 'http://localhost:9999/preorderssumassign/getbypresumtime';
                var listData = [];
                for (var i = 0; i < $scope.listPreOrderSumConfirm.length; i++) {
                    var data = {_pre_sum_time: $scope.listPreOrderSumConfirm[i]._pre_sum_time};
                    listData.push(data);
                }
                $http({
                    method: 'POST',
                    url: $urll,
                    headers: {'Content-Type': 'application/json'},
                    data: listData
                }).then(function successCallback(response) {
                    console.log('588', response.data);
                    for (var j = 0; j < response.data.length; j++) {
                        for (var i = 0; i < $scope.listPreOrderSumConfirm.length; i++) {
                            if ($scope.listPreOrderSumConfirm[i]._pre_sum_time == response.data[j]._pre_sum_time) {
                                    $scope.listPreOrderSumConfirm[i]._ton_assign += response.data[j]._ton_for_vehicle;
                                    $scope.listPreOrderSumConfirm[i]._list_vehicle = " " + response.data[j]._number_plate + "(" + response.data[j]._ton_for_vehicle + "t)";
                            }
                        }
                    }

                    $scope.tableParams = new NgTableParams({}, {
                        filterDelay: 0,
                        dataset: angular.copy($scope.listPreOrderSumConfirm)
                    });

                }, function errorCallback(response) {
                    $scope.statustext = 'error';
                });
            }

            ///////////////////////////////////////////////////////////////

            $scope.cancel = function (row) {
                var index = $scope.tableParams.settings().dataset.indexOf(row);
                if (index > -1 && row._is_enabled === true) {
                    row._note = 'Coordinator cancel';
                    row._user = $rootScope.globals.currentUser.id;
                    $urll = 'http://localhost:9999/preorderssum/cancel';
                    $http({
                        method: 'POST',
                        url: $urll,
                        headers: {'Content-Type': 'application/json'},
                        data: row
                    }).then(function successCallback(response) {
                        console.log(response.data);
                        if (response.data == 'error!') {
                            $scope.show = response.data;
                            iAlert(ngDialog, $scope);
                        }
                        else {
                            $scope.tableParams.settings().dataset.splice(index, 1);
                        }
                    }, function errorCallback(response) {
                        $scope.statustext = 'error';
                    });
                }
            };

            ////////////////////////////////////////////////////////////////

            var data = {_id: 'xxxx'};
            $urll = 'http://localhost:9999/preorderssum/getrefuse';
            $http({
                method: 'POST',
                url: $urll,
                headers: {'Content-Type': 'application/json'},
                data: data
            }).then(function successCallback(response) {

                console.log($rootScope.globals.currentUser);
                console.log(response.data);
                for (var i = 0; i < response.data.length; i++) {
                    console.log('125', response.data[i]);
                    response.data[i]._ton_remain = response.data[i]._ton;
                    response.data[i]._ton_remain_show = response.data[i]._ton;
                    response.data[i].rowspan = 1;
                    response.data[i].showInsert = false;
                    response.data[i].showInfo = true;
                    response.data[i].showAdd = true;
                    response.data[i].selectedDeliverySelect = {};
                    $scope.listPreOrderSumRefuse.push(response.data[i]);
                }

                console.log('127', $scope.listPreOrderSumRefuse.length);

                downloadListDelivery();

            }, function errorCallback(response) {
                $scope.statustext = 'error';
            });

            $scope.insertVehicleToSum = function (row) {
                console.log(row);
                row.selectedVehicleSelect = [];
                for (var i = 0; i < $scope.listPreOrderSumRefuse.length; i++) {
                    $scope.listPreOrderSumRefuse[i].showInsert = false;
                }
                row.showInsert = true;
            };

            function downloadListDelivery() {
                $urll = 'http://localhost:9999/users/getbypermission';
                $http({
                    method: 'POST',
                    url: $urll,
                    headers: {'Content-Type': 'application/json'},
                    data: {_permission_id : 'C001'}
                }).then(function successCallback(response) {

                    console.log($rootScope.globals.currentUser);
                    console.log(response.data);
                    $scope.deliverySelects = [];
                    for (var i = 0; i < response.data.length; i++) {
                        $scope.deliverySelects.push({id : response.data[i]._id_delivery_manager,
                                                        name : response.data[i]._company, info : response.data[i]._company + " - " + response.data[i]._id_delivery_manager});
                    }

                    downloadPreOrderSumBefore();
                }, function errorCallback(response) {
                    $scope.statustext = 'error';
                });
            }

            function reloadTable(table) {
                table.reload().then(function (data) {
                    if (data.length === 0 && table.total() > 0) {
                        table.page(table.page() - 1);
                        table.reload();
                    }
                });
            }

            //Download những preordersum đã được chia cho preordersum refuse
            function downloadPreOrderSumBefore() {

                var listId = [];
                for(var i = 0; i < $scope.listPreOrderSumRefuse.length; i++)
                {
                    listId.push({_id : $scope.listPreOrderSumRefuse[i]._id});
                    console.log('181', "_id : " + $scope.listPreOrderSumRefuse[i]._id);
                }

                $urll = 'http://localhost:9999/preorderssum/getbyidpresumbefore';
                $http({
                    method: 'POST',
                    url: $urll,
                    headers: {'Content-Type': 'application/json'},
                    data: listId
                }).then(function successCallback(response) {
                    if (response.data == 'error!') {
                        $scope.show = response.data;
                        iAlert(ngDialog, $scope);
                    }
                    else {
                        console.log('198', response.data);
                        for(var i = 0; i < response.data.data.length; i++)
                        {
                            for(var j = 0; j < $scope.listPreOrderSumRefuse.length; j++)
                            {
                                if($scope.listPreOrderSumRefuse[j]._id === response.data.data[i]._id_pre_order_sum_before)
                                {
                                    var newRow = JSON.parse(JSON.stringify(response.data.data[i]));

                                    $scope.selectedDriverData = [];
                                    newRow.showAdd = false;
                                    newRow.showAccept = true;
                                    newRow.showDelete = true;
                                    newRow.showInfo = false;
                                    newRow.showInfoDetail = true;
                                    newRow.showAccept = false;
                                    newRow.rowspan = 0;

                                    for(var ii = 0; ii < $scope.deliverySelects.length; ii++)
                                    {
                                        if(newRow._id_delivery_manager == $scope.deliverySelects[ii].id)
                                        {
                                            newRow._name_delivery_manager = $scope.deliverySelects[ii].name;
                                            break;
                                        }
                                    }
                                    newRow._ton_for_delivery = newRow._ton;

                                    $scope.listPreOrderSumRefuse[j].rowspan++;
                                    $scope.listPreOrderSumRefuse[j]._ton_remain -= newRow._ton;
                                    $scope.listPreOrderSumRefuse.splice(j + 1, 0, newRow);
                                }
                            }
                        }
                        $scope.tableVerifyRequest = new NgTableParams({}, {
                            filterDelay: 0,
                            dataset: angular.copy($scope.listPreOrderSumRefuse)
                        });
                    }

                }, function errorCallback(response) {
                    $scope.statustext = 'error';
                });
            }

            var dadIndex = -1;
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
                    newRow._pre_sum_time = '';
                    newRow.showAdd = false;
                    newRow.showAccept = true;
                    newRow.showDelete = true;
                    newRow.showSelectDelivery = true;
                    newRow.showInputTon = true;
                    newRow.showInfo = false;
                    newRow.rowspan = 0;
                    row.rowspan++;
                    $scope.tableVerifyRequest.settings().dataset.splice(index + 1, 0, newRow);
                    dadIndex = index;
                    reloadTable($scope.tableVerifyRequest);
                }
            };

            $scope.accept2 = function (row, index) {
                //tạo mới
                console.log('489', row.tonPerDelivery);
                if (row.selectedDeliverySelect.selected == undefined) {
                    $scope.show = "Bạn chưa nhập nhà vận tải!";
                    iAlert(ngDialog, $scope);
                    return;
                }

                if (row.tonPerDelivery <= 0 || row.tonPerDelivery == undefined) {
                    $scope.show = "Vui lòng nhập số tấn tải!";
                    iAlert(ngDialog, $scope);
                    return;
                }

                var data = {
                    _id_pre_order_sum_before : row._id,
                    _id_warehouse: row._id_warehouse,
                    _address_warehouse: row._address_warehouse,
                    _id_delivery: row._id_delivery,
                    _id_customer: row._id_customer,
                    _address_delivery: row._address_delivery,
                    _type_product: row._type_product,
                    _ton: row.tonPerDelivery,
                    _etd: row._etd,
                    _eta: row._eta,
                    _note: row._note,
                    _id_delivery_manager: row.selectedDeliverySelect.selected.id,
                    _time_send: new Date().getTime(),
                    _is_enabled: true
                };

                if(row.tonPerDelivery > $scope.tableVerifyRequest.settings().dataset[dadIndex]._ton_remain)
                {
                    row.tonPerDelivery = $scope.tableVerifyRequest.settings().dataset[dadIndex]._ton_remain;
                }

                $urll = 'http://localhost:9999/preorderssum/add';
                $http({
                    method: 'POST',
                    url: $urll,
                    headers: {'Content-Type': 'application/json'},
                    data: data
                }).then(function successCallback(response) {
                    if (response.data.success === false) {
                        $scope.show = response.data.message;
                        iAlert(ngDialog, $scope);
                    }
                    else {
                        //add to table
                        row.showInsert = false;
                        $scope.tableVerifyRequest.settings().dataset[dadIndex]._ton_remain -= row.tonPerDelivery;

                        row._pre_sum_time = response.data.data;

                        row._name_delivery_manager = row.selectedDeliverySelect.selected.name;
                        row._ton_for_delivery = row.tonPerDelivery;

                        row.tonPerDelivery = 0;
                        row.selectedDeliverySelect.selected = [];

                        row.showInfoDetail = true;
                        row.showAccept = false;
                        row.showSelectDelivery = false;
                        row.showInputTon = false;
                        row.showDelete = true;

                        reloadTable($scope.tableVerifyRequest);

                        // setPreOrderSumFalse(row._id);
                    }

                }, function errorCallback(response) {
                    $scope.statustext = 'error';
                });
            };

            $scope.delete2 = function (row, index) {
                $urll = 'http://localhost:9999/preorderssum/setfalse';
                $http({
                    method: 'POST',
                    url: $urll,
                    headers: {'Content-Type': 'application/json'},
                    data: row
                }).then(function successCallback(response) {
                    console.log(response.data);
                    if (response.data !== 'success!') {
                        $scope.show = response.data;
                        iAlert(ngDialog, $scope);
                    }
                    else {
                        //tra ngược về, xem gốc là cái nào để cập nhật lại thông tin.
                        for(var i = index; i >= 0; i--)
                        {
                            if($scope.tableVerifyRequest.settings().dataset[i].showInfo == true)
                            {
                                $scope.tableVerifyRequest.settings().dataset[i]._ton_remain += row._ton_for_delivery;
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
            };
        }
    });