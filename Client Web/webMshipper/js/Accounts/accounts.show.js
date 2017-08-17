angular.module('mShipperApp').component('accountShow', {
    templateUrl: './Accounts/Show.html',
    controller: function DsDonHangController($scope, $rootScope, $http, $filter, $location, $timeout) {
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

            $('#overlay-showmore').show();
        }

        $scope.sortType = "_first_name";
        $scope.sortReverse = false;
        $scope.searchFish = "";

        $scope.closeShowMore = function () {
            $('#overlay-showmore').hide();
        }

        // $('#overlay-showmore1').hide();
        $scope.closeShowMore1 = function () {
            $('#overlay-showmore1').hide();
        }

        $scope.showAddDelivery = function () {
            $('#overlay-showmore1').show();
        }

        $scope.center = [10.7680338,106.414162];

        $scope.markers =[];

        $scope.path = [];
        $scope.addMarkerAndPath = function(event) {
            console.log(event);
            $scope.path.push([event.latLng.lat(), event.latLng.lng()]);
        };

        $scope.removePoint = function () {
            $scope.path.splice(-1,1)
        }

        // $scope.inputAddress = "Hồ Chí Minh";
        // $scope.address = $scope.inputAddress;
    }
});