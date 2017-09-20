angular.module('mShipperApp').
component('productsShow',{
    templateUrl: './Products/Show.html',
    controller: function DsDonHangController($rootScope, $scope, $http, ngDialog, $filter,$location, $timeout){

        $(document).ready(function () {
        });

        getProducts();
        function getProducts() {
            console.log('16');
            $scope.products = [];
            $url = $rootScope.api_url.getProduct;
            httpGet($http, $url,
                function (response) {
                    for (var i = 0; i < response.data.length; i++) {
                        $scope.products.push(response.data[i]);
                        $scope.products[$scope.products.length - 1].stt = $scope.products.length;
                    }
                }, function (response) {
                    $scope.statustext = 'error';
                });
        }


        var clickingRow = -1;

        $scope.sortType = "_first_name";
        $scope.sortReverse = false;
        $scope.searchFish = "";

        $scope.showRemoveYN = false;
        $scope.remove = function (x) {
            $scope.showRemoveYN = true;
            clickingRow = x.stt - 1;
        };

        $scope.clickYesRemove = function () {
            $scope.showRemoveYN = false;
            var data = {_id_product : $scope.products[clickingRow]._id_product};
            var $urll = $rootScope.api_url.postProductRemove;
            $http({
                method: 'POST',
                url: $urll,
                headers: {'Content-Type': 'application/json'},
                data: data
            }).then(function successCallback(response) {
                console.log(response.data);
                $scope.show = response.data;
                iAlert(ngDialog, $scope);

                getProducts();
            }, function errorCallback(response) {
                $scope.statustext = 'error';
            });
        };

        $scope.clickNoRemove = function () {
            $scope.showRemoveYN = false;
        }

    }
});