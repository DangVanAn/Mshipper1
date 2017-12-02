angular.module('mShipperApp').component('orderMain', {
    templateUrl: './Orders/Main.html',
    controller: function DsDonHangController($scope, $rootScope, $http, $filter, $location, $timeout, ngDialog) {
        $(document).ready(function () {
            init();
        });
        $rootScope.selectedLink = "Quản Lý Đơn Hàng";

        function init() {
            //load info user all
        };

        $scope.showCreatePre = function () {
            $location.path('/accountscreate');
        };

        $scope.showCreateNPre = function () {
            $location.path('/orderscreate.n');
        };

        $scope.showShowPre = function () {
            // $location.path('/preordersshow')
            $location.path('/preordersshowlist')
        };

        ////////////////////////////////////////////////////////
        $scope.showCreateSum = function () {
            $location.path('/accountscreate');
        };

        $scope.showCreateNSum = function () {
            $location.path('/preorderssumcreate.n');
        };

        $scope.showShowSumForDelievy = function () {
            $location.path('/preorderssumshow')
        };

        ////////////////////////////////////////////////////////
        $scope.showShowSum = function () {
            $location.path('/preorderssumshowall')
        };

        ////////////////////////////////////////////////////////
        $scope.showCreateAssign = function () {
            $location.path('/accountscreate');
        };

        $scope.showCreateNAssign = function () {
            $location.path('/ordersassigncreate.n');
        };

        $scope.showShowAssign = function () {
            $location.path('/preordersassignshow')
        };

    }
});