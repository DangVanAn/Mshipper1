angular.module('mShipperApp')
    .component('productsCreate', {
        templateUrl: './Products/Create.html',
        controller: function DsDonHangController($rootScope, $scope, $http, $filter, $location, $timeout, ngDialog) {
            $(document).ready(function () {
                init();
            });

            function init() {
            }

            $scope.idProduct = '';
            $scope.nameProduct = '';
            $scope.unit = '';
            $scope.weigh = 0;
            $scope.volume = 0;
            $scope.note = '';
            $scope.selectedProduct = {};

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
                                name: response.data[i]._name,
                                info: response.data[i]._id_product_group + ' - ' + response.data[i]._name
                            });
                        }
                        $scope.selectedProduct.selected = $scope.productgroups[0];
                    }, function (response) {
                        $scope.statustext = 'error';
                    });
            }

            $scope.submit = function () {

                if ($scope.idProduct === '' || $scope.nameProduct === '') {
                    $scope.show = "Vui lòng điền tất cả thông tin!";
                    iAlert(ngDialog, $scope);
                }
                else {
                    var data = {
                            _id_product: $scope.idProduct,
                            _name: $scope.nameProduct,
                            _id_product_group: $scope.selectedProduct.selected.id,
                            _unit : $scope.unit,
                            _weigh: $scope.weigh,
                            _volume: $scope.volume,
                            _note: $scope.note,
                            _is_enabled: true
                        }
                    ;

                    $url = $rootScope.api_url.postProductCreate;

                    httpPost($http, $url, data,
                        function (response) {
                            console.log("info::" + response.data.message);
                            $scope.show = response.data;
                            iAlert(ngDialog, $scope);
                        }, function (response) {
                            $scope.statustext = 'error';
                        });

                    console.log(JSON.stringify(data));
                }
            };
        }
    });