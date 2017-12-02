angular.module('mShipperApp').component('vehiclesMain', {
    templateUrl: './Vehicles/Main.html',
    controller: function DsDonHangController($scope, $rootScope, $http, $filter, $location, $timeout, ngDialog) {
        $(document).ready(function () {
            init();
        });
        $rootScope.selectedLink = "Quản Lý Phương Tiện";

        function init() {
            //load info user all
        };

        $scope.showCreate = function () {
            $location.path('/vehiclescreate');
        };

        $scope.showCreateN = function () {
            $location.path('/vehiclescreate.n');
        };

        $scope.showShow = function () {
            $location.path('/vehiclesshow')
        }

    }
});