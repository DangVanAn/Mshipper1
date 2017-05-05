angular.module('mShipperApp').component('danhSachDonHang', {
    templateUrl: './Orders/Show.html',
    controller: function DsDonHangController($scope, $http, modalShowMap, NgMap, $filter, $location, $timeout) {
        $(document).ready(function () {

        });

        NgMap.getMap().then(function (map) {
            google.maps.event.trigger(map, "resize");
        });

        $scope.center = [51.5285578, -0.242023];
        $scope.position = [51.5285578, -0.242023];

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

        $scope.example6data = [
            {id: 1, label: 'Khu vực 1'},
            {id: 2, label: 'Khu vực 2'},
            {id: 3, label: 'Khu vực 3'},
            {id: 4, label: 'Khu vực 4'},
            {id: 5, label: 'Khu vực 5'},
            {id: 6, label: 'Khu vực 6'},
            {id: 7, label: 'Khu vực 7'},
            {id: 8, label: 'Khu vực 8'},
            {id: 9, label: 'Khu vực 9'},
            {id: 10, label: 'Khu vực 10'},
            {id: 11, label: 'Khu vực 11'},
            {id: 12, label: 'Khu vực 12'}];
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

        function filterAll() {
            listOrders = rootListOrders;

            timeBeginDate = $("#beginDate").datepicker('getDate').getTime();
            timeEndDate = $("#endDate").datepicker('getDate').getTime();
            var listTemp = [];
            for (var i = 0; i < listOrders.length; i++) {
                var d = new Date(getY(listOrders[i]._created_date), getM(listOrders[i]._created_date) - 1, getD(listOrders[i]._created_date));
                if(d.getTime() >= timeBeginDate && d.getTime() <= timeEndDate)
                {
                    console.log("Sao ma bang duoc nhi");
                    listTemp.push(listOrders[i]);
                }
            }
            listOrders = listTemp;
            console.log('begin : ' + timeBeginDate + " : " + 'end : ' + timeEndDate);

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

            if ($scope.selectStatus != 'Tất cả') {
                listTemp = [];
                for (var i = 0; i < listOrders.length; i++) {
                    if(listOrders[i]._order_status == $scope.selectStatus)
                    {
                        listTemp.push(listOrders[i]);
                    }
                }
                listOrders = listTemp;
            }

            $scope.orders = listOrders;
            $scope.$apply();
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

        var listOrders, rootListOrders;
        init();

        function init() {

            $urll = 'http://localhost:9999/orders/getall'

            $http({
                method: 'GET',
                url: $urll,
                headers: {'Content-Type': 'application/json'},
            }).then(function successCallback(response) {

                listOrders = response.data;
                rootListOrders = response.data;
                for (var i = 0; i < listOrders.length; i++) {
                    console.log("chay dem");
                    console.log(listOrders[i]._created_date);

                    var d = new Date(listOrders[i]._created_date);
                    var dE = new Date(listOrders[i]._expected_date);

                    listOrders[i]._created_date = towWordNumber(d.getDate()) + "/" + towWordNumber(d.getMonth() + 1) + "/" + towWordNumber(d.getFullYear());
                    listOrders[i]._expected_date = towWordNumber(dE.getDate()) + "/" + towWordNumber(dE.getMonth() + 1) + "/" + towWordNumber(dE.getFullYear());
                }

                $scope.orders = listOrders;
                console.log(response.data);

                filterAll();

            }, function errorCallback(response) {
                $scope.statustext = 'error';
            });
        }

        $scope.loadMaps = function (x) {
            console.log(x._latitude);
            console.log(x._longitude);

            // Show modal

            modalShowMap.show(x, function (selected) {
                if (selected) {
                    console.log("Nhan duoc::" + selected.toString());
                    x.session = selected.toString();

                }
                else {
                    console.log("không có");
                }
            });
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