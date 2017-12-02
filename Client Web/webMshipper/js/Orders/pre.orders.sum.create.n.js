angular.module('mShipperApp')
    .component('preOrderSumCreateN', {
        templateUrl: './Orders/Pre.Sum.Create.n.html',
        controller: function DsDonHangController($rootScope, $scope, $http, $filter, ngDialog, $location, $timeout, $parse, modalOrderCreate, NgMap, NgTableParams) {
            $(document).ready(function () {
                init();
            });
            var listDeliveryManager = [];
            function init() {
                var data = {_permission_id : 'C001'};
                $urll = $rootScope.api_url.getAccountByPermission;
                $http({
                    method: 'POST',
                    url: $urll,
                    headers: {'Content-Type': 'application/json'},
                    data: data
                }).then(function successCallback(response) {
                    console.log(response.data);
                    listDeliveryManager = response.data;
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
                        _address_warehouse: obj['Địa Chỉ Lấy Hàng'],
                        _address_delivery: obj['Địa Chỉ Giao Hàng'],
                        _type_product: obj['Loại Xe Vận Chuyển'],
                        _ton : obj['Số Tấn'],
                        _etd: obj['ETD'],
                        _eta: obj['ETA'],
                        _id_delivery_manager: obj['Mã Nhà Vận Tải']
                    };

                    if (!checkDateFormat(data._eta) || !checkDateFormat(data._etd)) {
                        console.log('Sai format ngày ở dòng: ', i + 1);
                    }

                    listOrderHandling1.push(data);
                }

                var stringDeliveryManagerFail = '';
                if(listDeliveryManager.length > 0){
                    var boolCheck = false;
                    for(var i = 0; i < listOrderHandling1.length; i++)
                    {
                        boolCheck = false;
                        for(var j = 0; j < listDeliveryManager.length; j++){
                            if(listOrderHandling1[i]._id_delivery_manager === listDeliveryManager[j]._id_delivery_manager){
                                boolCheck = true;
                                break;
                            }
                        }
                        if(!boolCheck){
                            stringDeliveryManagerFail += listOrderHandling1[i]._id_delivery_manager + ' ';
                        }
                    }

                    if(stringDeliveryManagerFail.length > 0){
                        $scope.show = 'Mã nhà vận tải' + stringDeliveryManagerFail + ' không có trong dữ liệu!';
                        iAlert(ngDialog, $scope);
                    }
                    else{
                        $scope.tablePreSum = new NgTableParams({}, {
                            dataset: listOrderHandling1
                        });
                    }
                }

                console.log('36', new Date().getTime());
                console.log(listOrderHandling1);
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

                    $urll = 'http://localhost:9999/preorderssum/adds';

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

            // $scope.getMoreData = function () {
            //     $scope.data = $scope.users.slice(0, $scope.data.length + 20);
            // }
        }
    });