angular.module('mShipperApp')
    .component('accountCreate', {
    templateUrl: './Accounts/Create.html',
    controller: function DsDonHangController($rootScope, $scope, $http, $filter, $location, $timeout, ngDialog) {
        $(document).ready(function () {
            init();
        });

        $scope.gender = $rootScope.gender;

        $scope.selectedGender = {};
        $scope.selectedGender.selected = $scope.gender[0];

        $scope.role = $rootScope.listRole;

        $scope.selectedRole = {};
        $scope.selectedRole.selected = $scope.role[0];


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
                    _gender: $scope.selectedGender.selected.id,
                    _permission_id: $scope.selectedRole.selected.id
                };

                $url = $rootScope.api_url.postAccountCreate;

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