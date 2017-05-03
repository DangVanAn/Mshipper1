angular.module('mShipperApp').
component('thongBao',{
    templateUrl: './tableThongBao.html',
    controller: function ThongBaoController($scope, $http, $filter,$location, $timeout){
        $(document).ready(function () {
            $('#dataTables-example').DataTable({
                responsive: true
            });
        });
    }
});