angular.module('mShipperApp').
component('areasShow',{
    templateUrl: './Areas/Show.html',
    controller: function DsDonHangController($rootScope, $scope, $http, $filter,$location, $timeout){
        $(document).ready(function () {
            init();
        });
        
        $scope.addArea = function () {
            $location.path('/areascreate');
        }

        function init() {
            $url = $rootScope.api_url.getAreaShow;

            httpGet($http, $url,
                function (response) {
                    console.log("info::" + response.data);
                    $scope.areas = response.data;
                }, function (response) {
                    $scope.statustext = 'error';
                });
        }
    }
});