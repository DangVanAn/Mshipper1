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
                for (var i = 0; i < json.Sheet1.length; i++) {
                    var obj = json.Sheet1[i];
                    var data = {
                        _name : obj['Tên Xe'],
                        _number_plate : obj['Biển Số Xe'],
                        _owner : $rootScope.globals.currentUser.id_delivery_manager,
                        _weigh : obj['Tải Trọng'],
                        _volume : obj['Thể Tích'],
                        _note : obj['Ghi Chú'],
                        _is_enabled : true
                    };
                    $scope.vehicles.push(data);
                }
            };

            $scope.saveVehicles = function () {
                //Save toàn bộ thông tin.
                if ($scope.vehicles.length == 0) {
                    $scope.show = "Bạn chưa chọn tập tin!";
                    iAlert(ngDialog, $scope);
                }
                else {
                        $urll = $rootScope.api_url.postVehicleCreate_N;

                        $http({
                            method: 'POST',
                            url: $urll,
                            headers: {'Content-Type': 'application/json'},
                            data: $scope.vehicles
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