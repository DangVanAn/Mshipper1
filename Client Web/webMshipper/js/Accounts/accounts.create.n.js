angular.module('mShipperApp')
    .component('accountCreateN', {
        templateUrl: './Accounts/Create.n.html',
        controller: function DsDonHangController($rootScope, $scope, $http, $filter, ngDialog, $location, $timeout, $parse, modalOrderCreate, NgMap, NgTableParams) {
            $(document).ready(function () {
                init();
            });

            $scope.role = $rootScope.listRole;
            $scope.selectedRole = {};
            $scope.selectedRole.selected = $scope.role[0];

            $scope.b_company = false;
            $scope.b_driverLicense = false;
            $scope.b_deliveryAddress = false;
            $scope.b_delivery_manager = false;

            $scope.selectRole = function (item) {
                console.log(item);

                if (item.id == 'A001' || item.id == 'A002' || item.id == 'A003' || item.id == 'A004') {
                    $scope.b_company = false;
                    $scope.b_driverLicense = false;
                    $scope.b_deliveryAddress = false;
                    $scope.b_delivery_manager = false;
                }
                if (item.id == 'C001') {
                    $scope.b_company = true;
                    $scope.b_driverLicense = false;
                    $scope.b_deliveryAddress = false;
                    $scope.b_delivery_manager = true;
                }
                if (item.id == 'C002') {
                    $scope.b_company = false;
                    $scope.b_driverLicense = true;
                    $scope.b_deliveryAddress = false;
                    $scope.b_delivery_manager = true;
                }
                if (item.id == 'B001') {
                    $scope.b_company = true;
                    $scope.b_driverLicense = false;
                    $scope.b_deliveryAddress = true;
                    $scope.b_delivery_manager = false;

                    //Nếu chưa get LatLng thì lấy LatLng về
                    if (countListLatLng == 0) {
                        convertAddressToLatLng();
                    }
                }
            };

            function init() {
                $scope.accounts = [];
            }

            $scope.uploadFile = function () {
                $("#fileButton").val('');
                $scope.excel = '';
                console.log('26', new Date().getTime());
            };

            $scope.GetImport = function () {
                $scope.accounts = [];
                var json = $scope.excel;

                console.log('36', new Date().getTime());
                console.log(json);
                for (var i = 0; i < json.Sheet1.length; i++) {
                    var obj =  json.Sheet1[i];

                    var data = {
                        stt : i + 1,
                        _identify_card: obj['Số Thẻ Căn Cước'],
                        _name: obj['Họ Và Tên'],
                        _email: obj['Email'],
                        _date_of_birth: obj['Ngày Sinh'],
                        _address: obj['Địa Chỉ'],
                        _phone: obj['Số Điện Thoại'],
                        _gender: obj['Giới Tính'],
                        _driverLicenseNumber : obj['Số Bằng Lái Xe'],
                        _driverLicenseName : obj['Bằng Lái Xe'],
                        _id_delivery : obj['Mã Điểm Giao Hàng'],
                        _name_customer : obj['Tên Nhà Phân Phối'],
                        _id_customer : obj['Mã Nhà Phân Phối'],
                        _company : obj['Tên Công Ty'],
                        _deliveryAddress : obj['Địa Chỉ Giao Hàng'],
                        _name_delivery_manager : obj['Tên Nhà Xe'],
                        _id_delivery_manager : obj['Mã Nhà Xe'],
                    };

                    if (!isValidDate(data._date_of_birth)) {
                        $scope.show = "Sai ngày sinh tại dòng thứ " + $scope.accounts[i].stt;
                        iAlert(ngDialog, $scope);

                        $scope.accounts = [];
                        return;
                    }

                    $scope.accounts.push(data);
                }

                console.log($scope.accounts);

                $scope.tableAccouts = new NgTableParams({}, {
                    dataset: $scope.accounts
                });

                //Nếu là khách hàng thì chuyển địa chỉ giao hàng ra thành LatLng
                if ($scope.selectedRole.selected.id == 'B001') {
                    convertAddressToLatLng();
                }
            };

            var countListLatLng = 0;

            function convertAddressToLatLng() {
                countListLatLng = 0;
                getLatLng();
            }

            function getLatLng() {
                if (countListLatLng < $scope.accounts.length) {
                    $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' +
                        $scope.accounts[countListLatLng]._deliveryAddress + '&key=AIzaSyCbMGRUwcqKjlYX4h4-P6t-xcDryRYLmCM')
                        .then(function (coord_results) {
                                $scope.queryResults = coord_results.data.results;
                                $scope.geodata = $scope.queryResults[0].geometry;

                                console.log($scope.queryResults[0].formatted_address);
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
                    $scope.accounts[clickingRow]._polygon = JSON.stringify($scope.path1);
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

                $scope.path = JSON.parse(x._polygon);
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

                $scope.accounts[clickingRow]._image = $scope.srcImage;
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
                    for (var i = 0; i < $scope.accounts.length; i++) {

                        $scope.accounts[i]._permission_id = $scope.selectedRole.selected.id;
                        $scope.accounts[i]._is_enabled =  true;

                        var item = $scope.selectedRole.selected;

                        if (item.id == 'A001' || item.id == 'A002' || item.id == 'A003' || item.id == 'A004') {
                            $scope.accounts[i]._company = '';
                            $scope.accounts[i]._driverLicenseName = '';
                            $scope.accounts[i]._driverLicenseNumber = '';
                            $scope.accounts[i]._id_delivery = '';
                            $scope.accounts[i]._deliveryAddress = '';
                            $scope.accounts[i]._id_customer = '';
                            $scope.accounts[i]._name_customer = '';
                            $scope.accounts[i]._name_delivery_manager = '';
                            $scope.accounts[i]._id_delivery_manager = '';
                            $scope.accounts[i]._latitude = '';
                            $scope.accounts[i]._longitude = '';
                            $scope.accounts[i]._radius = 0;
                            $scope.accounts[i]._polygon = '';
                            $scope.accounts[i]._image = '';
                        }
                        if (item.id == 'C001') {
                            $scope.accounts[i]._id_customer = '';
                            $scope.accounts[i]._name_customer = '';
                            $scope.accounts[i]._driverLicenseName = '';
                            $scope.accounts[i]._driverLicenseNumber = '';
                            $scope.accounts[i]._id_delivery = '';
                            $scope.accounts[i]._deliveryAddress = '';
                            $scope.accounts[i]._latitude = '';
                            $scope.accounts[i]._longitude = '';
                            $scope.accounts[i]._radius = 0;
                            $scope.accounts[i]._polygon = '';
                            $scope.accounts[i]._image = '';
                        }
                        if (item.id == 'C002') {
                            $scope.accounts[i]._id_customer = '';
                            $scope.accounts[i]._name_customer = '';
                            $scope.accounts[i]._company = '';
                            $scope.accounts[i]._id_delivery = '';
                            $scope.accounts[i]._deliveryAddress = '';
                            $scope.accounts[i]._latitude = '';
                            $scope.accounts[i]._longitude = '';
                            $scope.accounts[i]._radius = 0;
                            $scope.accounts[i]._polygon = '';
                        }
                        if (item.id == 'B001') {
                            $scope.accounts[i]._driverLicenseName = '';
                            $scope.accounts[i]._driverLicenseNumber = '';
                            $scope.accounts[i]._name_delivery_manager = '';
                            $scope.accounts[i]._id_delivery_manager = '';
                            $scope.accounts[i]._radius = 50;
                            $scope.accounts[i]._image = '';
                        }
                    }

                    $urll = $rootScope.api_url.postAccountCreate_N;

                    $http({
                        method: 'POST',
                        url: $urll,
                        headers: {'Content-Type': 'application/json'},
                        data: $scope.accounts
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