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

            function getArea(fullAdress) {
                var city = '';
                var district = '';
                var nation = '';
                var count = 0;
                for (var i = fullAdress.length - 1; i >= 0; i--) {
                    if (fullAdress[i] !== ',') {
                        if (count === 0) nation += fullAdress[i];
                        if (count === 1) city += fullAdress[i];
                        if (count === 2) district += fullAdress[i];
                    }
                    else {
                        count++;
                    }
                }

                nation = nation.split("").reverse().join("");
                city = city.split("").reverse().join("");
                district = district.split("").reverse().join("");

                if (nation[0] === ' ') nation = nation.substring(1);
                if (city[0] === ' ') city = city.substring(1);
                if (district[0] === ' ') district = district.substring(1);

                return {city: city, district: district};
            }

            NgMap.getMap().then(function (map) {
                google.maps.event.trigger(map, "resize");
            });

            $scope.center = [10.7680338, 106.414162];

            $scope.markers = [];

            function addMarker(event) {
                $scope.markers.push({pos: [event._latitude, event._longitude], label: event.DeliveryAddress});
            }

            $scope.status = [
                "Tất cả",
                "Hoàn thành",
                "Đang vận chuyển",
                "Hủy"
            ];
            $scope.selectStatus = $scope.status[0];


            $scope.changeStatus = function () {
                console.log('change Trang thai');
                filterAll();
            }


            $scope.example6data = [];
            $scope.example6model = [];
            $scope.example6settings = {
                showCheckAll: false,
                showUncheckAll: false
            };

            $scope.myEventListeners = {
                onSelectionChanged: onSelectionChanged
            };

            function onSelectionChanged() {
                console.log('select all : ' + $scope.example6model);

                filterAll();
            }

            function formatDate(inDate) {
                var dd = '';
                var mm = '';
                var yy = '';
                var count = 0;
                for (var i = 0; i < inDate.length; i++) {
                    if (inDate[i] === '/') {
                        count++;
                    }
                    else {
                        if (count === 0) {
                            dd += inDate[i];
                        }

                        if (count === 1) {
                            mm += inDate[i];
                        }

                        if (count === 2) {
                            yy += inDate[i];
                        }
                    }
                }
                if (dd.length === 1) dd = '0' + dd;
                if (mm.length === 1) mm = '0' + mm;
                if (yy.length === 2) yy = '20' + yy;
                return dd + '/' + mm + '/' + yy;
            }

            function filterAll() {
                listOrders = rootListOrders;

                // timeBeginDate = $("#beginDate").datepicker('getDate').getTime();
                // timeEndDate = $("#endDate").datepicker('getDate').getTime();
                // var listTemp = [];
                // for (var i = 0; i < listOrders.length; i++) {
                //     var d = new Date(getY(listOrders[i]._created_date), getM(listOrders[i]._created_date) - 1, getD(listOrders[i]._created_date));
                //     if (d.getTime() >= timeBeginDate && d.getTime() <= timeEndDate) {
                //         console.log("Sao ma bang duoc nhi");
                //         listTemp.push(listOrders[i]);
                //     }
                // }
                // listOrders = listTemp;
                // console.log('begin : ' + timeBeginDate + " : " + 'end : ' + timeEndDate);

                if ($scope.example6model.length != 0) {
                    listTemp = [];
                    for (var i = 0; i < listOrders.length; i++) {
                        for (var j = 0; j < $scope.example6model.length; j++) {
                            if ($scope.example6model[j].id == listOrders[i]._area_id) {
                                listTemp.push(listOrders[i]);
                                break;
                            }
                        }
                    }
                    listOrders = listTemp;
                }

                // if ($scope.selectStatus != 'Tất cả') {
                //     listTemp = [];
                //     for (var i = 0; i < listOrders.length; i++) {
                //         if (listOrders[i]._order_status == $scope.selectStatus) {
                //             listTemp.push(listOrders[i]);
                //         }
                //     }
                //     listOrders = listTemp;
                // }

                $scope.orders = listOrders;
                $scope.$evalAsync();

                $scope.markers = [];
                for (var i = 0; i < $scope.orders.length; i++) {
                    addMarker($scope.orders[i]);
                }
            }

            var timeBeginDate, timeEndDate;

            var dateFormat = "dd/mm/yy",
                from = $("#beginDate")
                    .datepicker({
                        defaultDate: "+1w",
                        changeMonth: true,
                        changeYear: true,
                        maxDate: "+0D",
                        dateFormat: "dd/mm/yy",
                        onSelect: function () {
                            var dateObject = $(this).datepicker('getDate');
                            console.log('beginDate: ' + dateObject.getTime());
                            filterAll();
                        }
                    }).datepicker("setDate", new Date())
                    .on("change", function () {
                        to.datepicker("option", "minDate", getDate(this));
                    }),
                to = $("#endDate").datepicker({
                    defaultDate: "+1w",
                    changeMonth: true,
                    changeYear: true,
                    maxDate: "+0D",
                    dateFormat: "dd/mm/yy",
                    onSelect: function () {
                        var dateObject = $(this).datepicker('getDate');
                        console.log('endDate: ' + dateObject.getTime());
                        filterAll();
                    }
                }).datepicker("setDate", new Date())
                    .on("change", function () {
                        from.datepicker("option", "maxDate", getDate(this));
                    });

            function getDate(element) {
                var date;
                try {
                    date = $.datepicker.parseDate(dateFormat, element.value);
                } catch (error) {
                    date = null;
                }

                return date;
            };

            $scope.loadDetails = function (x) {
                console.log(x._latitude);
                console.log(x._longitude);

                // Show modal
                var listDetailModal = [];
                for (var i = 0; i < details.length; i++) {
                    if (details[i]._order_id === x._id) {
                        listDetailModal.push(details[i]);
                    }
                }

                modalOrderCreate.show(listDetailModal, function (selected) {
                    if (selected) {
                        console.log("Nhan duoc::" + selected.toString());

                    }
                    else {
                        console.log("không có");
                    }
                });
            }

            $scope.saveAccounts = function () {
                //Save toàn bộ thông tin.
                if ($scope.accounts.length == 0) {
                    $scope.show = "Bạn chưa chọn tập tin đơn hàng!";
                    iAlert(ngDialog, $scope);
                }
                else {
                    var tempOr = JSON.stringify($scope.orders);
                    tempOr = JSON.parse(tempOr);

                    for (var i = 0; i < tempOr.length; i++) {

                        console.log("Created : " + tempOr[i]._created_date + " : " + tempOr[i]._expected_date);
                        tempOr[i]._created_date = new Date(getY(tempOr[i]._created_date), getM(tempOr[i]._created_date) - 1, getD(tempOr[i]._created_date)).getTime();
                        tempOr[i]._expected_date = new Date(getY(tempOr[i]._expected_date), getM(tempOr[i]._expected_date) - 1, getD(tempOr[i]._expected_date)).getTime();
                    }

                    $urll = 'http://localhost:9999/orders/adds'

                    $http({
                        method: 'POST',
                        url: $urll,
                        headers: {'Content-Type': 'application/json'},
                        data: tempOr
                    }).then(function successCallback(response) {
                        console.log(response.data);
                        $scope.show = response.data;
                        iAlert(ngDialog, $scope);
                    }, function errorCallback(response) {
                        $scope.statustext = 'error';
                    });

                    $urll = 'http://localhost:9999/details/adds'

                    $http({
                        method: 'POST',
                        url: $urll,
                        headers: {'Content-Type': 'application/json'},
                        data: details
                    }).then(function successCallback(response) {
                        console.log(response.data);
                    }, function errorCallback(response) {
                        $scope.statustext = 'error';
                    });
                }
            };

            function towWordNumber(number) {
                if (number < 10) {
                    return ("0" + number.toString());
                }
                return number.toString();
            }

            function getD(date) {
                var temp = date.charAt(0) + date.charAt(1);
                temp = Number(temp);
                return temp;
            }

            function getM(date) {
                var temp = date.charAt(3) + date.charAt(4);
                temp = Number(temp);
                return temp;
            }

            function getY(date) {
                var temp = date.charAt(6) + date.charAt(7) + date.charAt(8) + date.charAt(9);
                temp = Number(temp);
                return temp;
            }

        }
    });