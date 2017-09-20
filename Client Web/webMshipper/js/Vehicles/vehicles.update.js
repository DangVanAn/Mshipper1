angular.module('mShipperApp')
    .component('vehiclesUpdate', {
    templateUrl: './Vehicles/Create.html',
    controller: function DsDonHangController($rootScope, $scope, $routeParams, $http, $filter, $location, $timeout, ngDialog) {
        $(document).ready(function () {
            init();
        });

        $("#idForm").addClass("disabledbutton");

        $scope.showNumber = false;

        $scope.name = '';
        $scope.weigh = 0;
        $scope.volume = 0;
        $scope.note = '';

        function init() {
            $url = $rootScope.api_url.getVehicleId;
            var data = {id : $routeParams.id};
            httpPost($http, $url, data,
                function (response) {
                    $scope.name = response.data[0]._name;
                    $scope.weigh = response.data[0]._weigh;
                    $scope.volume = response.data[0]._volume;
                    $scope.note = response.data[0]._note;

                }, function (response) {
                    $scope.statustext = 'error';
                });
        }

        $scope.submit = function () {

            if ($scope.nameWarehouse === '')
            {
                $scope.show = "Vui lòng điền tất cả thông tin!";
                iAlert(ngDialog, $scope);
            }
            else
            {

                var data = {
                    _id: $routeParams.id,
                    _name: $scope.name,
                    _owner : $rootScope.globals.currentUser.phone,
                    _weigh: $scope.weigh,
                    _volume: $scope.volume,
                    _note: $scope.note,
                    _is_enabled: true
                };

                $url = $rootScope.api_url.postVehicleUpdate;

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