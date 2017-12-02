angular.module('mShipperApp')
    .component('preOrderShow', {
        templateUrl: './Orders/Pre.Show.html',
        controller: function DsDonHangController($rootScope, $scope, $routeParams, $http, $filter, ngDialog, $location, $timeout, $parse, modalOrderCreate, NgMap, NgTableParams) {
            $(document).ready(function () {
                init();
            });
            function init() {
                console.log('999', $routeParams.code_file);
                var data = {_id : 'xxxx', _code_file : $routeParams.code_file};
                $urll = 'http://localhost:9999/preorders/getbycodefile';
                $http({
                    method: 'POST',
                    url: $urll,
                    headers: {'Content-Type': 'application/json'},
                    data: data
                }).then(function successCallback(response) {

                    $scope.tableParams = new NgTableParams({}, {
                        filterDelay: 0,
                        dataset: angular.copy(response.data)
                    });

                }, function errorCallback(response) {
                    $scope.statustext = 'error';
                });
            }

            $scope.uploadFile = function () {
                $("#fileButton").val('');
                $scope.excel = '';

                console.log('26', new Date().getTime());
            };

            var listOrderHandling1 = [];
            $scope.GetImport = function () {

                var json = $scope.excel;

                // console.log(json);
                listOrderHandling1 = [];
                for (var i = 0; i < json.Sheet1.length; i++) {
                    var obj = json.Sheet1[i];
                    var data = {
                        _id_warehouse: obj['Mã điểm lấy hàng'],
                        _id_delivery: obj['Mã điểm giao hàng'],
                        _address: obj['Địa chỉ'],
                        _id_customer: obj['Mã nhà phân phối'],
                        _id_order: obj['Mã đơn hàng'],
                        _id_product: obj['Mã hàng hóa'],
                        _name_product: obj['Tên hàng hóa/ĐVT'],
                        _type_product: obj['Loại xe vận chuyển'],
                        _id_product_group: obj['Mã nhóm hàng'],
                        _number: Number(obj['Số lượng']),
                        _ton : obj['Ton'],
                        _etd: obj['ETD'],
                        _eta: obj['ETA']
                    };

                    if (!checkDateFormat(data._eta) || !checkDateFormat(data._etd)) {
                        console.log('Sai format ngày ở dòng: ', i + 1);
                    }

                    listOrderHandling1.push(data);
                }

                // console.log(listOrderHandling1);
                console.log('36', new Date().getTime());

                $scope.tablePreOrders = new NgTableParams({}, {
                    dataset: listOrderHandling1
                });
            };

            function checkDateFormat(inputElem) {
                var regex = new RegExp("^[0-3][0-9]/[0-1][0-9]/20[0-9][0-9] [0-2][0-9]:[0-6][0-9]$", "i");
                var searchText = inputElem;
                return ((searchText.length > 0) && regex.test(searchText));
            }


            $scope.saveOrders = function () {
                //Save toàn bộ thông tin.
                if (listOrderHandling1 == 0) {
                    $scope.show = "Bạn chưa chọn tập tin đơn hàng!";
                    iAlert(ngDialog, $scope);
                }
                else {

                    for(var i = 0; i < listOrderHandling1.length; i++){
                        var tempETDTime = listOrderHandling1[i]._etd.split(' ')[1];
                        var tempETATime = listOrderHandling1[i]._eta.split(' ')[1];
                        listOrderHandling1[i]._etd_long = listOrderHandling1[i]._etd.split(' ')[0];
                        listOrderHandling1[i]._eta_long = listOrderHandling1[i]._eta.split(' ')[0];

                        var etdDate = listOrderHandling1[i]._etd_long.split('/');
                        tempETDTime = tempETDTime.split(':');
                        listOrderHandling1[i]._etd_long = new Date(etdDate[2], etdDate[1] - 1, etdDate[0], tempETDTime[0], tempETDTime[1]).getTime();

                        var etaDate = listOrderHandling1[i]._eta_long.split('/');
                        tempETATime = tempETATime.split(':');
                        listOrderHandling1[i]._eta_long = new Date(etaDate[2], etaDate[1] - 1, etaDate[0], tempETATime[0], tempETATime[1]).getTime();
                    }

                    $urll = 'http://localhost:9999/preorders/posthandling';

                    $http({
                        method: 'POST',
                        url: $urll,
                        headers: {'Content-Type': 'application/json'},
                        data: listOrderHandling1
                    }).then(function successCallback(response) {
                        console.log(response.data);
                        $scope.show = response.data;
                        iAlert(ngDialog, $scope);
                    }, function errorCallback(response) {
                        $scope.statustext = 'error';
                    });
                }
            };

            ////////////////////////////////////////////////////////////////////////////////////

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
                    $urll = 'http://localhost:9999/preorders/delete';
                    $http({
                        method: 'POST',
                        url: $urll,
                        headers: {'Content-Type': 'application/json'},
                        data: row
                    }).then(function successCallback(response) {
                        console.log(response.data);
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

                $urll = 'http://localhost:9999/preorders/update';
                $http({
                    method: 'POST',
                    url: $urll,
                    headers: {'Content-Type': 'application/json'},
                    data: row
                }).then(function successCallback(response) {
                    console.log(response.data);
                    if(response.data == 'updated'){}
                    else{
                        $scope.tableParams.settings().dataset[tempIndex] = tempRow;
                        reloadTable();
                        $scope.show = response.data;
                        iAlert(ngDialog, $scope);
                    }
                }, function errorCallback(response) {
                    $scope.statustext = 'error';
                });
            }

            var tempRow = {};
            var tempIndex = -1;
            function edit(row, rowForm) {
                row.isEditing = true;
                tempRow = JSON.parse(JSON.stringify(row));
                tempRow.isEditing = false;
                tempIndex = $scope.tableParams.settings().dataset.indexOf(row);
            }

            function reloadTable() {
                $scope.tableParams.reload().then(function(data) {
                    if (data.length === 0 && $scope.tableParams.total() > 0) {
                        $scope.tableParams.page($scope.tableParams.page() - 1);
                        $scope.tableParams.reload();
                    }
                });
            }


            (function() {
                "use strict";
                angular.module("mShipperApp").run(configureDefaults);
                configureDefaults.$inject = ["ngTableDefaults"];

                function configureDefaults(ngTableDefaults) {
                    ngTableDefaults.params.count = 5;
                    ngTableDefaults.settings.counts = [];
                }
            })();
            ////////////////////////////////////////////////////////////////////////////////////

        }
    });