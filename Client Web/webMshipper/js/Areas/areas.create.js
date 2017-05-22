angular.module('mShipperApp')
    .component('areasCreate', {
    templateUrl: './Areas/Create.html',
    controller: function DsDonHangController($rootScope, $scope, $http, $filter, $location, $timeout, ngDialog) {
        $(document).ready(function () {
            init();
        });


        function init() {
            $scope.idArea = '';
            $scope.city = '';
            $scope.district = '';
            $scope.description = '';
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
                    _area: $scope.idArea,
                    _city: $scope.city,
                    _district: $scope.district,
                    _description: $scope.description,
                }

                $url = $rootScope.api_url.postAreaCreate;

                httpPost($http, $url, data,
                    function (response) {
                        console.log("info::" + response.data);
                        // $scope.show = response.data;
                        // iAlert(ngDialog, $scope);
                    }, function (response) {
                        $scope.statustext = 'error';
                    });

                console.log(JSON.stringify(data));
            }
        }
    }
});