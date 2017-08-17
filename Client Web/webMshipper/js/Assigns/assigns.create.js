angular.module('mShipperApp')
    .component('assignCreate', {
    templateUrl: './Assigns/Create.html',
    controller: function DsDonHangController($rootScope, $scope, $http, modalOrderShow, $filter, ngDialog, $location, $timeout, $parse, modalOrderCreate, NgMap) {
        $(document).ready(function () {

        });

        NgMap.getMap().then(function (map) {
            google.maps.event.trigger(map, "resize");
        });

        $scope.center = [10.7680338,106.414162];

        $scope.markers =[];

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

        function filterAll() {
            listOrders = rootListOrders;

            timeBeginDate = $("#beginDate").datepicker('getDate').getTime();
            timeEndDate = $("#endDate").datepicker('getDate').getTime();
            var listTemp = [];
            for (var i = 0; i < listOrders.length; i++) {
                if (listOrders[i]._created_date >= timeBeginDate && listOrders[i]._created_date <= timeEndDate) {
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
                    if (listOrders[i]._order_status == $scope.selectStatus) {
                        listTemp.push(listOrders[i]);
                    }
                }
                listOrders = listTemp;
            }

            $scope.orders = listOrders;
            $scope.$evalAsync();

            $scope.markers = [];
            for(var i = 0; i < $scope.orders.length; i++)
            {
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
                listOrders.sort(function(a, b){
                    if(a._id < b._id) return -1;
                    if(a._id > b._id) return 1;
                    return 0;
                });
                rootListOrders = response.data;
                rootListOrders.sort(function(a, b){
                    if(a._id < b._id) return -1;
                    if(a._id > b._id) return 1;
                    return 0;
                });
                var listArea = [];
                for(var i = 0; i < response.data.length; i++)
                {
                    listArea.push({id : i + 1, label : response.data[i]._area_id});
                }
                listArea.sort(function(a, b){
                    console.log(":a.label:" + a.label + ":" + b.label);
                    if(a.label < b.label) return -1;
                    if(a.label > b.label) return 1;
                    return 0;
                });
                $scope.example6data = listArea;
                $scope.orders = listOrders;
                console.log(response.data);

                filterAll();

            }, function errorCallback(response) {
                $scope.statustext = 'error';
            });
        }

        $scope.loadDetails = function (x) {
            modalOrderShow.show(x, function (selected) {
                if (selected) {
                    console.log("Nhan duoc::" + selected.toString());
                    x.session = selected.toString();
                }
                else {
                    console.log("không có");
                }
            });
        }
    }
});