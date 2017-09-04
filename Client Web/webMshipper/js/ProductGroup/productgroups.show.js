angular.module('mShipperApp').
component('productgroupsShow',{
    templateUrl: './ProductGroups/Show.html',
    controller: function DsDonHangController($rootScope, $scope, $http, ngDialog, $filter,$location, $timeout){

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
                        $scope.productgroups.push(response.data[i]);
                        $scope.productgroups[$scope.productgroups.length - 1].stt = $scope.productgroups.length;
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
            var data = {_id_product_group : $scope.productgroups[clickingRow]._id_product_group};
            var $urll = $rootScope.api_url.postProductGroupRemove;
            $http({
                method: 'POST',
                url: $urll,
                headers: {'Content-Type': 'application/json'},
                data: data
            }).then(function successCallback(response) {
                console.log(response.data);
                $scope.show = response.data;
                iAlert(ngDialog, $scope);

                getProductGroups();
            }, function errorCallback(response) {
                $scope.statustext = 'error';
            });
        };

        $scope.clickNoRemove = function () {
            $scope.showRemoveYN = false;
        }

    }
});