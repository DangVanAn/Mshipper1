angular.module('mShipperApp').
component('danhSachDonHang',{
    templateUrl: './tableDsDonHang.html',
    controller: function DsDonHangController($scope, $http, $filter,$location, $timeout){
        $(document).ready(function () {
            $('#dataTables-example').DataTable({
                responsive: true
            });
        });

        $scope.status = [
            "Hoàn thành",
            "Đang vận chuyển",
            "Hủy"
        ];
        $scope.selectStatus = $scope.status[0];

        $scope.area = [
            "Khu vực 1",
            "Khu vực 2",
            "Khu vực 3",
            "Khu vực 4",
            "Khu vực 5",
            "Khu vực 6",
            "Khu vực 7",
        ];
        $scope.selectArea = $scope.area[0];

        init();

        function init() {

            $urll = 'http://localhost:9999/orders/getall'

            $http({
                method: 'GET',
                url: $urll,
                headers: {'Content-Type': 'application/json'},
            }).then(function successCallback(response) {
                $scope.orders = response.data;
                console.log(response.data[0]);

            }, function errorCallback(response) {
                $scope.statustext = 'error';
            });
        }

    }
});