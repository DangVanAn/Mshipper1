angular.module('mShipperApp').component('danhSachDonHang', {
    templateUrl: './Orders/Show.html',
    controller: function DsDonHangController($scope, $http, modalOrderShow, NgMap, $filter, $location, $timeout) {
        $(document).ready(function () {

        });
        $scope.list = $scope.$parent.personList = $scope.people = [{
            "id": 0,
            "age": 24,
            "name": "Mathis Hurst",
            "birthdate": "2004-11-17T00:04:56 -01:00"
        }, {
            "id": 1,
            "age": 38,
            "name": "Gallegos Ryan",
            "birthdate": "2001-08-06T11:04:54 -02:00"
        }, {
            "id": 2,
            "age": 27,
            "name": "Jodi Valencia",
            "birthdate": "2012-10-16T12:15:19 -02:00"
        }, {
            "id": 3,
            "age": 28,
            "name": "Jenna Anderson",
            "birthdate": "1990-05-06T01:57:40 -02:00"
        }, {
            "id": 4,
            "age": 28,
            "name": "Horne Clark",
            "birthdate": "1991-11-19T19:23:53 -01:00"
        }, {
            "id": 5,
            "age": 21,
            "name": "Briggs Walters",
            "birthdate": "1990-01-12T08:16:45 -01:00"
        }, {
            "id": 6,
            "age": 27,
            "name": "Rena Higgins",
            "birthdate": "2006-10-10T17:10:05 -02:00"
        }, {
            "id": 7,
            "age": 32,
            "name": "Adrian Marquez",
            "birthdate": "1993-04-15T04:55:00 -02:00"
        }, {
            "id": 8,
            "age": 25,
            "name": "Alberta Ellison",
            "birthdate": "2010-07-24T12:22:32 -02:00"
        }, {
            "id": 9,
            "age": 20,
            "name": "Mcleod Stark",
            "birthdate": "1999-11-26T06:31:55 -01:00"
        }, {
            "id": 10,
            "age": 22,
            "name": "Neal Patrick",
            "birthdate": "2009-11-19T04:09:01 -01:00"
        }, {
            "id": 11,
            "age": 36,
            "name": "Williamson Roman",
            "birthdate": "2008-09-11T07:58:56 -02:00"
        }, {
            "id": 12,
            "age": 36,
            "name": "Fry Baxter",
            "birthdate": "2006-03-26T06:34:45 -02:00"
        }, {
            "id": 13,
            "age": 27,
            "name": "Florence Fuentes",
            "birthdate": "1991-11-05T14:21:19 -01:00"
        }, {
            "id": 14,
            "age": 32,
            "name": "Claudine Nunez",
            "birthdate": "2010-04-07T08:08:06 -02:00"
        }, {
            "id": 15,
            "age": 35,
            "name": "Sylvia Lindsay",
            "birthdate": "1992-07-28T21:54:32 -02:00"
        }, {
            "id": 16,
            "age": 36,
            "name": "Rosalie Wilkins",
            "birthdate": "1994-05-07T06:35:55 -02:00"
        }, {
            "id": 17,
            "age": 31,
            "name": "Dina Carpenter",
            "birthdate": "2013-12-05T21:29:41 -01:00"
        }, {
            "id": 18,
            "age": 38,
            "name": "Roxanne Cardenas",
            "birthdate": "2007-05-04T03:52:48 -02:00"
        }, {
            "id": 19,
            "age": 29,
            "name": "Sasha Everett",
            "birthdate": "2006-08-03T20:29:32 -02:00"
        }, {
            "id": 20,
            "age": 27,
            "name": "Chandler Crawford",
            "birthdate": "2009-02-24T18:25:31 -01:00"
        }, {
            "id": 21,
            "age": 32,
            "name": "Flora Boyle",
            "birthdate": "1995-09-03T23:04:36 -02:00"
        }, {
            "id": 22,
            "age": 37,
            "name": "Terrie Moran",
            "birthdate": "1989-09-25T05:07:00 -02:00"
        }, {
            "id": 23,
            "age": 30,
            "name": "Mueller Hewitt",
            "birthdate": "2007-07-15T22:25:24 -02:00"
        }, {
            "id": 24,
            "age": 37,
            "name": "Neva Mcfadden",
            "birthdate": "1997-04-22T17:07:56 -02:00"
        }, {
            "id": 25,
            "age": 20,
            "name": "Oconnor Lang",
            "birthdate": "1999-10-18T02:26:35 -02:00"
        }, {
            "id": 26,
            "age": 32,
            "name": "Lucille Mcguire",
            "birthdate": "2012-04-19T09:10:43 -02:00"
        }, {
            "id": 27,
            "age": 38,
            "name": "Nadia Beach",
            "birthdate": "2007-08-02T15:59:16 -02:00"
        }, {
            "id": 28,
            "age": 24,
            "name": "George Mercer",
            "birthdate": "2005-07-21T03:44:46 -02:00"
        }, {
            "id": 29,
            "age": 28,
            "name": "Reid Spears",
            "birthdate": "1996-10-07T19:29:49 -02:00"
        }, {
            "id": 30,
            "age": 25,
            "name": "Allen Woods",
            "birthdate": "2002-03-21T12:42:21 -01:00"
        }, {
            "id": 31,
            "age": 28,
            "name": "Jeannette Alford",
            "birthdate": "1993-01-11T21:15:10 -01:00"
        }, {
            "id": 32,
            "age": 35,
            "name": "Mia Pittman",
            "birthdate": "1990-08-05T16:59:03 -02:00"
        }, {
            "id": 33,
            "age": 39,
            "name": "Amanda Holder",
            "birthdate": "1989-11-02T04:42:42 -01:00"
        }, {
            "id": 34,
            "age": 25,
            "name": "Nelson Jimenez",
            "birthdate": "1994-10-18T17:33:06 -02:00"
        }, {
            "id": 35,
            "age": 35,
            "name": "Griffith Soto",
            "birthdate": "2000-02-10T22:29:47 -01:00"
        }, {
            "id": 36,
            "age": 39,
            "name": "Forbes Fernandez",
            "birthdate": "2003-09-17T06:09:03 -02:00"
        }, {
            "id": 37,
            "age": 24,
            "name": "Deana Ross",
            "birthdate": "1996-06-15T20:53:02 -02:00"
        }, {
            "id": 38,
            "age": 27,
            "name": "Lawrence Kane",
            "birthdate": "2005-09-21T20:14:37 -02:00"
        }, {
            "id": 39,
            "age": 31,
            "name": "Lillie Velez",
            "birthdate": "2006-03-19T07:29:01 -01:00"
        }, {
            "id": 40,
            "age": 33,
            "name": "Ester Winters",
            "birthdate": "2004-07-23T03:42:29 -02:00"
        }, {
            "id": 41,
            "age": 35,
            "name": "Dalton Casey",
            "birthdate": "2005-05-19T15:38:52 -02:00"
        }, {
            "id": 42,
            "age": 39,
            "name": "Valenzuela Bass",
            "birthdate": "2014-02-15T08:58:13 -01:00"
        }, {
            "id": 43,
            "age": 24,
            "name": "Middleton Vinson",
            "birthdate": "2013-11-08T14:10:54 -01:00"
        }, {
            "id": 44,
            "age": 22,
            "name": "Rochelle Wilson",
            "birthdate": "1993-05-22T02:01:20 -02:00"
        }, {
            "id": 45,
            "age": 40,
            "name": "Mabel Mendoza",
            "birthdate": "1990-09-18T20:13:21 -02:00"
        }, {
            "id": 46,
            "age": 29,
            "name": "April Becker",
            "birthdate": "2004-07-12T09:52:10 -02:00"
        }, {
            "id": 47,
            "age": 40,
            "name": "Ross Ruiz",
            "birthdate": "2001-11-04T23:53:48 -01:00"
        }, {
            "id": 48,
            "age": 25,
            "name": "Turner Chan",
            "birthdate": "2012-03-11T17:03:04 -01:00"
        }, {
            "id": 49,
            "age": 30,
            "name": "Liliana Alvarado",
            "birthdate": "2001-06-18T22:53:49 -02:00"
        }, {
            "id": 50,
            "age": 38,
            "name": "Beverley Bailey",
            "birthdate": "2014-02-02T11:41:59 -01:00"
        }, {
            "id": 51,
            "age": 30,
            "name": "Wendy Conway",
            "birthdate": "2000-08-09T21:22:47 -02:00"
        }, {
            "id": 52,
            "age": 28,
            "name": "Alejandra Dixon",
            "birthdate": "2002-07-15T22:57:49 -02:00"
        }, {
            "id": 53,
            "age": 34,
            "name": "Alvarado Little",
            "birthdate": "1990-08-25T00:59:27 -02:00"
        }, {
            "id": 54,
            "age": 28,
            "name": "Gordon Bird",
            "birthdate": "2000-11-12T22:56:35 -01:00"
        }, {
            "id": 55,
            "age": 33,
            "name": "Francine Frost",
            "birthdate": "1994-04-04T02:51:37 -02:00"
        }, {
            "id": 56,
            "age": 40,
            "name": "Stafford Atkinson",
            "birthdate": "1988-02-06T13:27:58 -01:00"
        }, {
            "id": 57,
            "age": 26,
            "name": "Tisha Reeves",
            "birthdate": "1990-06-26T12:56:19 -02:00"
        }, {
            "id": 58,
            "age": 39,
            "name": "Beryl Allison",
            "birthdate": "2013-02-03T14:16:43 -01:00"
        }, {
            "id": 59,
            "age": 33,
            "name": "Noelle Hanson",
            "birthdate": "1999-07-28T12:56:10 -02:00"
        }, {
            "id": 60,
            "age": 32,
            "name": "Ashlee Mercado",
            "birthdate": "1997-11-11T06:51:29 -01:00"
        }, {
            "id": 61,
            "age": 22,
            "name": "Wheeler Farmer",
            "birthdate": "1991-07-09T05:41:49 -02:00"
        }, {
            "id": 62,
            "age": 24,
            "name": "Joann Hartman",
            "birthdate": "2003-09-09T21:54:19 -02:00"
        }];
        $scope.config = {
            itemsPerPage: 5,
            fillLastPage: true
        };
        NgMap.getMap().then(function (map) {
            google.maps.event.trigger(map, "resize");
        });

        $scope.center = [51.5285578, -0.242023];

        $scope.markers =[];

        function addMarker(event) {
            $scope.markers.push({pos:[event._latitude, event._longitude]});
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

        //Get latLong from address
        $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' +
            '150 Nguyễn Thị Nhỏ, Phường 15, Quận 11, TP.HCM' + '&key=AIzaSyCbMGRUwcqKjlYX4h4-P6t-xcDryRYLmCM')
            .then(function(coord_results){
                    $scope.queryResults = coord_results.data.results;
                    $scope.geodata = $scope.queryResults[0].geometry;

                    console.log("geo : " + JSON.stringify($scope.queryResults[0].geometry.location));
                },
                function error(_error){
                    $scope.queryError = _error;
                });

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
                if (d.getTime() >= timeBeginDate && d.getTime() <= timeEndDate) {
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