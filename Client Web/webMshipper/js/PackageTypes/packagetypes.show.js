angular.module('mShipperApp').
component('packagetypeShow',{
    templateUrl: './PackageTypes/Show.html',
    controller: function DsDonHangController($scope, $rootScope,$http, $filter,$location, $timeout){
        $(document).ready(function () {
        });

        init();
        function init() {
            $scope.packagetypes = [];
            $url = 'http://localhost:9999/packagetypes/getall'
            httpGet($http, $url,
                function (response) {
                    $scope.packagetypes = response.data;
                    for(var i = 0; i < $scope.packagetypes.length; i++)
                    {
                        $scope.packagetypes[i].stt = i+1;
                    }
                }, function (response) {
                    $scope.statustext = 'error';
                });
        }

        $scope.add = function () {
            $location.path('/packagetypescreate');
        }
    }
});