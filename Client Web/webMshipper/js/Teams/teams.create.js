angular.module('mShipperApp')
    .component('teamsCreate', {
        templateUrl: './Teams/Create.html',
        controller: function DsDonHangController($rootScope, $scope, $http, $filter, $location, $timeout, $parse, modalOrderCreate, NgMap) {
            $(document).ready(function () {
                $scope.mainLabel = "Thêm đội mới";
                $scope.example13data = [];
                $scope.example13model = [];
                $scope.idTeam = '';
                $scope.name = '';
                $scope.description = '';
                init();
            });
            $('#btnDelete').addClass("hidebutton");
            var areas = [], teams = [];

            var teamleads = [], userteamlists = [];
            function init() {
                $url = 'http://localhost:9999/teamleads/getall'
                httpGet($http, $url,
                    function (response) {
                        console.log("teamleads : " + JSON.stringify(response.data));
                        teamleads = response.data;
                        getUserTeamList();
                    }, function (response) {
                        $scope.statustext = 'error';
                    });

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
                        for(var i = 0; i < response.data.length; i++)
                        {
                            if(response.data[i]._permission_id == "Đội trưởng")
                            {
                                $scope.accountsLead.push(response.data[i]);
                                $scope.accountsLead[$scope.accountsLead.length - 1]._team = '';
                                for(var j = 0; j < teamleads.length; j++)
                                {
                                    if($scope.accountsLead[$scope.accountsLead.length - 1]._email == teamleads[j]._team_lead)
                                    {
                                        if($scope.accountsLead[$scope.accountsLead.length - 1]._team.length != 0)
                                            $scope.accountsLead[$scope.accountsLead.length - 1]._team += ", ";
                                        $scope.accountsLead[$scope.accountsLead.length - 1]._team += teamleads[j]._team_id;
                                    }
                                }
                            }
                            if(response.data[i]._permission_id == "Nhân viên")
                            {
                                var noIn = false;
                                for(var j = 0; j < userteamlists.length; j++)
                                {
                                    console.log("_email :" + response.data[i]._email + " : _user_id:" + userteamlists[j]._user_id);
                                    if(response.data[i]._email == userteamlists[j]._user_id)
                                    {
                                        noIn = true;
                                        break;
                                    }
                                }
                                if(!noIn)
                                {
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
        }
    });