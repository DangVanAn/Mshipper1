angular.module('mShipperApp')
    .component('warehousesCreate', {
    templateUrl: './Warehouses/Create.html',
    controller: function DsDonHangController($rootScope, $scope, $http, $filter, $location, $timeout, ngDialog) {
        $(document).ready(function () {
            init();
        });

        function init() {
            $scope.idWarehouse = '';
            $scope.nameWarehouse = '';
            $scope.obj = {};
            $scope.obj.address = '';
            $scope.note = '';
        }

        $scope.submit = function () {

            if ($scope.idWarehouse === '' || $scope.nameWarehouse === ''
                || $scope.obj.address === '' || $scope.note === '')
            {
                $scope.show = "Vui lòng điền tất cả thông tin!";
                iAlert(ngDialog, $scope);
            }
            else
            {
                var data = {
                        _id_warehouse: $scope.idWarehouse,
                        _name: $scope.nameWarehouse,
                        _address: $scope.obj.address,
                        _note: $scope.note,
                        _latitude: tempMarker[0],
                        _longitude: tempMarker[1],
                        _radius: 50,
                        _is_enabled: true
                    }
                ;

                if($scope.path1.length > 2)
                {
                    data._polygon = JSON.stringify($scope.path1);
                }

                $url = $rootScope.api_url.postWarehouseCreate;

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

        $scope.showMap = true;

        //update image

        $scope.obj = {address  : ''};
        $scope.typeSelects = [{id: '001', name: 'Chọn Điểm'}, {id: '002', name: 'Chọn Vùng'}];
        $scope.selectedTypeSelect = [];
        $scope.selectedTypeSelect.selected = $scope.typeSelects[0];
        $scope.mapAddress = [0, 0];
        $scope.path1 = [[0, 0]];
        $scope.path = [];
        var tempMarker = [0, 0];

        $scope.showMapArea = false;
        $scope.selectTypeSelect = function (item) {
            if ($scope.selectedTypeSelect.selected.id === '001') {
                $scope.showMapArea = false;

                $scope.mapAddress = tempMarker;
                $scope.path1 = [[0, 0]];
                $scope.mapAddressCenter = tempMarker;
            }

            if ($scope.selectedTypeSelect.selected.id === '002') {
                $scope.showMapArea = true;

                $scope.mapAddress = [0, 0];
                $scope.path1 = $scope.path;
                $scope.mapAddressCenter = $scope.path1[0];
            }
        };
        $scope.addMarkerAndPath = function (event) {
            console.log(event);
            if ($scope.selectedTypeSelect.selected.id === '001') {
                $scope.mapAddress = [event.latLng.lat(), event.latLng.lng()];

                tempMarker = [event.latLng.lat(), event.latLng.lng()];
            }

            if ($scope.selectedTypeSelect.selected.id === '002') {
                $scope.path.push([event.latLng.lat(), event.latLng.lng()]);
                $scope.path1 = $scope.path;
            }
        };

        $scope.removePoint = function () {
            $scope.path1.splice(-1, 1)
        };

        $scope.enterInputMap = function () {
            console.log('158');
            getLatLng();
        }

        function getLatLng(){
            $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' +
                $scope.obj.address + '&key=AIzaSyCbMGRUwcqKjlYX4h4-P6t-xcDryRYLmCM')
                .then(function (coord_results) {
                        $scope.queryResults = coord_results.data.results;
                        $scope.geodata = $scope.queryResults[0].geometry;

                        tempMarker[0] = JSON.stringify($scope.queryResults[0].geometry.location.lat);
                        tempMarker[1] = JSON.stringify($scope.queryResults[0].geometry.location.lng);

                        $scope.mapAddressCenter = tempMarker;
                        $scope.mapAddress = tempMarker;
                    },
                    function error(_error) {
                        $scope.queryError = _error;
                        getLatLng();
                    });
        }
    }
});