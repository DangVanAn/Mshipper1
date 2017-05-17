angular.module('mShipperApp')
    .component('teamsCreate', {
        templateUrl: './Teams/Create.html',
        controller: function DsDonHangController($rootScope, $scope, $http, $filter, $location, $timeout, $parse, modalOrderCreate, NgMap) {
            $(document).ready(function () {
                $scope.example13data = [];
                $scope.example13model = [];
                $scope.idTeam = '';
                $scope.name = '';
                $scope.description = '';
                init();
            });

            var areas = [], teams = [], areaNow = [];

            function init() {
                $url = $rootScope.api_url.getAreaShow;

                httpGet($http, $url,
                    function (response) {
                        console.log("info::" + response.data);
                        areas = response.data;

                        $url = $rootScope.api_url.getTeamShow;
                        httpGet($http, $url,
                            function (response) {
                                console.log("info::" + response.data);
                                teams = response.data;
                                for (var j = 0; j < teams.length; j++) {
                                    for (var i = 0; i < areas.length; i++) {

                                        console.log("moi :" + teams[j]._area + " : cu:" + areas[i]._area);
                                        if (teams[j]._area == areas[i]._area) {
                                            areas.splice(i, 1);
                                        }
                                    }
                                }

                                for (var i = 0; i < areas.length; i++) {
                                    $scope.example13data.push({id: i, label: areas[i]._area});
                                }

                            }, function (response) {
                                $scope.statustext = 'error';
                            });

                    }, function (response) {
                        $scope.statustext = 'error';
                    });
            }

            $scope.status = [
                "Hoạt động",
                "Không hoạt động"
            ];
            $scope.selectStatus = $scope.status[0];


            $scope.changeStatus = function () {
                console.log('change Trang thai');
            }

            $scope.example13settings = {
                showCheckAll: false,
                showUncheckAll: false,
                smartButtonMaxItems: 3,
                smartButtonTextConverter: function (itemText, originalItem) {
                    return itemText;
                }
            };

            $scope.submit = function () {

                var tempArea = [];
                for (var i = 0; i < $scope.example13model.length; i++) {
                    tempArea.push({area: $scope.example13data[$scope.example13model[i].id].label});
                }

                $url = $rootScope.api_url.postTeamCreate;
                var data = {
                    _team_id: $scope.idTeam,
                    _name: $scope.name,
                    _areas: JSON.stringify(tempArea),
                    _status: $scope.selectStatus,
                    _description: $scope.description
                }
                httpPost($http, $url, data,
                    function (response) {
                        console.log("info::" + response.data);
                        $scope.example13data = [];
                        $scope.example13model = [];
                        init();
                    }, function (response) {
                        $scope.statustext = 'error';
                    });
            }

        }
    });