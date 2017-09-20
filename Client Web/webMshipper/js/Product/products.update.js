angular.module('mShipperApp')
    .component('productsUpdate', {
    templateUrl: './Products/Create.html',
    controller: function DsDonHangController($rootScope, $scope, $routeParams, $http, $filter, $location, $timeout, ngDialog) {
        $(document).ready(function () {
            init();
        });

        $("#idForm").addClass("disabledbutton");

        function init() {
            $scope.idProduct = '';
            $scope.nameProduct = '';
            $scope.selectedProduct = {};
            $scope.productGroup = '';
            $scope.unit = '';
            $scope.weigh = 0;
            $scope.volume = 0;
            $scope.note = '';

            $url = $rootScope.api_url.getProductId;
            var data = {id : $routeParams.id};
            httpPost($http, $url, data,
                function (response) {
                    $scope.idProduct = response.data[0]._id_product;;
                    $scope.nameProduct = response.data[0]._name;
                    $scope.productGroup = response.data[0]._id_product_group;
                    $scope.unit = response.data[0]._unit;
                    $scope.weigh = response.data[0]._weigh;
                    $scope.volume = response.data[0]._volume;
                    $scope.note = response.data[0]._note;

                    getProductGroups();

                }, function (response) {
                    $scope.statustext = 'error';
                });
        }
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

                        if(response.data[i]._id_product_group == $scope.productGroup){
                            $scope.selectedProduct.selected = $scope.productgroups[i];
                        }
                    }

                }, function (response) {
                    $scope.statustext = 'error';
                });
        }

        $scope.submit = function () {

            if ($scope.nameWarehouse === '')
            {
                $scope.show = "Vui lòng điền tất cả thông tin!";
                iAlert(ngDialog, $scope);
            }
            else
            {

                var data = {
                    _id_product: $scope.idProduct,
                    _name: $scope.nameProduct,
                    _id_product_group: $scope.selectedProduct.selected.id,
                    _unit : $scope.unit,
                    _weigh: $scope.weigh,
                    _volume: $scope.volume,
                    _note: $scope.note,
                    _is_enabled: true
                };

                $url = $rootScope.api_url.postProductUpdate;

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