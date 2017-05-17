angular.module('mShipperApp')
    .controller('modal.teams.show.account', ['$scope', '$http', '$uibModalInstance', 'data', function ($scope, $http, $uibModalInstance, data) {
        $scope.team_id = data._team_id;
        init();
        function init() {
            getTeamLead();
        }

        var teamleads = [];
        var userteamlists = [];
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
                    getUsser();
                }, function (response) {
                    $scope.statustext = 'error';
                });
        }

        function getUsser() {
            $url = 'http://localhost:9999/users/getall'
            httpGet($http, $url,
                function (response) {
                    $scope.accounts = [];
                    for (var i = 0; i < response.data.length; i++) {
                        if (response.data[i]._permission_id == "Đội trưởng") {
                            for(var j = 0; j < teamleads.length; j++)
                            {
                                if(teamleads[j]._team_lead == response.data[i]._email && teamleads[j]._team_id == data._team_id)
                                {
                                    $scope.accounts.push(response.data[i]);
                                    break;
                                }
                            }
                        }
                    }
                    for (var i = 0; i < response.data.length; i++) {
                        if (response.data[i]._permission_id == "Nhân viên") {
                            for (var j = 0; j < userteamlists.length; j++) {
                                if(userteamlists[j]._user_id == response.data[i]._email && userteamlists[j]._team_id == data._team_id)
                                {
                                    $scope.accounts.push(response.data[i]);
                                }
                            }
                        }
                    }
                }, function (response) {
                    $scope.statustext = 'error';
                });
        }

        $scope.ok = function () {
            $uibModalInstance.close($scope.data);
        };

        $scope.close = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
    ]);