angular.module('mShipperApp')
    .component('productgroupsCreateN', {
        templateUrl: './ProductGroups/Create.n.html',
        controller: function DsDonHangController($rootScope, $scope, $http, $filter, ngDialog, $location, $timeout, $parse, modalOrderCreate, NgMap) {
            $(document).ready(function () {

            });

            $scope.productgroups = [];

            $scope.uploadFile = function () {
                $("#fileButton").val('');
                $scope.excel = '';
                console.log('26', new Date().getTime());
            };

            $scope.GetImport = function () {

                var json = $scope.excel;
                console.log('36', new Date().getTime());
                console.log(json);
                $scope.productgroups = json.Sheet1;
                for (var i = 0; i < $scope.productgroups.length; i++) {
                    $scope.productgroups[i].stt = i + 1;
                }
            };

            $scope.saveProductGroups = function () {
                //Save toàn bộ thông tin.
                if ($scope.productgroups.length == 0) {
                    $scope.show = "Bạn chưa chọn tập tin!";
                    iAlert(ngDialog, $scope);
                }
                else {
                    var listData = [];
                    for (var i = 0; i < $scope.productgroups.length; i++) {
                        var data = {
                            _id_product_group: $scope.productgroups[i].id,
                            _name: $scope.productgroups[i].name,
                            _note: $scope.productgroups[i].note,
                            _is_enabled : true
                        };

                        listData.push(data);
                    }

                    console.log(listData);

                    $urll = $rootScope.api_url.postProductGroupCreate_N;

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
            };
        }
    });