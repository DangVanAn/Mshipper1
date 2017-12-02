angular.module('mShipperApp')
    .component('vehiclesCreate', {
        templateUrl: './Vehicles/Create.html',
        controller: function DsDonHangController($rootScope, $scope, $http, $filter, $location, $timeout, ngDialog) {
            $(document).ready(function () {
                init();
            });

            function init() {
            }

            $scope.showNumber = true;

            $scope.name = '';
            $scope.numberPlate = '';
            $scope.weigh = 0;
            $scope.volume = 0;
            $scope.note = '';

            $scope.submit = function () {

                if ($scope.name === '') {
                    $scope.show = "Vui lòng điền tất cả thông tin!";
                    iAlert(ngDialog, $scope);
                }
                else {
                    var data = {
                        _name: $scope.name,
                        _owner : $rootScope.globals.currentUser.phone,
                        _number_plate : $scope.numberPlate,
                        _weigh: $scope.weigh,
                        _volume: $scope.volume,
                        _note: $scope.note,
                        _is_enabled: true
                    };

                    $url = $rootScope.api_url.postVehicleCreate;

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
            };
        }
    });