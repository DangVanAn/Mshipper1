angular.module('mShipperApp').component('warehousesMain', {
    templateUrl: './Warehouses/Main.html',
    controller: function DsDonHangController($scope, $rootScope, $http, $filter, $location, $timeout, ngDialog) {
        $(document).ready(function () {
            init();
        });
        $rootScope.selectedLink = "Quản Lý Kho Hàng";

        function init() {
            //load info user all
        };

        $scope.showCreate = function () {
            $location.path('/warehousescreate');
        };

        $scope.showCreateN = function () {
            $location.path('/warehousescreate.n');
        };

        $scope.showShow = function () {
            $location.path('/warehousesshow')
        }

    }
});