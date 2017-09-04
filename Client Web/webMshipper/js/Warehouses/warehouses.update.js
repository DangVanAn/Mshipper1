angular.module('mShipperApp')
    .component('warehouseUpdate', {
    templateUrl: './Warehouses/Create.html',
    controller: function DsDonHangController($rootScope, $scope, $routeParams, $http, $filter, $location, $timeout, ngDialog) {
        $(document).ready(function () {
            init();
        });

        $scope.mapAddress = [0, 0];
        $scope.path1 = [[0, 0]];
        $scope.path = [];
        $scope.obj = {deliveryAddress : ''};

        $scope.typeSelects = [{id: '001', name: 'Chọn Điểm'}, {id: '002', name: 'Chọn Vùng'}];
        $scope.selectedTypeSelect = [];
        $scope.selectedTypeSelect.selected = $scope.typeSelects[0];

        $("#idForm").addClass("disabledbutton");

        function init() {
            $scope.idWarehouse = '';
            $scope.nameWarehouse = '';
            $scope.obj = {};
            $scope.obj.address = '';
            $scope.note = '';

            $url = $rootScope.api_url.getWarehouseId;
            var data = {id : $routeParams.id};
            httpPost($http, $url, data,
                function (response) {
                    $scope.idWarehouse = response.data[0]._id_warehouse;
                    $scope.nameWarehouse = response.data[0]._name;
                    $scope.obj.address = response.data[0]._address;
                    $scope.note = response.data[0]._note;

                    if(response.data[0]._latitude != undefined && response.data[0]._longitude != undefined){
                        $scope.mapAddress = [response.data[0]._latitude, response.data[0]._longitude];
                        $scope.mapAddressCenter = [response.data[0]._latitude, response.data[0]._longitude];
                        tempMarker = [response.data[0]._latitude, response.data[0]._longitude];
                    }
                    else {
                        $scope.mapAddress = [0, 0];
                        $scope.mapAddressCenter = [0, 0];
                        tempMarker = [0, 0];
                    }

                    if(response.data[0]._polygon != undefined && response.data[0]._polygon.length > 0){
                        $scope.path = JSON.parse(response.data[0]._polygon);
                        // $scope.path1 = JSON.parse(response.data[0]._polygon);
                    }

                }, function (response) {
                    $scope.statustext = 'error';
                });
        }

        $scope.showMap = true;

        var tempMarker = [];
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

        $scope.showMapArea = false;
        $scope.addMarkerAndPath = function (event) {
            console.log(event);
            if ($scope.selectedTypeSelect.selected.id === '001') {
                $scope.showMapArea = false;
                $scope.mapAddress = [event.latLng.lat(), event.latLng.lng()];

                tempMarker = [event.latLng.lat(), event.latLng.lng()];
            }

            if ($scope.selectedTypeSelect.selected.id === '002') {
                $scope.showMapArea = true;
                $scope.path.push([event.latLng.lat(), event.latLng.lng()]);
                $scope.path1 = $scope.path;
            }
        };

        $scope.removePoint = function () {
            $scope.path.splice(-1, 1)
        };

        $scope.enterInputMap = function () {
            console.log('158');
            getLatLng();
        }

        function getLatLng(){
            $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' +
                $scope.obj.address + '&key=AIzaSyCbMGRUwcqKjlYX4h4-P6t-xcDryRYLmCM')
                .then(function (coord_results) {

                    console.log($scope.obj.deliveryAddress);
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

        $scope.submit = function () {

            if ($scope.email === '' || $scope.name === ''
                || $scope.identityNumber === '' || $scope.address === '' || $scope.phoneNumber === '')
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
                    _latitude : tempMarker[0],
                    _longitude : tempMarker[1],
                    _radius : 50
                };


                if($scope.path.length > 2)
                {
                    data._polygon = JSON.stringify($scope.path);
                }
                else
                {
                    data._polygon = '';
                }

                $url = $rootScope.api_url.postWarehouseUpdate;

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