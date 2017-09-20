angular.module('mShipperApp').component('productsMain', {
    templateUrl: './Products/Main.html',
    controller: function DsDonHangController($scope, $rootScope, $http, $filter, $location, $timeout, ngDialog) {
        $(document).ready(function () {
            init();
        });

        function init() {
            //load info user all
        };

        $scope.showCreate = function () {
            $location.path('/productscreate');
        };

        $scope.showCreateN = function () {
            $location.path('/productscreate.n');
        };

        $scope.showShow = function () {
            $location.path('/productsshow')
        }

    }
});