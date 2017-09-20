angular.module('mShipperApp')
    .component('vehiclesCreateN', {
        templateUrl: './Vehicles/Create.n.html',
        controller: function DsDonHangController($rootScope, $scope, $http, $filter, ngDialog, $location, $timeout, $parse, modalOrderCreate, NgMap) {
            $(document).ready(function () {

            });

            $scope.vehicles = [];

            $scope.uploadFile = function () {
                $("#fileButton").val('');
                $scope.excel = '';
                console.log('26', new Date().getTime());
            };

            $scope.GetImport = function () {
                var json = $scope.excel;
                console.log('36', new Date().getTime());
                console.log(json);
                $scope.vehicles = json.Sheet1;
                for (var i = 0; i < $scope.vehicles.length; i++) {
                    $scope.vehicles[i].stt = i + 1;
                }
            };

            $scope.saveVehicles = function () {
                //Save toàn bộ thông tin.
                if ($scope.vehicles.length == 0) {
                    $scope.show = "Bạn chưa chọn tập tin!";
                    iAlert(ngDialog, $scope);
                }
                else {

                        var listData = [];
                        for (var i = 0; i < $scope.vehicles.length; i++) {
                            var data = {
                                _name: $scope.vehicles[i].name,
                                _owner : $rootScope.globals.currentUser.phone,
                                _weigh: $scope.vehicles[i].weigh,
                                _volume: $scope.vehicles[i].volume,
                                _number : $scope.vehicles[i].number,
                                _note: $scope.vehicles[i].note,
                                _is_enabled : true
                            };

                            listData.push(data);
                        }

                        console.log(listData);

                        $urll = $rootScope.api_url.postVehicleCreate_N;

                        $http({
                            method: 'POST',
                            url: $urll,
                            headers: {'Content-Type': 'application/json'},
                            data: listData
                        }).then(function successCallback(response) {
                            console.log(response.data);
                            $scope.show = response.data;
                            iAlert(ngDialog, $scope);
                        }, function errorCallback(response) {
                            $scope.statustext = 'error';
                        });
                    }

            };
        }
    });