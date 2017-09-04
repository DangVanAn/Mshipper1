angular.module('mShipperApp')
    .component('warehousesCreateN', {
        templateUrl: './Warehouses/Create.n.html',
        controller: function DsDonHangController($rootScope, $scope, $http, $filter, ngDialog, $location, $timeout, $parse, modalOrderCreate, NgMap) {
            $(document).ready(function () {

            });

            $scope.warehouses = [];

            $scope.uploadFile = function () {
                $("#fileButton").val('');
                $scope.excel = '';
                console.log('26', new Date().getTime());
            };

            $scope.GetImport = function () {

                var json = $scope.excel;

                console.log('36', new Date().getTime());
                console.log(json);
                $scope.warehouses = json.Sheet1;
                for (var i = 0; i < $scope.warehouses.length; i++) {
                    $scope.warehouses[i].stt = i + 1;
                }
                    convertAddressToLatLng();
            };

            var countListLatLng = 0;

            function convertAddressToLatLng() {
                countListLatLng = 0;
                getLatLng();
            }

            function getLatLng() {
                if (countListLatLng < $scope.warehouses.length) {
                    $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' +
                        $scope.warehouses[countListLatLng].address + '&key=AIzaSyCbMGRUwcqKjlYX4h4-P6t-xcDryRYLmCM')
                        .then(function (coord_results) {
                                $scope.queryResults = coord_results.data.results;
                                $scope.geodata = $scope.queryResults[0].geometry;

                                console.log($scope.queryResults[0].formatted_address);

                                console.log("geo : " + JSON.stringify($scope.queryResults[0].geometry.location));

                                $scope.warehouses[countListLatLng]._latitude = JSON.stringify($scope.queryResults[0].geometry.location.lat);
                                $scope.warehouses[countListLatLng]._longitude = JSON.stringify($scope.queryResults[0].geometry.location.lng);

                                countListLatLng++;
                                getLatLng();

                            },
                            function error(_error) {
                                $scope.queryError = _error;
                                countListLatLng++;
                                getLatLng();
                            });
                }
                else {
                    $scope.markers = [];
                    for (var i = 0; i < $scope.warehouses.length; i++) {
                        console.log("add marker nhieu hon nao");
                        addMarker($scope.warehouses[i]);
                    }
                }

            };

            $scope.showMaps = false;
            $scope.closeShowMore1 = function () {
                $scope.showMaps = false;
                $scope.path = [];
                $scope.path1 = [[18.466465, -66.118292]];
                $scope.selectedTypeSelect.selected = $scope.typeSelects[0];
                $scope.showSelectArea = false;
            };

            $scope.address = "Hồ CHí Minh.Việt Nam";
            $scope.addressCenter = "Hồ CHí Minh.Việt Nam";
            $scope.markers = [];
            $scope.path = [];

            $scope.removePoint = function () {
                $scope.path.splice(-1, 1)
            };
            $scope.path1 = [[18.466465, -66.118292]];

            $scope.createZone = function () {

                $scope.warehouses[clickingRow]._latitude = tempMarker[0];
                $scope.warehouses[clickingRow]._longitude = tempMarker[1];

                //3 điểm mới tạo thành một vùng
                if ($scope.path1.length >= 3) {
                    $scope.warehouses[clickingRow].polygon = JSON.stringify($scope.path1);
                }

                $scope.showMaps = false;
            };


            $scope.typeSelects = [{id: '001', name: 'Chọn Điểm'}, {id: '002', name: 'Chọn Vùng'}];
            $scope.selectedTypeSelect = [];
            $scope.selectedTypeSelect.selected = $scope.typeSelects[0];

            $scope.showSelectArea = false;
            $scope.selectTypeSelect = function (item) {
                console.log(item);
                if ($scope.selectedTypeSelect.selected.id == '001') {
                    $scope.showSelectArea = false;
                    console.log('184', clickingX);
                    $scope.address = tempMarker;
                    $scope.path1 = [[18.466465, -66.118292]];
                }

                if ($scope.selectedTypeSelect.selected.id == '002') {
                    $scope.showSelectArea = true;
                    console.log('191');
                    $scope.address = [0, 0];
                    $scope.path1 = $scope.path;
                }
            };

            var tempMarker = [];
            $scope.addMarkerAndPath = function (event) {
                console.log(event);
                if ($scope.selectedTypeSelect.selected.id == '001') {

                    console.log('192');
                    $scope.address = [event.latLng.lat(), event.latLng.lng()];

                    tempMarker = [event.latLng.lat(), event.latLng.lng()];

                    $scope.markers[clickingRow] = {
                        pos: [event.latLng.lat(), event.latLng.lng()],
                        label: event.DeliveryAddress
                    };
                }

                if ($scope.selectedTypeSelect.selected.id == '002') {

                    console.log('205');
                    $scope.path.push([event.latLng.lat(), event.latLng.lng()]);

                    $scope.path1 = $scope.path;
                }

            };

            var clickingRow = -1;
            var clickingX = {};
            $scope.clickShowMaps = function (x) {
                $scope.showMaps = true;
                clickingRow = x.stt - 1;
                tempMarker = [x._latitude, x._longitude];
                $scope.address = [x._latitude, x._longitude];
                $scope.addressCenter = [x._latitude, x._longitude];
                clickingX = x;

                $scope.path = JSON.parse(x.polygon);
                if ($scope.path.length > 1) {
                    $scope.selectedTypeSelect.selected = $scope.typeSelects[1];
                    $scope.addressCenter = $scope.path[0];
                    $scope.address = [0, 0];
                    $scope.path1 = $scope.path;
                    $scope.showSelectArea = true;
                }
            };

            NgMap.getMap().then(function (map) {
                google.maps.event.trigger(map, "resize");
            });

            $scope.center = [10.7680338, 106.414162];

            $scope.markers = [];

            function addMarker(event) {
                $scope.markers.push({pos: [event._latitude, event._longitude], label: event.DeliveryAddress});
            }

            $scope.saveWarehouses = function () {
                //Save toàn bộ thông tin.
                if ($scope.warehouses.length == 0) {
                    $scope.show = "Bạn chưa chọn tập tin!";
                    iAlert(ngDialog, $scope);
                }
                else {
                    // console.log($scope.warehouses);

                    var listData = [];
                    for (var i = 0; i < $scope.warehouses.length; i++) {
                        var data = {
                            _id_warehouse: $scope.warehouses[i].id,
                            _name: $scope.warehouses[i].name,
                            _address: $scope.warehouses[i].address,
                            _note: $scope.warehouses[i].note,
                            _latitude : $scope.warehouses[i]._latitude,
                            _longitude : $scope.warehouses[i]._longitude,
                            _radius : 50,
                            _is_enabled : true,
                            _polygon : $scope.warehouses[i].polygon
                        };

                        listData.push(data);
                    }

                    console.log(listData);

                    $urll = $rootScope.api_url.postWarehouseCreate_N;

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