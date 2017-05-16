angular.module('mShipperApp')
    .component('accountUpdate', {
    templateUrl: './Accounts/Create.html',
    controller: function DsDonHangController($rootScope, $scope, $routeParams, $http, $filter, $location, $timeout, ngDialog) {
        $(document).ready(function () {
            init();
        });

        $scope.gender = [
            "Nam",
            "Nữ",
            "Chưa xác định"
        ];
        $scope.selectGender = $scope.gender[0];

        $scope.role = [
            "Quản lý",
            "Đội trưởng",
            "Nhân viên"
        ];
        $scope.selectRole = $scope.role[2];
        $("#emailForm").addClass("disabledbutton");
        $("#birthday").datepicker({
            defaultDate: "+1w",
            changeMonth: true,
            changeYear: true,
            maxDate: "+0D",
            dateFormat: "dd/mm/yy",
            onSelect: function () {
                var dateObject = $(this).datepicker('getDate');
                console.log('beginDate: ' + dateObject.getTime());
            }
        }).datepicker("setDate", new Date());

        function init() {
            $scope.email = '';
            $scope.firstName = '';
            $scope.lastName = '';
            $scope.identityNumber = '';
            $scope.address = '';
            $scope.phoneNumber = '';

            $url = $rootScope.api_url.getAccountEmail;
            var data = {email : $routeParams.email};
            httpPost($http, $url, data,
                function (response) {
                    $scope.email = response.data[0]._email;
                    $scope.firstName = response.data[0]._first_name;
                    $scope.lastName = response.data[0]._last_name;
                    $("#birthday").datepicker("setDate", response.data[0]._date_of_birth);
                    $scope.identityNumber = response.data[0]._identify_card;
                    $scope.address = response.data[0]._address;
                    $scope.phoneNumber = response.data[0]._phone;
                    $scope.selectGender = response.data[0]._gender;
                    $scope.selectRole = response.data[0]._permission_id;
                }, function (response) {
                    $scope.statustext = 'error';
                });
        }


        $scope.submit = function () {

            if ($scope.email === '' || $scope.firstName === '' || $scope.lastName === ''
                || $scope.identityNumber === '' || $scope.address === '' || $scope.phoneNumber === '')
            {
                $scope.show = "Vui lòng điền tất cả thông tin!";
                iAlert(ngDialog, $scope);
            }
            else
            {
                var data = {
                    _email: $scope.email,
                    _first_name: $scope.firstName,
                    _last_name: $scope.lastName,
                    _date_of_birth: $("#birthday").datepicker("getDate").getTime(),
                    _identify_card: $scope.identityNumber,
                    _address: $scope.address,
                    _phone: $scope.phoneNumber,
                    _gender: $scope.selectGender,
                    _permission_id: $scope.selectRole,
                    _team: $scope.selectTeam,
                }

                $url = $rootScope.api_url.postAccountUpdate;
                httpPost($http, $url, data,
                    function (response) {
                        console.log("info::" + response.data.message);
                        $scope.show = response.data;
                        iAlert(ngDialog, $scope);
                    }, function (response) {
                        $scope.statustext = 'error';
                    });

                console.log(JSON.stringify(data));
            }
        }
    }
});