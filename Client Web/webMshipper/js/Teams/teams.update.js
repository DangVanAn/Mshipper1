angular.module('mShipperApp')
    .component('teamsUpdate', {
        templateUrl: './Teams/Create.html',
        controller: function DsDonHangController($rootScope, $scope, $http, $routeParams, modalYesNo, $filter, $location, $timeout, $parse, modalOrderCreate, NgMap) {
            $(document).ready(function () {
                $scope.mainLabel = "Chỉnh sửa thông tin đội";
                $scope.example13data = [];
                $scope.example13model = [];
                $scope.idTeam = '';
                $scope.name = '';
                $scope.description = '';
                $("#idTeamShow").addClass("disabledbutton");
                init();
            });
            var areas = [], teams = [], areaNow = [];
            var teamleads = [], userteamlists = [];

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
                                        if (teams[j]._area == areas[i]._area) {
                                            areas.splice(i, 1);
                                        }
                                    }
                                }

                                for (var i = 0; i < areas.length; i++) {
                                    $scope.example13data.push({id: i, label: areas[i]._area});
                                }


                                $url1 = $rootScope.api_url.getTeamUpdate;
                                var data = {id: $routeParams.Id};
                                httpPost($http, $url1, data,
                                    function (response) {
                                        $scope.idTeam = response.data[0]._team_id;
                                        $scope.name = response.data[0]._name;
                                        $scope.selectStatus = response.data[0]._status;
                                        $scope.description = response.data[0]._description;
                                        var size = $scope.example13data.length;
                                        for (var i = 0; i < response.data.length; i++) {
                                            if(response.data[i]._area != undefined)
                                            {
                                                console.log("bameno:" + response.data[i]._area + ":bameno");
                                                $scope.example13data.push({id: i + size, label: response.data[i]._area});
                                                $scope.example13model.push({id: i + size});
                                            }
                                        }

                                        getTeamLead();
                                    }, function (response) {
                                        $scope.statustext = 'error';
                                    });

                            }, function (response) {
                                $scope.statustext = 'error';
                            });

                    }, function (response) {
                        $scope.statustext = 'error';
                    });
            }

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
                        $scope.accountsEmployee = [];
                        $scope.accountsLead = [];
                        for (var i = 0; i < response.data.length; i++) {
                            if (response.data[i]._permission_id == "Đội trưởng") {
                                $scope.accountsLead.push(response.data[i]);
                                $scope.accountsLead[$scope.accountsLead.length - 1]._team = '';
                                for (var j = 0; j < teamleads.length; j++) {
                                    if ($scope.accountsLead[$scope.accountsLead.length - 1]._email == teamleads[j]._team_lead) {
                                        if ($scope.accountsLead[$scope.accountsLead.length - 1]._team.length != 0)
                                            $scope.accountsLead[$scope.accountsLead.length - 1]._team += ", ";
                                        $scope.accountsLead[$scope.accountsLead.length - 1]._team += teamleads[j]._team_id;
                                        if(teamleads[j]._team_id == $routeParams.Id)
                                        {
                                            $scope.accountsLead[$scope.accountsLead.length - 1].checked = true;
                                        }
                                    }
                                }
                            }
                            if (response.data[i]._permission_id == "Nhân viên") {
                                var noIn = false;
                                for (var j = 0; j < userteamlists.length; j++) {
                                    console.log("_email :" + response.data[i]._email + " : _user_id:" + userteamlists[j]._user_id);
                                    if (response.data[i]._email == userteamlists[j]._user_id) {
                                        if (userteamlists[j]._team_id == $routeParams.Id) {
                                            $scope.accountsEmployee.push(response.data[i]);
                                            $scope.accountsEmployee[$scope.accountsEmployee.length - 1].checked = true;
                                            $scope.accountsEmployee[$scope.accountsEmployee.length - 1]._team = userteamlists[j]._team_id;
                                        }
                                        noIn = true;
                                        break;
                                    }
                                }
                                if (!noIn) {
                                    $scope.accountsEmployee.push(response.data[i]);
                                }
                            }
                        }
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

                postTeamLead();
                postUserTeamList();
            }

            function postTeamLead() {
                var data = [];
                for(var i = 0; i < $scope.accountsLead.length; i++)
                {
                    if($scope.accountsLead[i].checked == true)
                    {
                        data.push($scope.accountsLead[i]);
                    }
                }

                var datas ={
                    _team_id : $scope.idTeam,
                    data : JSON.stringify(data)
                }

                $url = 'http://localhost:9999/teamleads/adds'
                httpPost($http, $url, datas,
                    function (response) {
                        console.log("userteamlist : " + JSON.stringify(response.data));
                    }, function (response) {
                        $scope.statustext = 'error';
                    });
            }

            function postUserTeamList() {
                var data = [];
                for(var i = 0; i < $scope.accountsEmployee.length; i++)
                {
                    if($scope.accountsEmployee[i].checked == true)
                    {
                        data.push($scope.accountsEmployee[i]);
                    }
                }
                var datas ={
                    _team_id : $scope.idTeam,
                    data : JSON.stringify(data)
                }

                $url = 'http://localhost:9999/userteamlists/adds'
                httpPost($http, $url, datas,
                    function (response) {
                        console.log("userteamlist : " + JSON.stringify(response.data));
                    }, function (response) {
                        $scope.statustext = 'error';
                    });
            }

            $scope.deleteTeam = function () {
                var info = "Bạn chắc chắn xóa đội";
                modalYesNo.show({team_id : $routeParams.Id, info : info}, function (data) {
                    if (data) {
                        console.log("Nhan duoc::" + data);
                        removeTeamLead($routeParams.Id);
                        removeTeamList($routeParams.Id);
                        removeUserTeamList($routeParams.Id);
                    }
                    else {
                        console.log("không có");
                    }
                });
            }

            var goTeamShow = 0;

            function removeTeamLead(team_id) {
                $url = 'http://localhost:9999/teamleads/remove'
                var data = {_team_id : team_id};
                httpPost($http, $url, data,
                    function (response) {
                        console.log("teamlead : " + JSON.stringify(response.data));
                        goTeamShow++;
                        if(goTeamShow == 3)
                        {
                            $location.path('/teamsshow');
                            console.log("go");
                        }
                    }, function (response) {
                        $scope.statustext = 'error';
                    });
            }

            function removeTeamList(team_id) {
                $url = 'http://localhost:9999/teamlists/remove'
                var data = {_team_id : team_id};
                httpPost($http, $url, data,
                    function (response) {
                        console.log("teamlist : " + JSON.stringify(response.data));
                        goTeamShow++;
                        if(goTeamShow == 3)
                        {
                            $location.path('/teamsshow');
                            console.log("go");
                        }
                    }, function (response) {
                        $scope.statustext = 'error';
                    });
            }

            function removeUserTeamList(team_id) {
                $url = 'http://localhost:9999/userteamlists/remove'
                var data = {_team_id : team_id};
                httpPost($http, $url, data,
                    function (response) {
                        console.log("userteamlist : " + JSON.stringify(response.data));
                        goTeamShow++;
                        if(goTeamShow == 3)
                        {
                            $location.path('/teamsshow');
                            console.log("go");
                        }
                    }, function (response) {
                        $scope.statustext = 'error';
                    });
            }
        }
    });