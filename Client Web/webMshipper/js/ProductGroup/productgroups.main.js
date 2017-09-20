angular.module('mShipperApp').component('productgroupsMain', {
    templateUrl: './ProductGroups/Main.html',
    controller: function DsDonHangController($scope, $rootScope, $http, $filter, $location, $timeout, ngDialog) {
        $(document).ready(function () {
            init();
        });

        function init() {
            //load info user all
        };

        $scope.showCreate = function () {
            $location.path('/productgroupscreate');
        };

        $scope.showCreateN = function () {
            $location.path('/productgroupscreate.n');
        };

        $scope.showShow = function () {
            $location.path('/productgroupsshow')
        }

    }
});