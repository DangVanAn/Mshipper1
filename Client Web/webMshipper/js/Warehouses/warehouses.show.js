angular.module('mShipperApp').
component('warehousesShow',{
    templateUrl: './Warehouses/Show.html',
    controller: function DsDonHangController($rootScope, $scope, $http, ngDialog, $filter,$location, $timeout){

        $(document).ready(function () {
            init();
        });

        function init() {
            $scope.warehouses = [];
            console.log('12');
        }
        getWarehouses();
        function getWarehouses() {
            console.log('16');
            $scope.warehouses = [];
            $url = $rootScope.api_url.getWarehouse;
            httpGet($http, $url,
                function (response) {
                    for (var i = 0; i < response.data.length; i++) {
                        $scope.warehouses.push(response.data[i]);
                        $scope.warehouses[$scope.warehouses.length - 1].stt = $scope.warehouses.length;
                    }
                }, function (response) {
                    $scope.statustext = 'error';
                });
        }


        var clickingRow = -1;
        $('#overlay-showmore').hide();
        $scope.showMore = function (x) {
            console.log(x);
            clickingRow = x.stt - 1;
            $scope.detail_id = x._id_warehouse;
            $scope.detail_name = x._name;
            $scope.detail_address = x._address;
            $scope.detail_note = x._note;

            $scope.mapAddress = [$scope.warehouses[clickingRow]._latitude, $scope.warehouses[clickingRow]._longitude];
            $scope.mapAddressCenter = [$scope.warehouses[clickingRow]._latitude, $scope.warehouses[clickingRow]._longitude];
            $scope.path1 = [[0, 0]];

            $('#overlay-showmore').show();
            window.dispatchEvent(new Event('resize'));
        };

        $scope.sortType = "_first_name";
        $scope.sortReverse = false;
        $scope.searchFish = "";

        $scope.closeShowMore = function () {
            $('#overlay-showmore').hide();

            $scope.mapAddress = [0, 0];
            $scope.path1 = [[0, 0]];
            $scope.mapAddressCenter = [0, 0];
            $scope.selectedTypeSelect.selected = $scope.typeSelects[0];
        };

        $scope.address = "Hồ CHí Minh.Việt Nam";
        $scope.markers =[];
        $scope.path = [];
        $('#showMap').show();

        $scope.typeSelects = [{id: '001', name: 'Chọn Điểm'}, {id: '002', name: 'Chọn Vùng'}];
        $scope.selectedTypeSelect = [];
        $scope.selectedTypeSelect.selected = $scope.typeSelects[0];

        $scope.selectTypeSelect = function (item) {
            if ($scope.selectedTypeSelect.selected.id === '001') {
                $scope.showMapArea = false;

                $scope.mapAddress = [$scope.warehouses[clickingRow]._latitude, $scope.warehouses[clickingRow]._longitude];
                $scope.mapAddressCenter = [$scope.warehouses[clickingRow]._latitude, $scope.warehouses[clickingRow]._longitude];
                $scope.path1 = [[0, 0]];
            }

            if ($scope.selectedTypeSelect.selected.id === '002') {
                $scope.showMapArea = true;

                $scope.mapAddress = [0, 0];
                $scope.path1 = JSON.parse($scope.warehouses[clickingRow]._polygon);
                $scope.mapAddressCenter = $scope.path1[0];
            }
        };

        $scope.showRemoveYN = false;
        $scope.remove = function (x) {
            $scope.showRemoveYN = true;
            clickingRow = x.stt - 1;
        };

        $scope.clickYesRemove = function () {
            $scope.showRemoveYN = false;
            var data = {_id_warehouse : $scope.warehouses[clickingRow]._id_warehouse};
            var $urll = $rootScope.api_url.postWarehouseRemove;
            $http({
                method: 'POST',
                url: $urll,
                headers: {'Content-Type': 'application/json'},
                data: data
            }).then(function successCallback(response) {
                console.log(response.data);
                $scope.show = response.data;
                iAlert(ngDialog, $scope);

                getWarehouses();
            }, function errorCallback(response) {
                $scope.statustext = 'error';
            });
        };

        $scope.clickNoRemove = function () {
            $scope.showRemoveYN = false;
        }

    }
});