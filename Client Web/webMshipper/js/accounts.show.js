angular.module('mShipperApp').
component('accountShow',{
    templateUrl: './Accounts/Show.html',
    controller: function DsDonHangController($scope, $rootScope,$http, $filter,$location, $timeout){
        $(document).ready(function () {
            init();
        });

        function init() {
            $url = $rootScope.api_url.getAccountShow;

            httpGet($http, $url,
                function (response) {
                    console.log("info::" + response.data);
                    $scope.accounts = response.data;
                }, function (response) {
                    $scope.statustext = 'error';
                });
        }

        $scope.addAcount = function () {
            $location.path('/accountscreate');
        }
    }
});