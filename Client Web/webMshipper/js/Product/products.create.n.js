angular.module('mShipperApp')
    .component('productsCreateN', {
        templateUrl: './Products/Create.n.html',
        controller: function DsDonHangController($rootScope, $scope, $http, $filter, ngDialog, $location, $timeout, $parse, modalOrderCreate, NgMap) {
            $(document).ready(function () {

            });



            getProductGroups();
            function getProductGroups() {
                console.log('16');
                $scope.productgroups = [];
                $url = $rootScope.api_url.getProductGroup;
                httpGet($http, $url,
                    function (response) {
                        for (var i = 0; i < response.data.length; i++) {
                            $scope.productgroups.push({
                                id: response.data[i]._id_product_group,
                                name: response.data[i]._name
                            });
                        }

                        if($scope.products.length > 0){
                            checkProductGroup();
                        }

                    }, function (response) {
                        $scope.statustext = 'error';
                    });
            }

            var listIdProductGroupFalse = '';
            var arrIdProductGroupFalse = [];
            function checkProductGroup() {
                listIdProductGroupFalse = '';
                arrIdProductGroupFalse = [];

                for (var i = 0; i < $scope.products.length; i++){
                    var boolCheck = true;
                    for(var j = 0; j < $scope.productgroups.length; j++){
                        if($scope.products[i].idProductGroup == $scope.productgroups[j].id) {
                            boolCheck = false;
                            break;
                        }
                    }
                    if(boolCheck){
                        if(arrIdProductGroupFalse.indexOf($scope.products[i].idProductGroup) == -1)
                        {
                            arrIdProductGroupFalse.push($scope.products[i].idProductGroup);
                            listIdProductGroupFalse += $scope.products[i].idProductGroup + ' ';
                        }
                    }
                }

                if(listIdProductGroupFalse.length > 0){
                    $scope.show = 'Loại hàng : ' +  listIdProductGroupFalse + ' chưa có trong dữ liệu!';
                    iAlert(ngDialog, $scope);
                }
            }


            $scope.products = [];

            $scope.uploadFile = function () {
                $("#fileButton").val('');
                $scope.excel = '';
                console.log('26', new Date().getTime());
            };

            $scope.GetImport = function () {
                var json = $scope.excel;
                console.log('36', new Date().getTime());
                console.log(json);
                $scope.products = json.Sheet1;
                for (var i = 0; i < $scope.products.length; i++) {
                    $scope.products[i].stt = i + 1;
                }

                if($scope.productgroups.length > 0){
                    checkProductGroup();
                }
            };

            $scope.saveProducts = function () {
                //Save toàn bộ thông tin.
                if ($scope.products.length == 0) {
                    $scope.show = "Bạn chưa chọn tập tin!";
                    iAlert(ngDialog, $scope);
                }
                else {
                    if(arrIdProductGroupFalse.length > 0)
                    {
                        $scope.show = 'Loại hàng : ' +  listIdProductGroupFalse + ' chưa có trong dữ liệu!';
                        iAlert(ngDialog, $scope);
                    }
                    else {
                        var listData = [];
                        for (var i = 0; i < $scope.products.length; i++) {
                            var data = {
                                _id_product: $scope.products[i].id,
                                _name: $scope.products[i].name,
                                _id_product_group: $scope.products[i].idProductGroup,
                                _unit : $scope.products[i].unit,
                                _weigh: $scope.products[i].weigh,
                                _volume: $scope.products[i].volume,
                                _note: $scope.products[i].note,
                                _is_enabled : true
                            };

                            listData.push(data);
                        }

                        console.log(listData);

                        $urll = $rootScope.api_url.postProductCreate_N;

                        $http({
                            method: 'POST',
                            url: $urll,
                            headers: {'Content-Type': 'application/json'},
                            data: listData
                        }).then(function successCallback(response) {
                            console.log(response.data);
                            $scope.show = response.data;
                            iAlert(ngDialog, $scope);
                        }, function errorCallback(response) {
                            $scope.statustext = 'error';
                        });
                    }
                }
            };
        }
    });