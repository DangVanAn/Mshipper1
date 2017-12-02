angular.module('mShipperApp')
    .component('preOrderShowList', {
        templateUrl: './Orders/Pre.Show.List.html',
        controller: function DsDonHangController($rootScope, $scope, $http, $filter, ngDialog, $location, $timeout, $parse, modalOrderCreate, NgMap, NgTableParams) {
            $(document).ready(function () {
                init();
            });
            function init() {
                var data = {_id : 'xxxx'};
                $urll = 'http://localhost:9999/preorderslist/getall';
                $http({
                    method: 'POST',
                    url: $urll,
                    headers: {'Content-Type': 'application/json'},
                    data: data
                }).then(function successCallback(response) {
                    $scope.tableParams = new NgTableParams({}, {
                        filterDelay: 0,
                        dataset: angular.copy(response.data)
                    });

                }, function errorCallback(response) {
                    $scope.statustext = 'error';
                });
            }

            $scope.create = function () {
                console.log('create new list for orders');
                $location.path('/orderscreate.n');
            };


            $scope.cancel = function(row) {

            };

            $scope.del = function(row) {

            };

            $scope.save = function(row) {

            };

            var tempRow = {};
            var tempIndex = -1;
            $scope.edit = function(row) {
                console.log('show detail for file orders');
                $location.path('/preordersshow/' + row._code_file);
            };
        }
    });