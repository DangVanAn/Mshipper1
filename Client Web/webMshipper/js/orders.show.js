angular.module('mShipperApp').
component('danhSachDonHang',{
    templateUrl: './Orders/Show.html',
    controller: function DsDonHangController($scope, $http, modalShowMap, $filter,$location, $timeout){
        $(document).ready(function () {

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
                console.log(response.data);

            }, function errorCallback(response) {
                $scope.statustext = 'error';
            });
        }

        $scope.loadMaps = function (x) {
            console.log(x._latitude);
            console.log(x._longitude);

            // Show modal

            modalShowMap.show(x, function (selected) {
                if (selected) {
                    console.log("Nhan duoc::" + selected.toString());
                    x.session = selected.toString();

                }
                else {
                    console.log("không có");
                }
            });
        }

    }
});