angular.module('mShipperApp')
    .component('orderCreate', {
    templateUrl: './Orders/Create.html',
    controller: function DsDonHangController($rootScope, $scope, $http, $filter, ngDialog, $location, $timeout, $parse, modalOrderCreate, NgMap) {
        $(document).ready(function () {
            init();
        });

        var listAreas = [];
        function init() {
            $scope.orders = [];
            $url = $rootScope.api_url.getAreaShow;
            httpGet($http, $url,
                function (response) {
                    console.log("info::" + response.data);
                    listAreas = response.data;
                }, function (response) {
                    $scope.statustext = 'error';
                });
        }

        $scope.uploadFile = function () {
            $("#fileButton").val('');
            $scope.excel = '';
        };


        var listOrders, rootListOrders;
        $scope.GetImport = function () {

            var tempOrders = [];
            var json = $scope.excel;

            for (var i = 0; i < json.Sheet1.length; i++) {
                var obj = json.Sheet1[i];
                var objStr = JSON.stringify(json.Sheet1[i]);
                console.log("object :" + i + " : " + objStr);
                if (i !== 0 && json.Sheet1[i].Id !== json.Sheet1[i - 1].Id || i == 0)
                    tempOrders.push({
                        _id: obj.Id,
                        _created_date: formatDate(obj.CreatedDay),
                        _expected_date: formatDate(obj.ExpectedDay),
                        _address: obj.Address,
                        _latitude: '0',
                        _longitude: '0',
                        _area_id: '',
                        _order_status: 'Đang vận chuyển',
                        _note: obj.Note
                    })

            }

            rootListOrders = tempOrders;
            $scope.orders = tempOrders;

            addDetails();
            convertAddressToLatLng();
        };

        var details = [];

        function addDetails() {
            var json = $scope.excel;

            for (var i = 0; i < json.Sheet1.length; i++) {
                var obj = json.Sheet1[i];

                details.push({
                    _order_id: obj.Id,
                    _id_package: obj.IdPackage,
                    _total_pay: obj.TotalPay,
                    _pay_type: obj.PayType,
                    _package_type: obj.PackageType
                })

                console.log("detail : " + details[i]);
            }
        }

        var countListLatLng = 0;

        function convertAddressToLatLng() {
            countListLatLng = 0;
            getLatLng();
        }

        function getLatLng() {
            if (countListLatLng < $scope.orders.length) {
                $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' +
                    $scope.orders[countListLatLng]._address + '&key=AIzaSyCbMGRUwcqKjlYX4h4-P6t-xcDryRYLmCM')
                    .then(function (coord_results) {
                            $scope.queryResults = coord_results.data.results;
                            $scope.geodata = $scope.queryResults[0].geometry;

                            console.log($scope.queryResults[0].formatted_address);

                            //Chuyển đổi lấy quận và thành phố.
                            var area = getArea($scope.queryResults[0].formatted_address);
                            $scope.orders[countListLatLng]._area_id = '';
                            for(var i = 0; i < listAreas.length; i++)
                            {
                                if(listAreas[i]._city === area.city && listAreas[i]._district === area.district)
                                {
                                    $scope.orders[countListLatLng]._area_id = listAreas[i]._area
                                }
                            }

                            if($scope.orders[countListLatLng]._area_id === '') $scope.orders[countListLatLng]._area_id = "Chưa xác định";

                            console.log("geo : " + JSON.stringify($scope.queryResults[0].geometry.location));

                            $scope.orders[countListLatLng]._latitude = JSON.stringify($scope.queryResults[0].geometry.location.lat);
                            $scope.orders[countListLatLng]._longitude = JSON.stringify($scope.queryResults[0].geometry.location.lng);

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
                for (var i = 0; i < $scope.orders.length; i++) {
                    console.log("add marker nhieu hon nao");
                    addMarker($scope.orders[i]);
                }
            }

        }


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

        $scope.center = [10.7680338,106.414162];

        $scope.markers = [];

        function addMarker(event) {
            $scope.markers.push({pos:[event._latitude, event._longitude], id : event._id, label : event._address});
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

        $scope.saveOrders = function () {
            //Save toàn bộ thông tin.
            if ($scope.orders.length == 0) {
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
        }

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