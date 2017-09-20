angular.module('mShipperApp').
component('vehiclesShow',{
    templateUrl: './Vehicles/Show.html',
    controller: function DsDonHangController($rootScope, $scope, $http, ngDialog, $filter,$location, $timeout){

        $(document).ready(function () {
        });

        $scope.vehicles = [];
        getVehicles();
        function getVehicles() {
            $scope.vehicles = [];
            var data = {
                _owner : $rootScope.globals.currentUser.phone
            };

            $url = $rootScope.api_url.getVehicleByPhone;

            httpPost($http, $url, data,
                function (response) {
                    for (var i = 0; i < response.data.length; i++) {
                        $scope.vehicles.push(response.data[i]);
                        $scope.vehicles[$scope.vehicles.length - 1].stt = $scope.vehicles.length;
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
            var data = {_id : $scope.vehicles[clickingRow]._id};
            var $urll = $rootScope.api_url.postVehicleRemove;
            $http({
                method: 'POST',
                url: $urll,
                headers: {'Content-Type': 'application/json'},
                data: data
            }).then(function successCallback(response) {
                console.log(response.data);
                $scope.show = response.data;
                iAlert(ngDialog, $scope);

                getVehicles();
            }, function errorCallback(response) {
                $scope.statustext = 'error';
            });
        };

        $scope.clickNoRemove = function () {
            $scope.showRemoveYN = false;
        }

    }
});