angular.module('mShipperApp').component('accountShow', {
    templateUrl: './Accounts/Show.html',
    controller: function DsDonHangController($scope, $rootScope, $http, $filter, $location, $timeout, ngDialog) {
        $(document).ready(function () {
            init();
        });

        function init() {
            $scope.accounts = [];
            getTeamLead();
        }

        var teamleads = [], userteamlists = [];

        function getTeamLead() {
            $url = 'http://localhost:9999/teamleads/getall'
            httpGet($http, $url,
                function (response) {
                    console.log("teamleads : " + JSON.stringify(response.data));
                    teamleads = response.data;
                    getUserTeamList();
                }, function (response) {
                    $scope.statustext = 'error';
                });
        }

        function getUserTeamList() {
            $url = 'http://localhost:9999/userteamlists/getall'
            httpGet($http, $url,
                function (response) {
                    console.log("userteamlist : " + JSON.stringify(response.data));
                    userteamlists = response.data;
                    getUser();
                }, function (response) {
                    $scope.statustext = 'error';
                });
        }

        function getUser() {
            $url = 'http://localhost:9999/users/getall'
            httpGet($http, $url,
                function (response) {
                    for (var i = 0; i < response.data.length; i++) {
                        for (var j = 0; j < $rootScope.listRole.length; j++) {
                            if ($rootScope.listRole[j].id == response.data[i]._permission_id) {
                                response.data[i]._permission = $rootScope.listRole[j].name;
                            }
                        }
                        $scope.accounts.push(response.data[i]);
                        $scope.accounts[$scope.accounts.length - 1].stt = $scope.accounts.length;
                    }
                }, function (response) {
                    $scope.statustext = 'error';
                });
        }

        $scope.addAcount = function () {
            $location.path('/accountscreate');
        }

        $('#overlay-showmore').hide();
        $scope.showMore = function (x) {
            console.log(x);
            $scope.detail_name = x._last_name + " " + x._first_name;
            $scope.detail_idnumber = x._identify_card;
            $scope.detail_email = x._email;
            $scope.detail_birth = x._date_of_birth;
            $scope.detail_address = x._address;
            $scope.detail_phone = x._phone;

            switch (x._gender) {
                case "01" :
                    $scope.detail_gender = "Nam";
                    break;
                case "02" :
                    $scope.detail_gender = "Nữ";
                    break;
                case "03" :
                    $scope.detail_gender = "Chưa xác định";
                    break;
            }

            //Chỉ hiển thị cho khách hàng phần nhập địa điểm
            if(x._permission_id == 'B001')
            {
                $('#tableCustomer').show();

                $scope.areas = [];
                getAreasByPhone(x._phone);
            }
            else {
                $('#tableCustomer').hide();
            }

            $('#overlay-showmore').show();
        };

        function getAreasByPhone(phone) {
            var data = {_phone : phone};
            $url = $rootScope.api_url.postDeliveryAreaGetByPhone;
            httpPost($http, $url, data,
                function (response) {
                    console.log("info::" + response.data);
                    for(var i = 0; i < response.data.length; i++)
                    {
                        response.data[i].stt = i + 1;
                    }
                    $scope.areas = response.data;
                    // $scope.show = response.data;
                    // iAlert(ngDialog, $scope);
                }, function (response) {
                    $scope.statustext = 'error';
                });
        }

        $scope.sortType = "_first_name";
        $scope.sortReverse = false;
        $scope.searchFish = "";

        $scope.closeShowMore = function () {
            $('#overlay-showmore').hide();
        };

        $('#overlay-showmore1').hide();
        $scope.closeShowMore1 = function () {
            $('#overlay-showmore1').hide();
            getAreasByPhone($scope.detail_phone);
        };

        $scope.showAddDelivery = function () {
            $('#overlay-showmore1').show();
            window.dispatchEvent(new Event('resize'));
        };

        $scope.address = "Hồ CHí Minh.Việt Nam";
        $scope.markers =[];
        $scope.path = [];
        $scope.addMarkerAndPath = function(event) {
            console.log(event);
            $scope.path.push([event.latLng.lat(), event.latLng.lng()]);

            $scope.path1 = $scope.path;
            $scope.listLatLng = "concobebe";
        };

        $scope.removePoint = function () {
            $scope.path.splice(-1,1)
        };
        $scope.path1 = [[18.466465, -66.118292]];
        
        $scope.createZone = function () {
            var data = {
                _phone_user : $scope.detail_phone,
                _id_area : $scope.idArea,
                _name_area : $scope.nameArea,
                _address : $scope.address,
                _list_latLng : JSON.stringify($scope.path1),
                _note : $scope.note
            };
            $url = $rootScope.api_url.postDeliveryAreaCreate;
            httpPost($http, $url, data,
                function (response) {
                    console.log("info::" + response.data.message);
                    $scope.show = response.data;
                    iAlert(ngDialog, $scope);
                }, function (response) {
                    $scope.statustext = 'error';
                });
        };

        $('#overlay-showmore2').hide();
        $scope.viewMaps = function (x) {

            var listLatLng = JSON.parse(x._list_latLng);
            $scope.path1 = listLatLng;
            $scope.address = listLatLng[0];
            $('#overlay-showmore2').show();
            window.dispatchEvent(new Event('resize'));
        };

        $scope.closeShowMore2 = function () {
            $('#overlay-showmore2').hide();
        };

        $scope.updateArea = function (x) {
            $('#overlay-showmore1').show();
            window.dispatchEvent(new Event('resize'));
        };

    }
});