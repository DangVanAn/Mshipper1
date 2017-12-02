angular.module('mShipperApp').component('accountMain', {
    templateUrl: './Accounts/Main.html',
    controller: function DsDonHangController($scope, $rootScope, $http, $filter, $location, $timeout, ngDialog) {
        $(document).ready(function () {
            init();
        });
        $rootScope.selectedLink = "Quản Lý Tài Khoản";

        function init() {
            //load info user all
        };

        $scope.showCreate = function () {
            $location.path('/accountscreate');
        };

        $scope.showCreateN = function () {
            $location.path('/accountscreate.n');
        };

        $scope.showShow = function () {
            $location.path('/accountsshow')
        }

    }
});