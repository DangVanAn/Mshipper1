angular.module('mShipperApp')
    .component('accountUpdate', {
    templateUrl: './Accounts/Create.html',
    controller: function DsDonHangController($rootScope, $scope, $routeParams, $http, $filter, $location, $timeout, ngDialog) {
        $(document).ready(function () {
            init();
        });

        $scope.gender = $rootScope.gender;
        $scope.selectedGender = {};
        $scope.role = $rootScope.listRole;
        $scope.selectedRole = {};

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

            $url = $rootScope.api_url.getAccountPhone;
            var data = {phone : $routeParams.phone};
            httpPost($http, $url, data,
                function (response) {
                    $scope.email = response.data[0]._email;
                    $scope.firstName = response.data[0]._first_name;
                    $scope.lastName = response.data[0]._last_name;
                    $("#birthday").datepicker("setDate", response.data[0]._date_of_birth);
                    $scope.identityNumber = response.data[0]._identify_card;
                    $scope.address = response.data[0]._address;
                    $scope.phoneNumber = response.data[0]._phone;

                    for(var i = 0; i < $scope.gender.length; i++)
                    {
                        if($scope.gender[i].id == response.data[0]._gender)
                        {
                            $scope.selectedGender.selected = $scope.gender[i];
                        }
                    }
                    for(var i = 0; i < $scope.role.length; i++)
                    {
                        if($scope.role[i].id == response.data[0]._permission_id)
                        {
                            $scope.selectedRole.selected = $scope.role[i];
                        }
                    }

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
                console.log('77');
                console.log($scope.selectedGender.selected, $scope.selectedRole.selected);

                var data = {
                    _email: $scope.email,
                    _first_name: $scope.firstName,
                    _last_name: $scope.lastName,
                    _date_of_birth: $("#birthday").datepicker("getDate").getTime(),
                    _identify_card: $scope.identityNumber,
                    _address: $scope.address,
                    _phone: $scope.phoneNumber,
                    _gender: $scope.selectedGender.selected.id,
                    _permission_id: $scope.selectedRole.selected.id,
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