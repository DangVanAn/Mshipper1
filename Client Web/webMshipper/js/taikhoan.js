angular.module('mShipperApp').
component('taiKhoan',{
    templateUrl: './tableTaiKhoan.html',
    controller: function DsDonHangController($scope, $http, $filter,$location, $timeout){
        $(document).ready(function () {
            $('#dataTables-example').DataTable({
                responsive: true
            });
        });
        
        $scope.addAcount = function () {
            $location.path('/addacount');
        }
    }
});