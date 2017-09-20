angular.module('mShipperApp').component('accountShow', {
    templateUrl: './Accounts/Show.html',
    controller: function DsDonHangController($scope, $rootScope, $http, $filter, $location, $timeout, ngDialog) {
        $(document).ready(function () {
            init();
        });

        function init() {
            $scope.accounts = [];
            console.log('12');
        }
        getUser();
        function getUser() {
            console.log('16');
            $scope.accounts = [];
            $url = $rootScope.api_url.getAccountShow;
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

        $scope.role = $rootScope.listRole;
        $scope.selectedRole = {};
        $scope.selectedRole.selected = $scope.role[0];

        var clickingRow = -1;
        $('#overlay-showmore').hide();
        $scope.showMore = function (x) {
            console.log(x);
            clickingRow = x.stt - 1;
            $scope.detail_name = x._name;
            $scope.detail_idnumber = x._identify_card;
            $scope.detail_email = x._email;
            $scope.detail_birth = x._date_of_birth;
            $scope.detail_address = x._address;
            $scope.detail_phone = x._phone;
            $scope.detail_gender = x._gender;

            //Chỉ hiển thị cho khách hàng phần nhập địa điểm
            if(x._permission_id == 'B001')
            {
                $('#showMap').show();
            }
            else {
                $('#showMap').hide();
            }

            $scope.mapAddress = [$scope.accounts[clickingRow]._latitude, $scope.accounts[clickingRow]._longitude];
            $scope.mapAddressCenter = [$scope.accounts[clickingRow]._latitude, $scope.accounts[clickingRow]._longitude];
            $scope.path1 = [[0, 0]];

            $('#overlay-showmore').show();
            window.dispatchEvent(new Event('resize'));
        };

        $scope.sortType = "_first_name";
        $scope.sortReverse = false;
        $scope.searchFish = "";

        $scope.closeShowMore = function () {
            $('#overlay-showmore').hide();

            $scope.mapAddress = [0, 0];
            $scope.path1 = [[0, 0]];
            $scope.mapAddressCenter = [0, 0];
            $scope.selectedTypeSelect.selected = $scope.typeSelects[0];
        };

        $scope.address = "Hồ CHí Minh.Việt Nam";
        $scope.markers =[];
        $scope.path = [];
        $('#showMap').show();

        $scope.typeSelects = [{id: '001', name: 'Chọn Điểm'}, {id: '002', name: 'Chọn Vùng'}];
        $scope.selectedTypeSelect = [];
        $scope.selectedTypeSelect.selected = $scope.typeSelects[0];

        $scope.selectTypeSelect = function (item) {
            if ($scope.selectedTypeSelect.selected.id === '001') {
                $scope.showMapArea = false;

                $scope.mapAddress = [$scope.accounts[clickingRow]._latitude, $scope.accounts[clickingRow]._longitude];
                $scope.mapAddressCenter = [$scope.accounts[clickingRow]._latitude, $scope.accounts[clickingRow]._longitude];
                $scope.path1 = [[0, 0]];
            }

            if ($scope.selectedTypeSelect.selected.id === '002') {
                $scope.showMapArea = true;

                $scope.mapAddress = [0, 0];
                $scope.path1 = JSON.parse($scope.accounts[clickingRow]._polygon);
                $scope.mapAddressCenter = $scope.path1[0];
            }
        };

        $scope.showRemoveYN = false;
        $scope.removeAccount = function (x) {
            $scope.showRemoveYN = true;
            clickingRow = x.stt - 1;
        };

        $scope.clickYesRemove = function () {
            $scope.showRemoveYN = false;
            var data = {_phone : $scope.accounts[clickingRow]._phone};
            var $urll = $rootScope.api_url.postAccountRemove;
            $http({
                method: 'POST',
                url: $urll,
                headers: {'Content-Type': 'application/json'},
                data: data
            }).then(function successCallback(response) {
                console.log(response.data);
                $scope.show = response.data;
                iAlert(ngDialog, $scope);

                getUser();
            }, function errorCallback(response) {
                $scope.statustext = 'error';
            });
        };

        $scope.clickNoRemove = function () {
            $scope.showRemoveYN = false;
        }
    }
});