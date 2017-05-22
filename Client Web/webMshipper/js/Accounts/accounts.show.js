angular.module('mShipperApp').
component('accountShow',{
    templateUrl: './Accounts/Show.html',
    controller: function DsDonHangController($scope, $rootScope,$http, $filter,$location, $timeout){
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
                        if (response.data[i]._permission_id == "Quản lý") {
                            $scope.accounts.push(response.data[i]);
                        }
                        if (response.data[i]._permission_id == "Đội trưởng") {
                            $scope.accounts.push(response.data[i]);
                            $scope.accounts[$scope.accounts.length - 1]._team = '';
                            for (var j = 0; j < teamleads.length; j++) {
                                if ($scope.accounts[$scope.accounts.length - 1]._email == teamleads[j]._team_lead) {
                                    if ($scope.accounts[$scope.accounts.length - 1]._team.length != 0)
                                        $scope.accounts[$scope.accounts.length - 1]._team += ", ";
                                    $scope.accounts[$scope.accounts.length - 1]._team += teamleads[j]._team_id;
                                }
                            }
                        }
                        if (response.data[i]._permission_id == "Nhân viên") {
                            $scope.accounts.push(response.data[i]);
                            for (var j = 0; j < userteamlists.length; j++) {
                                if (response.data[i]._email == userteamlists[j]._user_id) {
                                    $scope.accounts[$scope.accounts.length - 1]._team = userteamlists[j]._team_id;
                                }
                            }
                        }
                        $scope.accounts[$scope.accounts.length - 1].stt = $scope.accounts.length;
                    }
                }, function (response) {
                    $scope.statustext = 'error';
                });
        }

        $scope.addAcount = function () {
            $location.path('/accountscreate');
        }
    }
});