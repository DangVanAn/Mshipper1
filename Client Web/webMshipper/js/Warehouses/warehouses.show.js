angular.module('mShipperApp').
component('warehousesShow',{
    templateUrl: './Warehouses/Show.html',
    controller: function DsDonHangController($rootScope, $scope, $http, $filter,$location, $timeout){
        $(document).ready(function () {
            init();
        });
        
        $scope.addArea = function () {
            $location.path('/areascreate');
        };

        function init() {
            $url = $rootScope.api_url.getWarehouse;
            httpGet($http, $url,
                function (response) {
                    console.log("info::" + response.data);
                    $scope.warehouses = response.data;
                }, function (response) {
                    $scope.statustext = 'error';
                });
        }

        $('#overlay-showmore1').hide();
        $scope.addWarehouse = function () {
            $('#overlay-showmore1').show();
            window.dispatchEvent(new Event('resize'));
        };

        $scope.closeShowMore1 = function () {
            $('#overlay-showmore1').hide();
        }

        $scope.address = "Hồ CHí Minh.Việt Nam";
        $scope.markers =[];
        $scope.path = [];
        $scope.addMarkerAndPath = function(event) {
            console.log(event);
            $scope.path.push([event.latLng.lat(), event.latLng.lng()]);

            $scope.path1 = $scope.path;
            $scope.listLatLng = "concobebe";
        };

        $scope.removePoint = function () {
            $scope.path.splice(-1,1)
        };
        $scope.path1 = [[18.466465, -66.118292]];

        $scope.createZone = function () {
            var data = {
                _id_area : $scope.idArea,
                _name_area : $scope.nameArea,
                _address : $scope.address,
                _list_latLng : JSON.stringify($scope.path1),
                _note : $scope.note
            };
            $url = $rootScope.api_url.postWarehouseCreate;
            httpPost($http, $url, data,
                function (response) {
                    console.log("info::" + response.data.message);
                    $scope.show = response.data;
                    iAlert(ngDialog, $scope);

                    init();
                }, function (response) {
                    $scope.statustext = 'error';
                });
        };

        $('#overlay-showmore2').hide();
        $scope.viewMaps = function (x) {

            var listLatLng = JSON.parse(x._list_latLng);
            $scope.path1 = listLatLng;
            $scope.address = listLatLng[0];
            $('#overlay-showmore2').show();
            window.dispatchEvent(new Event('resize'));
        };

        $scope.closeShowMore2 = function () {
            $('#overlay-showmore2').hide();
        };
    }
});