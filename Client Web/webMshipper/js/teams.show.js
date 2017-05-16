angular.module('mShipperApp')
    .component('teamsShow', {
        templateUrl: './Teams/Show.html',
        controller: function DsDonHangController($rootScope, $scope, $http, modalOrderShow, NgMap, $filter, $location, $timeout) {
            $(document).ready(function () {
                init();
            });

            $scope.addTeam = function () {
                $location.path('/teamscreate');
            }

            function init() {
                $url = $rootScope.api_url.getTeamShow;

                httpGet($http, $url,
                    function (response) {
                        console.log("info::" + response.data);
                        $scope.teams = [];
                        for (var i = 0; i < response.data.length; i++) {
                            var index = -1;
                            for (var j = 0; j < $scope.teams.length; j++) {
                                if ($scope.teams[j]._team_id == response.data[i]._team_id) {
                                    index = j;
                                    break;
                                }
                            }
                            if (index !== -1) {
                                $scope.teams[j]._area += ", " + response.data[i]._area;
                            }
                            else {
                                $scope.teams.push(response.data[i]);
                            }
                        }

                    }, function (response) {
                        $scope.statustext = 'error';
                    });
            }

        }
    });