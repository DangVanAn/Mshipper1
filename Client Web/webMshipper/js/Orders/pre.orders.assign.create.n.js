angular.module('mShipperApp')
    .component('orderAssignCreateN', {
        templateUrl: './Orders/Pre.Assign.Create.n.html',
        controller: function DsDonHangController($rootScope, $scope, $http, $filter, ngDialog, $location, $timeout, $parse, modalOrderCreate, NgMap, NgTableParams) {
            $(document).ready(function () {
                init();
            });
            function init() {
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
                        _trip: obj['OPSGroup ghi chú 2'],
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
                        _eta: obj['ETA'],
                        _number_plate : obj['Số xe'],
                        _id_delivery_manager : obj['Mã nhà xe']
                    };

                    if (!checkDateFormat(data._eta) || !checkDateFormat(data._etd)) {
                        console.log('Sai format ngày ở dòng: ', i + 1);
                    }

                    listOrderHandling1.push(data);
                }

                // console.log(listOrderHandling1);
                console.log('36', new Date().getTime());

                $scope.tableParams = new NgTableParams({}, {
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

                    $urll = 'http://localhost:9999/preordersassign/posthandling';

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