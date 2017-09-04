angular.module('mShipperApp')
    .component('accountCreateN', {
        templateUrl: './Accounts/Create.n.html',
        controller: function DsDonHangController($rootScope, $scope, $http, $filter, ngDialog, $location, $timeout, $parse, modalOrderCreate, NgMap) {
            $(document).ready(function () {
                init();
            });

            $scope.role = $rootScope.listRole;
            $scope.selectedRole = {};
            $scope.selectedRole.selected = $scope.role[0];

            $scope.b_company = false;
            $scope.b_driverLicense = false;
            $scope.b_deliveryAddress = false;

            $scope.selectRole = function (item) {
                console.log(item);

                if (item.id == 'A001' || item.id == 'A002' || item.id == 'A003' || item.id == 'A004') {
                    $scope.b_company = false;
                    $scope.b_driverLicense = false;
                    $scope.b_deliveryAddress = false;
                }
                if (item.id == 'C001') {
                    $scope.b_company = true;
                    $scope.b_driverLicense = false;
                    $scope.b_deliveryAddress = false;
                }
                if (item.id == 'C002') {
                    $scope.b_company = false;
                    $scope.b_driverLicense = true;
                    $scope.b_deliveryAddress = false;
                }
                if (item.id == 'B001') {
                    $scope.b_company = true;
                    $scope.b_driverLicense = false;
                    $scope.b_deliveryAddress = true;

                    //Nếu chưa get LatLng thì lấy LatLng về
                    if (countListLatLng == 0) {
                        convertAddressToLatLng();
                    }
                }
            };

            function init() {
            }

            $scope.uploadFile = function () {
                $("#fileButton").val('');
                $scope.excel = '';
                console.log('26', new Date().getTime());
            };


            var listOrders, rootListOrders;
            $scope.GetImport = function () {

                var tempOrders = [];
                var json = $scope.excel;

                console.log('36', new Date().getTime());
                console.log(json);
                $scope.accounts = json.Sheet1;
                for (var i = 0; i < $scope.accounts.length; i++) {
                    $scope.accounts[i].stt = i + 1;
                    console.log($scope.accounts[i].stt, isValidDate($scope.accounts[i].BirthDay));
                    if (!isValidDate($scope.accounts[i].BirthDay)) {
                        $scope.show = "Sai ngày sinh tại dòng thứ " + $scope.accounts[i].stt;
                        iAlert(ngDialog, $scope);

                        $scope.accounts = [];
                        return;
                    }

                }

                //Nếu là khách hàng thì chuyển địa chỉ giao hàng ra thành LatLng
                if ($scope.selectedRole.selected.id == 'B001') {
                    convertAddressToLatLng();
                }
            };

            var details = [];
            var countListLatLng = 0;

            function convertAddressToLatLng() {
                countListLatLng = 0;
                getLatLng();
            }

            function getLatLng() {
                if (countListLatLng < $scope.accounts.length) {
                    $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' +
                        $scope.accounts[countListLatLng].DeliveryAddress + '&key=AIzaSyCbMGRUwcqKjlYX4h4-P6t-xcDryRYLmCM')
                        .then(function (coord_results) {
                                $scope.queryResults = coord_results.data.results;
                                $scope.geodata = $scope.queryResults[0].geometry;

                                console.log($scope.queryResults[0].formatted_address);

                                // //Chuyển đổi lấy quận và thành phố.
                                // var area = getArea($scope.queryResults[0].formatted_address);
                                // $scope.accounts[countListLatLng]._area_id = '';
                                // for(var i = 0; i < listAreas.length; i++)
                                // {
                                //     if(listAreas[i]._city === area.city && listAreas[i]._district === area.district)
                                //     {
                                //         $scope.accounts[countListLatLng]._area_id = listAreas[i]._area
                                //     }
                                // }
                                //
                                // if($scope.accounts[countListLatLng]._area_id === '') $scope.accounts[countListLatLng]._area_id = "Chưa xác định";

                                console.log("geo : " + JSON.stringify($scope.queryResults[0].geometry.location));

                                $scope.accounts[countListLatLng]._latitude = JSON.stringify($scope.queryResults[0].geometry.location.lat);
                                $scope.accounts[countListLatLng]._longitude = JSON.stringify($scope.queryResults[0].geometry.location.lng);

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
                    for (var i = 0; i < $scope.accounts.length; i++) {
                        console.log("add marker nhieu hon nao");
                        addMarker($scope.accounts[i]);
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

                $scope.accounts[clickingRow]._latitude = tempMarker[0];
                $scope.accounts[clickingRow]._longitude = tempMarker[1];

                //3 điểm mới tạo thành một vùng
                if ($scope.path1.length >= 3) {
                    $scope.accounts[clickingRow].polygon = JSON.stringify($scope.path1);
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

            $scope.showImage = false;
            $scope.showImageButton = function (x) {
                clickingRow = x.stt - 1;
                console.log(x);
                $scope.showImage = true;
            };

            $scope.closeShowImage = function () {
                $scope.srcImage = "";
                $scope.showImage = false;
            };

            $scope.createImage = function () {

                $scope.accounts[clickingRow].image = $scope.srcImage;
                $scope.showImage = false;

            };
            $scope.uploadImage = function () {
                $("#fileButtonImage").val('');
                console.log('26', new Date().getTime());
            };

            $scope.uploadFile = function (event) {
                console.log('285');

                var file = event.target.files[0];
                var storageRef = firebase.storage().ref(file.name);

                storageRef.put(file).then((snapshot) => {
                    var image = snapshot.downloadURL;
                console.log('link', image);
                $scope.srcImage = image;
            })
                ;
            };

            $scope.saveAccounts = function () {
                //Save toàn bộ thông tin.
                if ($scope.accounts.length == 0) {
                    $scope.show = "Bạn chưa chọn tập tin!";
                    iAlert(ngDialog, $scope);
                }
                else {
                    // console.log($scope.accounts);

                    var listData = [];
                    for (var i = 0; i < $scope.accounts.length; i++) {
                        var splitDate = $scope.accounts[i].BirthDay.split('/');
                        var date = new Date(splitDate[2], splitDate[1] - 1, splitDate[0]);

                        var data = {
                            _identify_card: $scope.accounts[i].IdNumber,
                            _name: $scope.accounts[i].FullName,
                            _email: $scope.accounts[i].Email,
                            _date_of_birth: date.getTime(),
                            _address: $scope.accounts[i].Address,
                            _phone: $scope.accounts[i].PhoneNumber,
                            _gender: $scope.accounts[i].Gender,
                            _permission_id: $scope.selectedRole.selected.id,
                            _is_enabled: true,
                            _image: $scope.accounts[i].image,

                        };

                        var item = $scope.selectedRole.selected;

                        if (item.id == 'C001') {
                            data._company = $scope.accounts[i].CompanyName;
                        }
                        if (item.id == 'C002') {
                            data._driverLicenseNumber = $scope.accounts[i].DriverLicenseNumber;
                            data._driverLicenseName = $scope.accounts[i].DriverLicenseName;
                            data._company = $scope.accounts[i].CompanyName;
                        }
                        if (item.id == 'B001') {
                            data._deliveryAddress = $scope.accounts[i].DeliveryAddress;
                            data._latitude = $scope.accounts[i]._latitude;
                            data._longitude = $scope.accounts[i]._longitude;
                            data._radius = 50;
                            data._polygon = $scope.accounts[i].polygon;
                        }

                        listData.push(data);
                    }

                    console.log(listData);

                    $urll = $rootScope.api_url.postAccountCreate_N;

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

            function isValidDate(s) {
                var bits = s.split('/');
                var d = new Date(bits[2], bits[1] - 1, bits[0]);
                return d && (d.getMonth() + 1) == bits[1];
            }

        }
    });